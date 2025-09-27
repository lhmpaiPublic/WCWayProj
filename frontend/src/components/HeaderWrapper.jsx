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

  useEffect(() => {
    // console.log("로그인상태: ", isLogOn)
  }, [])

  return (
    <HeaderRoot>
      <Typography variant="h5">공중 화장실 위치 정보 서비스</Typography>
      <Breadcrumbs>
        <Typography variant="h6" component={Link} to="/">
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
      <Box>
        <Button
          variant="outlined"
          sx={{ mr: 2 }}
          onClick={() => navigate("/join")}
        >
          회원가입
        </Button>
        <Button
          variant="outlined"
          sx={{ mr: 2 }}
          onClick={() => navigate("/login")}
        >
          로그인
        </Button>
        <Button variant="outlined" sx={{ mr: 2 }}>
          로그아웃
        </Button>
        <FormControlLabel
          control={<Switch onChange={() => navigate("/login")} name="theme" />}
          label="Theme"
        />
      </Box>
    </HeaderRoot>
  )
}
