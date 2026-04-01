/**
 * 전례력 데이터, 요일별 신비 배정, 천주교식 날짜 계산
 * 한국 천주교회 관행 기준
 */

import { type MysteryKey } from './mysteries'

/* ── 유틸 ──────────────────────────────────────── */
function dayOnly(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
function addDays(d: Date, n: number): Date {
  const r = new Date(d); r.setDate(r.getDate() + n); return r
}
function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / 86_400_000)
}

/**
 * 부활절 날짜 계산 (Anonymous Gregorian algorithm)
 */
function getEaster(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1 // 0-indexed
  const day   = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month, day)
}

/** 그 해 대림절 첫 번째 일요일 */
function getAdvent1(year: number): Date {
  // 성탄절(12/25)에서 가장 가까운 이전 일요일부터 4주 전
  const christmas = new Date(year, 11, 25)
  const dow = christmas.getDay() // 0=일
  const daysBack = dow === 0 ? 28 : dow + 21
  return addDays(christmas, -daysBack)
}

/** 주님 세례 축일 (1월 6일 다음 첫 번째 일요일, 단 1/6이 일요일이면 1/13) */
function getBaptismOfLord(year: number): Date {
  const jan6 = new Date(year, 0, 6)
  const dow = jan6.getDay()
  return dow === 0 ? new Date(year, 0, 13) : addDays(jan6, 7 - dow)
}

const WEEKDAY_LONG = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

/**
 * 천주교식 전례력 날짜 레이블
 * 예) "사순 5주 화요일 (2026년 3월 31일)"
 *     "성주간 화요일 (2026년 3월 31일)"
 *     "연중 제8주 일요일 (2026년 2월 22일)"
 */
export function getLiturgicalDateLabel(input: Date = new Date()): string {
  const d   = dayOnly(input)
  const y   = d.getFullYear()
  const wd  = WEEKDAY_LONG[d.getDay()]
  const ymd = `${y}년 ${d.getMonth() + 1}월 ${d.getDate()}일`

  const easter     = dayOnly(getEaster(y))
  const ashWed     = addDays(easter, -46)      // 재의 수요일
  const palmSunday = addDays(easter, -7)       // 성지 주일
  const holySat    = addDays(easter, -1)       // 성토요일
  const pentecost  = addDays(easter, 49)       // 성령 강림 대축일

  const advent1  = dayOnly(getAdvent1(y))
  const christmasEve = new Date(y, 11, 24)
  const christmas    = new Date(y, 11, 25)
  const baptism  = dayOnly(getBaptismOfLord(y))

  // ── 사순절 (재의 수요일 ~ 성토요일) ────────────────
  if (d >= ashWed && d <= holySat) {
    if (d >= palmSunday) return `성주간 ${wd} (${ymd})`
    const firstSunOfLent = addDays(ashWed, 4) // 재의 수요일은 항상 수요일이므로 +4 = 일요일
    if (d < firstSunOfLent) {
      return `재의 수요일 후 ${wd} (${ymd})`
    }
    const week = Math.floor(diffDays(d, firstSunOfLent) / 7) + 1
    return `사순 ${week}주 ${wd} (${ymd})`
  }

  // ── 부활절 시기 (부활 주일 ~ 성령 강림 대축일) ─────
  if (d >= easter && d <= pentecost) {
    const week = Math.floor(diffDays(d, easter) / 7) + 1
    if (week === 1) return `부활 주일 후 ${wd} (${ymd})`
    return `부활 ${week}주 ${wd} (${ymd})`
  }

  // ── 대림절 (대림 제1주일 ~ 12/24) ──────────────────
  if (d >= advent1 && d <= christmasEve) {
    const week = Math.floor(diffDays(d, advent1) / 7) + 1
    return `대림 ${week}주 ${wd} (${ymd})`
  }

  // ── 성탄 시기 (12/25 ~ 주님 세례 축일) ─────────────
  if (d >= christmas || d <= baptism) {
    return `성탄 시기 ${wd} (${ymd})`
  }

  // ── 연중 시기 (나머지) ──────────────────────────────
  // 주님 세례 축일 다음 날부터 재의 수요일 전까지 = 연중 전반
  if (d > baptism && d < ashWed) {
    const week = Math.floor(diffDays(d, baptism) / 7) + 1
    return `연중 ${week}주 ${wd} (${ymd})`
  }

  // 성령 강림 다음 날 ~ 대림 제1주일 전날 = 연중 후반
  // 주님 세례 축일 기준 누적 주수로 이어서 계산
  const weeksBeforeLent = Math.ceil(diffDays(ashWed, baptism) / 7)
  const weekAfterPentecost = Math.floor(diffDays(d, pentecost) / 7)
  const week = weeksBeforeLent + weekAfterPentecost + 1
  return `연중 ${week}주 ${wd} (${ymd})`
}

