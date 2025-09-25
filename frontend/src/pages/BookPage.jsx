import { Box } from "@mui/material"
import BookList from "../Forms/BookList"
import BookForm from "../Forms/BookForm"
import useSWR from "swr"


export default function BookPage() {
  const { data, error, isLoading, mutate } = useSWR("/book")

  if (error)
    return (
      <Box sx={{ margin: 20, textAlign: "center" }}>
        페이지를 일시적으로 사용할 수 없습니다.
      </Box>
    )
  if (isLoading)
    return (
      <Box sx={{ margin: 20, textAlign: "center" }}>데이터를 로딩중입니다.</Box>
    )
  return (
    <Box>
      <BookForm mutate={mutate} />
      <BookList data={data} />
    </Box>
  )
}
