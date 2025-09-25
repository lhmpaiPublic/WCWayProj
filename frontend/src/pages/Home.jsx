import { useEffect, useMemo, useState } from "react";
import { KakaoMap } from "../components/KakaoMap";
import { ToiletList } from "../components/ToiletList";
import { fetchToilets } from "../services/publicToilet";

export default function Home() {
  const [selectedSido, setSelectedSido] = useState("서울특별시");
  const [selectedGu, setSelectedGu] = useState("강남구");
  const [keyword, setKeyword] = useState("");
  const [toilets, setToilets] = useState([]);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const list = await fetchToilets({ sido: selectedSido, gu: selectedGu });
        if (!ignore) setToilets(list);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [selectedSido, selectedGu]);

  const filtered = useMemo(() => {
    const term = keyword.trim();
    if (!term) return toilets;
    return toilets.filter((t) =>
      [t.name, t.roadAddress, t.jibunAddress].some((v) => v?.includes(term))
    );
  }, [keyword, toilets]);

  return (
    <main className="content">
      <section className="left">
        <ToiletList
          sido={selectedSido}
          gu={selectedGu}
          keyword={keyword}
          onChangeSido={setSelectedSido}
          onChangeGu={setSelectedGu}
          onChangeKeyword={setKeyword}
          toilets={filtered}
          onSelect={setFocused}
        />
      </section>
      <section className="right">
        <KakaoMap toilets={filtered} focused={focused} />
      </section>
    </main>
  );
}

