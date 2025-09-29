const express = require("express")
const router = express.Router()
const { toiletList } = require(`../mysql/toilet-svc`)
// GET /toilet?si=서울특별시&gu=강남구
// GET /toilet?page=2
// GET /toilet
router.get("/", toiletList(), async (req, res, next) => {
  try {
    // toiletList 미들웨어에서 처리한 결과(req.params.rs)를 클라이언트에 JSON으로 응답
    const list = req.params.rs
    res.status(200).json({ success: true, data: { list } })
  } catch (err) {
    next(err) // 에러가 발생하면 에러 처리 미들웨어로 전달
  }
})

module.exports = router
