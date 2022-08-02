import { AgoraElectronBridge, Result } from "../../Types";
import { AgoraEnv, logDebug, logError, logWarn, parseJSON } from "../../Utils";
import { AudioFrame, VideoFrame } from "../AgoraMediaBase";
import { IMediaPlayer } from "../IAgoraMediaPlayer";
import { IDirectCdnStreamingEventHandler } from "../IAgoraRtcEngine";
import { processIAudioEncodedFrameObserver } from "../impl/AgoraBaseImpl";
import {
  processIAudioFrameObserver,
  processIAudioFrameObserverBase,
  processIAudioSpectrumObserver,
  processIVideoEncodedFrameObserver,
  processIVideoFrameObserver,
} from "../impl/AgoraMediaBaseImpl";
import { processIMediaPlayerAudioFrameObserver, processIMediaPlayerVideoFrameObserver } from "../impl/IAgoraMediaPlayerImpl";
import { processIMediaPlayerSourceObserver } from "../impl/IAgoraMediaPlayerSourceImpl";
import {
  processIDirectCdnStreamingEventHandler,
  processIMetadataObserver,
  processIRtcEngineEventHandler,
} from "../impl/IAgoraRtcEngineImpl";
const agora = require("../../../build/Release/agora_node_ext");

const MetadataSplitString = "MetadataObserver_";
const MediaPlayerSplitString = "MediaPlayerSourceObserver_";

export const getBridge = (): AgoraElectronBridge => {
  let bridge = AgoraEnv.AgoraElectronBridge;
  if (!bridge) {
    bridge = new agora.AgoraElectronBridge();
    bridge!.sendMsg = sendMsg;
    AgoraEnv.AgoraElectronBridge = bridge;
  }
  return bridge!;
};

export const handlerRTCEvent = function (
  event: string,
  data: string,
  buffer: Uint8Array[],
  bufferLength: number[],
  bufferCount: number
) {
  const parseData = "onApiError" === event ? data : parseJSON(data);
  logDebug(
    "event",
    event,
    "data",
    parseData,
    "buffer",
    buffer,
    "bufferLength",
    bufferLength,
    "bufferCount",
    bufferCount
  );
  const isEx = event.endsWith("Ex");
  const isMetadata = event.startsWith("MetadataObserver");
  preProcessEvent(event, parseData, buffer, bufferLength, bufferCount);

  if (!isMetadata) {
    AgoraEnv.rtcEventHandlers.forEach((value) => {
      if (!value) {
        return;
      }
      if (event.endsWith("Ex")) {
        event = event.replace("Ex", "");
      }

      if (event.startsWith("DirectCdnStreamingEventHandler_")) {
        event = event.replace("DirectCdnStreamingEventHandler_", "");
        try {
          processIDirectCdnStreamingEventHandler(
            value as IDirectCdnStreamingEventHandler,
            event,
            parseData
          );
        } catch (error) {
          logError(
            "rtcEventHandlers::processIDirectCdnStreamingEventHandler",
            error
          );
        }
        return;
      }

      try {
        processIRtcEngineEventHandler(value, event, parseData);
      } catch (error) {
        logError("rtcEventHandlers::processIRtcEngineEventHandler", error);
      }
    });
  }

  if (isMetadata) {
    let splitStr = event.split(MetadataSplitString);
    AgoraEnv.metadataObservers.forEach((value) => {
      processIMetadataObserver(value, splitStr[1], parseData);
    });
  }
};

export const handlerMPKEvent = function (
  event: string,
  data: string,
  buffer: Uint8Array[],
  bufferLength: number[],
  bufferCount: number
) {
  const obj = parseJSON(data);
  logDebug(
    "event",
    event,
    "data",
    obj,
    "buffer",
    buffer,
    "bufferLength",
    bufferLength,
    "bufferCount",
    bufferCount
  );

  let splitStr = event.split(MediaPlayerSplitString);
  logDebug("agora  ", splitStr);
  AgoraEnv.mpkEventHandlers.forEach((value) => {
    if (!value) {
      return;
    }
    if (value.mpk.getMediaPlayerId() === obj.playerId) {
      try {
        processIMediaPlayerSourceObserver(value.handler, splitStr[1], obj);
      } catch (error) {
        logError("mpkEventHandlers::processIMediaPlayerSourceObserver");
      }
    }
  });
};

