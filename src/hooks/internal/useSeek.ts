import { useCallback } from 'react'

const useSeek = (
  player: cast.framework.RemotePlayer,
  controller: cast.framework.RemotePlayerController,
) => {
  const handleSeek = useCallback(
    (time: number) => {
      if (player.canSeek) {
        player.currentTime = time
        controller.seek()
      }
    },
    [controller, player],
  )

  return handleSeek
}

export default useSeek
