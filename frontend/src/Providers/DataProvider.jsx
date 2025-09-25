import React, { createContext, useState } from "react"

export const ErrorContext = createContext({
  rootError,
  setRootError,
})


export default function ErrorProvider({ children }) {
  const [rootError, setRootError] = useState(null)
  return (
    <ErrorContext.Provider value={{ rootError, setRootError }}>
      {children}
    </ErrorContext.Provider>
  )
}
