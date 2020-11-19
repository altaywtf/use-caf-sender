const castSession = {
  loadMedia: jest.fn(),
}

const castContext = {
  setOptions: jest.fn(),
  addEventListener: jest.fn(),
  getCurrentSession: jest.fn(() => castSession),
  requestSession: jest.fn(),
  endCurrentSession: jest.fn(),
}

window.cast = {
  framework: {
    CastContext: {
      getInstance: jest.fn(() => castContext),
    },

    RemotePlayer: jest.fn(() => ({
      currentTime: 0,
      canSeek: true,
    })),

    RemotePlayerController: jest.fn(() => ({
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      playOrPause: jest.fn(),
      muteOrUnmute: jest.fn(),
      seek: jest.fn(),
    })),

    setLoggerLevel: jest.fn(),

    VERSION: '1.0.10',

    LoggerLevel: { DEBUG: 0, INFO: 800, WARNING: 900, ERROR: 1000, NONE: 1500 },

    CastState: {
      NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE',
      NOT_CONNECTED: 'NOT_CONNECTED',
      CONNECTING: 'CONNECTING',
      CONNECTED: 'CONNECTED',
    },

    SessionState: {
      NO_SESSION: 'NO_SESSION',
      SESSION_STARTING: 'SESSION_STARTING',
      SESSION_STARTED: 'SESSION_STARTED',
      SESSION_START_FAILED: 'SESSION_START_FAILED',
      SESSION_ENDING: 'SESSION_ENDING',
      SESSION_ENDED: 'SESSION_ENDED',
      SESSION_RESUMED: 'SESSION_RESUMED',
    },

    CastContextEventType: {
      CAST_STATE_CHANGED: 'caststatechanged',
      SESSION_STATE_CHANGED: 'sessionstatechanged',
    },

    SessionEventType: {
      APPLICATION_STATUS_CHANGED: 'applicationstatuschanged',
      APPLICATION_METADATA_CHANGED: 'applicationmetadatachanged',
      ACTIVE_INPUT_STATE_CHANGED: 'activeinputstatechanged',
      VOLUME_CHANGED: 'volumechanged',
      MEDIA_SESSION: 'mediasession',
    },

    RemotePlayerEventType: {
      ANY_CHANGE: 'anyChanged',
      IS_CONNECTED_CHANGED: 'isConnectedChanged',
      IS_MEDIA_LOADED_CHANGED: 'isMediaLoadedChanged',
      QUEUE_DATA_CHANGED: 'queueDataChanged',
      VIDEO_INFO_CHANGED: 'videoInfoChanged',
      DURATION_CHANGED: 'durationChanged',
      CURRENT_TIME_CHANGED: 'currentTimeChanged',
      IS_PAUSED_CHANGED: 'isPausedChanged',
      VOLUME_LEVEL_CHANGED: 'volumeLevelChanged',
      CAN_CONTROL_VOLUME_CHANGED: 'canControlVolumeChanged',
      IS_MUTED_CHANGED: 'isMutedChanged',
      CAN_PAUSE_CHANGED: 'canPauseChanged',
      CAN_SEEK_CHANGED: 'canSeekChanged',
      DISPLAY_NAME_CHANGED: 'displayNameChanged',
      STATUS_TEXT_CHANGED: 'statusTextChanged',
      TITLE_CHANGED: 'titleChanged',
      DISPLAY_STATUS_CHANGED: 'displayStatusChanged',
      MEDIA_INFO_CHANGED: 'mediaInfoChanged',
      IMAGE_URL_CHANGED: 'imageUrlChanged',
      PLAYER_STATE_CHANGED: 'playerStateChanged',
      IS_PLAYING_BREAK_CHANGED: 'isPlayingBreakChanged',
      NUMBER_BREAK_CLIPS_CHANGED: 'numberBreakClipsChanged',
      CURRENT_BREAK_CLIP_NUMBER_CHANGED: 'currentBreakClipNumberChanged',
      CURRENT_BREAK_TIME_CHANGED: 'currentBreakTimeChanged',
      CURRENT_BREAK_CLIP_TIME_CHANGED: 'currentBreakClipTimeChanged',
      BREAK_ID_CHANGED: 'breakIdChanged',
      BREAK_CLIP_ID_CHANGED: 'breakClipIdChanged',
      WHEN_SKIPPABLE_CHANGED: 'whenSkippableChanged',
      LIVE_SEEKABLE_RANGE_CHANGED: 'liveSeekableRangeChanged',
    },

    ActiveInputState: {
      ACTIVE_INPUT_STATE_UNKNOWN: -1,
      ACTIVE_INPUT_STATE_NO: 0,
      ACTIVE_INPUT_STATE_YES: 1,
    },
  },
}