/** 요일 → 신비 (한국 천주교 관행) */
export const WEEKDAY_TO_MYSTERY: MysteryKey[] = [
  'glorious',   // 0 일요일
  'joyful',     // 1 월요일
  'sorrowful',  // 2 화요일
  'glorious',   // 3 수요일
  'luminous',   // 4 목요일
  'sorrowful',  // 5 금요일
  'joyful',     // 6 토요일
]

export function getMysteryKeyForToday(): MysteryKey {
  return WEEKDAY_TO_MYSTERY[new Date().getDay()]
}

/** 요일별 오늘의 성서 말씀 */
export const DAILY_VERSES = [
  { verse: '영광이 성부와 성자와 성령께, 이제와 항상 영원히.', ref: '영광송', day: '일요일' },
  { verse: '주님은 나의 목자, 나는 아쉬울 것 없어라.', ref: '시편 23,1', day: '월요일' },
  { verse: '주님, 저를 불쌍히 여기소서, 죄인인 저를.', ref: '루카 18,13', day: '화요일' },
  { verse: '두려워하지 마라. 나는 처음이요 마지막이며 살아있는 자다.', ref: '묵시 1,17-18', day: '수요일' },
  { verse: '나도 너를 단죄하지 않는다. 가거라. 이제부터 다시는 죄짓지 마라.', ref: '요한 8,11', day: '목요일' },
  { verse: '그는 우리의 병고를 메고 갔으며 우리의 고통을 짊어졌다.', ref: '이사 53,4', day: '금요일' },
  { verse: '주님의 자비는 영원하시며 그 진실하심도 영원하다.', ref: '시편 117,2', day: '토요일' },
]

/** 전례 계절 정보 */
export interface LiturgicalSeason {
  name: string
  color: string
  description: string
  period: string
}

export const LITURGICAL_SEASONS: LiturgicalSeason[] = [
  {
    name: '대림절',
    color: '보라색',
    description: '예수님의 탄생과 재림을 기다리며 준비하는 시기. 주님 오심을 기다리는 희망과 기대의 계절.',
    period: '대림 제1주일 ~ 12월 24일',
  },
  {
    name: '성탄절',
    color: '흰색 / 금색',
    description: '예수님의 탄생을 기뻐하며 축하하는 시기. 하느님이 인간이 되셨다는 강생의 신비를 묵상.',
    period: '12월 25일 ~ 주님 세례 축일',
  },
  {
    name: '연중 시기 (전반)',
    color: '초록색',
    description: '일상 속에서 믿음을 키워가는 시기. 예수님의 공생활과 가르침을 묵상.',
    period: '주님 세례 축일 다음 날 ~ 재의 수요일 전날',
  },
  {
    name: '사순절',
    color: '보라색',
    description: '부활을 준비하는 40일. 기도, 단식, 자선의 세 가지 실천으로 회개와 쇄신의 시간.',
    period: '재의 수요일 ~ 성목요일 저녁 미사 전',
  },
  {
    name: '부활절',
    color: '흰색 / 금색',
    description: '예수님의 부활을 기뻐하는 가장 큰 축제 시기. 성령 강림 대축일까지 50일간 부활을 경축.',
    period: '부활 밤 미사 ~ 성령 강림 대축일',
  },
  {
    name: '연중 시기 (후반)',
    color: '초록색',
    description: '신앙 성숙과 사도직 실천의 시기. 교회 공동체 안에서 복음을 살아가는 일상의 영성.',
    period: '성령 강림 대축일 다음 날 ~ 대림 전날',
  },
]

/* ══════════════════════════════════════════════════
   전례 시기별 묵주기도 특별 묵상 가이드
══════════════════════════════════════════════════ */
export interface SeasonalMeditationGuide {
  season: string
  title: string
  subtitle: string
  body: string
  recommendedMystery: MysteryKey
  tip: string
}

/**
 * 현재 전례 시기에 맞는 묵주기도 특별 묵상 가이드를 반환합니다.
 * 대림·성탄·사순·성주간·부활·연중 각 시기마다
 * 신학적 배경, 권장 신비, 기도 방법 팁을 제공합니다.
 */
