import React, { useMemo, useEffect, useState } from 'react'
import loadCastFramework from '../utils/loadCastFramework'
import Context, { CastContext } from './Context'

const CastProvider: React.FC = ({ children }) => {
  const [available, setAvailable] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [castState, setCastState] = useState<CastContext['castState']>()
  const [sessionState, setSessionState] = useState<
    CastContext['sessionState']
  >()

  useEffect(() => {
    const initializeCastAPI = () => {
      const { cast, chrome } = window
      cast.framework.CastContext.getInstance().setOptions({
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      })
    }

    const load = async () => {
      try {
        await loadCastFramework()
        initializeCastAPI()
        setAvailable(true)
        setInitialized(true)
      } catch (e) {
        setAvailable(false)
      }
    }

    load()
  }, [])

  useEffect(() => {
    if (initialized) {
      const context = window.cast.framework.CastContext.getInstance()

      context.addEventListener(
        window.cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        (e) => setCastState(e.castState),
      )

      context.addEventListener(
        window.cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
        (e) => setSessionState(e.sessionState),
      )
    }
  }, [initialized])

  const value = useMemo(() => {
    const connected =
      initialized &&
      castState === window.cast.framework.CastState.CONNECTED &&
      (sessionState === window.cast.framework.SessionState.SESSION_STARTED ||
        sessionState === window.cast.framework.SessionState.SESSION_RESUMED)

    return {
      available,
      initialized,
      connected,
      castState,
      sessionState,
    }
  }, [available, castState, initialized, sessionState])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default CastProvider
