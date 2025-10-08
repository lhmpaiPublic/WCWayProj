import { useState } from "react"
import { apiPost } from "../common/axiosapi"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    usrNm: "",
    usrId: "",
    usrAddr: "",
    usrEmail: "",
    usrPw: "",
    usrPwRe: "",
    agree: false,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    if (!form.usrNm || !form.usrEmail || !form.usrPw || !form.usrPwRe) {
      setMessage("모든 필드를 입력해주세요.")
      return
    }
    if (form.usrPw !== form.usrPwRe) {
      setMessage("비밀번호가 일치하지 않습니다.")
      return
    }
    if (!form.agree) {
      setMessage("개인 정보 처리 방침에 동의해주세요.")
      return
    }
    try {
      setLoading(true)
      const res = await apiPost("/public/join", form)
      setForm({
        usrNm: "",
        usrId: "",
        usrAddr: "",
        usrEmail: "",
        usrPw: "",
        usrPwRe: "",
        agree: false,
      })
      navigate("/")
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-page">
      <div className="bd-wrap signup-grid">
        <form className="su-card" onSubmit={onSubmit}>
          <h2>회원 가입</h2>
          <p className="su-desc">계정을 생성하여 서비스를 이용하세요.</p>
          <label className="su-label">사용자 이름</label>
          <input
            name="usrNm"
            value={form.usrNm}
            onChange={onChange}
            placeholder="사용자 이름"
          />
          <label className="su-label">아이디</label>
          <input
            name="usrId"
            value={form.usrId}
            onChange={onChange}
            placeholder="사용자 이름"
          />
          <label className="su-label">주소</label>
          <input
            name="usrAddr"
            value={form.usrAddr}
            onChange={onChange}
            placeholder="ex) 서울특별시 강남구 테헤란로 1234"
          />
          <label className="su-label">이메일</label>
          <input
            name="usrEmail"
            value={form.usrEmail}
            onChange={onChange}
            placeholder="email@example.com"
          />
          <label className="su-label">비밀번호</label>
          <input
            name="usrPw"
            type="password"
            value={form.usrPw}
            onChange={onChange}
            placeholder="********"
          />
          <label className="su-label">비밀번호 확인</label>
          <input
            name="usrPwRe"
            type="password"
            value={form.usrPwRe}
            onChange={onChange}
            placeholder="********"
          />

          <label className="su-check">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={onChange}
            />
            개인정보 처리 방침에 동의합니다.
          </label>

          {message && <div className="su-msg">{message}</div>}
          <button className="bd-btn primary" disabled={loading}>
            {loading ? "처리 중..." : "회원 가입"}
          </button>
        </form>

        <aside className="su-aside">
          <div className="su-box">
            <h3>주변 공중 화장실의 정보를 알려드립니다.</h3>
            <ul>
              <li>
                <b>정확한 위치 정보</b>
                <br />
                가장 가까운 공중 화장실을 정확하게 찾아드립니다.
              </li>
              <li>
                <b>청결도 평가</b>
                <br />
                다른 사용자들의 평가를 통해 깨끗한 화장실을 선택하세요.
              </li>
              <li>
                <b>실시간 업데이트</b>
                <br />
                화장실 개방 시간 및 편의 시설 정보를 실시간으로 확인하세요.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
