const express = require("express")
const multer = require("./multer-mw")

const router = express.Router()

router.post("/book", multer.single("file"), (req, res) => {
  res.send("파일 업로드 완료")
})

module.exports = router
