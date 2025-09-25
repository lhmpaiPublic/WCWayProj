import { useMemo, useState } from "react";

const MOCK_POSTS = [
  {
    id: 1,
    author: "김민준",
    date: "2024-10-01",
    title: "새로운 화장실 개방! 강남역 10번 출구",
    excerpt:
      "강남역 10번 출구 인근에 새로 설치된 공용 공중 화장실이 개방되었습니다. 청결 상태 우수, 방문 편의도 높습니다.",
    tags: ["정보", "개방"],
    likes: 124,
    comments: 18,
    rank: 95,
  },
  {
    id: 2,
    author: "박지현",
    date: "2024-11-12",
    title: "청결 상태 개선 제안: 종로 3가 공원 화장실",
    excerpt:
      "종로 3가 공원 공중 화장실의 청결 상태에 대해 제언이 있습니다. 바닥 청소 주기가 더 짧아지면 좋겠습니다.",
    tags: ["의견", "청결"],
    likes: 62,
    comments: 5,
    rank: 70,
  },
  {
    id: 3,
    author: "최한울",
    date: "2025-01-05",
    title: "화장실 이용 에티켓을 지켜주세요",
    excerpt:
      "모두가 깨끗한 화장실을 이용하기 위해서는 개인의 에티켓이 중요합니다. 사용 후 물 내리기, 휴지통 사용 등 기본을 지켜요.",
    tags: ["에티켓"],
    likes: 310,
    comments: 41,
    rank: 99,
  },
  {
    id: 4,
    author: "장수민",
    date: "2024-12-18",
    title: "서울역 화장실, 장애인 편의 시설 강화: 휠체어 접근성",
    excerpt:
      "서울역 공중화장실의 장애인 편의 개선: 넓어진 출입구, 손잡이 추가, 비상벨 설치 등 긍정적인 변화가 있었습니다.",
    tags: ["정보", "편의"],
    likes: 87,
    comments: 12,
    rank: 88,
  },
  {
    id: 5,
    author: "이성연",
    date: "2025-02-20",
    title: "어린이 동반 가족을 위한 화장실 정보 공유",
    excerpt:
      "아이와 함께 이용하기 좋았던 화장실 정보를 공유합니다. 기저귀 교환대, 유아 좌변기, 수유 공간 정보를 담았습니다.",
    tags: ["가족", "유아"],
    likes: 215,
    comments: 33,
    rank: 93,
  },
];

function PostCard({ post }) {
  return (
    <div className="bd-card">
      <div className="bd-card-head">
        <div className="bd-avatar" aria-hidden="true" />
        <div>
          <div className="bd-author">{post.author}</div>
          <div className="bd-date">{post.date}</div>
        </div>
      </div>
      <div className="bd-title">{post.title}</div>
      <div className="bd-excerpt">{post.excerpt}</div>
      <div className="bd-tags">
        {post.tags.map((t) => (
          <span key={t} className="bd-tag">
            {t}
          </span>
        ))}
      </div>
      <div className="bd-actions">
        <button className="bd-btn ghost">자세히 보기</button>
      </div>
    </div>
  );
}

export default function Board() {
  const [sort, setSort] = useState("latest"); // latest | popular | rank
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    let data = [...MOCK_POSTS];
    if (q) {
      const lower = q.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.excerpt.toLowerCase().includes(lower) ||
          p.author.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.toLowerCase().includes(lower))
      );
    }
    if (sort === "latest") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === "popular") {
      data.sort((a, b) => b.likes - a.likes);
    } else if (sort === "rank") {
      data.sort((a, b) => b.rank - a.rank);
    }
    return data;
  }, [sort, query]);

  return (
    <div className="board-page">
      <section className="bd-hero">
        <div className="bd-wrap">
          <div className="bd-hero-box">
            <h1>공중 화장실 게시판에 오신 것을 환영합니다!</h1>
            <p>
              주변 화장실에 대한 경험을 공유하고, 리뷰를 남기고, 유용한 정보를
              찾아보세요. 깨끗하고 쾌적한 공중 화장실 문화를 함께 만들어갑니다.
            </p>
          </div>
          <div className="bd-toolbar">
            <div className="bd-sorts">
              <span>정렬:</span>
              <button
                className={`bd-chip ${sort === "latest" ? "active" : ""}`}
                onClick={() => setSort("latest")}
              >
                최신순
              </button>
              <button
                className={`bd-chip ${sort === "popular" ? "active" : ""}`}
                onClick={() => setSort("popular")}
              >
                인기순
              </button>
              <button
                className={`bd-chip ${sort === "rank" ? "active" : ""}`}
                onClick={() => setSort("rank")}
              >
                랭킹순
              </button>
            </div>
            <div className="bd-search">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="게시물 검색..."
              />
              <button className="bd-btn icon">🔍</button>
            </div>
          </div>
        </div>
      </section>

      <section className="bd-list">
        <div className="bd-wrap bd-grid">
          {filtered.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
