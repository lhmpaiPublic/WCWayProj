const { pool } = require("./mysql-conn")

const registBoard = () => {
  return async (req, res, next) => {
    try {
      const { title, content, author, tags } = req.query
      const sqlIsert = `
      INSERT INTO boardlist 
        (title, content, author, tags) 
      VALUES 
        (?, ?, ?, ?)`
      const [rsInsert] = await pool.execute(sqlIsert, [
        title,
        content,
        author,
        tags,
      ])
      req.params.rs = rsInsert
      return next()
    } catch (err) {
      const errData = {
        name: "REGISTBOARD_FAILE",
        message: "Board 등록 요청을 찾을 수 없습니다",
        status: 200,
        cod: 112,
        data: err,
      }
      return next(errData)
    }
  }
}

const reqBoardList = ({ field = "id", sort = "DESC" } = {}) => {
  return async (req, res, next) => {
    try {
      // 1. 클라이언트가 보낸 검색어와 페이지 정보 가져오기
      const pageCnt = 100
      const page = parseInt(req.query.page || "1", 10)

      // 2. SQL 쿼리 작성
      let params = [] // SQL에 바인딩할 파라미터 배열
      let sql = "SELECT * FROM boardlist" // 기본 쿼리

      sql += ` ORDER BY ${field} ${sort}`
      sql += ` LIMIT ${(page - 1) * pageCnt}, ${pageCnt}`

      // 4. SQL 실행 (파라미터가 있을 수도, 없을 수도 있음)
      const [rs] = await pool.execute(sql, params)

      // 5. 조회된 결과를 req 객체에 담아 다음 미들웨어(라우터)로 전달
      req.params.rs = rs || []
      next()
    } catch (err) {
      const errData = {
        name: "REQ_BOARDLIST_FAILE",
        message: "Board 리스트 요청을 찾을 수 없습니다",
        status: 200,
        cod: 122,
        data: err,
      }
      return next(errData)
    }
  }
}

module.exports = { registBoard, reqBoardList }
