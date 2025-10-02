const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
  const { title, content, author } = req.query

  res.status(200).json({
    success: "OK",
    Msg: { title, content, author },
  })
})

module.exports = router
