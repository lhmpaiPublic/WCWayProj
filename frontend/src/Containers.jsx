import { Container } from "@mui/material"
import { Routes, Route } from "react-router"
import styled from "@emotion/styled"
import HeaderWrapper from "./components/HeaderWrapper"
import JoinPage from "./pages/SignUp"
import LoginPage from "./pages/Login"
import HOME from "./pages/Home"
import Board from "./pages/Board"
import Features from "./pages/Features"

const RoutesWrapper = styled.div`
  padding-top: 2em;
`
export default function Containers() {
  return (
    <Container sx={{ paddingTop: "50px" }}>
      <HeaderWrapper />
      <RoutesWrapper>
        <Routes>
          <Route path="/" element={<HOME />} />
          <Route path="/features" element={<Features />} />
          <Route path="/board" element={<Board />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </RoutesWrapper>
    </Container>
  )
}
