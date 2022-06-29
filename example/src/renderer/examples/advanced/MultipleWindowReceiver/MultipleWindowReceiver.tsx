import { Button, Card, Divider, Input, List, Switch } from 'antd'
import creteAgoraRtcEngine, {
  IRtcEngine,
  IRtcEngineEx,
  RtcEngineExImplInternal,
  VideoSourceType,
  AgoraEnv,
} from 'electron-agora-rtc-ng'
import { Component } from 'react'
import Window from '../../component/Window'
import config from '../../config/agora.config'
import styles from '../../config/public.scss'
import { getRandomInt } from '../../util'

import { ipcRenderer } from 'electron'
import JoinChannelBar from '../../component/JoinChannelBar'
import EventMessage from '../../util/eventMessage'

const { Search } = Input

enum PageMode {
  Sender,
  Receiver,
}

const localUid1 = getRandomInt()

interface User {
  isMyself: boolean
  uid: number
  channelId?: string
}

interface State {}

export default class MultipleWindowReceiver extends Component<{}, State, any> {
  rtcEngine?: IRtcEngineEx & IRtcEngine & RtcEngineExImplInternal
  state: State = {}

  componentWillUnmount() {}

  getRtcEngine() {
    if (!this.rtcEngine) {
      this.rtcEngine = creteAgoraRtcEngine()
      //@ts-ignore
      window.rtcEngine = this.rtcEngine
      const res = this.rtcEngine.initialize({ appId: config.appID })
      this.rtcEngine.setLogFile(config.nativeSDKLogPath)
      console.log('initialize:', res)
    }

    return this.rtcEngine
  }

  onPressWindow2Register = async () => {
    ipcRenderer.once('port', (e) => {
      // e.ports is a list of ports sent along with this message
      const port = e.ports[0]
      //@ts-ignore
      window.port = port
      port.onmessage = (messageEvent) => {
        console.log('window2(Receiver):', messageEvent)
      }
      AgoraEnv.AgoraRendererManager.registerRawDataReceiverPort(port)
    })
    await ipcRenderer.invoke(EventMessage.ChannelForRenderAndMainProcess, {
      eventName: EventMessage.GetPort2,
    })
  }

  renderRightBar = () => {
    return (
      <div className={styles.rightBar} style={{ justifyContent: 'flex-start' }}>
        <Divider>Step</Divider>
        <div>
          <p>1. window 1 joinChannel</p>
          <p>2. open new window</p>
          <p>3. window 1 send render data</p>
          <p>4. window 2 register event for render data</p>
          <Divider>Action For Window 2</Divider>
          <Button onClick={this.onPressWindow2Register}>Register</Button>
        </div>
        {/* <JoinChannelBar
          onPressJoin={this.onPressJoinChannel}
          onPressLeave={this.onPressLeaveChannel}
        /> */}
      </div>
    )
  }

  renderItem = ({ isMyself, uid, channelId }: User) => {
    let videoSourceType = VideoSourceType.VideoSourceRemote
    if (isMyself) {
      videoSourceType =
        uid === localUid1
          ? VideoSourceType.VideoSourceCameraPrimary
          : VideoSourceType.VideoSourceCameraSecondary
    }
    return (
      <List.Item>
        <Card title={`${isMyself ? 'Local' : 'Remote'} Uid: ${uid}`}>
          <Window
            uid={uid}
            rtcEngine={this.rtcEngine!}
            videoSourceType={videoSourceType}
            channelId={channelId}
          />
        </Card>
      </List.Item>
    )
  }

  render() {
    const { allUser, isJoined } = this.state
    return (
      <div className={styles.screen}>
        <div className={styles.content}>
          {isJoined && (
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 2,
              }}
              dataSource={allUser}
              renderItem={this.renderItem}
            />
          )}
        </div>
        {this.renderRightBar()}
      </div>
    )
  }
}
