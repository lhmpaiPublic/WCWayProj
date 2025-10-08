import { useMemo } from "react"

export function ToiletList({
  sido,
  gu,
  keyword,
  toilets,
  onChangeSido,
  onChangeGu,
  onChangeKeyword,
  onSelect,
  guList,
}) {
  const countText = useMemo(() => `${toilets.length}곳`, [toilets.length])

  return (
    <div className="panel">
      <div className="section-title">행정구역</div>
      <div className="row">
        <select value={sido} onChange={(e) => onChangeSido(e.target.value)}>
          <option>서울특별시</option>
          <option>부산광역시</option>
          <option>대구광역시</option>
          <option>인천광역시</option>
          <option>광주광역시</option>
          <option>대전광역시</option>
          <option>울산광역시</option>
          <option>세종특별자치시</option>
          <option>경기도</option>
          <option>강원특별자치도</option>
          <option>충청북도</option>
          <option>충청남도</option>
          <option>전북특별자치도</option>
          <option>전라남도</option>
          <option>경상북도</option>
          <option>경상남도</option>
          <option>제주특별자치도</option>
        </select>
        <select value={gu} onChange={(e) => onChangeGu(e.target.value)}>
          {guList?.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="section-title space">
        주변 화장실 목록 <span className="muted">{countText}</span>
      </div>
      <div className="row">
        <input
          className="search"
          placeholder="장소명/주소 검색..."
          value={keyword}
          onChange={(e) => onChangeKeyword(e.target.value)}
        />
        <button className="icon">🔍</button>
      </div>

      <ul className="list">
        {toilets.map((t) => (
          <li key={t.id} className="list-item" onClick={() => onSelect(t)}>
            <div className="title">{t.name}</div>
            <div className="subtitle">{t.roadAddress || t.jibunAddress}</div>
            <div className="meta">
              <span>{t.distanceText ?? ""}</span>
              {t.rating && <span>★ {t.rating.toFixed(1)}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