export const handlerObserverEvent = function (
  event: string,
  data: string,
  buffer: Uint8Array[],
  bufferLength: number[],
  bufferCount: number
) {
  if (data == "")
    return;

  let object = parseJSON(data);
  if (event.startsWith("AudioFrameObserver_")) {
    event = event.replace("AudioFrameObserver_", "");
    if (object.audioFrame) {
      (object.audioFrame as AudioFrame).buffer = buffer[0];
    }
    AgoraEnv.rtcAudioFrameObservers.forEach((value) => {
      processIAudioFrameObserver(value, event, object);
      processIAudioFrameObserverBase(value, event, object);
    });
  } else if (event.startsWith("VideoFrameObserver_")) {
    event = event.replace("VideoFrameObserver_", "");
    if (object.videoFrame) {
      (object.videoFrame as VideoFrame).yBuffer = buffer[0];
      (object.videoFrame as VideoFrame).uBuffer = buffer[1];
      (object.videoFrame as VideoFrame).vBuffer = buffer[2];
    }
    AgoraEnv.rtcVideoFrameObservers.forEach((value) => {
      processIVideoFrameObserver(value, event, object);
    });
  } else if (event.indexOf("RtcEngine") != -1 && event.indexOf("AudioSpectrumObserver_") != -1) {
    event = event.replace("RtcEngine_AudioSpectrumObserver_", "");
    AgoraEnv.rtcAudioSpectrumObservers.forEach((value) => {
      processIAudioSpectrumObserver(value, event, object);
    });
  } else if (event.startsWith("AudioEncodedFrameObserver_")) {
    event = event.replace("AudioEncodedFrameObserver_", "");
    object.frameBuffer = buffer[0];
    AgoraEnv.rtcAudioEncodedFrameObservers.forEach((value) => {
      processIAudioEncodedFrameObserver(value, event, object);
    });
  } else if (event.startsWith("VideoEncodedFrameObserver_")) {
    event = event.replace("VideoEncodedFrameObserver_", "");
    object.imageBuffer = buffer[0];
    object.length = buffer[0].length;
    AgoraEnv.rtcVideoEncodedFrameObservers.forEach((value) => {
      processIVideoEncodedFrameObserver(value, event, object);
    });
  } else if (event.indexOf("MediaPlayer") != -1 && event.indexOf("AudioSpectrumObserver_") != -1) {
    event = event.replace("MediaPlayer_AudioSpectrumObserver_", "");
    AgoraEnv.mpkAudioSpectrumObservers.forEach((value) => {
      processIAudioSpectrumObserver(value.handler, event, object);
    });
  } else if (event.indexOf("MediaPlayer") != -1 && event.indexOf("VideoFrameObserver_") != -1) {
    event = event.replace("MediaPlayer_VideoFrameObserver_", "");
    if (object.videoFrame) {
      (object.videoFrame as VideoFrame).yBuffer = buffer[0];
      (object.videoFrame as VideoFrame).uBuffer = buffer[1];
      (object.videoFrame as VideoFrame).vBuffer = buffer[2];
    }
    AgoraEnv.mpkVideoFrameObservers.forEach((value) => {
      processIMediaPlayerVideoFrameObserver(value.handler, event, object);
    });
  }
  //   event = event.replace('MediaPlayerVideoFrameObserver_', '');
  //   if (data.frame) {
  //     (data.frame as VideoFrame).yBuffer = Buffer.from(
  //       utf8.decode(base64.decode(buffers[0]))
  //     );
  //     (data.frame as VideoFrame).uBuffer = Buffer.from(
  //       utf8.decode(base64.decode(buffers[1]))
  //     );
  //     (data.frame as VideoFrame).vBuffer = Buffer.from(
  //       utf8.decode(base64.decode(buffers[2]))
  //     );
  //     (data.frame as VideoFrame).metadata_buffer = Buffer.from(
  //       utf8.decode(base64.decode(buffers[3]))
  //     );
  //     (data.frame as VideoFrame).alphaBuffer = Buffer.from(
  //       utf8.decode(base64.decode(buffers[4]))
  //     );
  //   }
  //   MediaPlayerInternal._video_frame_observers
  //     .get(data.playerId)
  //     ?.forEach((value) => {
  //       processIMediaPlayerVideoFrameObserver(value, event, data);
  //     });
  // } else if (event.startsWith('MediaRecorderObserver_')) {
  //   event = event.replace('MediaRecorderObserver_', '');
  //   const key = data.connection.channelId ?? '' + data.connection.localUid;
  //   if (MediaRecorderInternal._observers.has(key)) {
  //     processIMediaRecorderObserver(
  //       MediaRecorderInternal._observers.get(key)!,
  //       event,
  //       data
  //     );
  //   }
  // } else if (event.startsWith('MetadataObserver_')) {
  //   event = event.replace('MetadataObserver_', '');
  //   switch (event) {
  //     case 'onMetadataReceived':
  //       if (data.metadata) {
  //         (data.metadata as Metadata).buffer = Buffer.from(
  //           utf8.decode(base64.decode(buffers[0]))
  //         );
  //       }
  //       break;
  //   }
  //   RtcEngineInternal._handlers.forEach((value) => {
  //processIMetadataObserver(value as IMetadataObserver, event, data);
};

export const sendMsg = (
  funcName: string,
  params: any,
  buffer?: (Uint8Array | undefined)[],
  bufferCount = 0
): Result => {
  const irisReturnValue = getBridge().CallApi(
    funcName,
    JSON.stringify(params),
    buffer,
    bufferCount
  );
  logDebug(
    "sendMsg",
    "funcName",
    funcName,
    "params",
    params,
    "irisReturnValue",
    irisReturnValue
  );

  const result = parseJSON(irisReturnValue.callApiResult);
  return result;
};

const ResultOk = {
  result: 0,
};
const ResultFail = {
  result: 0,
};

export function callIrisApi(
  funcName: string,
  params: any,
  buffer?: (Uint8Array | undefined)[],
  bufferCount: number = 0
): any {
  const isMediaPlayer = funcName.startsWith("MediaPlayer_");
  if (isMediaPlayer) {
    //@ts-ignore
    params.mediaPlayerId = (this as IMediaPlayer).getMediaPlayerId();
    const json = params.toJSON?.call();
    params.toJSON = function () {
      return { ...json, playerId: params.mediaPlayerId };
    };
  }
  return sendMsg(funcName, params, buffer, bufferCount);
}

function preProcessEvent(
  event: string,
  data: any,
  buffer: Uint8Array[],
  bufferLength: number[],
  bufferCount: number
): any {
  switch (event) {
    case "onStreamMessage":
    case "onStreamMessageEx":
      data.data = buffer[0];
      break;
    case "MetadataObserver_onMetadataReceived":
      data.metadata.buffer = buffer[0];
      break;
  }
}
