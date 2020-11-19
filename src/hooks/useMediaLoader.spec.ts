import { renderHook, act } from '@testing-library/react-hooks'
import useMediaLoader from './useMediaLoader'
import createMediaInfo from '../utils/createMediaInfo'

describe('chromecast/hooks/useMediaLoader', () => {
  const mockMediaInfo = createMediaInfo({ contentId: 'put.io', duration: 100 })
  const session = window.cast.framework.CastContext.getInstance().getCurrentSession() as cast.framework.CastSession
  const mockLoadMedia = session.loadMedia as jest.Mock

  afterEach(jest.clearAllMocks)

  it('handles loadMedia success', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMediaLoader())

    act(() => {
      result.current[1](mockMediaInfo)
    })

    expect(result.current[0].status).toBe('loading')

    await act(() => waitForNextUpdate())

    expect(mockLoadMedia).toBeCalledTimes(1)

    const state = result.current[0]

    expect(state.status).toBe('loaded')

    if (state.status === 'loaded') {
      expect(state.mediaInfo).toBe(mockMediaInfo)
    }
  })

  it('handles loadMedia rejections', async () => {
    const mockError = new Error('error')
    mockLoadMedia.mockRejectedValueOnce(mockError)

    const { result, waitForNextUpdate } = renderHook(() => useMediaLoader())

    act(() => {
      result.current[1](mockMediaInfo)
    })

    expect(result.current[0].status).toBe('loading')

    await act(() => waitForNextUpdate())

    expect(mockLoadMedia).toBeCalledTimes(1)

    const state = result.current[0]

    expect(state.status).toBe('error')

    if (state.status === 'error') {
      expect(state.error).toBe(mockError)
    }
  })
})
