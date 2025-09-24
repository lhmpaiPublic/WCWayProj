// const err: CutmError = {
//   name: "login",
//   message: "요청을 찾을 수 없습니다",
//   status: 200,
//   cod: 200,
//   data: "login",
// }
// next(err)

module.exports = (
  err,
  req,
  res,
  next
) => {
  const status = err?.status || 500
  const code = err?.cod || status
  res.status(status).json({
    success: "FAIL",
    error: { cod: code, name: err.name, msg: err.message, data: err.data },
  })
}


/** API규칙
 * 성공 => { success: "OK", data: {} }
 * 실패 => { success: "FAIL", error: { cod, msg } }
 */
