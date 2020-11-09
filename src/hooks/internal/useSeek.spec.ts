import { mocked } from 'ts-jest/utils'
import { renderHook, act } from '@testing-library/react-hooks'
import useSeek from './useSeek'

describe('useSeek', () => {
  const { RemotePlayerController, RemotePlayer } = window.cast.framework

  let player: jest.Mocked<cast.framework.RemotePlayer>
  let controller: jest.Mocked<cast.framework.RemotePlayerController>

  beforeEach(() => {
    player = mocked(new RemotePlayer())
    controller = mocked(new RemotePlayerController(player))
  })

  it('sends a seek request if player is seekable', () => {
    const { result } = renderHook(() => useSeek(player, controller))

    act(() => {
      result.current(100)
    })

    expect(player.currentTime).toBe(100)
    expect(controller.seek).toBeCalledTimes(1)
  })

  it('skips the seek request if player is not seekable', () => {
    player.canSeek = false

    const { result } = renderHook(() => useSeek(player, controller))

    act(() => {
      result.current(100)
    })

    expect(player.currentTime).toBe(0)
    expect(controller.seek).not.toBeCalled()
  })
})
