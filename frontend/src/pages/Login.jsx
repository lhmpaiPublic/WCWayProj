import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email || !password) {
      setMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "로그인 실패");
      setMessage("로그인 성공! 환영합니다.");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
          <label className="su-label">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
