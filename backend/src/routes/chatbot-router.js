const express = require("express")
const router = express.Router()

const InputReqMsg = ["시 또는 도", "시 또는 군", "동"]

router.get("/", (req, res, next) => {
  const { stat, input, text } = req.query

  res.status(200).json({
    success: "OK",
    resMsg: {
      stat: stat,
      input: input,
      text: text,
    },
  })
})

module.exports = router
