// https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.Track

enum TrackType {
  TEXT = 'TEXT',
}

enum TextTrackType {
  SUBTITLES = 'SUBTITLES',
}

const textTracks: chrome.cast.media.Track[] = [
  {
    trackId: 0,
    trackContentId: 'https://example.com/0.srt',
    trackContentType: 'text/vtt',
    type: TrackType.TEXT,
    name: 'Wrong.Cops.2013.720p.BluRay.x264.YIFY-eng.srt',
    language: 'eng',
    subtype: TextTrackType.SUBTITLES,
    customData: {},
  },
  {
    trackId: 1,
    trackContentId: 'https://example.com/1.srt',
    trackContentType: 'text/vtt',
    type: TrackType.TEXT,
    name: 'Wrong Cops 2013 (LiMiTED) 720p BluRay x264-AN0NYM0US.srt',
    language: 'eng',
    subtype: TextTrackType.SUBTITLES,
    customData: {},
  },
  {
    trackId: 2,
    trackContentId: 'https://example.com/2.srt',
    trackContentType: 'text/vtt',
    type: TrackType.TEXT,
    name: 'Wrong.Cops.2013.Unrated.720p.WEB-DL.h264.AC3-DEEP.eng.srt',
    language: 'eng',
    subtype: TextTrackType.SUBTITLES,
    customData: {},
  },
  {
    trackId: 3,
    trackContentId: 'https://example.com/3.srt',
    trackContentType: 'text/vtt',
    type: TrackType.TEXT,
    name: 'Wrong.Cops.2013.Unrated.1080p.WEB-DL.h264.AC3-DEEP.eng.srt',
    language: 'eng',
    subtype: TextTrackType.SUBTITLES,
    customData: {},
  },
  {
    trackId: 4,
    trackContentId: 'https://example.com/3.srt',
    trackContentType: 'text/vtt',
    type: TrackType.TEXT,
    name: 'Wrong.Cops.2013.1080p.BluRay.x264.YIFYtr.srt',
    language: 'tur',
    subtype: TextTrackType.SUBTITLES,
    customData: {},
  },
  {
    trackId: 5,
    trackContentId: 'https://example.com/5.srt',
    trackContentType: 'text/vtt',
    type: TrackType.TEXT,
    name: 'Wrong.Cops.2013.Unrated.1080p.WEB-DL.h264.AC3-DEEP.srt',
    language: 'tur',
    subtype: TextTrackType.SUBTITLES,
    customData: {},
  },
  {
    trackId: 6,
    trackContentId: 'https://example.com/6.srt',
    trackContentType: 'text/vtt',
    type: TrackType.TEXT,
    name: 'Wrong.Cops.2013.Unrated.1080p.srt',
    language: 'tur',
    subtype: TextTrackType.SUBTITLES,
    customData: {},
  },
]

export default textTracks
