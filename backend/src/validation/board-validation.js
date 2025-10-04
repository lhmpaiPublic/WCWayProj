const { body, validationResult } = require("express-validator")

const boardDataValidation = () => {
  return [
    (req, res, next) => {
      const { title, content, author, tags } = req.query
      const err = validationResult(req)
      if (err.isEmpty()) next()
      else {
        const errData = {
          name: "BOARD_VALIDATION_FILE",
          message: "board val error",
          status: 200,
          cod: 118,
          data: err,
        }
        return next(errData)
      }
    },
  ]
}

module.exports = { boardDataValidation }
