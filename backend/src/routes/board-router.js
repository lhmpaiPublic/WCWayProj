const express = require("express")
const router = express.Router()
const { boardDataValidation } = require("../validation/board-validation")
const { registBoard, reqBoardList } = require("../mysql/board-svc")

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

router.get("/", reqBoardList(), (req, res, next) => {
  res.status(200).json({
    success: "OK",
  })
})

module.exports = router
