import { renderHook, act } from '@testing-library/react-hooks'
import usePlaybackTime from './usePlaybackTime'

describe('usePlaybackTime', () => {
  const { IDLE, PLAYING, PAUSED } = window.chrome.cast.media.PlayerState

  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('does not increment if the player is not playing', () => {
    const { result } = renderHook(() => usePlaybackTime(IDLE))

    expect(result.current[0]).toBe(0)

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(result.current[0]).toBe(0)
  })

  it('increments the currentTime if the player is playing', () => {
    const { result } = renderHook(() => usePlaybackTime(PLAYING))

    expect(result.current[0]).toBe(0)

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(result.current[0]).toBe(5)
  })

  it('handles player state changes', () => {
    const { result, rerender } = renderHook(
      playerState => usePlaybackTime(playerState),
      { initialProps: PLAYING },
    )

    expect(result.current[0]).toBe(0)

    act(() => {
      jest.advanceTimersByTime(3000)
    })

    expect(result.current[0]).toBe(3)

    rerender(PAUSED)

    act(() => {
      jest.advanceTimersByTime(3000)
    })

    expect(result.current[0]).toBe(3)

    rerender(PLAYING)

    act(() => {
      jest.advanceTimersByTime(3000)
    })

    expect(result.current[0]).toBe(6)
  })
})
