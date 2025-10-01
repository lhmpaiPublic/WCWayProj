import { useState } from "react";
import { apiPost } from "../common/axiosapi";
import { useDispatch } from "react-redux";
import { localLogOn } from "../stores/auth-slice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    usrEmail: "",
    usrPw: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.usrEmail || !form.usrPw) {
      setMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    try {
      setLoading(true);
      const result = await apiPost("/public/login", form);
      if (result.success === "OK")
        dispatch(localLogOn(result?.data?.user || {}));
      console.log("User created:", result);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div
        className="bd-wrap"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "24px 0 48px",
        }}
      >
        <form className="su-card" style={{ width: 420 }} onSubmit={onSubmit}>
          <h2>로그인</h2>
          <p className="su-desc">계정에 로그인하여 서비스를 이용하세요.</p>
          <label className="su-label">이메일</label>
          <input
            name="usrEmail"
            value={form.usrEmail}
            onChange={onChange}
            placeholder="이메일"
          />
          <label className="su-label">비밀번호</label>
          <input
            name="usrPw"
            type="password"
            value={form.usrPw}
            onChange={onChange}
            placeholder="비밀번호"
          />
          <div style={{ textAlign: "right", fontSize: 12, color: "#666" }}>
            비밀번호를 잊으셨나요?
          </div>
          {message && <div className="su-msg">{message}</div>}
          <button className="bd-btn primary" disabled={loading}>
            {loading ? "처리 중..." : "로그인"}
          </button>
          <div style={{ textAlign: "center", color: "#777", margin: "6px 0" }}>
            또는
          </div>
          <a
            href="#/signup"
            className="bd-btn"
            style={{ textAlign: "center", textDecoration: "none" }}
          >
            회원가입
          </a>
        </form>
      </div>
    </div>
  );
}
