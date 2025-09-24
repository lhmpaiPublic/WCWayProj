const express = require("express")
const multer = require("./multer-mw")

const router = express.Router()


router.get("/", (req, res) => {
  const users = [
    { id: 1, name: "홍길동" },
    { id: 2, name: "홍길순" },
  ]
  res.json({ status: "OK", data: { users } })
})

router.post(
  "/",
  multer.single("upfile"),
  async (req, res, next) => {
    res.status(200).json({ success: "OK" })
  }
)

module.exports = router
