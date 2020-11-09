import { mocked } from 'ts-jest/utils'
import { renderHook, act } from '@testing-library/react-hooks'
import useVolumeController from './useVolumeController'

describe('useVolumeController', () => {
  const { RemotePlayerController, RemotePlayer } = window.cast.framework
  const player = new RemotePlayer()

  let controller: jest.Mocked<cast.framework.RemotePlayerController>

  beforeEach(() => {
    controller = mocked(new RemotePlayerController(player))
  })

  it('allows to set muted state', () => {
    const { result } = renderHook(() => useVolumeController(controller))

    const [muted, { setMuted }] = result.current
    expect(muted).toBe(false)

    act(() => setMuted(true))

    const [nextMuted] = result.current
    expect(nextMuted).toBe(true)
  })

  it('handles mute state changes', () => {
    const { result, unmount } = renderHook(() =>
      useVolumeController(controller),
    )

    const [muted] = result.current
    expect(muted).toBe(false)

    expect(controller.addEventListener).toBeCalledTimes(1)

    act(() => {
      const [[, handler]] = controller.addEventListener.mock.calls

      handler({
        type: window.cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED,
        field: 'muted',
        value: true,
      })
    })

    const [nextMuted] = result.current
    expect(nextMuted).toBe(true)

    unmount()
    expect(controller.removeEventListener).toBeCalledTimes(1)
  })

  it('calls controller methods', () => {
    const { result } = renderHook(() => useVolumeController(controller))
    const [, { muteOrUnmute }] = result.current
    muteOrUnmute()
    expect(controller.muteOrUnmute).toBeCalled()
  })
})
