/**
 * 기도 진행 로직 — PRAYER_STEPS (0~59단계)
 * 순수 기도문 텍스트는 /src/data/prayers.ts 에 있습니다.
 *
 * 각 Step은 아래 정보를 명시적으로 포함합니다.
 *   prayerId  — 실제 기도문 키 (PRAYER_TEXTS의 key)
 *   beadType  — 구슬 종류 (시각 렌더링용)
 *   type      — 기도 종류 (로직 분기용)
 */
import { PRAYER_TEXTS } from '@/data/prayers'

/** 기존 컴포넌트들의 import 경로 유지 */
export const PRAYERS = {
  apostlesCreed: PRAYER_TEXTS.apostlesCreed,
  ourFather:     PRAYER_TEXTS.ourFather,
  hailMary:      PRAYER_TEXTS.hailMary,
  gloryBe:       PRAYER_TEXTS.gloryBe,
  fatima:        PRAYER_TEXTS.fatima,
  hailHolyQueen: PRAYER_TEXTS.hailHolyQueen,
}

/** 기도문 텍스트 식별자 */
export type PrayerTextId =
  | 'apostlesCreed'
  | 'ourFather'
  | 'hailMary'
  | 'gloryBe'
  | 'fatima'
  | 'hailHolyQueen'
  | 'final'        // 영광송 + 파티마 + 성모찬송 묶음

/**
 * 구슬 타입
 *   cross  — 십자가 (step 0, 사도신경)
 *   large  — 큰 구슬 (주님의 기도, 펜던트 첫 구슬)
 *   small  — 작은 구슬 (성모송 50개 + 펜던트 3개)
 *   medal  — 방석 메달 (step 59, 마침 기도)
 */
export type BeadType = 'cross' | 'large' | 'small' | 'medal'

/** 각 currentStep(0-59) 의 완전한 기도 메타데이터 */
export interface PrayerStep {
  step: number
  /** 실제 기도문 텍스트 키 */
  prayerId: PrayerTextId
  /** 구슬 종류 (시각 렌더링용) */
  beadType: BeadType
  /** 기도 종류 (로직 분기용) */
  type: 'creed' | 'ourFather' | 'hailMary' | 'final'
  /** 단 번호 (1~5, 펜던트 구간은 undefined) */
  decade?: number
  /** 해당 단에서 신비 인덱스 (0~4) */
  mysteryIndex?: number
  /** 해당 단에서 성모송 순번 (1~10, 펜던트는 1~3) */
  hmIndex?: number
  /** 이 단계가 단(또는 펜던트 구간)의 마지막인지 여부 */
  isDecadeEnd?: boolean
}

/**
 * PRAYER_STEPS — 0~59 전체 60단계 완전 매핑
 *
 * ┌ step  0      : 사도신경        cross  / creed
 * ├ step  1-3    : 성모송 ×3      small  / hailMary  (펜던트)
 * ├ step  4      : 주님의 기도     large  / ourFather (1단 시작)
 * ├ step  5-14   : 성모송 ×10    small  / hailMary  (1단)
 * ├ step 15      : 주님의 기도     large  / ourFather (2단 시작)
 * ├ step 16-25   : 성모송 ×10    small  / hailMary  (2단)
 * ├ step 26      : 주님의 기도     large  / ourFather (3단 시작)
 * ├ step 27-36   : 성모송 ×10    small  / hailMary  (3단)
 * ├ step 37      : 주님의 기도     large  / ourFather (4단 시작)
 * ├ step 38-47   : 성모송 ×10    small  / hailMary  (4단)
 * ├ step 48      : 주님의 기도     large  / ourFather (5단 시작)
 * ├ step 49-58   : 성모송 ×10    small  / hailMary  (5단)
 * └ step 59      : 마침 기도 묶음  medal  / final
 *                  (영광송 + 구원을 비는 기도 + 성모찬송)
 */
