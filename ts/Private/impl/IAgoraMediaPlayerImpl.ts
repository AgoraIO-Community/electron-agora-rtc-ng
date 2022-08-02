import { callIrisApi } from '../internal/IrisApiEngine'
import { IMediaPlayer, IMediaPlayerAudioFrameObserver, IMediaPlayerVideoFrameObserver, IMediaPlayerCacheManager } from '../IAgoraMediaPlayer'
import { MediaSource, PlayerStreamInfo, MediaPlayerState } from '../AgoraMediaPlayerTypes'
import { RenderModeType, IAudioSpectrumObserver, AudioDualMonoMode } from '../AgoraMediaBase'
import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource'
import { SpatialAudioParams } from '../AgoraBase'
export class IMediaPlayerImpl implements IMediaPlayer {
  getMediaPlayerId (): number {
    const apiType = 'MediaPlayer_getMediaPlayerId'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  open (url: string, startPos: number): number {
    const apiType = 'MediaPlayer_open'
    const jsonParams = {
      url,
      startPos,
      toJSON: () => {
        return {
          url,
          startPos
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  openWithMediaSource (source: MediaSource): number {
    const apiType = 'MediaPlayer_openWithMediaSource'
    const jsonParams = {
      source,
      toJSON: () => {
        return { source }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  play (): number {
    const apiType = 'MediaPlayer_play'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  pause (): number {
    const apiType = 'MediaPlayer_pause'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  stop (): number {
    const apiType = 'MediaPlayer_stop'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  resume (): number {
    const apiType = 'MediaPlayer_resume'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  seek (newPos: number): number {
    const apiType = 'MediaPlayer_seek'
    const jsonParams = {
      newPos,
      toJSON: () => {
        return { newPos }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setAudioPitch (pitch: number): number {
    const apiType = 'MediaPlayer_setAudioPitch'
    const jsonParams = {
      pitch,
      toJSON: () => {
        return { pitch }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getDuration (): number {
    const apiType = 'MediaPlayer_getDuration'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const duration = jsonResults.duration
    return duration
  }

  getPlayPosition (): number {
    const apiType = 'MediaPlayer_getPlayPosition'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const pos = jsonResults.pos
    return pos
  }

  getStreamCount (): number {
    const apiType = 'MediaPlayer_getStreamCount'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const count = jsonResults.count
    return count
  }

  getStreamInfo (index: number): PlayerStreamInfo {
    const apiType = 'MediaPlayer_getStreamInfo'
    const jsonParams = {
      index,
      toJSON: () => {
        return { index }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const info = jsonResults.info
    return info
  }

  setLoopCount (loopCount: number): number {
    const apiType = 'MediaPlayer_setLoopCount'
    const jsonParams = {
      loopCount,
      toJSON: () => {
        return { loopCount }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setPlaybackSpeed (speed: number): number {
    const apiType = 'MediaPlayer_setPlaybackSpeed'
    const jsonParams = {
      speed,
      toJSON: () => {
        return { speed }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  selectAudioTrack (index: number): number {
    const apiType = 'MediaPlayer_selectAudioTrack'
    const jsonParams = {
      index,
      toJSON: () => {
        return { index }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  takeScreenshot (filename: string): number {
    const apiType = 'MediaPlayer_takeScreenshot'
    const jsonParams = {
      filename,
      toJSON: () => {
        return { filename }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  selectInternalSubtitle (index: number): number {
    const apiType = 'MediaPlayer_selectInternalSubtitle'
    const jsonParams = {
      index,
      toJSON: () => {
        return { index }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setExternalSubtitle (url: string): number {
    const apiType = 'MediaPlayer_setExternalSubtitle'
    const jsonParams = {
      url,
      toJSON: () => {
        return { url }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getState (): MediaPlayerState {
    const apiType = 'MediaPlayer_getState'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  mute (muted: boolean): number {
    const apiType = 'MediaPlayer_mute'
    const jsonParams = {
      muted,
      toJSON: () => {
        return { muted }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getMute (): boolean {
    const apiType = 'MediaPlayer_getMute'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const muted = jsonResults.muted
    return muted
  }

  adjustPlayoutVolume (volume: number): number {
    const apiType = 'MediaPlayer_adjustPlayoutVolume'
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getPlayoutVolume (): number {
    const apiType = 'MediaPlayer_getPlayoutVolume'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const volume = jsonResults.volume
    return volume
  }

  adjustPublishSignalVolume (volume: number): number {
    const apiType = 'MediaPlayer_adjustPublishSignalVolume'
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getPublishSignalVolume (): number {
    const apiType = 'MediaPlayer_getPublishSignalVolume'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const volume = jsonResults.volume
    return volume
  }

  setView (view: any): number {
    const apiType = 'MediaPlayer_setView'
    const jsonParams = {
      view,
      toJSON: () => {
        return { view }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setRenderMode (renderMode: RenderModeType): number {
    const apiType = 'MediaPlayer_setRenderMode'
    const jsonParams = {
      renderMode,
      toJSON: () => {
        return { renderMode }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  registerPlayerSourceObserver (observer: IMediaPlayerSourceObserver): number {
    const apiType = 'MediaPlayer_registerPlayerSourceObserver'
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  unregisterPlayerSourceObserver (observer: IMediaPlayerSourceObserver): number {
    const apiType = 'MediaPlayer_unregisterPlayerSourceObserver'
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  registerMediaPlayerAudioSpectrumObserver (observer: IAudioSpectrumObserver, intervalInMS: number): number {
    const apiType = 'MediaPlayer_registerMediaPlayerAudioSpectrumObserver'
    const jsonParams = {
      observer,
      intervalInMS,
      toJSON: () => {
        return { intervalInMS }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  unregisterMediaPlayerAudioSpectrumObserver (observer: IAudioSpectrumObserver): number {
    const apiType = 'MediaPlayer_unregisterMediaPlayerAudioSpectrumObserver'
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setAudioDualMonoMode (mode: AudioDualMonoMode): number {
    const apiType = 'MediaPlayer_setAudioDualMonoMode'
    const jsonParams = {
      mode,
      toJSON: () => {
        return { mode }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getPlayerSdkVersion (): string {
    const apiType = 'MediaPlayer_getPlayerSdkVersion'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getPlaySrc (): string {
    const apiType = 'MediaPlayer_getPlaySrc'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  openWithAgoraCDNSrc (src: string, startPos: number): number {
    const apiType = 'MediaPlayer_openWithAgoraCDNSrc'
    const jsonParams = {
      src,
      startPos,
      toJSON: () => {
        return {
          src,
          startPos
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getAgoraCDNLineCount (): number {
    const apiType = 'MediaPlayer_getAgoraCDNLineCount'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  switchAgoraCDNLineByIndex (index: number): number {
    const apiType = 'MediaPlayer_switchAgoraCDNLineByIndex'
    const jsonParams = {
      index,
      toJSON: () => {
        return { index }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getCurrentAgoraCDNIndex (): number {
    const apiType = 'MediaPlayer_getCurrentAgoraCDNIndex'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  enableAutoSwitchAgoraCDN (enable: boolean): number {
    const apiType = 'MediaPlayer_enableAutoSwitchAgoraCDN'
    const jsonParams = {
      enable,
      toJSON: () => {
        return { enable }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  renewAgoraCDNSrcToken (token: string, ts: number): number {
    const apiType = 'MediaPlayer_renewAgoraCDNSrcToken'
    const jsonParams = {
      token,
      ts,
      toJSON: () => {
        return {
          token,
          ts
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  switchAgoraCDNSrc (src: string, syncPts = false): number {
    const apiType = 'MediaPlayer_switchAgoraCDNSrc'
    const jsonParams = {
      src,
      syncPts,
      toJSON: () => {
        return {
          src,
          syncPts
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  switchSrc (src: string, syncPts = true): number {
    const apiType = 'MediaPlayer_switchSrc'
    const jsonParams = {
      src,
      syncPts,
      toJSON: () => {
        return {
          src,
          syncPts
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  preloadSrc (src: string, startPos: number): number {
    const apiType = 'MediaPlayer_preloadSrc'
    const jsonParams = {
      src,
      startPos,
      toJSON: () => {
        return {
          src,
          startPos
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  playPreloadedSrc (src: string): number {
    const apiType = 'MediaPlayer_playPreloadedSrc'
    const jsonParams = {
      src,
      toJSON: () => {
        return { src }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  unloadSrc (src: string): number {
    const apiType = 'MediaPlayer_unloadSrc'
    const jsonParams = {
      src,
      toJSON: () => {
        return { src }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setSpatialAudioParams (params: SpatialAudioParams): number {
    const apiType = 'MediaPlayer_setSpatialAudioParams'
    const jsonParams = {
      params,
      toJSON: () => {
        return { params }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setSoundPositionParams (pan: number, gain: number): number {
    const apiType = 'MediaPlayer_setSoundPositionParams'
    const jsonParams = {
      pan,
      gain,
      toJSON: () => {
        return {
          pan,
          gain
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  registerAudioFrameObserver (observer: IMediaPlayerAudioFrameObserver): number {
    const apiType = 'MediaPlayer_registerAudioFrameObserver'
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  unregisterAudioFrameObserver (observer: IMediaPlayerAudioFrameObserver): number {
    const apiType = 'MediaPlayer_unregisterAudioFrameObserver'
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  registerVideoFrameObserver (observer: IMediaPlayerVideoFrameObserver): number {
    const apiType = 'MediaPlayer_registerVideoFrameObserver'
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  unregisterVideoFrameObserver (observer: IMediaPlayerVideoFrameObserver): number {
    const apiType = 'MediaPlayer_unregisterVideoFrameObserver'
    const jsonParams = {
      observer,
      toJSON: () => {
        return {
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setPlayerOptionInInt (key: string, value: number): number {
    const apiType = 'MediaPlayer_setPlayerOptionInInt'
    const jsonParams = {
      key,
      value,
      toJSON: () => {
        return {
          key,
          value
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setPlayerOptionInString (key: string, value: string): number {
    const apiType = 'MediaPlayer_setPlayerOptionInString'
    const jsonParams = {
      key,
      value,
      toJSON: () => {
        return {
          key,
          value
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }
}

export class IMediaPlayerCacheManagerImpl implements IMediaPlayerCacheManager {
  removeAllCaches (): number {
    const apiType = 'MediaPlayerCacheManager_removeAllCaches'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  removeOldCache (): number {
    const apiType = 'MediaPlayerCacheManager_removeOldCache'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  removeCacheByUri (uri: string): number {
    const apiType = 'MediaPlayerCacheManager_removeCacheByUri'
    const jsonParams = {
      uri,
      toJSON: () => {
        return { uri }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setCacheDir (path: string): number {
    const apiType = 'MediaPlayerCacheManager_setCacheDir'
    const jsonParams = {
      path,
      toJSON: () => {
        return { path }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setMaxCacheFileCount (count: number): number {
    const apiType = 'MediaPlayerCacheManager_setMaxCacheFileCount'
    const jsonParams = {
      count,
      toJSON: () => {
        return { count }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  setMaxCacheFileSize (cacheSize: number): number {
    const apiType = 'MediaPlayerCacheManager_setMaxCacheFileSize'
    const jsonParams = {
      cacheSize,
      toJSON: () => {
        return { cacheSize }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  enableAutoRemoveCache (enable: boolean): number {
    const apiType = 'MediaPlayerCacheManager_enableAutoRemoveCache'
    const jsonParams = {
      enable,
      toJSON: () => {
        return { enable }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getCacheDir (length: number): string {
    const apiType = 'MediaPlayerCacheManager_getCacheDir'
    const jsonParams = {
      length,
      toJSON: () => {
        return { length }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    const path = jsonResults.path
    return path
  }

  getMaxCacheFileCount (): number {
    const apiType = 'MediaPlayerCacheManager_getMaxCacheFileCount'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getMaxCacheFileSize (): number {
    const apiType = 'MediaPlayerCacheManager_getMaxCacheFileSize'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  getCacheFileCount (): number {
    const apiType = 'MediaPlayerCacheManager_getCacheFileCount'
    const jsonParams = {
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }
}

export function processIMediaPlayerAudioFrameObserver (handler: IMediaPlayerAudioFrameObserver, event: string, jsonParams: any) {
  switch (event) {
    case 'onFrame':
      if (handler.onFrame !== undefined) {
        handler.onFrame(jsonParams.frame)
      }
      break
  }
}

export function processIMediaPlayerVideoFrameObserver (handler: IMediaPlayerVideoFrameObserver, event: string, jsonParams: any) {
  switch (event) {
    case 'onFrame':
      if (handler.onFrame !== undefined) {
        handler.onFrame(jsonParams.frame)
      }
      break
  }
}
