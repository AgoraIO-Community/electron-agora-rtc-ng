import { Button, Card, Divider, Input, List, Switch } from 'antd'
import creteAgoraRtcEngine, {
  AudioProfileType,
  AudioScenarioType,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  RtcConnection,
  RtcEngineExImplInternal,
  RtcStats,
  UserOfflineReasonType,
  VideoSourceType,
  AgoraEnv,
} from 'electron-agora-rtc-ng'
import { Component } from 'react'
import Window from '../../component/Window'
import config from '../../config/agora.config'
import styles from '../../config/public.scss'
import { getRandomInt } from '../../util'

import { ipcRenderer, BrowserWindow } from 'electron'
import EventMessage from '../../util/eventMessage'
import JoinChannelBar from '../../component/JoinChannelBar'

const { Search } = Input

const localUid1 = getRandomInt()

interface User {
  isMyself: boolean
  uid: number
  channelId?: string
}

interface State {
  isOpenNewWindow: boolean
  isJoined: boolean
  channelId: string
  allUser: User[]
}

export default class MultipleWindowSender
  extends Component<{}, State, any>
  implements IRtcEngineEventHandler
{
  rtcEngine?: IRtcEngineEx & IRtcEngine & RtcEngineExImplInternal

  state: State = {
    isOpenNewWindow: false,
    channelId: '',
    allUser: [],
    isJoined: false,
  }
  onJoinChannelSuccess(
    { channelId, localUid }: RtcConnection,
    elapsed: number
  ): void {
    const { allUser: oldAllUser } = this.state

    const newAllUser = [...oldAllUser]
    newAllUser.push({ isMyself: true, uid: localUid, channelId })
    this.setState({
      isJoined: true,
      allUser: newAllUser,
    })
  }

  onUserJoined(
    connection: RtcConnection,
    remoteUid: number,
    elapsed: number
  ): void {
    console.log(
      'onUserJoined',
      'connection',
      connection,
      'remoteUid',
      remoteUid
    )

    const { allUser: oldAllUser } = this.state
    const newAllUser = [...oldAllUser]
    newAllUser.push({ isMyself: false, uid: remoteUid })
    this.setState({
      allUser: newAllUser,
    })
  }

  onUserOffline(
    { localUid, channelId }: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ): void {
    console.log('onUserOffline', channelId, remoteUid)

    const { allUser: oldAllUser } = this.state
    const newAllUser = [...oldAllUser.filter((obj) => obj.uid !== remoteUid)]
    this.setState({
      allUser: newAllUser,
    })
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats): void {
    this.setState({
      isJoined: false,
      allUser: [],
    })
  }

  componentDidMount() {
    this.getRtcEngine().registerEventHandler(this)
  }

  componentWillUnmount() {
    this.onPressToggleWindowOpen(false)
    this.rtcEngine?.unregisterEventHandler(this)
    this.onPressLeaveChannel()
    this.rtcEngine?.release()
  }

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

  onPressJoinChannel = (channelId: string) => {
    const rtcEngine = this.getRtcEngine()
    rtcEngine.enableAudio()
    rtcEngine.enableVideo()
    rtcEngine.setChannelProfile(
      ChannelProfileType.ChannelProfileLiveBroadcasting
    )
    rtcEngine.setAudioProfile(
      AudioProfileType.AudioProfileDefault,
      AudioScenarioType.AudioScenarioChatroom
    )
    rtcEngine.startPreview()

    const res = rtcEngine.joinChannel('', channelId, '', localUid1)
    console.log(`localUid1: ${localUid1} joinChannel: ${res}`)
  }

  onPressLeaveChannel = () => {
    this.rtcEngine?.leaveChannel()
  }

  onPressToggleWindowOpen = async (isOpen) => {
    if (isOpen) {
      await ipcRenderer.invoke(EventMessage.ChannelForRenderAndMainProcess, {
        eventName: EventMessage.OpenNewWindow,
      })

      ipcRenderer.once('port', (e) => {
        // e.ports is a list of ports sent along with this message
        const port = e.ports[0]
        //@ts-ignore
        window.port = port

        port.onmessage = (messageEvent) => {
          console.log('window1(Sender):', messageEvent)
        }
        AgoraEnv.AgoraRendererManager.registerRawDataSenderPort(port)
      })
      await ipcRenderer.invoke(EventMessage.ChannelForRenderAndMainProcess, {
        eventName: EventMessage.GetPort1,
      })
    } else {
      ipcRenderer.invoke(EventMessage.ChannelForRenderAndMainProcess, {
        eventName: EventMessage.CloseWindow,
      })
      ipcRenderer.removeAllListeners('port')
    }

    this.setState({ isOpenNewWindow: isOpen })
  }

  renderRightBar = () => {
    const { isOpenNewWindow } = this.state
    return (
      <div className={styles.rightBar}>
        <Divider>Step</Divider>
        <div>
          <p>1. window 1 joinChannel</p>
          <p>2. open new window</p>
          <p>3. window 1 send render data</p>
          <p>4. window 2 register event for render data</p>
          <Divider>Action For Window 1</Divider>
          <div
            style={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            {'Open New Windows : '}
            <Switch
              checkedChildren='Yes'
              unCheckedChildren='No'
              defaultChecked={isOpenNewWindow}
              onChange={this.onPressToggleWindowOpen}
            />
          </div>
          <Button
            onClick={() => {
              // BrowserWindow.fromId
              // ipcRenderer.sendTo()
            }}
          >
            Send Render Data
          </Button>
        </div>
        <JoinChannelBar
          onPressJoin={this.onPressJoinChannel}
          onPressLeave={this.onPressLeaveChannel}
        />
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
