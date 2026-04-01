import Link from 'next/link'
import type { Metadata } from 'next'
import { PRAYER_TEXTS, PRAYER_DESCRIPTIONS } from '@/data/prayers'
import { MYSTERY_SETS } from '@/data/mysteries'

export const metadata: Metadata = {
  title: '묵주기도 바치는 법 완전 가이드 — 초보자부터 심화까지 | 디지털 묵주',
  description:
    '천주교 묵주기도를 처음부터 끝까지 배울 수 있는 종합 가이드. 묵주기도 역사(성 도미니코, 파티마), 59개 구슬 구조, 요일별 신비, 사도신경·성모송·주님의 기도 기도문 전문, 4가지 신비 20단 상세 해설, 초보자 팁, FAQ까지 모두 수록.',
  keywords: [
    '묵주기도 바치는 법',
    '묵주기도 순서',
    '묵주기도 방법',
    '묵주기도 기도문',
    '묵주기도 신비',
    '성모송 전문',
    '사도신경 전문',
    '주님의 기도 전문',
    '영광송',
    '파티마 기도',
    '환희의 신비 해설',
    '고통의 신비 해설',
    '영광의 신비 해설',
    '빛의 신비 해설',
    '가톨릭 묵주기도',
    '천주교 기도 방법',
    '묵주기도 역사',
    '성 도미니코 묵주기도',
    '묵주기도 초보자',
    '묵주기도 의미',
  ],
  openGraph: {
    type: 'article',
    locale: 'ko_KR',
    title: '묵주기도 바치는 법 완전 가이드 — 초보자부터 심화까지',
    description:
      '묵주기도의 역사, 59개 구슬 구조, 4가지 신비 20단 상세 해설, 기도문 전문, 초보자 팁 — 묵주기도의 모든 것.',
  },
  alternates: {
    canonical: '/guide',
  },
}

/* ─────────────────────────────────────────
   스타일 상수
───────────────────────────────────────── */
const S = {
  container: {
    fontFamily: "-apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
    letterSpacing: '-0.02em',
    color: '#1c1c1e',
    lineHeight: 1.8,
  } as React.CSSProperties,
  hero: {
    background: 'linear-gradient(160deg, #0b3d2e 0%, #1a6b5c 55%, #2d8a72 100%)',
    color: '#fff',
    padding: 'clamp(3rem, 8vw, 5rem) 1.5rem 3rem',
  } as React.CSSProperties,
  main: {
    maxWidth: '760px',
    margin: '0 auto',
    padding: '0 1.25rem 5rem',
  } as React.CSSProperties,
  h2: {
    fontSize: 'clamp(1.35rem, 4vw, 1.75rem)',
    fontWeight: 700,
    color: '#0b3d2e',
    margin: '3rem 0 1rem',
    paddingBottom: '0.6rem',
    borderBottom: '2px solid #c8e8de',
    letterSpacing: '-0.03em',
  } as React.CSSProperties,
  h3: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#0b3d2e',
    margin: '1.75rem 0 0.5rem',
  } as React.CSSProperties,
  p: {
    margin: '0 0 1rem',
    color: '#3a3a3c',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
  } as React.CSSProperties,
  blockquote: {
    margin: '1.25rem 0',
    padding: '1rem 1.25rem',
    background: '#f0faf5',
    borderLeft: '4px solid #1a6b5c',
    borderRadius: '0 10px 10px 0',
    fontStyle: 'italic',
    color: '#2d5a4a',
    fontSize: '0.95rem',
  } as React.CSSProperties,
  card: {
    padding: '1.25rem 1.5rem',
    background: '#f6fcf9',
    border: '1px solid #c8e8de',
    borderRadius: '14px',
    marginBottom: '1rem',
  } as React.CSSProperties,
  stepNum: {
    flexShrink: 0,
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: '50%',
    background: '#0b3d2e',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '0.875rem',
  } as React.CSSProperties,
  tag: {
    display: 'inline-block',
    fontSize: '0.78rem',
    padding: '0.2rem 0.65rem',
    borderRadius: '20px',
    background: '#d8f0e6',
    color: '#0b3d2e',
    fontWeight: 600,
    marginLeft: '0.5rem',
  } as React.CSSProperties,
}

/* ─────────────────────────────────────────
   데이터
───────────────────────────────────────── */
const weekdays = [
  { day: '월요일 · 토요일', mystery: '환희의 신비 ✨', desc: '예수님의 탄생과 어린 시절. 기쁨과 감사의 신비.' },
  { day: '화요일 · 금요일', mystery: '고통의 신비 🕊️', desc: '예수님의 수난과 죽음. 속죄와 인내의 신비.' },
  { day: '수요일 · 일요일', mystery: '영광의 신비 👑', desc: '예수님의 부활과 마리아님의 영광. 희망과 승리의 신비.' },
  { day: '목요일',          mystery: '빛의 신비 🌟',   desc: '예수님의 공생활. 빛과 계시의 신비.' },
]

