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

const reqBoardList = () => {
  return async (req, res, next) => {
    try {
      const pageCnt = 100
      const page = parseInt(req.query.page || "1", 10)
      const sql = `SELECT * FROM boardlist`
      sql += ` ORDER BY id DESC`
      sql += ` LIMIT ${(page - 1) * pageCnt}, ${pageCnt}`
      const [rs] = await pool.execute(sql)
      req.params.rs = rs || []
      return next()
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
