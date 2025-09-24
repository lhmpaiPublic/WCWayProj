const getSignData = require("../common/token")

const isApi = () => {
  return (req, res, next) => {
    try {
      if (!req.headers?.authorization) {
        const errData = {
          name: "TOKEN_VERIFY_FAIL",
          message: "요청을 찾을 수 없습니다",
          status: 200,
          cod: 111,
          data: "authh Error",
        }
        return next(errData)
      }
      const [, token] = (req.headers?.authorization || "").split("Bearer ")
      console.log("TOKEN", token)
      const verifyResult = getSignData(token)
      if (verifyResult) next()
      else {
        const errData = {
          name: "ACCESS_TOKEN_VERIFY_FAIL",
          message: "요청을 찾을 수 없습니다",
          status: 200,
          cod: 112,
          data: "authh Error",
        }
        return next(errData)
      }
    } catch (err) {
      const errData = {
        name: "ACCESS_TOKEN_VERIFY_FAIL",
        message: "요청을 찾을 수 없습니다",
        status: 200,
        cod: 113,
        data: err,
      }
      return next(errData)
    }
  }
}

const isAdmin = () => {
  return (req, res, next) => {
    try {
      const [, token] = (req.headers?.authorization || "").split("Bearer ")
      const verifyResult = getSignData(token)
      if (verifyResult?.usrLv > 5) next()
      else {
        const errData = {
          name: "IS_NOT_ADMIN",
          message: "요청을 찾을 수 없습니다",
          status: 200,
          cod: 112,
          data: "authh Error",
        }
        return next(errData)
      }
    } catch (err) {
      const errData = {
        name: "ACCESS_TOKEN_VERIFY_FAIL",
        message: "요청을 찾을 수 없습니다",
        status: 200,
        cod: 114,
        data: err,
      }
      return next(errData)
    }
  }
}
module.exports = { isApi, isAdmin }
