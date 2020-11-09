import { useCallback, useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import textTrackStyle from '../../fixtures/textTrackStyle';

type SubtitleStyles = chrome.cast.media.TextTrackStyle;

const createTextTrackStyleInstance = (styles: SubtitleStyles) =>
  Object.entries(styles).reduce((instance, pair) => {
    const [key, value] = pair;
    (instance as any)[key] = value;
    return instance;
  }, new window.chrome.cast.media.TextTrackStyle());

const sendTextTrackStyleToChromecast = (
  textTrackStyle: SubtitleStyles,
  media?: chrome.cast.media.Media
) => {
  const tracksInfoRequest = new window.chrome.cast.media.EditTracksInfoRequest(
    undefined,
    textTrackStyle
  );

  media?.editTracksInfo(
    tracksInfoRequest,
    () => null,
    error =>
      console.error(
        `Chromecast: an error occurred while configuring subtitle styles: ${JSON.stringify(
          error
        )}`
      )
  );
};

const useSubtitleStyles = (media?: chrome.cast.media.Media) => {
  const styles = media?.media?.textTrackStyle || textTrackStyle;

  const [didConfigure, setDidConfigure] = useState(false);
  const [cachedStyles, setCachedStyles] = useLocalStorage<SubtitleStyles>(
    'chromecast-subtitle-styles',
    undefined
  );

  useEffect(() => {
    if (media && !didConfigure) {
      setDidConfigure(true);

      if (cachedStyles) {
        sendTextTrackStyleToChromecast(
          createTextTrackStyleInstance(cachedStyles),
          media
        );
      }
    }
  }, [media, cachedStyles, didConfigure]);

  const setStyle = useCallback(
    <K extends keyof SubtitleStyles>(key: K, value: SubtitleStyles[K]) => {
      styles[key] = value;

      sendTextTrackStyleToChromecast(
        createTextTrackStyleInstance(styles),
        media
      );

      setCachedStyles(styles);
    },
    [media, styles, setCachedStyles]
  );

  return [styles, { setStyle }] as const;
};

export default useSubtitleStyles;
