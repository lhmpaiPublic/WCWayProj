import React, {
  createContext,
  useEffect,
  useState,
} from "react"
import { useErrorBoundary } from "react-error-boundary"


export const ErrorContext = createContext()

export default function ErrorProvider({ children }) {
  const [rootError, setRootError] = useState(null)
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    const onError = (e) => {
      const event = e
      const detail = event.detail

      console.log("ErrorProvider (API)", detail)

      if (detail?.cod === 403) {
        window.location.href = "/login"
      } else {
        showBoundary(detail || e)
      }
    }

    const onBizError = (e) => {
      const event = e
      const detail = event.detail

      console.log("ErrorProvider (Business)", detail)

      if (detail) {
        setRootError(detail)
      }
    }

    window.addEventListener("ERROR_API", onError)
    window.addEventListener("ERROR_BIZ", onBizError)

    return () => {
      window.removeEventListener("ERROR_API", onError)
      window.removeEventListener("ERROR_BIZ", onBizError)
    }
  }, [showBoundary])

  return (
    <ErrorContext.Provider value={{ rootError, setRootError }}>
      {children}
    </ErrorContext.Provider>
  )
}
