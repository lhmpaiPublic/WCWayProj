import React, { useActionState, useEffect, useState, useContext } from "react"
import Button from "@mui/material/Button"
import styled from "@emotion/styled"
import { apiPost } from "../common/axiosapi"
import { AlertContext } from "../Providers/AlertProvider"

const FormWrap = styled.form`
  padding: 0.5em;
  border: 1px solid #eee;
  margin-bottom: 1em;
`
const FormList = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 0.5em 0;
`
const FormListTitle = styled.div`
  font-weight: bold;
  color: #333;
  flex-grow: 1;
  width: 150px;
`
const Input = styled.input`
  padding: 0.75em !important;
  border: 1px solid #aaa !important;
  flex-grow: 3;
`
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
`
const initialFormState = {
  usrNm: "",
  usrId: "",
  usrPw: "",
  usrPwRe: "",
  usrEmail: "",
}
// Initial form state
const initialActionState = false

export default function JoinForm() {
  const [form, setForm] = useState(initialFormState)
  const { setIsAlertOpen, setAlertMsg } = useContext(AlertContext)
  const onChangeForm = (e) => {
    const {
      currentTarget: { name, value },
    } = e
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const createUser = () => {
    return new Promise(async (resolve) => {
      //const { usrNm, usrId, usrPw, usrPwRe, usrEmail } = data;
      console.log("User form:", form)
      console.log("User formAction:", formState)
      // Password validation
      if (form.usrPw !== "" && form.usrPw !== form.usrPwRe) {
        resolve(false) // Clear passwords on mismatch
      }

      try {
        // Replace with your actual axios call
        // await axios.post('/api/users', { usrNm, usrId, usrPw, usrEmail });

        debugger
        const result = await apiPost("/join", form)
        console.log("User created:", result)

        // Reset form on success
        resolve(!formState)
      } catch (error) {
        debugger
        console.error("User creation failed:", error)
        // Optionally return previous form state to preserve user input
        resolve(!formState)
      }
    })
  }

  const [formState, formAction] = useActionState(createUser, initialActionState)

  useEffect(() => {
    console.log("User useEffect:", formState)
    setIsAlertOpen(true)
    setAlertMsg("JOIN 완료")
  }, [formState])

  return (
    <div className="form-wrapper">
      <FormWrap action={formAction}>
        <FormList>
          <FormListTitle>이름</FormListTitle>
          <Input
            type="text"
            name="usrNm"
            value={form.usrNm}
            onChange={onChangeForm}
          />
        </FormList>
        <FormList>
          <FormListTitle>아이디</FormListTitle>
          <Input
            type="text"
            name="usrId"
            value={form.usrId}
            onChange={onChangeForm}
          />
        </FormList>
        <FormList>
          <FormListTitle>비밀번호</FormListTitle>
          <Input
            type="password"
            name="usrPw"
            value={form.usrPw}
            onChange={onChangeForm}
          />
        </FormList>
        <FormList>
          <FormListTitle>비밀번호재입력</FormListTitle>
          <Input
            type="password"
            name="usrPwRe"
            value={form.usrPwRe}
            onChange={onChangeForm}
          />
        </FormList>
        <FormList>
          <FormListTitle>이메일</FormListTitle>
          <Input
            type="text"
            name="usrEmail"
            value={form.usrEmail}
            onChange={onChangeForm}
          />
        </FormList>
        <ButtonWrap>
          <Button variant="contained" type="submit">
            회원가입
          </Button>
        </ButtonWrap>
      </FormWrap>
    </div>
  )
}
