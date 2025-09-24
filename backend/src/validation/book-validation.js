const { body, validationResult } = require("express-validator")
const fs = require("fs-extra")

const bookCreateValidation = () => {
  return [
    body("title").notEmpty().escape(),
    body("writer").optional({ checkFalsy: true }).escape(),
    body("content").optional({ checkFalsy: true }).escape(),
    body("publish_d").optional({ checkFalsy: true }).isDate(),
    async (req, res, next) => {
      const err = validationResult(req)
      if (err.isEmpty()) next()
      else {
        if (req.file) await fs.remove(req.file.path)
        const errData = {
          name: "BOOK_ACCDB_FILE",
          message: "BOOK 요청을 찾을 수 없습니다",
          status: 200,
          cod: 112,
          data: err.array(),
        }
        return next(errData)
      }
    },
  ]
}

module.exports = { bookCreateValidation }