const prayerOrder = [
  { num: 1, title: '성호경', desc: '이마·가슴·왼쪽 어깨·오른쪽 어깨 순으로 십자 표시. "성부와 성자와 성령의 이름으로. 아멘."', bead: '—' },
  { num: 2, title: '사도신경', desc: '십자가를 쥐고 신앙을 고백합니다. 묵주기도 전체의 신앙 선언입니다.', bead: '십자가' },
  { num: 3, title: '주님의 기도', desc: '예수님이 직접 가르쳐 주신 기도. 펜던트의 첫 번째 큰 구슬에서 바칩니다.', bead: '큰 구슬 ×1' },
  { num: 4, title: '성모송 ×3', desc: '믿음·희망·사랑의 세 덕을 청하며 세 번 바칩니다.', bead: '작은 구슬 ×3' },
  { num: 5, title: '영광송', desc: '삼위일체 하느님께 영광을 드립니다.', bead: '큰 구슬 ×1' },
  { num: 6, title: '신비 선포', desc: '방석 메달에서 오늘 바칠 신비의 이름과 단을 마음속으로 선포합니다.', bead: '방석 메달' },
  { num: 7, title: '1단~5단 반복 (5회)', desc: '각 단: 주님의 기도 → 성모송 ×10 → 영광송 → 구원을 비는 기도. 신비를 묵상하며 반복합니다.', bead: '큰 구슬 ×1 + 작은 구슬 ×10' },
  { num: 8, title: '마침 기도', desc: '방석 메달로 돌아와 성모찬송(살베 레지나)을 바치고 성호경으로 마칩니다.', bead: '방석 메달' },
]

const saintsTestimonies = [
  {
    name: '교황 성 요한 바오로 2세',
    years: '1978~2005',
    quote: '묵주기도는 내 삶에서 결코 없애버릴 수 없는 기도입니다. 어렸을 때부터 묵주기도는 나에게 소중한 것이었고, 파도처럼 밀려오는 어려움 속에서도 힘의 원천이 되었습니다.',
    context: '교황은 매일 의무적으로 15단 묵주기도를 바쳤으며, 1981년 저격 사건에서 생존한 후 파티마 성모님께 감사를 드리며 총탄을 파티마 성모상 왕관에 봉헌하였습니다.',
  },
  {
    name: '마더 테레사',
    years: '1910~1997',
    quote: '묵주기도를 통해 나는 마리아님의 손을 잡고 예수님께로 갑니다. 묵주기도는 나의 가장 강력한 무기입니다.',
    context: '콜카타 선교 수녀회를 창설하고 극빈자들을 섬긴 마더 테레사는 하루도 빠짐없이 묵주기도를 바쳤습니다. 고아들과 임종자들을 돌보는 손에는 항상 묵주가 쥐어져 있었습니다.',
  },
  {
    name: '성 루이 드 몽포르',
    years: '1673~1716',
    quote: '묵주기도는 예수님의 적들을 무너뜨리는 신성한 기도이며, 영혼들을 구원하는 가장 강력한 수단입니다.',
    context: '「묵주기도의 비밀」을 저술한 루이 드 몽포르는 묵주기도 사도직에 전 생애를 바쳤습니다. 그의 마리아 신심과 묵주기도 영성은 교황 성 요한 바오로 2세에게 깊은 영향을 주었습니다.',
  },
  {
    name: '교황 비오 9세',
    years: '1846~1878',
    quote: '하늘 아래 적을 물리치고 이단의 독을 해독하며 영적 미덕을 기르는 데 있어 묵주기도보다 더 탁월한 기도가 있다고는 믿어지지 않습니다.',
    context: '원죄 없는 잉태 교의를 선포한 비오 9세는 복잡한 교회 정치의 격랑 속에서도 묵주기도를 매일 실천하였습니다.',
  },
]

