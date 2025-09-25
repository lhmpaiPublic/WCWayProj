import { Button } from "@mui/material"
import { useEffect } from "react"
import styled from "@emotion/styled"

// 스타일 정의
const ErrorContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ErrorWrapper = styled.div`
  padding: 1.5em;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  color: #f1f1f1;
`

const ErrorTitle = styled.h2`
  padding: 0.5em;
  font-size: 1.25em;
`

const ErrorContent = styled.p`
  padding: 0.5em;
  color: yellow;
`

// Fallback 컴포넌트
export default function ErrorFallback({
  error,
  resetErrorBoundary,
}) {
  const onReset = () => {
    resetErrorBoundary() // 필요시 사용
    //window.location.href = "/"
  }

  useEffect(() => {
    console.error("ErrorFallback:", error)
  }, [error])

  const extendedError = error

  return (
    <ErrorContainer>
      <ErrorWrapper>
        <ErrorTitle>오류가 발생했습니다.</ErrorTitle>
        {extendedError.detail?.msg && (
          <ErrorContent>{extendedError.detail.msg}</ErrorContent>
        )}
        <Button
          onClick={onReset}
          variant="outlined"
          color="warning"
          style={{ marginTop: "1em" }}
        >
          메인으로 돌아가기
        </Button>
      </ErrorWrapper>
    </ErrorContainer>
  )
}
