import { useState, useEffect } from 'react'
import { useInterval } from 'react-use'

const usePlaybackTime = (playerState: chrome.cast.media.PlayerState) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useInterval(
    () => {
      setCurrentTime((t) => t + 1)
    },
    isPlaying ? 1000 : null,
  )

  useEffect(() => {
    if (playerState === window.chrome.cast.media.PlayerState.PLAYING) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }, [playerState])

  return [currentTime, setCurrentTime] as const
}

export default usePlaybackTime
