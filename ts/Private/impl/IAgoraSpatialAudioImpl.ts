import { callIrisApi } from '../internal/IrisApiEngine'
import { IBaseSpatialAudioEngine, RemoteVoicePositionInfo, ILocalSpatialAudioEngine } from '../IAgoraSpatialAudio'
import { RtcConnection } from '../IAgoraRtcEngineEx'

export class IBaseSpatialAudioEngineImpl implements IBaseSpatialAudioEngine {
  release (): void {
    const apiType = 'BaseSpatialAudioEngine_release'
    const jsonParams = {
    }
    callIrisApi.call(this, apiType, jsonParams)
  }

  setMaxAudioRecvCount (maxCount: number): number {
    const apiType = 'BaseSpatialAudioEngine_setMaxAudioRecvCount'
    const jsonParams = {
      maxCount,
      toJSON: () => {
        return { maxCount }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setAudioRecvRange (range: number): number {
    const apiType = 'BaseSpatialAudioEngine_setAudioRecvRange'
    const jsonParams = {
      range,
      toJSON: () => {
        return { range }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setDistanceUnit (unit: number): number {
    const apiType = 'BaseSpatialAudioEngine_setDistanceUnit'
    const jsonParams = {
      unit,
      toJSON: () => {
        return { unit }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  updateSelfPosition (position: number[], axisForward: number[], axisRight: number[], axisUp: number[]): number {
    const apiType = 'BaseSpatialAudioEngine_updateSelfPosition'
    const jsonParams = {
      position,
      axisForward,
      axisRight,
      axisUp,
      toJSON: () => {
        return {
          position,
          axisForward,
          axisRight,
          axisUp
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  updateSelfPositionEx (position: number[], axisForward: number[], axisRight: number[], axisUp: number[], connection: RtcConnection): number {
    const apiType = 'BaseSpatialAudioEngine_updateSelfPositionEx'
    const jsonParams = {
      position,
      axisForward,
      axisRight,
      axisUp,
      connection,
      toJSON: () => {
        return {
          position,
          axisForward,
          axisRight,
          axisUp,
          connection
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  updatePlayerPositionInfo (playerId: number, positionInfo: RemoteVoicePositionInfo): number {
    const apiType = 'BaseSpatialAudioEngine_updatePlayerPositionInfo'
    const jsonParams = {
      playerId,
      positionInfo,
      toJSON: () => {
        return {
          playerId,
          positionInfo
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setParameters (params: string): number {
    const apiType = 'BaseSpatialAudioEngine_setParameters'
    const jsonParams = {
      params,
      toJSON: () => {
        return { params }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  muteLocalAudioStream (mute: boolean): number {
    const apiType = 'BaseSpatialAudioEngine_muteLocalAudioStream'
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  muteAllRemoteAudioStreams (mute: boolean): number {
    const apiType = 'BaseSpatialAudioEngine_muteAllRemoteAudioStreams'
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }
}

export class ILocalSpatialAudioEngineImpl extends IBaseSpatialAudioEngineImpl implements ILocalSpatialAudioEngine {
  initialize (): number {
    const apiType = 'LocalSpatialAudioEngine_initialize'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  updateRemotePosition (uid: number, posInfo: RemoteVoicePositionInfo): number {
    const apiType = 'LocalSpatialAudioEngine_updateRemotePosition'
    const jsonParams = {
      uid,
      posInfo,
      toJSON: () => {
        return {
          uid,
          posInfo
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  updateRemotePositionEx (uid: number, posInfo: RemoteVoicePositionInfo, connection: RtcConnection): number {
    const apiType = 'LocalSpatialAudioEngine_updateRemotePositionEx'
    const jsonParams = {
      uid,
      posInfo,
      connection,
      toJSON: () => {
        return {
          uid,
          posInfo,
          connection
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  removeRemotePosition (uid: number): number {
    const apiType = 'LocalSpatialAudioEngine_removeRemotePosition'
    const jsonParams = {
      uid,
      toJSON: () => {
        return { uid }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  removeRemotePositionEx (uid: number, connection: RtcConnection): number {
    const apiType = 'LocalSpatialAudioEngine_removeRemotePositionEx'
    const jsonParams = {
      uid,
      connection,
      toJSON: () => {
        return {
          uid,
          connection
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  clearRemotePositions (): number {
    const apiType = 'LocalSpatialAudioEngine_clearRemotePositions'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  clearRemotePositionsEx (connection: RtcConnection): number {
    const apiType = 'LocalSpatialAudioEngine_clearRemotePositionsEx'
    const jsonParams = {
      connection,
      toJSON: () => {
        return { connection }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }
}
