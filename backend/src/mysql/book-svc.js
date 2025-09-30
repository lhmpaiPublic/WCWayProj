const { pool } = require("./mysql-conn")
const { createVirtualPath } = require("../common/util")

const bookList = ({ field = "id", sort = "DESC" } = {}) => {
  return async (req, res, next) => {
    try {
      const pageCnt = 10
      const page = parseInt(req.query.page || "1", 10)
      const { id } = req.params
      let sql = ` SELECT p.*, b.*, p.id AS pid FROM book AS b `
      sql += ` LEFT JOIN pds AS p ON b.id = p.book_id `
      if (id) sql += ` WHERE b.id = ? `
      sql += ` ORDER BY b.${field} ${sort} `
      sql += ` LIMIT ${(page - 1) * pageCnt}, ${pageCnt} `
      const rs = await pool.execute(sql, id ? [id] : [])
      for (const book of rs) {
        if ((book.file_typ || "").includes("image")) {
          book.imgSrc = createVirtualPath(book.file_nm)
        }
      }
      req.params.rs = rs || []
      next()
    } catch (err) {
      const errData = {
        name: "BOOK_ACCDB_FILE",
        message: "BOOK 요청을 찾을 수 없습니다",
        status: 200,
        cod: 112,
        data: err,
      }
      return next(errData)
    }
  }
}

const bookCreate = () => {
  return async (req, res, next) => {
    try {
      const file = req.file
      const { title, content, writer, publish_d } = req.body
      const sql = ` 
        INSERT INTO booK (title, content, writer, publish_d)
        VALUES (?, ?, ?, ?)`
      const [rs] = await pool.execute(sql, [
        title,
        content,
        writer || null,
        publish_d || null,
      ])
      if (file) {
        const sql2 = `
          INSERT INTO pds (origin_nm, file_nm, file_typ, book_id)
          VALUES (?, ?, ?, ?)`
        await pool.execute(sql2, [
          file.originalname,
          file.filename,
          file.mimetype,
          rs.insertId,
        ])
      }
      next()
    } catch (err) {
      const errData = {
        name: "BOOK_ACCDB_FILE",
        message: "BOOK 요청을 찾을 수 없습니다",
        status: 200,
        cod: 112,
        data: err,
      }
      return next(errData)
    }
  }
}

module.exports = { bookList, bookCreate }
