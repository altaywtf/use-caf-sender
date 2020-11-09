import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import useVolumeController from './internal/useVolumeController';
import usePlaybackController from './internal/usePlaybackController';
import usePlaybackTime from './internal/usePlaybackTime';
import useSeek from './internal/useSeek';
import useSubtitleController from './internal/useSubtitleController';
import useSubtitleStyles from './internal/useSubtitleStyles';

const useRemotePlayerController = () => {
  const mediaRef = useRef<chrome.cast.media.Media>();
  const player = useMemo(() => new window.cast.framework.RemotePlayer(), []);
  const controller = useMemo(
    () => new window.cast.framework.RemotePlayerController(player),
    [player]
  );

  const [mediaInfo, setMediaInfo] = useState<chrome.cast.media.MediaInfo>();
  const [muted, { setMuted, muteOrUnmute }] = useVolumeController(controller);
  const [playerState, { setPlayerState, playOrPause }] = usePlaybackController(
    controller
  );
  const [currentTime, setCurrentTime] = usePlaybackTime(playerState);
  const seek = useSeek(player, controller);
  const [selectedSubtitleId, selectSubtitle] = useSubtitleController(
    mediaRef.current
  );
  const [subtitleStyles, { setStyle }] = useSubtitleStyles(mediaRef.current);

  const handleMediaStatusChange = useCallback(
    (isAlive: boolean) => {
      if (isAlive && mediaRef.current) {
        setMuted(Boolean(mediaRef.current.volume.muted));
        setPlayerState(mediaRef.current.playerState);
        setCurrentTime(mediaRef.current.currentTime || 0);
      }
    },
    [setCurrentTime, setMuted, setPlayerState]
  );

  const handleRemotePlayerEvent = useCallback(
    (
      event: cast.framework.RemotePlayerChangedEvent<
        cast.framework.RemotePlayerEventType.ANY_CHANGE
      >
    ) => {
      const ingoredFields = ['currentTime'];
      if (ingoredFields.includes(event.field)) return;

      const session = window.cast.framework.CastContext.getInstance().getCurrentSession();
      if (!session) return;

      const media = session.getMediaSession();
      if (!media) return;

      if (mediaRef.current?.mediaSessionId !== media.mediaSessionId) {
        mediaRef.current = media;
        handleMediaStatusChange(true);
        media.addUpdateListener(handleMediaStatusChange);
      }

      setMediaInfo(media.media);
    },
    [handleMediaStatusChange]
  );

  useEffect(() => {
    const { ANY_CHANGE } = window.cast.framework.RemotePlayerEventType;
    controller.addEventListener(ANY_CHANGE, handleRemotePlayerEvent);
    return () => {
      controller.removeEventListener(ANY_CHANGE, handleRemotePlayerEvent);
    };
  }, [controller, handleRemotePlayerEvent]);

  return [
    {
      playerState,
      mediaInfo,
      muted,
      currentTime,
      duration: mediaInfo?.duration ?? 0,
      subtitles: mediaInfo?.tracks ?? [],
      selectedSubtitleId,
      subtitleStyles,
    },
    {
      playOrPause,
      muteOrUnmute,
      seek,
      selectSubtitle,
      setSubtitleStyle: setStyle,
    },
  ] as const;
};

export default useRemotePlayerController;
