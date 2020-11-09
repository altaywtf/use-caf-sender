import { createContext } from 'react'

export type CastContext = {
  available: boolean
  initialized: boolean
  connected: boolean
  castState: cast.framework.CastState | undefined
  sessionState: cast.framework.SessionState | undefined
}

export default createContext<CastContext>({
  available: false,
  initialized: false,
  connected: false,
  castState: undefined,
  sessionState: undefined,
})
