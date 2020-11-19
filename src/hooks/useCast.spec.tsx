import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import CastProvider from '../context/Provider'
import useCast from './useCast'
import loadCastFramework from '../utils/loadCastFramework'

jest.mock('../utils/loadCastFramework', () => jest.fn(() => Promise.resolve()))

describe('chromecast/hooks/useCast', () => {
  const context = window.cast.framework.CastContext.getInstance()
  const mockRequestSession = context.requestSession as jest.Mock
  const mockEndCurrentSession = context.endCurrentSession as jest.Mock
  const mockContextAddEventListener = context.addEventListener as jest.Mock

  afterEach(jest.clearAllMocks)

  const wrapper: React.FC = ({ children }) => (
    <CastProvider>{children}</CastProvider>
  )

  it('updates availability after loadCastFramework rejects', async () => {
    const mockLoadCastFramework = loadCastFramework as jest.Mock
    mockLoadCastFramework.mockImplementationOnce(() => Promise.reject())

    const { result } = renderHook(() => useCast(), { wrapper })

    expect(result.current).toMatchInlineSnapshot(`
      Object {
        "available": false,
        "castState": undefined,
        "connected": false,
        "endSession": [Function],
        "initialized": false,
        "requestSession": [Function],
        "sessionState": undefined,
      }
    `)
  })

  it('updates availability after loadCastFramework resolves', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCast(), {
      wrapper,
    })

    await act(() => waitForNextUpdate())

    const context = window.cast.framework.CastContext.getInstance()
    expect(context.setOptions).toBeCalled()

    expect(result.current).toMatchInlineSnapshot(`
      Object {
        "available": true,
        "castState": undefined,
        "connected": false,
        "endSession": [Function],
        "initialized": true,
        "requestSession": [Function],
        "sessionState": undefined,
      }
    `)
  })

  it('updates castState', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCast(), {
      wrapper,
    })

    await act(() => waitForNextUpdate())

    const handler = mockContextAddEventListener.mock.calls[0][1]

    act(() => {
      handler({ castState: window.cast.framework.CastState.CONNECTING })
    })

    expect(result.current.castState).toBe('CONNECTING')
  })

  it('updates sessionState', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCast(), {
      wrapper,
    })

    await act(() => waitForNextUpdate())

    const handler = mockContextAddEventListener.mock.calls[1][1]

    act(() => {
      handler({
        sessionState: window.cast.framework.SessionState.SESSION_STARTING,
      })
    })

    expect(result.current.sessionState).toBe('SESSION_STARTING')
  })

  it('updates connected value when castState is CONNECTED and sessionState is SESSION_STARTED', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCast(), {
      wrapper,
    })

    await act(() => waitForNextUpdate())

    const castStateHandler = mockContextAddEventListener.mock.calls[0][1]
    const sessionStateHandler = mockContextAddEventListener.mock.calls[1][1]

    act(() => {
      castStateHandler({
        castState: window.cast.framework.CastState.CONNECTED,
      })

      sessionStateHandler({
        sessionState: window.cast.framework.SessionState.SESSION_STARTED,
      })
    })

    expect(result.current.connected).toBe(true)
  })

  it('updates connected value when castState is CONNECTED and sessionState is SESSION_RESUMED', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCast(), {
      wrapper,
    })

    await act(() => waitForNextUpdate())

    const castStateHandler = mockContextAddEventListener.mock.calls[0][1]
    const sessionStateHandler = mockContextAddEventListener.mock.calls[1][1]

    act(() => {
      castStateHandler({
        castState: window.cast.framework.CastState.CONNECTED,
      })

      sessionStateHandler({
        sessionState: window.cast.framework.SessionState.SESSION_RESUMED,
      })
    })

    expect(result.current.connected).toBe(true)
  })

  it('calls window.cast.framework.CastContext.getInstance().requestSession', async () => {
    const { result } = renderHook(() => useCast(), { wrapper })

    await act(
      () =>
        new Promise(async resolve => {
          await result.current.requestSession()
          resolve()
        }),
    )

    expect(mockRequestSession).toBeCalled()
  })

  it('handles window.cast.framework.CastContext.getInstance().requestSession rejections', async () => {
    mockRequestSession.mockRejectedValue(new Error('Error!'))
    const { result } = renderHook(() => useCast(), { wrapper })

    await act(
      () =>
        new Promise(async resolve => {
          await result.current.requestSession()
          resolve()
        }),
    )

    expect(mockRequestSession).toBeCalled()
  })

  it('calls window.cast.framework.CastContext.getInstance().endCurrentSession', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCast(), {
      wrapper,
    })

    act(() => {
      result.current.endSession()
    })

    await act(() => waitForNextUpdate())

    expect(mockEndCurrentSession).toBeCalled()
  })
})