const theologicalDepth = [
  {
    title: '반복의 신비 — 왜 같은 기도문을 반복하는가',
    body: `묵주기도를 처음 접하는 사람들이 가장 자주 하는 질문입니다. "왜 같은 기도문을 50번이나 반복합니까?" 단조롭고 기계적으로 보이는 이 반복에는 깊은 영적 지혜가 담겨 있습니다.\n\n동양의 선(禪) 수행, 이슬람의 '디크르(Dhikr)', 유대교의 '테힐림'과 같이, 반복적 기도는 전 세계 영적 전통에서 발견됩니다. 반복은 마음을 바쁜 일상의 소음에서 분리시켜 신성한 현존 앞에 고요히 머물게 하는 효과가 있습니다. 성모송을 반복하면서 입술은 기도하고, 마음은 신비를 묵상합니다. 이중적 집중이 가능해지는 것입니다.\n\n신경과학 연구에서도 흥미로운 결과가 나옵니다. 반복적 기도는 뇌의 전전두엽 피질을 활성화하고 스트레스 호르몬인 코르티솔 수치를 낮추는 것으로 나타났습니다. 묵주기도를 바칠 때 느끼는 평화는 주관적 감상이 아니라 생리적으로도 측정 가능한 현상입니다.`,
  },
  {
    title: '마리아님의 중재 — 왜 성모님에게 기도하는가',
    body: `비가톨릭 그리스도인들이 종종 하는 질문입니다. "하느님이 아닌 마리아에게 기도하는 것은 우상숭배가 아닌가?" 이 질문에 대한 가톨릭 신학의 답은 명확합니다.\n\n묵주기도는 마리아님을 예배하는 기도가 아닙니다. 마리아님의 전구(轉求, Intercession)를 청하는 기도입니다. 전구는 대신 기도해달라는 요청입니다. 우리가 어려울 때 친구나 부모에게 "나를 위해 기도해달라"고 청하는 것과 같은 원리입니다. 마리아님은 가장 하느님께 가까운 분으로서, 가장 효과적인 중재자이십니다.\n\n카나의 혼인잔치에서 마리아님이 포도주 문제를 예수님께 알리신 것처럼, 오늘도 우리의 필요를 당신 아들께 전달하십니다. 이것이 마리아 전구의 성경적 근거입니다. 동시에 성모송의 마지막 구절 "이제와 저희 죽을 때에 저희 죄인을 위하여 빌어주소서"는 삶의 매 순간과 죽음의 순간까지 마리아님의 동반을 청하는 아름다운 기도입니다.`,
  },
  {
    title: '묵주기도와 성경 — 성경 말씀의 보고(寶庫)',
    body: `묵주기도는 성경과 깊이 연결되어 있습니다. 우선 기도문 자체가 성경 말씀에 뿌리를 두고 있습니다. 성모송의 "은총이 가득한 이여, 기뻐하여라"는 루카 복음 1장 28절의 가브리엘 천사의 인사이고, "당신은 여인들 가운데에서 가장 복되시며, 당신 태중의 아기도 복됩니다"는 루카 복음 1장 42절의 엘리사벳 말씀입니다.\n\n20개의 신비는 거의 전부 복음서와 사도행전의 사건들을 묵상합니다. 환희의 신비(루카 1~2장), 빛의 신비(마태 3장, 요한 2장, 마르 1장, 마태 17장, 루카 22장), 고통의 신비(루카 22~23장, 요한 19장), 영광의 신비(마태 28장, 루카 24장, 사도 2장, 묵시 12장). 묵주기도를 한 번 온전히 바치는 것은 복음서의 핵심 사건들을 순례하는 것과 같습니다.\n\n교황 성 요한 바오로 2세가 묵주기도를 "복음의 요약"이라 부른 것은 이 때문입니다. 성경을 깊이 공부할 시간이 없는 바쁜 현대인에게도, 매일 묵주기도를 바치는 것은 복음을 매일 접하는 방법이 됩니다.`,
  },
]

const promises = [
  '날마다 묵주기도를 바치는 이들에게 특별한 은총을 베풀겠습니다.',
  '그들의 가정에 평화를 가져오겠습니다.',
  '죽을 때 영적 위안과 격려를 받을 것입니다.',
  '연옥 영혼이 빨리 천국에 갈 것입니다.',
  '묵주기도를 바치는 이들은 나의 영적 자녀가 될 것입니다.',
  '죄의 유혹에서 보호받을 것입니다.',
  '악덕이 약해지고 덕이 자라날 것입니다.',
  '믿음, 희망, 사랑의 덕이 깊어질 것입니다.',
]