export function getSeasonalMeditationGuide(input: Date = new Date()): SeasonalMeditationGuide {
  const d   = dayOnly(input)
  const y   = d.getFullYear()

  const easter     = dayOnly(getEaster(y))
  const ashWed     = addDays(easter, -46)
  const palmSunday = addDays(easter, -7)
  const holySat    = addDays(easter, -1)
  const pentecost  = addDays(easter, 49)
  const advent1    = dayOnly(getAdvent1(y))
  const christmasEve = new Date(y, 11, 24)
  const christmas    = new Date(y, 11, 25)
  const baptism    = dayOnly(getBaptismOfLord(y))

  // 성주간
  if (d >= palmSunday && d <= holySat) {
    return {
      season: '성주간',
      title: '성주간 — 가장 거룩한 시간의 묵주기도',
      subtitle: '예수님의 수난과 죽음을 가장 깊이 묵상하는 한 주',
      body: `성주간(Holy Week)은 교회 전례력에서 가장 거룩하고 엄숙한 한 주입니다. 성지 주일(예루살렘 입성)로 시작하여 성목요일(최후의 만찬), 성금요일(십자가 죽음), 성토요일(무덤에서의 침묵)을 거쳐 부활 성야로 마무리됩니다. 이 한 주 동안 인류 구원의 핵심 사건이 펼쳐집니다.\n\n성주간의 묵주기도는 특별한 의미를 지닙니다. 고통의 신비를 바치면서 우리는 단순히 2000년 전 사건을 기억하는 것이 아니라, 지금 이 순간에도 살아 작용하는 구원의 신비에 참여합니다. 예수님이 겟세마니에서 흘리신 피땀, 채찍질 당하신 몸, 가시 면류관의 고통, 무거운 십자가를 짊어진 걸음, 그리고 골고타에서의 마지막 숨 — 이 모든 것이 나를 위한 것임을 이 주간에 가장 실감하게 됩니다.\n\n성금요일에는 교회가 전통적으로 묵주기도 고통의 신비 5단을 봉헌하는 아름다운 전통이 있습니다. 가족이 함께, 또는 혼자서라도, 예수님의 수난을 묵상하며 감사와 통회의 기도를 드려보십시오.`,
      recommendedMystery: 'sorrowful',
      tip: '성금요일 오후 3시(예수님 운명하신 시각)에 맞추어 고통의 신비 1단을 특별히 바쳐보세요. 그 시간 5분만이라도 조용히 묵상하는 것이 큰 은총이 됩니다.',
    }
  }

  // 사순절
  if (d >= ashWed && d < palmSunday) {
    return {
      season: '사순절',
      title: '사순절 — 회개와 쇄신의 40일 묵주기도',
      subtitle: '부활을 향해 준비하는 기도, 단식, 자선의 시간',
      body: `사순절(Lent)은 예수님이 광야에서 40일간 단식하신 것을 본받아, 부활을 준비하는 40일의 전례 시기입니다. 재의 수요일(Ash Wednesday)에 이마에 재를 받으며 "너는 먼지이니 먼지로 돌아갈 것이다"라는 말씀과 함께 시작됩니다. 이 재는 우리의 유한함과 죄인임을 고백하는 표시이며, 동시에 새 출발을 다짐하는 표시입니다.\n\n사순절 묵주기도는 특히 고통의 신비와 잘 어울립니다. 예수님의 수난을 바라보며 나의 죄가 그 수난의 원인 중 하나임을 인정하고, 진심 어린 통회(痛悔)를 드립니다. 그리고 그 통회는 절망이 아닌 희망으로 이어집니다. 왜냐하면 고통의 신비 뒤에는 반드시 영광의 신비가 오기 때문입니다.\n\n사순절에 묵주기도를 바칠 때, 각 성모송 사이의 짧은 침묵을 활용해보세요. 기도문을 마친 후 잠시 숨을 고르며, '오늘 내가 회개해야 할 한 가지'를 하느님 앞에 내어놓는 연습을 합니다. 40일간 매일 한 가지씩, 그렇게 40가지 회개를 쌓아가다 보면 부활 때 달라진 자신을 발견하게 됩니다.`,
      recommendedMystery: 'sorrowful',
      tip: '사순절 동안 매일 고통의 신비 1단만이라도 바치는 목표를 세워보세요. 5분의 기도가 하루를 바꿉니다. 금요일에는 특별히 5단 전체를 봉헌하는 것을 권장합니다.',
    }
  }

  // 부활절 시기
  if (d >= easter && d <= pentecost) {
    return {
      season: '부활절',
      title: '부활 시기 — 기쁨과 감사의 50일 묵주기도',
      subtitle: '그리스도의 부활을 경축하는 가장 큰 축제',
      body: `부활 시기(Easter Season)는 교회 달력에서 가장 긴 축제입니다. 부활 주일부터 성령 강림 대축일까지 50일 동안, 교회는 예수님의 부활을 경축합니다. 사순절 40일의 절제와 묵상이 끝나고, 이제 부활의 빛 속에서 기쁨이 흘러넘치는 시간입니다. 이 시기에 바치는 모든 기도에는 '알렐루야(Alleluia, 주님을 찬양하라)'가 덧붙여집니다.\n\n부활 시기의 묵주기도는 영광의 신비가 중심입니다. 예수님의 부활(제1단)부터 마리아님의 천상 모후 즉위(제5단)까지, 죽음이 마지막이 아님을 선포하는 신비들입니다. 특히 이 시기에 묵주기도를 바치면서, 내 삶의 어떤 부분이 아직 '무덤 안에' 갇혀 있는지 생각해보세요. 하느님은 무덤 돌을 굴리시는 분입니다.\n\n부활 시기에는 가족이 함께 묵주기도를 바치는 것이 더욱 권장됩니다. 식사 후 10분, 가족이 둥글게 앉아 영광의 신비를 한 단씩 나누어 기도하는 것은 가정의 부활을 이루는 아름다운 실천입니다.`,
      recommendedMystery: 'glorious',
      tip: '부활 시기에는 묵주기도를 마친 후 "부활하신 예수님, 제 삶 안에서도 부활하소서"라는 짧은 지향기도를 덧붙여 보세요. 매일 한 가지 감사를 찾아 그것을 기도의 지향으로 삼는 것도 좋습니다.',
    }
  }

  // 대림절
  if (d >= advent1 && d <= christmasEve) {
    return {
      season: '대림절',
      title: '대림절 — 기다림의 묵주기도',
      subtitle: '오실 주님을 기다리며 마음을 준비하는 시간',
      body: `대림절(Advent, 待臨節)은 예수님의 성탄을 기다리는 전례 시기입니다. 라틴어 'Adventus'는 '오심'을 뜻합니다. 대림절은 과거에 오신 예수님의 탄생을 기념하고, 현재 우리 삶 안에 오시는 예수님을 맞이하며, 미래에 다시 오실 예수님을 기다리는 3중의 기다림의 계절입니다.\n\n대림절은 통상 4주간으로, 각 주일마다 하나씩 대림초(advent candle)에 불을 밝힙니다. 희망, 평화, 기쁨, 사랑이 각 초의 주제입니다. 이 시기에 묵주기도를 바치면서, 환희의 신비를 통해 예수님 탄생의 의미를 미리 묵상합니다. 수태고지, 방문, 탄생, 봉헌, 성전에서 찾으심 — 이 다섯 신비는 대림절의 기다림과 완벽하게 어우러집니다.\n\n세상이 소비와 선물과 파티로 시끄러운 12월, 묵주기도는 고요함의 오아시스가 됩니다. 매일 저녁 잠들기 전 환희의 신비 한 단을 바치며, 내 마음의 여관에 예수님이 머물 자리를 마련하는 연습을 해보세요. 마리아님이 그러셨듯이, 조용히, 기쁘게 오실 주님을 기다립니다.`,
      recommendedMystery: 'joyful',
      tip: '대림절에는 취침 전 환희의 신비를 바치는 것을 권장합니다. 자녀가 있는 가정이라면 대림초 점화와 함께 짧은 묵주기도를 드리는 것이 아름다운 대림절 전통이 됩니다.',
    }
  }

  // 성탄 시기
  if (d >= christmas || d <= baptism) {
    return {
      season: '성탄',
      title: '성탄 시기 — 강생의 신비를 묵상하는 묵주기도',
      subtitle: '하느님이 인간이 되셨다는 가장 놀라운 사랑',
      body: `성탄 시기(Christmas Season)는 12월 25일 성탄 대축일부터 1월의 주님 세례 축일까지 이어집니다. 이 시기는 하느님이 인간의 몸을 입으신 강생(降生, Incarnation)의 신비를 경축합니다. 철학자들은 이것을 가리켜 '역사상 가장 큰 사건'이라 부릅니다. 무한하신 하느님이 유한한 인간이 되셨으니까요.\n\n성탄 시기의 묵주기도는 환희의 신비가 중심입니다. 특히 제3단 예수님의 탄생 신비를 묵상하면서, 베들레헴 마구간의 그 밤을 상상해보세요. 짚 냄새, 짐승들의 숨결, 마리아님의 노래, 요셉의 조용한 보호, 그리고 아기 예수님의 첫 울음. 이 장면 속에 구원의 역사 전체가 담겨 있습니다.\n\n성탄 시기에 묵주기도를 바치면서 이 질문을 해보세요. "예수님은 나의 어떤 '마구간'에 태어나고 싶어 하실까?" 내 마음의 가장 지저분하고 비어있는 부분, 바로 그곳이 예수님이 태어나기를 원하시는 자리일 수 있습니다.`,
      recommendedMystery: 'joyful',
      tip: '성탄 팔일 축제(12/25~1/1) 동안 매일 환희의 신비를 한 단씩 바치면서 탄생의 신비를 깊이 묵상해보세요. 신년에는 천주의 성모 마리아 대축일(1/1)을 기념하여 온 가족이 함께 묵주기도를 바치는 전통을 시작해보세요.',
    }
  }

  // 연중 시기 (기본)
  return {
    season: '연중',
    title: '연중 시기 — 일상 속의 묵주기도',
    subtitle: '매일의 삶 안에서 예수님과 마리아님을 만나는 시간',
    body: `연중 시기(Ordinary Time)는 특별한 전례 계절이 아닌, '보통의' 시간입니다. 그러나 '연중(年中, Ordinary)'은 결코 '평범하고 지루한'을 의미하지 않습니다. 라틴어 'Ordinalis(순서가 있는)'에서 온 말로, 교회가 체계적으로 주님의 공생활을 묵상하며 신앙을 키워가는 성숙의 시간입니다. 연중 시기는 전례력의 절반 이상을 차지하며, 색깔은 생명과 성장을 상징하는 초록색입니다.\n\n연중 시기에는 오늘 요일에 따라 권장된 신비를 충실히 바치는 것이 가장 중요합니다. 월/토는 환희, 화/금은 고통, 수/일은 영광, 목은 빛의 신비. 이 규칙적인 리듬이 영성 성장의 토대가 됩니다. 매일 같은 시간에, 같은 자리에서 묵주기도를 바치는 '묵주기도 일과(日課)'를 만들어보세요. 아침 커피를 마시며, 출퇴근 지하철 안에서, 점심 식사 전 잠시, 또는 취침 전 — 어느 시간이든 좋습니다.\n\n연중 시기의 묵주기도는 '일상의 성화(聖化)'를 이루는 힘이 있습니다. 평범한 하루가 기도로 거룩해지고, 반복되는 일상이 하느님과의 만남이 됩니다. 성 요한 바오로 2세는 "묵주기도를 바치는 가정은 평화롭다"고 하셨습니다.`,
    recommendedMystery: getMysteryKeyForToday(),
    tip: '연중 시기에는 기도의 지향을 구체적으로 정해보세요. 아픈 가족, 힘든 친구, 평화가 필요한 세상. 각 단마다 한 사람씩을 위해 바치면 묵주기도가 더욱 풍요로워집니다.',
  }
}

