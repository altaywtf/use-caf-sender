import { useState, useCallback } from 'react';

const useSubtitleController = (media?: chrome.cast.media.Media) => {
  const [subtitleId, setSubtitleId] = useState(media?.activeTrackIds[0] || 0);

  const handleSelectSubtitle = useCallback(
    (id: number) => {
      media &&
        media.editTracksInfo(
          new window.chrome.cast.media.EditTracksInfoRequest(
            [id].filter(i => i >= 0)
          ),
          () => setSubtitleId(id),
          error => {
            // @TODO: What now?
            console.warn(error);
          }
        );
    },
    [media]
  );

  return [subtitleId, handleSelectSubtitle] as const;
};

export default useSubtitleController;
