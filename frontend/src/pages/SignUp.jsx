import { useState } from "react";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setMessage("모든 필드를 입력해주세요.");
      return;
    }
    if (form.password !== form.confirm) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!form.agree) {
      setMessage("개인 정보 처리 방침에 동의해주세요.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          address: form.address,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "회원가입 실패");
      setMessage("가입이 완료되었습니다. 로그인해주세요.");
      setForm({
        name: "",
        address: "",
        email: "",
        password: "",
        confirm: "",
        agree: false,
      });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="bd-wrap signup-grid">
        <form className="su-card" onSubmit={onSubmit}>
          <h2>회원 가입</h2>
          <p className="su-desc">계정을 생성하여 서비스를 이용하세요.</p>
          <label className="su-label">사용자 이름</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="사용자 이름"
          />
          <label className="su-label">주소</label>
          <input
            name="address"
            value={form.address}
            onChange={onChange}
            placeholder="ex) 서울특별시 강남구 테헤란로 1234"
          />
          <label className="su-label">이메일</label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="email@example.com"
          />
          <label className="su-label">비밀번호</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="********"
          />
          <label className="su-label">비밀번호 확인</label>
          <input
            name="confirm"
            type="password"
            value={form.confirm}
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
  );
}
