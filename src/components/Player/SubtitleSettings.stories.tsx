import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withMaxWidth from 'ui/storybook/decorators/withMaxWidth'
import SubtitleSettings, { Props } from './SubtitleSettings'
import theme from '../../theme'
import '../../fixtures/chrome'
import subtitles from '../../fixtures/textTracks'
import subtitleStyles from '../../fixtures/textTrackStyle'

const defaultProps: Props = {
  theme: theme.subtitleSettings,
  onClose: action('onClose'),
  subtitles: [],
  selectedSubtitleId: null,
  selectSubtitle: action('selectSubtitle'),
  subtitleStyles,
  setSubtitleStyle: action('setSubtitleStyle'),
}

storiesOf('chromecast/ui/SubtitleSettings', module)
  .addDecorator(withMaxWidth(480))
  .add('empty state', () => <SubtitleSettings {...defaultProps} />)
  .add('with subtitles', () => (
    <SubtitleSettings
      {...defaultProps}
      subtitles={subtitles}
      selectedSubtitleId={subtitles[0].trackId}
    />
  ))
