const express = require("express")
const router = express.Router()
const {
  bookCreateValidation,
} = require("../validation/book-validation")
const {
  bookList,
  bookCreate,
} = require(`../mysql/book-svc`)
const multer = require("./multer-mw")


// /book, /book/1, /book?page=1
router.get("/{:id}", bookList(), async (req
  , res, next) => {
  const list = req.params?.rs?.[0] || []
  console.log(list)
  res.status(200).json({ success: "OK", data: { list } })
})

router.post(
  "/",
  multer.single("upfile"),
  bookCreateValidation(),
  bookCreate(),
  async (req, res, next) => {
    res.status(200).json({ success: "OK" })
  }
)

// router.post("/upload", multer.single("upfile"), function (req, res, next) {
//   res.status(200).json({ file: req.file })
// })

module.exports = router