const faqs = [
  { q: '묵주가 없어도 바칠 수 있나요?', a: '물론입니다. 손가락을 이용하거나 이 앱처럼 디지털 도구를 사용해도 됩니다. 중요한 것은 기도문의 순서를 놓치지 않고 신비를 묵상하는 마음입니다.' },
  { q: '하루에 꼭 5단을 다 바쳐야 하나요?', a: '1단 단위로 바쳐도 좋습니다. 성모님은 우리의 성의를 보십니다. 시간이 여의치 않을 때는 1단이나 2단만 바치고, 나머지는 다음 기회에 채워도 됩니다.' },
  { q: '묵주기도를 얼마나 빠르게 바쳐야 하나요?', a: '너무 빠르면 묵상이 어렵고, 너무 느리면 집중이 흐트러집니다. 보통 성모송 하나에 약 20~25초 정도가 적당합니다. 전체 5단을 바치는 데 약 20~25분 걸립니다.' },
  { q: '구원을 비는 기도(파티마 기도)는 꼭 해야 하나요?', a: '1917년 파티마 발현 때 성모님이 권고하신 기도입니다. 한국 천주교에서는 각 단 영광송 뒤에 바치는 것이 일반적입니다. 필수는 아니지만 강력히 권장됩니다.' },
  { q: '묵상 없이 기도문만 반복해도 되나요?', a: '묵주기도의 핵심은 기도문 반복을 통해 신비를 묵상하는 것입니다. 그러나 처음에는 기도문을 익히는 것만으로도 충분합니다. 묵상은 자연스럽게 깊어집니다.' },
  { q: '묵주기도를 가족이 함께 바치면 더 좋은가요?', a: '성모님은 가족이 함께 바치는 묵주기도를 특히 기뻐하신다고 합니다. 저녁 식사 후 5~10분, 가족이 함께 묵주기도를 바치는 것은 가정을 성화시키는 아름다운 습관입니다.' },
]

