import { useActionState, useEffect, useContext } from "react"
import { AlertContext } from "../Providers/AlertProvider"
import dayjs from "dayjs"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"

// Initial form state
const initialActionState = false

export default function BookList({ listArr }) {
  const { setIsAlertOpen, setAlertMsg } = useContext(AlertContext)
  const onImgError = (/*e: React.ChangeEvent<HTMLImageElement>*/) => {
    //e.target.src = "/images/no-image.jpg"
  }

  const booklist = () => {
    return new Promise(async (resolve) => {
      try {
        // Replace with your actual axios call
        // await axios.post('/api/users', { usrNm, usrId, usrPw, usrEmail });

        // Reset form on success
        resolve(!formState)
      } catch (error) {
        console.error("User creation failed:", error)
        // Optionally return previous form state to preserve user input
        resolve(!formState)
      }
    })
  }

  const [formState] = useActionState(booklist, initialActionState)

  useEffect(() => {
    console.log("User useEffect:", formState)
    setIsAlertOpen(true)
    setAlertMsg("JOIN 완료")
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>커버</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>설명</TableCell>
            <TableCell>저자</TableCell>
            <TableCell>발행일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(listArr || []).map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                <img
                  src={import.meta.env.VITE_EXPRESS_API + row.imgSrc}
                  alt="커버"
                  onError={onImgError}
                  style={{ maxWidth: "80px", textAlign: "center" }}
                />
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.content}</TableCell>
              <TableCell align="center">{row.writer}</TableCell>
              <TableCell align="center">
                {row.publish_d ? dayjs(row.publish_d).format("YYYY-MM-DD") : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
