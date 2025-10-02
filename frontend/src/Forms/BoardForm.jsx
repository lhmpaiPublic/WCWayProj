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

// 스타일 컴포넌트
const FormContainer = styled(Paper)`
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

const BoardForm = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ title, content, author })
    // 여기서 API 호출 등 처리 가능
    alert("글이 등록되었습니다.")
    // 폼 초기화
    setTitle("")
    setContent("")
    setAuthor("")
  }

  return (
    <FormContainer elevation={3}>
      <Typography variant="h5">게시판 글쓰기</Typography>
      <TextField
        label="제목"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="내용"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <TextField
        label="작성자"
        variant="outlined"
        fullWidth
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <StyledButton variant="contained" color="primary" onClick={handleSubmit}>
        등록하기
      </StyledButton>
    </FormContainer>
  )
}

export default BoardForm
