import { useMemo } from "react";

const SEOUL_GU = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

export function ToiletList({
  sido,
  gu,
  keyword,
  toilets,
  onChangeSido,
  onChangeGu,
  onChangeKeyword,
  onSelect,
}) {
  const countText = useMemo(() => `${toilets.length}곳`, [toilets.length]);
  return (
    <div className="panel">
      <div className="section-title">행정구역</div>
      <div className="row">
        <select value={sido} onChange={(e) => onChangeSido(e.target.value)}>
          <option>서울특별시</option>
        </select>
        <select value={gu} onChange={(e) => onChangeGu(e.target.value)}>
          {SEOUL_GU.map((g) => (
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
  );
}


