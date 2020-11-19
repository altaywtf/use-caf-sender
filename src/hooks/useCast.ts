import { useContext } from 'react'
import Context from '../context/Context'

const useCast = () => {
  const castContext = useContext(Context)

  const requestSession = async () => {
    try {
      await window.cast.framework.CastContext.getInstance().requestSession()
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  const endSession = () => {
    window.cast.framework.CastContext.getInstance().endCurrentSession(true)
  }

  return { ...castContext, requestSession, endSession }
}

export default useCast
