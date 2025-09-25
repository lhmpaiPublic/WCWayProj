import { useEffect, useState } from "react"
import { Box } from "@mui/material"
import UploadList from "../Forms/UploadList"
import UploadForm from "../Forms/UploadForm"

export default function BookPage() {
  const [val, setVal] = useState([])

  useEffect(() => {

  }, [])
  return (
    <Box>
      <UploadForm setVal={setVal} />
      <UploadList listArr={val} />
    </Box>
  )
}
