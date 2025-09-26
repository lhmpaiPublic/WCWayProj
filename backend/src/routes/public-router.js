const express = require("express")
const router = express.Router()
const {
  joinCreateValidation,
} = require("../validation/join-validation")
const {
  createUser,
  loginUser,
  refreshToken,
} = require("../mysql/public-svc")

// TODO :: 추후 구현
router.get("/", (req, res, next) => {
  res.status(200).json({ success: "OK" })
})

/**
 * TODO :: bcrypt(암호화)
 * 1. 받은데이터 검증
 * 2. 기존에 회원인지 확인 -> SQL (useId, useEmail)
 * 3. 비밀번호를 암호화 (bcrypt)
 * 4. 회원 저장
 * 5. success: "OK"
 */
router.post("/join", joinCreateValidation(), createUser(), (req, res, next) => {
  res.status(200).json({ success: "OK" })
})

/**
 * TODO :: jsonwebtoken(토큰생성), redis(refreshToken저장)
 * 1. 받은데이터 검증
 * 2. 회원인지 확인 -> SQL (useId, usePw)
 * 3. 회원이면 accessToken, refreshToken(redis저장) 발행
 * 4. { success: "OK", data: { accessToken, refreshToken } }
 * --
 * TODO :: authMiddleware 생성
 * 1. accessToken
 *   1-1. accessToken.verify true :: next()
 *   1-2. accessToken.verify false :: return 인증실패(401)
 * 2. 1-2일때
 *   2-1. refreshToken.verify && redis === refreshToken :: AT,RT갱신
 *   2-2. 프론트 다시 1-1
 */
router.post("/login", loginUser(), (req, res, next) => {
  res.status(200).json({ success: "OK", data: req.params.rs })
})

router.post("/refresh", refreshToken(), (req, res, next) => {
  res.status(200).json({ success: "OK", data: req.params.rs })
})

module.exports = router