/** 주요 전례 축일 */
export interface LiturgicalFeast {
  date: string
  name: string
  rank: 'solemnity' | 'feast' | 'memorial'
  description: string
}

export const MAJOR_FEASTS: LiturgicalFeast[] = [
  { date: '01-01', name: '천주의 성모 마리아 대축일', rank: 'solemnity', description: '한 해를 시작하는 첫날, 하느님의 어머니 마리아님을 경축하며 평화를 위해 기도합니다.' },
  { date: '02-02', name: '주님 봉헌 축일', rank: 'feast', description: '아기 예수님을 성전에 봉헌하신 날을 기념합니다. 빛의 축제로도 불립니다.' },
  { date: '03-25', name: '주님 탄생 예고 대축일', rank: 'solemnity', description: '가브리엘 천사가 마리아님께 수태고지를 한 날을 기념합니다.' },
  { date: '05-31', name: '복되신 동정 마리아의 방문 축일', rank: 'feast', description: '마리아님이 엘리사벳을 방문한 날을 기념합니다.' },
  { date: '08-15', name: '성모 승천 대축일', rank: 'solemnity', description: '성모 마리아님이 영혼과 육신으로 천상에 올림을 받으신 날. 한국 천주교의 큰 명절.' },
  { date: '10-07', name: '묵주기도의 복되신 동정 마리아 기념일', rank: 'memorial', description: '묵주기도를 통해 성모님을 공경하는 날. 레판토 해전 승리를 기념하며 교황 성 비오 5세가 제정.' },
  { date: '12-08', name: '한국 교회의 원죄 없이 잉태되신 복되신 동정 마리아 대축일', rank: 'solemnity', description: '성모님이 원죄 없이 잉태되셨음을 믿는 교의. 한국 천주교의 수호자 축일.' },
  { date: '12-25', name: '주님 성탄 대축일', rank: 'solemnity', description: '예수님의 탄생을 기뻐하는 가장 기쁜 날. 온 세상에 구원자가 오셨음을 선포.' },
]
