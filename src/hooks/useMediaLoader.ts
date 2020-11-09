import { useCallback, useState } from 'react';

export type MediaState =
  | { status: 'loading' }
  | { status: 'loaded'; mediaInfo: chrome.cast.media.MediaInfo }
  | { status: 'error'; error: Error };

const useMediaLoader = () => {
  const [state, setState] = useState<MediaState>({ status: 'loading' });

  const loadMedia = useCallback(
    async (mediaInfo: chrome.cast.media.MediaInfo) => {
      setState({ status: 'loading' });

      const castSession = window.cast.framework.CastContext.getInstance().getCurrentSession();
      if (!castSession) {
        return setState({
          status: 'error',
          error: new Error('No cast session found'),
        });
      }

      try {
        const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
        request.activeTrackIds = mediaInfo.tracks.length ? [0] : [];
        await castSession.loadMedia(request);
        setState({ status: 'loaded', mediaInfo });
      } catch (error) {
        setState({ status: 'error', error });
      }
    },
    []
  );

  return [state, loadMedia] as const;
};

export default useMediaLoader;
