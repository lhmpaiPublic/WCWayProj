import { useState, useActionState, useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "@mui/material/Button"
import styled from "@emotion/styled"
import { apiPost } from "../common/axiosapi"
import { AlertContext } from "../Providers/AlertProvider"
import { localLogOn } from "../stores/auth-slice"

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`
const Title = styled.h2`
  font-size: 2em;
  padding: 0.5em 0;
  border-bottom: 1px solid #eee;
  text-align: center;
`
const FormWrap = styled.form`
  max-width: 500px;
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

// Initial form state
const initialActionState = false
const initialFormState = {
  usrId: "",
  usrPw: "",
}

export default function LoginForm() {
  const [form, setForm] = useState(initialFormState)
  const { setIsAlertOpen, setAlertMsg } = useContext(AlertContext)

  const dispatch = useDispatch()
  const { localUser, isLocalLogOn } = useSelector((state) => state.auth)

  const onChangeForm = (e) => {
    const {
      currentTarget: { name, value },
    } = e
    setForm((prev) => ({ ...prev, [name]: value }))
    console.log("User usrId:", name, value)
  }

  const loginUser = async () => {
    return new Promise(async (resolve) => {
      if (form.usrId === "" || form.usrPw === "") {
        resolve(false)
      }
      try {
        // Replace with your actual axios call
        // await axios.post('/api/users', { usrNm, usrId, usrPw, usrEmail });

        const result = await apiPost("/public/login", form)
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

  const [formState, formAction] = useActionState(loginUser, initialActionState)

  useEffect(() => {
    console.log("User useEffect:", formState)
    console.log("User state:", isLocalLogOn, localUser.id)
    dispatch(localLogOn({ id: "vawing21" }))
    console.log("User state:", isLocalLogOn, localUser.id)
    setIsAlertOpen(true)
    setAlertMsg("LOGIN 완료")
  }, [formState])

  return (
    <FormWrapper>
      <FormWrap action={formAction}>
        <Title>로그인</Title>
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
        <ButtonWrap>
          <Button variant="contained" type="submit">
            로그인
          </Button>
        </ButtonWrap>
      </FormWrap>
    </FormWrapper>
  )
}
