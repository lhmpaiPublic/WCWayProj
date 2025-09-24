const path = require("path")
const multer = require("multer")
const fs = require("fs-extra")
const { uploadPath, createFileNm }  = require("../common/util")

const extWhiteList = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".zip",
  ".pptx",
  ".txt",
  ".xlsx",
  ".docx",
  ".ppt",
  ".xls",
  ".doc",
  ".hwp",
  ".pdf",
]


// 🔹 파일 저장 경로 설정
const destination = async (
  req,
  file,
  cb
)=> {
  try {
    const upPath = uploadPath(__dirname, "../storages", req.baseUrl)
    req.uploadPath = upPath
    await fs.ensureDir(upPath)
    cb(null, upPath)
  } catch (err) {
    const e = err
    const errData = {
      name: e.name,
      message: e.message,
      status: 200,
      cod: 211,
      data: "destination Error",
    }
    cb(errData, "")
  }
}

// 🔹 파일명 생성
const filename = (
  req,
  file,
  cb
) => {
  try {
    const fileNm = createFileNm(req.uploadPath || "", file.originalname)
    cb(null, fileNm)
  } catch (err) {
    const e = err
    const errData = {
      name: e.name,
      message: e.message,
      status: 200,
      cod: 212,
      data: "filename Error",
    }
    cb(errData, "")
  }
}

// 🔹 파일 확장자 필터링
const fileFilter = (
  req,
  file,
  cb
) => {
  const ext = path.extname(file.originalname).toLowerCase()
  const isAllow = extWhiteList.includes(ext)
  cb(null, isAllow)
}

// 🔹 multer 설정
const storage = multer.diskStorage({ destination, filename })
const limits = { fileSize: 100 * 1024 * 1024 } // 100MB

module.exports = multer({ storage, limits, fileFilter })
