const path = require("path")
const moment = require("moment")
const { nanoid } = require("nanoid")

/**
 * 환경이 production 인지 확인
 */
const isProd = () => process.env.NODE_ENV === "production"

/**
 * 업로드 경로 생성
 * @param rootUrl - 루트 경로 (예: "/var/www")
 * @param storageUrl - 저장소 경로 (예: "data")
 * @param baseUrl - 기본 업로드 경로 (예: "images")
 * @returns 실제 파일이 저장될 경로
 */
const uploadPath = (
  rootUrl,
  storageUrl,
  baseUrl
) => {
  const dPath = moment().format("YYYYMMDD/HH")
  return path.join(rootUrl, storageUrl, baseUrl, dPath)
}

/**
 * 파일명 생성
 * @param uploadUrl - 업로드 경로 (예: "/var/www/data/images/20250920/13")
 * @param originalNm - 원본 파일명 (예: "photo.png")
 * @returns 고유한 저장용 파일명
 */
const createFileNm = (uploadUrl, originalNm) => {
  const ext = path.extname(originalNm)
  const arr = path.normalize(uploadUrl).split(path.sep)

  return `${arr[0]}_${arr[1]}_${arr[2]}_${Date.now()}_${nanoid()}${ext}`
}

/**
 * 가상 경로 생성 (/upload/20250920/13/images/파일명)
 * @param fileNm - 저장된 파일명
 * @returns 웹에서 접근 가능한 가상 경로
 */
const createVirtualPath = (fileNm) => {
  const arr = fileNm.split("_")
  return `/upload/${arr[0]}/${arr[1]}/${arr[2]}/${fileNm}`
}

module.exports = { isProd, uploadPath, createFileNm, createVirtualPath }
