const express = require("express")
const router = express.Router()
const { boardDataValidation } = require("../validation/board-validation")
const {
  registBoard,
  reqBoardList,
  empathyBoard,
} = require("../mysql/board-svc")

router.get(
  "/regist",
  boardDataValidation(),
  registBoard(),
  (req, res, next) => {
    res.status(200).json({
      success: "OK",
    })
  }
)

router.get("/empathy", empathyBoard(), (req, res, next) => {
  res.status(200).json({
    success: "OK",
  })
})

router.get("/", reqBoardList(), (req, res, next) => {
  const list = req.params?.rs || []
  res.status(200).json({ success: "OK", data: { list } })
})

module.exports = router