/* ─────────────────────────────────────────
   컴포넌트
───────────────────────────────────────── */
export default function GuidePage() {
  return (
    <div style={S.container}>

      {/* ══ HERO ══ */}
      <header style={S.hero}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Link
            href="/"
            style={{ color: 'rgba(255,255,255,.65)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '2rem' }}
          >
            ← 묵주기도 앱으로
          </Link>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,.6)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Complete Guide
          </p>
          <h1 style={{ fontSize: 'clamp(1.9rem, 6vw, 3rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.04em', marginBottom: '1.25rem' }}>
            묵주기도 바치는 법
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: 'rgba(255,255,255,.85)', lineHeight: 1.7, maxWidth: '560px' }}>
            성모 마리아님과 함께 예수님의 생애를 묵상하는 기도,
            묵주기도의 역사·구조·방법·기도문을 모두 담은 완전 가이드입니다.
          </p>
        </div>
      </header>

      <main style={S.main}>

        {/* ══ 목차 ══ */}
        <nav
          style={{
            margin: '2.5rem 0',
            padding: '1.25rem 1.5rem',
            background: '#f0faf5',
            borderRadius: '14px',
            border: '1px solid #c8e8de',
          }}
          aria-label="목차"
        >
          <p style={{ fontWeight: 700, color: '#0b3d2e', marginBottom: '0.75rem', fontSize: '0.9rem' }}>📋 목차</p>
          <ol style={{ margin: 0, paddingLeft: '1.25rem', color: '#1a6b5c', fontSize: '0.9rem', lineHeight: 2 }}>
            {[
              '묵주기도란 무엇인가',
              '묵주기도의 역사',
              '묵주의 구조 — 59개 구슬',
              '요일별 신비 배정',
              '묵주기도 바치는 순서',
              '기도문 전문',
              '4가지 신비 상세 해설',
              '묵주기도의 신학적 깊이',
              '성인들의 묵주기도 증언',
              '묵주기도의 은혜와 약속',
              '초보자를 위한 팁',
              '자주 묻는 질문 (FAQ)',
            ].map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
        </nav>

        {/* ══ 1. 묵주기도란 ══ */}
        <section id="what">
          <h2 style={S.h2}>1. 묵주기도란 무엇인가</h2>
          <p style={S.p}>
            묵주기도(黙珠祈禱, Rosary)는 가톨릭 교회에서 가장 사랑받는 성모 공경 기도입니다.
            성모 마리아님과 함께 예수 그리스도의 생애를 묵상하며, 성모송·주님의 기도·영광송 등의 기도문을
            구슬을 짚어가며 반복합니다. 단순하면서도 깊은 이 기도는 어린이부터 노인까지, 신앙 초보자부터
            수십 년 신앙인까지 모두가 바칠 수 있습니다.
          </p>
          <p style={S.p}>
            교황 성 요한 바오로 2세는 묵주기도를 "복음의 요약"이라 불렀습니다.
            예수님의 탄생(환희의 신비), 공생활(빛의 신비), 수난(고통의 신비), 부활과 영광(영광의 신비) —
            이 네 묶음의 신비를 묵상하는 것이 곧 신약성경의 핵심을 순례하는 것이기 때문입니다.
          </p>
          <blockquote style={S.blockquote}>
            "묵주기도는 가장 탁월한 기도이다. 이 기도 안에서 우리는 모든 복음의 신비를 묵상한다."
            <br /><cite style={{ fontSize: '0.85rem', opacity: 0.8 }}>— 교황 성 비오 12세</cite>
          </blockquote>
          <p style={S.p}>
            묵주기도의 특징은 리듬입니다. 같은 기도문을 반복하면서 마음이 고요해지고,
            그 고요함 속에서 신비를 묵상할 공간이 생깁니다.
            현대인에게 묵주기도는 영적 마음 챙김(Spiritual Mindfulness)의 실천이기도 합니다.
          </p>
        </section>

        {/* ══ 2. 역사 ══ */}
        <section id="history">
          <h2 style={S.h2}>2. 묵주기도의 역사</h2>

          <h3 style={S.h3}>기원 — 시편 150편의 대체</h3>
          <p style={S.p}>
            묵주기도의 뿌리는 중세 수도원 전통에 있습니다. 수도승들은 매일 시편 150편을 바쳤지만,
            글을 읽지 못하는 평신도들을 위해 시편 150편 대신 주님의 기도 150번(또는 성모송 150번)을
            바치는 관행이 생겨났습니다. 구슬을 꿰어 숫자를 세는 도구가 바로 묵주의 원형입니다.
          </p>

          <h3 style={S.h3}>성 도미니코와 묵주기도 전파</h3>
          <p style={S.p}>
            13세기 성 도미니코(1170~1221)가 알비파 이단에 맞서 선교 활동 중 성모님께 묵주기도를
            받아 전파했다는 전승이 있습니다. 이 전승은 역사적 사실 여부를 떠나, 도미니코 수도회가
            묵주기도 보급에 결정적인 역할을 했다는 것은 역사적으로 확인됩니다.
          </p>

          <h3 style={S.h3}>레판토 해전과 묵주기도의 날</h3>
          <p style={S.p}>
            1571년 10월 7일, 유럽 연합 함대가 오스만 제국 해군을 레판토에서 격파했습니다.
            교황 성 비오 5세는 이 승리가 유럽 전역에서 바쳤던 묵주기도 덕분이라 믿었고,
            이 날을 '묵주기도의 성모 기념일'로 제정했습니다. 이 날짜가 오늘날 10월 7일
            '묵주기도의 복되신 동정 마리아 기념일'의 유래입니다.
          </p>

          <h3 style={S.h3}>파티마 발현과 묵주기도 권고 (1917)</h3>
          <p style={S.p}>
            1917년 5월부터 10월까지, 포르투갈 파티마에서 성모님이 세 어린이(루치아, 프란치스코, 야친타)에게
            발현하셨습니다. 성모님은 매 발현 때마다 묵주기도를 바칠 것을 촉구하셨고,
            세계 평화와 러시아의 회개를 위해 묵주기도를 바쳐달라고 요청하셨습니다.
            '구원을 비는 기도(파티마 기도)'는 이때 가르쳐 주신 기도입니다.
          </p>

          <h3 style={S.h3}>빛의 신비 추가 — 요한 바오로 2세 (2002)</h3>
          <p style={S.p}>
            2002년, 교황 성 요한 바오로 2세는 사도적 서한 「동정녀의 묵주기도」(Rosarium Virginis Mariae)를
            통해 예수님의 공생활을 묵상하는 '빛의 신비' 5개를 추가했습니다.
            이로써 묵주기도는 기존의 환희·고통·영광의 신비에 빛의 신비가 더해져 총 20단 신비로 완성되었습니다.
          </p>
        </section>

        {/* ══ 3. 묵주 구조 ══ */}
        <section id="structure">
          <h2 style={S.h2}>3. 묵주의 구조 — 59개 구슬</h2>
          <p style={S.p}>
            5단 묵주는 총 59개의 구슬로 이루어집니다. 각 구슬의 위치와 의미는 다음과 같습니다.
          </p>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { icon: '✝️', name: '십자가', role: '묵주의 맨 끝. 사도신경을 바칩니다.' },
              { icon: '⭕', name: '큰 구슬 (펜던트 ×1)', role: '주님의 기도를 바칩니다.' },
              { icon: '⚪⚪⚪', name: '작은 구슬 (펜던트 ×3)', role: '성모송 3번 — 믿음·희망·사랑의 세 덕을 청합니다.' },
              { icon: '⭕', name: '큰 구슬 (펜던트 ×1)', role: '영광송을 바칩니다.' },
              { icon: '🏅', name: '방석 메달 (센터)', role: '5단 고리의 시작점. 1단 시작 전 신비를 선포하고, 마침 기도를 바칩니다.' },
              { icon: '⭕×5', name: '큰 구슬 (고리 ×5)', role: '각 단의 시작. 주님의 기도를 바칩니다.' },
              { icon: '⚪×50', name: '작은 구슬 (고리 ×50)', role: '각 단 10개씩. 성모송 50번을 바칩니다.' },
            ].map((item) => (
              <div key={item.name} style={{ display: 'flex', gap: '0.875rem', padding: '0.875rem 1rem', background: '#f0faf5', borderRadius: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', lineHeight: 1.5, minWidth: '3rem', textAlign: 'center' }}>{item.icon}</span>
                <div>
                  <strong style={{ display: 'block', color: '#0b3d2e', fontSize: '0.95rem', marginBottom: '0.15rem' }}>{item.name}</strong>
                  <span style={{ fontSize: '0.875rem', color: '#4a7a6a', lineHeight: 1.6 }}>{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 4. 요일별 신비 ══ */}
        <section id="weekday">
          <h2 style={S.h2}>4. 요일별 신비 배정</h2>
          <p style={S.p}>
            한국 천주교에서는 요일별로 바칠 신비가 정해져 있습니다.
            이 앱은 오늘 날짜를 자동으로 감지하여 해당 신비를 표시합니다.
          </p>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {weekdays.map((w) => (
              <div key={w.mystery} style={{ padding: '1rem 1.25rem', background: '#f9f9f9', borderRadius: '12px', borderLeft: '4px solid #1a6b5c' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#0b3d2e', fontSize: '1rem' }}>{w.mystery}</strong>
                  <span style={{ fontSize: '0.8rem', background: '#d8f0e6', color: '#0b3d2e', padding: '0.2rem 0.7rem', borderRadius: '20px', fontWeight: 600 }}>{w.day}</span>
                </div>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: '#555' }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 5. 순서 ══ */}
        <section id="order">
          <h2 style={S.h2}>5. 묵주기도 바치는 순서</h2>
          <p style={S.p}>
            묵주기도는 일정한 순서를 따릅니다. 처음에는 낯설지만, 서너 번 반복하면 자연스럽게 익힙니다.
          </p>
          <ol style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.875rem' }}>
            {prayerOrder.map((s) => (
              <li key={s.num} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={S.stepNum}>{s.num}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', marginBottom: '0.3rem' }}>
                    <strong style={{ color: '#0b3d2e', fontSize: '0.975rem' }}>{s.title}</strong>
                    <span style={S.tag}>{s.bead}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#555', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: '2rem', padding: '1.25rem 1.5rem', background: '#fff3cd', borderRadius: '12px', border: '1px solid #ffd97a' }}>
            <strong style={{ display: 'block', color: '#7a5800', marginBottom: '0.4rem' }}>💡 각 단(decade)의 구조</strong>
            <p style={{ margin: 0, color: '#7a5800', fontSize: '0.9rem', lineHeight: 1.7 }}>
              주님의 기도(큰 구슬 1개) → 성모송 ×10(작은 구슬 10개) → 영광송 → 구원을 비는 기도<br />
              이 구조를 신비를 바꿔가며 5번 반복합니다.
            </p>
          </div>
        </section>

        {/* ══ 6. 기도문 전문 ══ */}
        <section id="prayers">
          <h2 style={S.h2}>6. 기도문 전문 (한국 천주교 공식)</h2>
          <p style={S.p}>출처: 한국천주교주교회의 공식 기도문</p>
          {(
            [
              { key: 'apostlesCreed' as const, title: '사도신경 (Symbolum Apostolorum)' },
              { key: 'ourFather' as const,     title: '주님의 기도 (Pater Noster)' },
              { key: 'hailMary' as const,      title: '성모송 (Ave Maria)' },
              { key: 'gloryBe' as const,       title: '영광송 (Gloria Patri)' },
              { key: 'fatima' as const,         title: '구원을 비는 기도 (파티마 기도)' },
              { key: 'hailHolyQueen' as const,  title: '성모찬송 (Salve Regina)' },
            ] as const
          ).map(({ key, title }) => (
            <details key={key} style={{ marginBottom: '0.875rem', borderRadius: '12px', border: '1px solid #c8e8de', overflow: 'hidden' }}>
              <summary style={{
                padding: '1rem 1.25rem', cursor: 'pointer', fontWeight: 700,
                background: '#f0faf5', color: '#0b3d2e', fontSize: '0.975rem',
                listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span>{title}</span>
                <span style={{ fontSize: '0.75rem', color: '#5ba88c', fontWeight: 400 }}>눌러서 펼치기</span>
              </summary>
              <div style={{ padding: '1.25rem', background: '#fff' }}>
                <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.7, marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.75rem' }}>
                  {PRAYER_DESCRIPTIONS[key]}
                </p>
                <pre style={{
                  whiteSpace: 'pre-wrap', lineHeight: 2, color: '#1c1c1e',
                  fontFamily: 'inherit', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  background: '#f8fbf9', padding: '1.125rem', borderRadius: '8px', margin: 0,
                }}>
                  {PRAYER_TEXTS[key]}
                </pre>
              </div>
            </details>
          ))}
        </section>

        {/* ══ 7. 신비 해설 ══ */}
        <section id="mysteries">
          <h2 style={S.h2}>7. 4가지 신비 상세 해설</h2>
          <p style={S.p}>
            묵주기도의 핵심은 신비를 묵상하는 것입니다. 기도문을 입술로 바치면서
            동시에 마음으로는 예수님의 생애 한 장면을 떠올립니다.
          </p>
          {Object.values(MYSTERY_SETS).map((set) => (
            <details key={set.key} style={{ marginBottom: '0.875rem', borderRadius: '12px', border: '1px solid #c8e8de', overflow: 'hidden' }}>
              <summary style={{
                padding: '1rem 1.25rem', cursor: 'pointer', fontWeight: 700,
                background: '#f0faf5', color: '#0b3d2e', fontSize: '1rem',
                listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span>{set.emoji}&ensp;{set.label}</span>
                <span style={{ fontSize: '0.78rem', color: '#5ba88c', fontWeight: 400 }}>{set.days}</span>
              </summary>
              <div style={{ padding: '1.25rem', background: '#fff' }}>
                <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.75, marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                  {set.overview}
                </p>
                {set.mysteries.map((m, i) => (
                  <div key={i} style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: i < 4 ? '1px solid #f0f0f0' : 'none' }}>
                    <h4 style={{ margin: '0 0 0.2rem', color: '#0b3d2e', fontWeight: 700, fontSize: '1rem' }}>{m.title}</h4>
                    <p style={{ margin: '0 0 0.6rem', fontSize: '0.85rem', color: '#888' }}>{m.subtitle}</p>
                    <blockquote style={{ ...S.blockquote, margin: '0 0 0.875rem' }}>{m.scripture}</blockquote>
                    <p style={{ margin: '0 0 0.6rem', fontSize: '0.9rem', color: '#3a3a3c', lineHeight: 1.85 }}>{m.meditation}</p>
                    <span style={{ ...S.tag, marginLeft: 0 }}>청덕: {m.virtue}</span>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </section>

        {/* ══ 8. 신학적 깊이 ══ */}
        <section id="theology">
          <h2 style={S.h2}>8. 묵주기도의 신학적 깊이</h2>
          <p style={S.p}>
            묵주기도는 단순한 기도 반복이 아닙니다. 그 안에는 반복, 중재, 성경, 침묵에 관한
            깊은 영적·신학적 지혜가 담겨 있습니다.
          </p>
          {theologicalDepth.map((item, i) => (
            <div key={i} style={{ marginBottom: '1.5rem', padding: '1.5rem', background: '#f8fbf9', borderRadius: '16px', border: '1px solid #daeee6' }}>
              <h3 style={{ ...S.h3, margin: '0 0 0.75rem' }}>{item.title}</h3>
              {item.body.split('\n\n').map((para, j) => (
                <p key={j} style={{ ...S.p, margin: j < item.body.split('\n\n').length - 1 ? '0 0 0.85rem' : 0 }}>{para}</p>
              ))}
            </div>
          ))}
        </section>

        {/* ══ 9. 성인들의 증언 ══ */}
        <section id="saints">
          <h2 style={S.h2}>9. 성인들의 묵주기도 증언</h2>
          <p style={S.p}>
            역사 속의 성인들과 교황들은 묵주기도를 어떻게 바라봤을까요?
            그들의 삶과 말씀에서 묵주기도의 힘을 발견합니다.
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {saintsTestimonies.map((s, i) => (
              <div key={i} style={{ padding: '1.5rem', background: '#fff', border: '1px solid #c8e8de', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <strong style={{ fontSize: '1.05rem', color: '#0b3d2e' }}>{s.name}</strong>
                  <span style={{ fontSize: '0.78rem', color: '#888' }}>{s.years}</span>
                </div>
                <blockquote style={{ ...S.blockquote, margin: '0 0 0.875rem' }}>
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#555', lineHeight: 1.7 }}>{s.context}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 10. 약속 ══ */}
        <section id="promises">
          <h2 style={S.h2}>10. 묵주기도의 은혜와 약속</h2>
          <p style={S.p}>
            성 도미니코를 통해 전해진 전승에 따르면, 성모님은 묵주기도를 정성껏 바치는
            이들에게 15가지 약속을 주셨다고 합니다. 그 중 주요 내용입니다.
          </p>
          <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
            {promises.map((p, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.75rem 1rem', background: '#f8fbf9', borderRadius: '10px' }}>
                <span style={{ color: '#1a6b5c', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ fontSize: '0.9rem', color: '#3a3a3c', lineHeight: 1.65 }}>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ══ 11. 초보자 팁 ══ */}
        <section id="tips">
          <h2 style={S.h2}>11. 초보자를 위한 팁</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { emoji: '🕐', title: '처음에는 1단만', body: '5단을 한 번에 다 바치려다 포기하는 경우가 많습니다. 처음에는 1단(약 5분)만 매일 꾸준히 바치는 것이 훨씬 낫습니다. 습관이 되면 자연스럽게 늘립니다.' },
              { emoji: '🚶', title: '걸으면서 바치기', body: '묵주기도는 이동 중에 바치기 좋은 기도입니다. 출퇴근길, 산책 중, 통학 버스 안에서 묵주를 손에 쥐고 바치세요. 리듬이 몸에 밴 걸음걸이와 잘 어울립니다.' },
              { emoji: '📱', title: '디지털 묵주 활용', body: '묵주를 갖고 다니기 어려울 때는 이 앱처럼 디지털 도구를 활용하세요. 중요한 것은 기도문의 순서와 묵상입니다.' },
              { emoji: '🌙', title: '잠자리에서 바치기', body: '잠들기 전 묵주기도를 바치는 것은 아름다운 영적 습관입니다. 잠드는 과정에서 기도를 마치지 못해도 괜찮습니다. 성모님이 대신 마쳐 주신다는 말이 있을 정도입니다.' },
              { emoji: '👨‍👩‍👧', title: '가족과 함께', body: '저녁 식사 후 가족이 둘러 앉아 묵주기도를 함께 바치는 것, 특히 성모님께서 기뻐하시는 기도입니다. 아이들도 함께 참여하면 가정이 하나의 작은 교회가 됩니다.' },
            ].map((tip) => (
              <div key={tip.title} style={S.card}>
                <strong style={{ display: 'block', fontSize: '1rem', color: '#0b3d2e', marginBottom: '0.4rem' }}>
                  {tip.emoji}&ensp;{tip.title}
                </strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#3a3a3c', lineHeight: 1.7 }}>{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 12. FAQ ══ */}
        <section id="faq">
          <h2 style={S.h2}>12. 자주 묻는 질문 (FAQ)</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ borderRadius: '12px', border: '1px solid #c8e8de', overflow: 'hidden' }}>
                <summary style={{
                  padding: '0.9rem 1.125rem', cursor: 'pointer', fontWeight: 600,
                  background: '#f0faf5', color: '#0b3d2e', listStyle: 'none',
                  display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.95rem',
                }}>
                  <span style={{ color: '#5ba88c', flexShrink: 0 }}>Q.</span>
                  <span>{faq.q}</span>
                </summary>
                <div style={{ padding: '0.9rem 1.125rem', background: '#fff' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 700, color: '#0b3d2e', flexShrink: 0 }}>A.</span>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#3a3a3c', lineHeight: 1.75 }}>{faq.a}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ══ CTA ══ */}
        <div style={{
          marginTop: '3.5rem',
          padding: 'clamp(1.75rem, 5vw, 2.5rem)',
          background: 'linear-gradient(135deg, #0b3d2e 0%, #1a6b5c 100%)',
          borderRadius: '20px',
          color: '#fff',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', fontWeight: 800, marginBottom: '0.6rem', letterSpacing: '-0.03em' }}>
            지금 바로 묵주기도를 시작해 보세요
          </p>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,.8)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
            오늘의 신비를 자동 선택하고, 진행 상태를 저장합니다.<br />
            인터넷 없이도 완벽히 작동하는 오프라인 PWA 앱입니다.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '0.875rem 2.5rem',
              background: '#fff',
              color: '#0b3d2e',
              borderRadius: '50px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            묵주기도 시작하기 →
          </Link>
        </div>

        {/* ══ 페이지 하단 링크 ══ */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#aaa', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>← 홈</Link>
          <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>개인정보처리방침</Link>
        </div>
      </main>
    </div>
  )
}
