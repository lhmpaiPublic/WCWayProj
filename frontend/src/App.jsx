// import "font-awesome/css/font-awesome.min.css"
import { BrowserRouter } from "react-router-dom"
import Containers from "./Containers"
import { Provider as StoreProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./stores/store"
import { ErrorBoundary } from "react-error-boundary"
import ErrorProvider from "./Providers/ErrorProvider"
import AlertProvider from "./Providers/AlertProvider"
import ErrorFallback from "./components/ErrorFallBack"
import { SWRConfig } from "swr"
import { swrValue } from "./Providers/SWRProvider"

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ErrorProvider>
        <StoreProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <SWRConfig value={swrValue}>
          <AlertProvider>
          <BrowserRouter>
            <Containers />
          </BrowserRouter>
          </AlertProvider>
          </SWRConfig>
        </PersistGate>
        </StoreProvider>
     </ErrorProvider>
   </ErrorBoundary>
  )
}

export default App
