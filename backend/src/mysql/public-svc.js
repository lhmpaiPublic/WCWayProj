const { pool } = require("./mysql-conn")
const bcrypt = require("bcrypt")
const { isVerifyRefresh, updateToken, getSignData } = require("../common/token")
// const jwt = require("jsonwebtoken")
// const sqlstring = require("sqlstring")
// const Redis = require("ioredis")

// TODO :: refreshToken 갱신
const refreshToken = () => {
  return async (req, res, next) => {
    const { refreshToken } = req.body
    try {
      {
        // 갱신
        if (await isVerifyRefresh(refreshToken)) {
          const tokenData = getSignData(refreshToken)
          req.params.rs = updateToken(tokenData)
          return next()
        }
        const errData = {
          name: "TOKEN_VERIFY_FAIL",
          message: "Token 갱신 실패",
          status: 200,
          cod: 112,
          data: "토큰갱신 실패",
        }
        return next(errData)
      }
    } catch (err) {
      const errData = {
        name: "REFRESH_TOKEN_FAILE",
        message: "Refresh Token 요청을 찾을 수 없습니다",
        status: 200,
        cod: 112,
        data: err,
      }
      return next(errData)
    }
    next()
  }
}

const createUser = () => {
  return async (req, res, next) => {
    try {
      const { usrId, usrPw, usrNm, usrEmail, usrAddr } = req.body
      const sql = `SELECT COUNT(id) AS count FROM user WHERE usr_id=? OR usr_email=?`
      const [rs] = await pool.execute(sql, [usrId, usrEmail])
      if (rs[0].count > 0) {
        // 기존회원존재
        const errData = {
          name: "EXIST_USER",
          message: "기존유저가 있습니다.",
          status: 200,
          cod: 112,
          data: "USER exist",
        }
        return next(errData)
      }
      // 회원가입
      const usrPwHash = await bcrypt.hash(usrPw, Number(process.env.SALT_RND))
      const sqlIsert = `
      INSERT INTO user 
        (usr_id, usr_pw, usr_nm, usr_email, usr_addr) 
      VALUES 
        (?, ?, ?, ?, ?)`
      const [rsInsert] = await pool.execute(sqlIsert, [
        usrId,
        usrPwHash,
        usrNm,
        usrEmail,
        usrAddr,
      ])
      req.params.rs = rsInsert
      return next()
    } catch (err) {
      const errData = {
        name: "CREATEUSER_FAILE",
        message: "Creagte user 요청을 찾을 수 없습니다",
        status: 200,
        cod: 112,
        data: err,
      }
      return next(errData)
    }
  }
}

const loginUser = () => {
  return async (req, res, next) => {
    try {
      const { usrEmail, usrPw } = req.body
      const sql = `SELECT * FROM user WHERE usr_email=?`
      const [rs] = await pool.execute(sql, [usrEmail])
      if (rs[0]) {
        const compare = await bcrypt.compare(usrPw, rs[0].usr_pw)
        if (compare) {
          // 로그인 성공
          // TODO :: bcrypt compare(o) -> Token생성(o) -> Redis(RT저장) -> user+TK리턴
          const signData = {
            id: rs[0].id,
            usrId: rs[0].usr_id,
            usrNm: rs[0].usr_nm,
            usrEmail: rs[0].usr_email,
            usrLv: rs[0].usr_lv,
          }
          const userData = {
            ...signData,
            usrDt: rs[0].created_dt,
          }
          const { accessToken, refreshToken } = updateToken(signData)
          req.params.rs = { user: userData, accessToken, refreshToken }
          return next()
        }
      }
      const errData = {
        name: "LOGIN_FAIL",
        message: "Login 실패",
        status: 200,
        cod: 112,
      }
      return next(errData)
    } catch (err) {
      const errData = {
        name: "LOGIN_FAILE",
        message: "Login 요청을 찾을 수 없습니다",
        status: 200,
        cod: 112,
        data: err,
      }
      return next(errData)
    }
  }
}

module.exports = { createUser, loginUser, refreshToken }
