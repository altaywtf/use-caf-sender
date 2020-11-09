import { useEffect, useState, useCallback } from 'react'

const useVolumeController = (
  controller: cast.framework.RemotePlayerController,
) => {
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const onChange = ({ value }: { value: boolean }) => setMuted(value)

    const { IS_MUTED_CHANGED } = window.cast.framework.RemotePlayerEventType

    controller.addEventListener(IS_MUTED_CHANGED, onChange)

    return () => {
      controller.removeEventListener(IS_MUTED_CHANGED, onChange)
    }
  }, [controller])

  const muteOrUnmute = useCallback(() => controller.muteOrUnmute(), [
    controller,
  ])

  return [muted, { setMuted, muteOrUnmute }] as const
}

export default useVolumeController
