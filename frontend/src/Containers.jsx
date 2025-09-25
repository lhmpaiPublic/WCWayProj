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

const FooterWrapper = styled.div`
  padding-top: 1em;
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
      <FooterWrapper>
      <footer className="footer">
         <div>
           <h2>가장 가까운 공중 화장실 정보를 쉽고 빠르게 찾아주는 서비스.</h2>
         </div>
      </footer>
      </FooterWrapper>
    </Container>
  )
}
