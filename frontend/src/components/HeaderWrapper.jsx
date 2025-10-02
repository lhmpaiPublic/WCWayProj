import {
  Typography,
  Breadcrumbs,
  Box,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { localLogOut } from "../stores/auth-slice"

const HeaderRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
  margin-bottom: 1em;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`

export default function HeaderWrapper() {
  const navigate = useNavigate()

  const { isLocalLogOn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const onLogOut = (e) => {
    dispatch(localLogOut())
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("refreshToken")
  }

  useEffect(() => {
    // console.log("로그인상태: ", isLogOn)
  }, [])

  return (
    <HeaderRoot className="topbar">
      <Typography variant="h5" className="brand">
        공중 화장실 위치 정보 서비스
      </Typography>
      <Breadcrumbs className="nav">
        <Typography variant="h6" component={Link} to="/" className="active">
          HOME
        </Typography>
        <Typography variant="h6" component={Link} to="/features">
          기능설명
        </Typography>
        <Typography variant="h6" component={Link} to="/board">
          게시판
        </Typography>
        <Typography variant="h6" component={Link} to="/chatbot">
          챗봇
        </Typography>
      </Breadcrumbs>
      <Box className="auth">
        {!isLocalLogOn ? (
          <Button
            variant="outlined"
            className="link"
            onClick={() => navigate("/join")}
          >
            회원가입
          </Button>
        ) : null}
        {!isLocalLogOn ? (
          <Button
            variant="outlined"
            className="link"
            sx={{ mr: 2 }}
            onClick={() => navigate("/login")}
          >
            로그인
          </Button>
        ) : null}
        {isLocalLogOn ? (
          <Button
            variant="outlined"
            className="primary"
            sx={{ mr: 2 }}
            onClick={onLogOut}
          >
            로그아웃
          </Button>
        ) : null}
        {isLocalLogOn ? (
          <Button variant="outlined" sx={{ mr: 2 }}>
            글쓰기
          </Button>
        ) : null}
        <FormControlLabel
          control={<Switch onChange={() => navigate("/login")} name="theme" />}
          label="Theme"
        />
      </Box>
    </HeaderRoot>
  )
}
