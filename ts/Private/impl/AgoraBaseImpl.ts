import { IAudioEncodedFrameObserver } from '../AgoraBase'

export function processIAudioEncodedFrameObserver (handler: IAudioEncodedFrameObserver, event: string, jsonParams: any) {
  switch (event) {
    case 'OnRecordAudioEncodedFrame':
      if (handler.OnRecordAudioEncodedFrame !== undefined) {
        handler.OnRecordAudioEncodedFrame(jsonParams.frameBuffer, jsonParams.length, jsonParams.audioEncodedFrameInfo)
      }
      break

    case 'OnPlaybackAudioEncodedFrame':
      if (handler.OnPlaybackAudioEncodedFrame !== undefined) {
        handler.OnPlaybackAudioEncodedFrame(jsonParams.frameBuffer, jsonParams.length, jsonParams.audioEncodedFrameInfo)
      }
      break

    case 'OnMixedAudioEncodedFrame':
      if (handler.OnMixedAudioEncodedFrame !== undefined) {
        handler.OnMixedAudioEncodedFrame(jsonParams.frameBuffer, jsonParams.length, jsonParams.audioEncodedFrameInfo)
      }
      break
  }
}