export const PRAYER_STEPS: PrayerStep[] = [
  // ── 펜던트 구간 ──────────────────────────────────────────
  { step:  0, prayerId: 'apostlesCreed', beadType: 'cross',  type: 'creed' },
  { step:  1, prayerId: 'hailMary',      beadType: 'small',  type: 'hailMary', hmIndex: 1 },
  { step:  2, prayerId: 'hailMary',      beadType: 'small',  type: 'hailMary', hmIndex: 2 },
  { step:  3, prayerId: 'hailMary',      beadType: 'small',  type: 'hailMary', hmIndex: 3, isDecadeEnd: true },

  // ── 제1단 ────────────────────────────────────────────────
  { step:  4, prayerId: 'ourFather', beadType: 'large', type: 'ourFather', decade: 1, mysteryIndex: 0 },
  { step:  5, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 1, hmIndex:  1 },
  { step:  6, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 1, hmIndex:  2 },
  { step:  7, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 1, hmIndex:  3 },
  { step:  8, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 1, hmIndex:  4 },
  { step:  9, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 1, hmIndex:  5 },
  { step: 10, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 1, hmIndex:  6 },
  { step: 11, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 1, hmIndex:  7 },
  { step: 12, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 1, hmIndex:  8 },
  { step: 13, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 1, hmIndex:  9 },
  { step: 14, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 1, hmIndex: 10, isDecadeEnd: true },

  // ── 제2단 ────────────────────────────────────────────────
  { step: 15, prayerId: 'ourFather', beadType: 'large', type: 'ourFather', decade: 2, mysteryIndex: 1 },
  { step: 16, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 2, hmIndex:  1 },
  { step: 17, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 2, hmIndex:  2 },
  { step: 18, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 2, hmIndex:  3 },
  { step: 19, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 2, hmIndex:  4 },
  { step: 20, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 2, hmIndex:  5 },
  { step: 21, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 2, hmIndex:  6 },
  { step: 22, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 2, hmIndex:  7 },
  { step: 23, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 2, hmIndex:  8 },
  { step: 24, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 2, hmIndex:  9 },
  { step: 25, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 2, hmIndex: 10, isDecadeEnd: true },

  // ── 제3단 ────────────────────────────────────────────────
  { step: 26, prayerId: 'ourFather', beadType: 'large', type: 'ourFather', decade: 3, mysteryIndex: 2 },
  { step: 27, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 3, hmIndex:  1 },
  { step: 28, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 3, hmIndex:  2 },
  { step: 29, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 3, hmIndex:  3 },
  { step: 30, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 3, hmIndex:  4 },
  { step: 31, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 3, hmIndex:  5 },
  { step: 32, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 3, hmIndex:  6 },
  { step: 33, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 3, hmIndex:  7 },
  { step: 34, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 3, hmIndex:  8 },
  { step: 35, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 3, hmIndex:  9 },
  { step: 36, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 3, hmIndex: 10, isDecadeEnd: true },

  // ── 제4단 ────────────────────────────────────────────────
  { step: 37, prayerId: 'ourFather', beadType: 'large', type: 'ourFather', decade: 4, mysteryIndex: 3 },
  { step: 38, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 4, hmIndex:  1 },
  { step: 39, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 4, hmIndex:  2 },
  { step: 40, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 4, hmIndex:  3 },
  { step: 41, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 4, hmIndex:  4 },
  { step: 42, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 4, hmIndex:  5 },
  { step: 43, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 4, hmIndex:  6 },
  { step: 44, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 4, hmIndex:  7 },
  { step: 45, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 4, hmIndex:  8 },
  { step: 46, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 4, hmIndex:  9 },
  { step: 47, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 4, hmIndex: 10, isDecadeEnd: true },

  // ── 제5단 ────────────────────────────────────────────────
  { step: 48, prayerId: 'ourFather', beadType: 'large', type: 'ourFather', decade: 5, mysteryIndex: 4 },
  { step: 49, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 5, hmIndex:  1 },
  { step: 50, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 5, hmIndex:  2 },
  { step: 51, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 5, hmIndex:  3 },
  { step: 52, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 5, hmIndex:  4 },
  { step: 53, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 5, hmIndex:  5 },
  { step: 54, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 5, hmIndex:  6 },
  { step: 55, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 5, hmIndex:  7 },
  { step: 56, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 5, hmIndex:  8 },
  { step: 57, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 5, hmIndex:  9 },
  { step: 58, prayerId: 'hailMary',  beadType: 'small', type: 'hailMary',  decade: 5, hmIndex: 10, isDecadeEnd: true },

  // ── 방석 메달 귀환 — 마침 기도 묶음 ─────────────────────
  // 영광송(gloryBe) → 구원을 비는 기도(fatima) → 성모찬송(hailHolyQueen) 순서로 표시
  { step: 59, prayerId: 'final', beadType: 'medal', type: 'final', isDecadeEnd: true },
]

/** step 번호로 직접 조회하는 유틸 */
export function getPrayerStep(step: number): PrayerStep {
  return PRAYER_STEPS[Math.min(step, PRAYER_STEPS.length - 1)]
}

/** beadType 기준 색상 힌트 (렌더러에서 활용) */
export const BEAD_TYPE_LABEL: Record<BeadType, string> = {
  cross: '십자가',
  large: '큰 구슬 (주님의 기도)',
  small: '작은 구슬 (성모송)',
  medal: '방석 메달 (마침 기도)',
}
