import {
  useState,
  useContext,
  useEffect,
  useActionState,
  //type FormEvent,
} from "react"
import styled from "@emotion/styled"
import { Button } from "@mui/material"
import { AlertContext } from "../Providers/AlertProvider"
import "react-day-picker/style.css"
import { apiFile } from "../common/axiosapi"

const FormWrap = styled.form`
  display: flex;
  padding: 0.5em;
  border: 1px solid #eee;
  margin-bottom: 1em;
`
const Input = styled.input`
  padding: 0.25em 0.5em;
  border: 1px solid #ccc;
  margin-right: 0.5em;
  flex-grow: ${(props) => props.grow};
`
// Initial form state
const initialActionState = false

export default function BookForm({ mutate }) {
  const [upfile, setUpfile] = useState(null)
  const { setIsAlertOpen, setAlertMsg } = useContext(AlertContext)
  const [form, setForm] = useState({
    title: "",
    content: "",
    writer: "",
    publish_d: "",
  })

  // const onSubmit = async (e: FormEvent) => {
  //   e.preventDefault()
  // }

  const bookFormAct = () => {
    return new Promise(async (resolve) => {
      try {
        if (form.title === "") {
          setIsAlertOpen(true)
          setAlertMsg("제목은 필수사항입니다.")
          return
        }
        if (form.content === "") {
          setIsAlertOpen(true)
          setAlertMsg("내용은 필수사항입니다.")
          return
        }
        const formData = new FormData()
        formData.append("title", form.title)
        formData.append("content", form.content)
        formData.append("writer", form.writer)
        formData.append("publish_d", form.publish_d)
        if (upfile?.[0]) {
          formData.append("upfile", upfile[0])
          console.log(upfile)
        }
        const rs = await apiFile("/book", formData)
        if (rs?.success === "OK") {
          if (rs?.success === "OK") mutate()
          resolve(!formState)
        }
      } catch (error) {
        console.error("User creation failed:", error)
        resolve(!formState)
      }
    })
  }

  const [formState, formAction] = useActionState(
    bookFormAct,
    initialActionState
  )

  useEffect(() => {
    console.log("User useEffect:", formState)
    setIsAlertOpen(true)
    setAlertMsg("JOIN 완료")
  }, [])

  return (
    <FormWrap action={formAction}>
      <Input
        placeholder="제목"
        grow={2}
        value={form.title}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <Input
        placeholder="설명"
        grow={4}
        value={form.content}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, content: e.target.value }))
        }
      />
      <Input
        placeholder="저자"
        grow={1}
        value={form.writer}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, writer: e.target.value }))
        }
      />
      <Input
        placeholder="발행일"
        value={form.publish_d}
        grow={1}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, publish_d: e.target.value }))
        }
      />
      <Input
        type="file"
        name="upfile"
        placeholder="첨부파일"
        grow={1}
        onChange={(e) => setUpfile(e.target.files)}
      />
      <Button variant="contained" type="submit">
        등록
      </Button>
    </FormWrap>
  )
}
