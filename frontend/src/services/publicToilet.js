export async function fetchToilets({ sido, gu }) {
  const serviceKey = import.meta.env.VITE_SEOUL_API_KEY;
   if (serviceKey) {
    const url = new URL("https://openapi.seoul.go.kr/api");
    url.pathname += `/${serviceKey}/json/PublicToiletInfo/1/500/`;
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("서울시 공공데이터 호출 실패");
    const data = await res.json();
    const rows = data?.PublicToiletInfo?.row ?? [];
    return rows
      .filter((r) => (r?.GU_NM ?? r?.GU)?.includes(gu))
      .map((r) => ({
        id:
          r?.POI_ID?.toString() ??
          `${r?.HNR_NAM}-${r?.JIBUN}` ??
          String(Math.random()),
        name: r?.FNAME || r?.HNR_NAM || "공중화장실",
        roadAddress: r?.RDNMADR_NM || r?.SITEWHLADDR,
        jibunAddress: r?.LNM_ADDR || r?.SITEWHLADDR,
        latitude: parseFloat(r?.Y_WGS84 || r?.LAT || ""),
        longitude: parseFloat(r?.X_WGS84 || r?.LNG || ""),
      }));
  }

  const mock = [
    {
      id: "1",
      name: "신도림역 지하 보도 화장실",
      roadAddress: "서울특별시 구로구 신도림로 337",
      latitude: 37.5087,
      longitude: 126.8905,
    },
    {
      id: "2",
      name: "여의도 한강공원 3호 화장실",
      roadAddress: "서울특별시 영등포구 여의공원로 330",
      latitude: 37.5271,
      longitude: 126.9336,
    },
    {
      id: "3",
      name: "광화문 광장 화장실",
      roadAddress: "서울특별시 종로구 세종대로 172",
      latitude: 37.5715,
      longitude: 126.9769,
    },
  ];
  return mock;
}


