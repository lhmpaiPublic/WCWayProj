export default function Features() {
  return (
    <div className="features-page">
      <header className="topbar">
        <div className="brand">공중 화장실 위치 정보 서비스</div>
        <nav className="nav">
          <a href="#/">HOME</a>
          <a href="#/features" className="active">
            기능설명
          </a>
          <a href="#/board">게시판</a>
        </nav>
        <div className="auth">
          <a href="#/login" className="link">
            로그인
          </a>
          <a href="#/signup" className="primary">
            회원가입
          </a>
        </div>
      </header>

      <section className="fx-hero">
        <div className="fx-wrap fx-hero-inner">
          <div className="fx-hero-text">
            <h1>언제 어디서든 깨끗한 화장실을 찾으세요.</h1>
            <p>
              가장 가까운 공중 화장실 정보를 쉽게 빠르게 찾아주는 서비스. 사용자
              리뷰와 상세 정보를로 안심하고 이용하세요.
            </p>
            <a href="#/" className="fx-btn primary large">
              지금 시작하기
            </a>
          </div>
          {/* <div className="fx-hero-visual" aria-hidden="true" /> */}
          <img
            className="fx-hero-visual"
            aria-hidden="true"
            src="../public/image/toilet.png"
            alt="이용 가이드 이미지 영역"
          />
        </div>
      </section>

      <section className="fx-section">
        <div className="fx-wrap">
          <h2 className="fx-section-title">주요 서비스 기능</h2>
          <div className="fx-cards">
            <div className="fx-card">
              <div className="fx-card-icon">📍</div>
              <div className="fx-card-title">실시간 위치 기반 검색</div>
              <p className="fx-card-desc">
                현재 위치를 기반으로 가장 가까운 공중 화장실을 실시간
                찾아드립니다.
              </p>
              <a className="fx-more">자세히 알아보기</a>
            </div>
            <div className="fx-card">
              <div className="fx-card-icon">⭐</div>
              <div className="fx-card-title">사용자 리뷰 및 평점</div>
              <p className="fx-card-desc">
                다른 사용자들의 솔직한 평가와 평점을 통해 화장실의 청결도를
                확인하세요.
              </p>
              <a className="fx-more">자세히 알아보기</a>
            </div>
            <div className="fx-card">
              <div className="fx-card-icon">🗺️</div>
              <div className="fx-card-title">최적 경로 안내</div>
              <p className="fx-card-desc">
                선택한 화장실까지 가장 빠르고 편리한 경로를 제공합니다.
              </p>
              <a className="fx-more">자세히 알아보기</a>
            </div>
          </div>
        </div>
      </section>

      <section className="fx-section">
        <div className="fx-wrap">
          <div className="fx-cards single">
            <div className="fx-card">
              <div className="fx-card-icon">ℹ️</div>
              <div className="fx-card-title">안전 및 편의 정보</div>
              <p className="fx-card-desc">
                개방 시간, 편의 시설, 비상벨 유무 등 상세 정보를 확인하세요.
              </p>
              <a className="fx-more">자세히 알아보기</a>
            </div>
          </div>
        </div>
      </section>

      <section className="fx-cta">
        <div className="fx-wrap fx-cta-inner">
          <h3>지금 바로 깨끗한 화장실을 찾아보세요!</h3>
          <p>
            쉬고가세요와 함께라면 어디서든 안심하고 화장실을 이용할 수 있습니다.
          </p>
          <a href="#/" className="fx-btn white">
            확인하기
          </a>
        </div>
      </section>

      <footer className="fx-footer">
        <div className="fx-wrap">
          <div className="fx-footmark">
            가장 가까운 공중 화장실 정보를 쉽고 빠르게 찾아주는 서비스.
          </div>
          <div className="fx-copy">© 2024 쉽고가세요. 모든 권리 보유.</div>
        </div>
      </footer>
    </div>
  )
}
