const { body, validationResult } = require("express-validator")

const boardDataValidation = () => {
  return [
    body("title").notEmpty().trim(),
    body("content").notEmpty().trim(),
    body("author").notEmpty().trim(),
    body("tags").notEmpty().trim(),
    (req, res, next) => {
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
