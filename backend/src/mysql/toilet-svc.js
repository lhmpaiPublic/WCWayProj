const { pool } = require("./mysql-conn")

const toiletList = ({ field = "id", sort = "DESC" } = {}) => {
  return async (req, res, next) => {
    try {
      // 1. 클라이언트가 보낸 검색어와 페이지 정보 가져오기
      const pageCnt = 100
      const page = parseInt(req.query.page || "1", 10)
      const { si, gu } = req.query // 검색을 위한 '시', '구' 파라미터

      // 2. SQL 쿼리 작성
      let params = [] // SQL에 바인딩할 파라미터 배열
      let sql = "SELECT * FROM korea_toilet" // 기본 쿼리

      // 3. '시'와 '구' 검색어가 있으면 WHERE 조건 동적 추가
      if (si && gu) {
        // 예: si='서울특별시', gu='강남구' -> '서울특별시 강남구%'
        const searchAddress = `${si} ${gu}%`
        sql += " WHERE addr LIKE ?"
        params.push(searchAddress)
      }

      sql += ` ORDER BY ${field} ${sort}`
      sql += ` LIMIT ${(page - 1) * pageCnt}, ${pageCnt}`

      // 4. SQL 실행 (파라미터가 있을 수도, 없을 수도 있음)
      const [rs] = await pool.execute(sql, params)

      // 5. 조회된 결과를 req 객체에 담아 다음 미들웨어(라우터)로 전달
      req.params.rs = rs || []
      next()
    } catch (err) {
      const errData = {
        name: "TOILET_DB_ERROR",
        message: "화장실 목록 요청을 처리할 수 없습니다.",
        status: 500,
        cod: 211,
        data: err,
      }
      return next(errData)
    }
  }
}

// toiletCreate가 필요하다면 bookCreate를 참고하여 유사하게 만들 수 있습니다.

module.exports = { toiletList }
