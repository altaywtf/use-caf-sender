import { mocked } from 'ts-jest/utils'
import { renderHook, act } from '@testing-library/react-hooks'
import usePlaybackController from './usePlaybackController'

describe('usePlaybackController', () => {
  const { RemotePlayerController, RemotePlayer } = window.cast.framework
  const { IDLE, PLAYING, PAUSED } = window.chrome.cast.media.PlayerState
  const player = new RemotePlayer()

  let controller: jest.Mocked<cast.framework.RemotePlayerController>

  beforeEach(() => {
    controller = mocked(new RemotePlayerController(player))
  })

  it('allows to set player state', () => {
    const { result } = renderHook(() => usePlaybackController(controller))

    const [playerState, { setPlayerState }] = result.current
    expect(playerState).toBe(IDLE)

    act(() => setPlayerState(PLAYING))

    const [nextPlayerState] = result.current
    expect(nextPlayerState).toBe(PLAYING)
  })

  it('handles player state changes', () => {
    const { result, unmount } = renderHook(() =>
      usePlaybackController(controller),
    )

    const [playerState] = result.current
    expect(playerState).toBe(IDLE)

    expect(controller.addEventListener).toBeCalledTimes(1)

    act(() => {
      const [[, handler]] = controller.addEventListener.mock.calls

      handler({
        type: window.cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED,
        field: 'playerState',
        value: PAUSED,
      })
    })

    const [nextPlayerState] = result.current
    expect(nextPlayerState).toBe(PAUSED)

    unmount()
    expect(controller.removeEventListener).toBeCalledTimes(1)
  })

  it('calls controller methods', () => {
    const { result } = renderHook(() => usePlaybackController(controller))
    const [, { playOrPause }] = result.current
    playOrPause()
    expect(controller.playOrPause).toBeCalled()
  })
})
