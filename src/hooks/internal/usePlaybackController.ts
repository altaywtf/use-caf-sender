import { useState, useEffect, useCallback } from 'react'

const usePlaybackController = (
  controller: cast.framework.RemotePlayerController,
) => {
  const [playerState, setPlayerState] = useState(
    window.chrome.cast.media.PlayerState.IDLE,
  )

  useEffect(() => {
    const onChange = ({ value }: { value: chrome.cast.media.PlayerState }) =>
      setPlayerState(value)

    const { PLAYER_STATE_CHANGED } = window.cast.framework.RemotePlayerEventType

    controller.addEventListener(PLAYER_STATE_CHANGED, onChange)

    return () => {
      controller.removeEventListener(PLAYER_STATE_CHANGED, onChange)
    }
  }, [controller])

  const playOrPause = useCallback(() => controller.playOrPause(), [controller])

  return [playerState, { setPlayerState, playOrPause }] as const
}

export default usePlaybackController
