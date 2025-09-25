import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material"
import { ErrorContext} from "./ErrorProvider"


// 기본값: 나중에 useContext에서 undefined 방지
export const AlertContext = createContext()


export default function AlertProvider({ children }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  const { rootError } = useContext(ErrorContext)

  const handleClose = () => {
    setIsAlertOpen(false)
    setAlertMsg("")
  }

  useEffect(() => {
    if (rootError) {
      console.log("AlertProvider - rootError:", rootError)
      setIsAlertOpen(true)
      setAlertMsg(rootError?.message || rootError?.msg || "알 수 없는 오류")
    }
  }, [rootError])

  return (
    <AlertContext.Provider
      value={{ isAlertOpen, setIsAlertOpen, alertMsg, setAlertMsg }}
    >
      {children}
      <Dialog open={isAlertOpen} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>{alertMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </AlertContext.Provider>
  )
}
