const { body, validationResult } = require("express-validator")

const joinCreateValidation = () => {
  return [
    body("usrId").notEmpty().trim().isLength({ min: 6, max: 16 }),
    body("usrPw").notEmpty().trim().isLength({ min: 6, max: 16 }),
    body("usrNm").notEmpty().trim(),
    body("usrEmail").notEmpty().trim().isEmail(),
    body("usrAddr").notEmpty().trim(),
    (req, res, next) => {
      const err = validationResult(req)
      if (err.isEmpty()) next()
      else {
        const errData = {
          name: "JOIN_VALIDATION_FILE",
          message: "join val error",
          status: 200,
          cod: 112,
          data: err,
        }
        return next(errData)
      }
    },
  ]
}

module.exports = { joinCreateValidation }
