// BoardWriteForm.tsx
import {
  useState,
  useContext,
  useEffect,
  useActionState,
  //type FormEvent,
} from "react"
import { TextField, Button, Typography, Paper } from "@mui/material"
import styled from "@emotion/styled"
import { AlertContext } from "../Providers/AlertProvider"
import { api } from "../common/axiosapi"

// 스타일 컴포넌트
const FormContainer = styled.form`
  width: 600px;
  margin: 40px auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StyledButton = styled(Button)`
  align-self: flex-end;
`

const initialFormState = {
  title: "",
  content: "",
  author: "",
}
// Initial form state
const initialActionState = false

const BoardForm = () => {
  const [form, setForm] = useState(initialFormState)
  const { setIsAlertOpen, setAlertMsg } = useContext(AlertContext)

  const onChangeForm = (e) => {
    const {
      currentTarget: { name, value },
    } = e
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const createBoard = () => {
    return new Promise(async (resolve) => {
      try {
        const result = await api("/board", form)
        console.error("board creation:", result)
        resolve(!formState)
      } catch (error) {
        console.error("board creation failed:", error)
        resolve(!formState)
      }
    })
  }

  const [formState, formAction] = useActionState(
    createBoard,
    initialActionState
  )

  useEffect(() => {
    console.log("board useEffect:", formState)
  }, [formState])

  return (
    <FormContainer elevation={3} action={formAction}>
      <Typography variant="h5">게시판 글쓰기</Typography>
      <TextField
        label="제목"
        variant="outlined"
        fullWidth
        name="title"
        value={form.title}
        onChange={onChangeForm}
      />
      <TextField
        label="내용"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        name="content"
        value={form.content}
        onChange={onChangeForm}
      />
      <TextField
        label="작성자"
        variant="outlined"
        fullWidth
        name="author"
        value={form.author}
        onChange={onChangeForm}
      />
      <StyledButton variant="contained" color="primary" type="submit">
        등록하기
      </StyledButton>
    </FormContainer>
  )
}

export default BoardForm
