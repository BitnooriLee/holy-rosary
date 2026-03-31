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
