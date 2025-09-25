import { Container } from "@mui/material"
import { Routes, Route } from "react-router"
import styled from "@emotion/styled"
import HeaderWrapper from "./components/HeaderWrapper"
import JoinPage from "./pages/JoinPage"
import LoginPage from "./pages/LoginPage"
import MapPage from "./pages/MapPage"
import UploadPage from "./pages/UploadPage"
import BookPage from "./pages/BookPage"

const RoutesWrapper = styled.div`
  padding-top: 2em;
`
export default function Containers() {
  return (
    <Container sx={{ paddingTop: "50px" }}>
      <HeaderWrapper />
      <RoutesWrapper>
        <Routes>
          <Route path="/join" element={<JoinPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Map" element={<MapPage />} />
          <Route path="/FileUpload" element={<UploadPage />} />
          <Route path="/Book" element={<BookPage />} />
        </Routes>
      </RoutesWrapper>
    </Container>
  )
}
