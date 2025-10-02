require("./common/dotenv")()
const express = require("express")
const app = express()
const cors = require("cors")

app.listen(3000, () => console.log("http://127.0.0.1:3000"))

app.use(express.json())
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }))

const errorRouter = require("./routes/error-mw")
const notFoundRouter = require("./routes/not-found-mw")
const bookRouter = require("./routes/book-router")
const publicRouter = require("./routes/public-router")
const fileUploadRouter = require("./routes/fileUploadrRouter")
const chatbotRouter = require("./routes/chatbot-router")
const toiletRouter = require("./routes/toilet-router")
const boradRouter = require("./routes/board-router")

app.use("/upload", fileUploadRouter)
app.use("/book", bookRouter)
app.use("/public", publicRouter)
app.use("/chatbot", chatbotRouter)
app.use("/home", toiletRouter)
app.use("/board", boradRouter)

app.get("/login", (req, res, next) => {
  const { usrId, usrPw } = req.query
  const msg = "Login 성공"
  res.status(200).json({
    success: "SUCCESS",
    data: { msg: msg, reqdt: [usrId, usrPw] },
  })
})

app.get("/join", (req, res) => {
  const { usrNm, usrId, usrPw, usrEmail } = req.body

  const msg = "회원가입 성공"
  res.status(200).json({
    success: "SUCCESS",
    data: { msg: msg, reqdt: [usrNm, usrId, usrPw, usrEmail] },
  })
})

app.post("/login", (req, res) => {
  const { usrId, usrPw } = req.body
  const msg = "Login 성공"
  res.status(200).json({
    success: "SUCCESS",
    data: { msg: msg, reqdt: [usrId, usrPw] },
  })
})

app.post("/join", (req, res) => {
  const { usrNm, usrId, usrPw, usrEmail } = req.body

  const msg = "회원가입 성공"
  res.status(200).json({
    success: "SUCCESS",
    data: { msg: msg, reqdt: [usrNm, usrId, usrPw, usrEmail] },
  })
})

app.use(notFoundRouter)
app.use(errorRouter)
