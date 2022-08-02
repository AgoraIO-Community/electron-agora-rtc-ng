import { AgoraEnv, logDebug, logError, logWarn, parseJSON } from "../../Utils";
import { VideoSourceType } from "../AgoraBase";
import {
  IAudioFrameObserver,
  IAudioSpectrumObserver,
  IVideoFrameObserver,
  RenderModeType,
} from "../AgoraMediaBase";
import { IMediaPlayerAudioFrameObserver, IMediaPlayerVideoFrameObserver } from "../IAgoraMediaPlayer";
import { IMediaPlayerSourceObserver } from "../IAgoraMediaPlayerSource";
import { IMediaPlayerImpl } from "../impl/IAgoraMediaPlayerImpl";
import { processIMediaPlayerSourceObserver } from "../impl/IAgoraMediaPlayerSourceImpl";
import { callIrisApi } from "./IrisApiEngine";

export class MediaPlayerInternal extends IMediaPlayerImpl {
  static _observers: IMediaPlayerSourceObserver[] = [];
  _mediaPlayerId: number;

  constructor(mediaPlayerId: number) {
    super();
    this._mediaPlayerId = mediaPlayerId;
  }

  getMediaPlayerId(): number {
    return this._mediaPlayerId;
  }

  registerPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number {
    AgoraEnv.mpkEventHandlers.push({ mpk: this, handler: observer });
    return 0;
  }

  unregisterPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number {
    AgoraEnv.mpkEventHandlers = AgoraEnv.mpkEventHandlers.filter(
      (value) => value.handler !== observer
    );
    return 0;
  }
  override setView(view: HTMLElement): number {
    logWarn("Also can use other api setupLocalVideo");
    AgoraEnv.AgoraRendererManager?.setupVideo({
      videoSourceType: VideoSourceType.VideoSourceMediaPlayer,
      uid: this._mediaPlayerId,
      view,
    });
    return 0;
  }
  override setRenderMode(renderMode: RenderModeType): number {
    logWarn(
      "Also can use other api setRenderOption or setRenderOptionByConfig"
    );
    AgoraEnv.AgoraRendererManager?.setRenderOptionByConfig({
      videoSourceType: VideoSourceType.VideoSourceMediaPlayer,
      uid: this._mediaPlayerId,
      rendererOptions: {
        contentMode:
          renderMode === RenderModeType.RenderModeFit
            ? RenderModeType.RenderModeFit
            : RenderModeType.RenderModeHidden,
        mirror: true,
      },
    });
    return 0;
  }

  setPlayerOptionInInt(key: string, value: number): number {
    const apiType = "MediaPlayer_setPlayerOption";
    const jsonParams = {
      key,
      value,
      toJSON: () => {
        return {
          key,
          value,
        };
      },
    };
    const jsonResults = callIrisApi(apiType, jsonParams);
    return jsonResults.result;
  }

  setPlayerOptionInString(key: string, value: string): number {
    const apiType = "MediaPlayer_setPlayerOption2";
    const jsonParams = {
      key,
      value,
      toJSON: () => {
        return {
          key,
          value,
        };
      },
    };
    const jsonResults = callIrisApi(apiType, jsonParams);
    return jsonResults.result;
  }

  override registerMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver,
    intervalInMS: number
  ): number {
    const res = AgoraEnv.mpkAudioSpectrumObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.mpkAudioSpectrumObservers.push({mpk: this, handler: observer});
    }
    return super.registerMediaPlayerAudioSpectrumObserver(
      observer,
      intervalInMS
    );
  }

  override unregisterMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number {
    AgoraEnv.mpkAudioSpectrumObservers =
      AgoraEnv.mpkAudioSpectrumObservers.filter((value) => value !== observer);
    return super.unregisterMediaPlayerAudioSpectrumObserver(observer);
  }

  override registerAudioFrameObserver(observer: IMediaPlayerAudioFrameObserver): number {
    const res = AgoraEnv.mpkAudioFrameObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.mpkAudioFrameObservers.push({
        mpk: this,
        handler: observer
      });
    }
    return super.registerAudioFrameObserver(observer);
  }

  override unregisterAudioFrameObserver(observer: IMediaPlayerAudioFrameObserver): number {
    AgoraEnv.mpkAudioFrameObservers = AgoraEnv.mpkAudioFrameObservers.filter(
      (value) => value !== observer
    );
    return super.unregisterAudioFrameObserver(observer);
  }

  override registerVideoFrameObserver(observer: IMediaPlayerVideoFrameObserver): number {
    const res = AgoraEnv.mpkVideoFrameObservers.filter(
      (value) => value === observer
    );
    if (res && res.length == 0) {
      AgoraEnv.mpkVideoFrameObservers.push({
        mpk: this,
        handler: observer});
    }
    return super.registerVideoFrameObserver(observer);
  }

  override unregisterVideoFrameObserver(observer: IMediaPlayerVideoFrameObserver): number {
    AgoraEnv.mpkVideoFrameObservers = AgoraEnv.mpkVideoFrameObservers.filter(
      (value) => value !== observer
    );
    return super.unregisterVideoFrameObserver(observer);
  }
}
