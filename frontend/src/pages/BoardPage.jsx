import { useMemo, useState } from "react"
import { Box } from "@mui/material"
import BoardList from "../Forms/BoardList"
import BoardForm from "../Forms/BoardForm"
import { useSelector } from "react-redux"
import useSWR from "swr"

export default function BookPage() {
  const { isLocalLogOn } = useSelector((state) => state.auth)
  const [sort, setSort] = useState("latest")
  const [query, setQuery] = useState("")

  // 훅: 항상 호출
  const { data, error, isLoading, mutate } = useSWR("/board")

  // 훅: 항상 호출
  const filtered = useMemo(() => {
    if (!data || !data.list) return []

    const q = query.trim().toLowerCase()
    let list = [...data.list]

    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (sort === "latest") {
      list.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (sort === "popular") {
      list.sort((a, b) => b.likes - a.likes)
    }

    return list
  }, [data, sort, query])

  // 조건부 렌더링은 여기에서만!
  if (error) {
    return (
      <Box sx={{ margin: 20, textAlign: "center" }}>
        페이지를 일시적으로 사용할 수 없습니다.
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ margin: 20, textAlign: "center" }}>데이터를 로딩중입니다.</Box>
    )
  }

  return (
    <Box>
      <BoardList
        boardlist={filtered}
        sort={sort}
        query={query}
        setSort={setSort}
        setQuery={setQuery}
      />
      {isLocalLogOn && <BoardForm mutate={mutate} />}
    </Box>
  )
}
