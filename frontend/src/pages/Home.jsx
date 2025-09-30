import { useEffect, useMemo, useState } from "react";
import { KakaoMap } from "../components/KakaoMap";
import { ToiletList } from "../components/ToiletList";
import { fetchToilets } from "../services/publicToilet";
import loactionjson from "../mock/korea_locations.json";
import { api } from "../common/axiosapi";

export default function Home() {
  const [selectedSido, setSelectedSido] = useState("서울특별시");
  const [selectedGu, setSelectedGu] = useState("");
  const [keyword, setKeyword] = useState("");
  const [toilets, setToilets] = useState([]);
  const [focused, setFocused] = useState(null);
  const [Gulist, setGulist] = useState([]);

  const [jsonstat, setJsonStat] = useState(loactionjson);
  const GuList = (city) => jsonstat.filter((word) => word.city === city);

  useEffect(
    () => {
      toiletreq();
    },
    [selectedGu],
    []
  );

  useEffect(
    () => {
      console.log("aaaa");
      const d = GuList(selectedSido)[0].districts;
      setSelectedGu(d[0]);
      setGulist(d);
    },
    [selectedSido],
    []
  );

  const toiletreq = () => {
    return new Promise(async (resolve) => {
      if (selectedSido === "" || selectedGu === "") {
        resolve(false);
      } else {
        try {
          const { data } = await api("/home", {
            si: selectedSido,
            gu: selectedGu,
          });

          console.log("User created:", data);
          const rss = data.list.map((dt) => ({
            id: dt.id,
            name: dt.name,
            roadAddress: dt.addr || dt.road_addr,
            latitude: dt.lat,
            longitude: dt.long,
          }));
          setToilets(rss);
          resolve(true);
        } catch (error) {
          debugger;
          console.error("User creation failed:", error);
          resolve(false);
        }
      }
    });
  };

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
          guList={Gulist}
        />
      </section>
      <section className="right">
        <KakaoMap toilets={filtered} focused={focused} />
      </section>
    </main>
  );
}
