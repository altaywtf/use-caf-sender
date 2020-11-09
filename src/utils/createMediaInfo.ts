const createMediaInfo = ({
  contentId,
  duration,
}: {
  contentId: string;
  duration: number;
}): chrome.cast.media.MediaInfo => ({
  contentId,
  duration,
  contentType: 'video/mp4',
  streamType: window.chrome.cast.media.StreamType.BUFFERED,
  metadata: {},
  tracks: [],
  textTrackStyle: {
    foregroundColor: '#FFF',
    backgroundColor: '#000',
    fontGenericFamily:
      window.chrome.cast.media.TextTrackFontGenericFamily.SANS_SERIF,
    fontFamily: window.chrome.cast.media.TextTrackFontGenericFamily.SANS_SERIF,
    fontScale: 1,
    fontStyle: window.chrome.cast.media.TextTrackFontStyle.NORMAL,
    edgeType: window.chrome.cast.media.TextTrackEdgeType.NONE,
    edgeColor: '#FFF',
    windowType: window.chrome.cast.media.TextTrackWindowType.ROUNDED_CORNERS,
    windowColor: '#000',
    windowRoundedCornerRadius: 3,
    customData: {},
  },
  customData: {},
});

export default createMediaInfo;
