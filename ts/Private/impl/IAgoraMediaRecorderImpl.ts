import { callIrisApi } from '../internal/IrisApiEngine'
import { IMediaRecorder } from '../IAgoraMediaRecorder'
import { RtcConnection } from '../IAgoraRtcEngineEx'
import { IMediaRecorderObserver, MediaRecorderConfiguration } from '../AgoraMediaBase'
export class IMediaRecorderImpl implements IMediaRecorder {
  setMediaRecorderObserver (connection: RtcConnection, callback: IMediaRecorderObserver): number {
    const apiType = 'MediaRecorder_setMediaRecorderObserver'
    const jsonParams = {
      connection,
      callback,
      toJSON: () => {
        return { connection }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  startRecording (connection: RtcConnection, config: MediaRecorderConfiguration): number {
    const apiType = 'MediaRecorder_startRecording'
    const jsonParams = {
      connection,
      config,
      toJSON: () => {
        return {
          connection,
          config
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  stopRecording (connection: RtcConnection): number {
    const apiType = 'MediaRecorder_stopRecording'
    const jsonParams = {
      connection,
      toJSON: () => {
        return { connection }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  release (): void {
    const apiType = 'MediaRecorder_release'
    const jsonParams = {
    }
    callIrisApi.call(this, apiType, jsonParams)
  }
}
