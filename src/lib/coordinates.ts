/**
 * 5단 묵주 59개 구슬 + 방석(센터 메달) 좌표 시스템
 *
 * ┌─ 십자가 (시각 요소, 기도 시작점)
 * │   ↑ chain
 * ├── bead 58 (큰 알 / OF): 주님의 기도 (십자가 위 첫 큰 알)
 * ├── bead 57 (작은 알): 성모송
 * ├── bead 56 (작은 알): 성모송
 * ├── bead 55 (작은 알): 성모송 + 영광송
 * │   ↑ chain
 * ├── bead 0 = 방석 메달 (junction, 큰 알 / OF 역할)
 * │        = 1단 신비 묵상 + 주님의 기도
 * │         [반시계방향으로 루프 시작 ↑→ 오른쪽, 상단, 왼쪽]
 * ├── beads 1–10   (작은 알, 1단 HM × 10)
 * ├── bead 11  (큰 알, 2단 OF): 영광송 + 구원송 + 2단 신비 + 주님의 기도
 * ├── beads 12–21  (작은 알, 2단 HM × 10)
 * ├── bead 22  (큰 알, 3단 OF)
 * ├── beads 23–32  (작은 알, 3단 HM × 10)
 * ├── bead 33  (큰 알, 4단 OF)
 * ├── beads 34–43  (작은 알, 4단 HM × 10)
 * ├── bead 44  (큰 알, 5단 OF)
 * └── beads 45–54  (작은 알, 5단 HM × 10)
 *          → 방석으로 귀환 (step 59 영광송 + 성모찬송)
 *
 * SVG viewBox : "0 0 360 500"
 * 루프 원      : cx=180, cy=192, r=140 (원형 - 정확한 대칭)
 * 루프 방향    : 반시계방향 (오른쪽↑ → 상단 → 왼쪽↓)
 * 루프 분포    : 54개 beads, 335° 호, 시작 77.5°(오른쪽하단)→오른쪽→상단→왼쪽→왼쪽하단(102.5°)
 * 갭 중심      : 90° (정하단) — 방석(bead 0)이 이 위치
 */
export type BeadType = 'of' | 'hm'

export interface BeadCoord {
  x: number
  y: number
  type: BeadType
  index: number
}

/* ── 루프 파라미터 ── */
export const ROSARY_CX  = 180
export const ROSARY_CY  = 192
export const ROSARY_RX  = 140
export const ROSARY_RY  = 140   // 원형 루프
export const ROSARY_VW  = 360
export const ROSARY_VH  = 500

/* ── 갭 & 시작각 ── */
const GAP_DEG     = 25                              // 방석 위치 갭
const GAP_CENTER  = 90                              // 갭 중심 (SVG 하단)
// 경로: 오른쪽 하단(77.5°)에서 시작 → 오른쪽 → 오른쪽 상단 → 상단 → 왼쪽 상단 → 왼쪽 → 왼쪽 하단(102.5°)
// SVG에서 각도 감소 = 화면 기준 반시계방향 (오른쪽→위)
const START_ANGLE = GAP_CENTER - GAP_DEG / 2        // 77.5° (오른쪽 하단 엣지)
const ARC_DEG     = 360 - GAP_DEG                   // 335°
const LOOP_ARC_COUNT = 54                           // 루프 실제 beads (bead 0 제외)
// 각도 감소 = 반시계방향 (오른쪽→상단→왼쪽)
const DEG_STEP    = -(ARC_DEG / (LOOP_ARC_COUNT - 1)) // ≈ -6.321°

function toRad(deg: number) { return (deg * Math.PI) / 180 }

/** 방석 위치 (bead 0) */
export const JUNCTION_X = ROSARY_CX
export const JUNCTION_Y = Math.round(ROSARY_CY + ROSARY_RY)  // 192+140 = 332

/**
 * bead 0: 방석 메달 (= 1단 신비 + 주님의 기도)
 * bead 1-54: 루프 arc (반시계방향)
 *   - type OF: loop index 10, 21, 32, 43 (2단~5단 주님의 기도)
 *   - type HM: 나머지
 * bead 55-57: 펜던트 HM (방석→십자가 방향 위에서 아래)
 * bead 58: 펜던트 OF (십자가 바로 위 큰 알)
 */

/** 루프 54개 (index 1–54) — 반시계방향 */
const loopBeads: BeadCoord[] = Array.from({ length: LOOP_ARC_COUNT }, (_, i) => {
  const deg = START_ANGLE + i * DEG_STEP   // 감소 = 반시계
  const rad = toRad(deg)
  // OF는 2단~5단 시작 큰 알: loop pos 10, 21, 32, 43
  const isOF = i === 10 || i === 21 || i === 32 || i === 43
  return {
    x: Math.round(ROSARY_CX + ROSARY_RX * Math.cos(rad)),
    y: Math.round(ROSARY_CY + ROSARY_RY * Math.sin(rad)),
    type: isOF ? 'of' : 'hm',
    index: i + 1,  // bead index 1-54
  }
})

/** 펜던트 3개 (index 55–57, 방석 아래에서 아래로) + OF 1개 (index 58) */
const PENDANT_SM = 26
const PENDANT_LG_Y = JUNCTION_Y + PENDANT_SM * 3 + 32

const pendantBeads: BeadCoord[] = [
  { x: JUNCTION_X, y: JUNCTION_Y + PENDANT_SM,       type: 'hm', index: 55 },
  { x: JUNCTION_X, y: JUNCTION_Y + PENDANT_SM * 2,   type: 'hm', index: 56 },
  { x: JUNCTION_X, y: JUNCTION_Y + PENDANT_SM * 3,   type: 'hm', index: 57 },
  { x: JUNCTION_X, y: PENDANT_LG_Y,                  type: 'of', index: 58 },
]

/** bead 0: 방석 메달 */
const medalBead: BeadCoord = {
  x: JUNCTION_X,
  y: JUNCTION_Y,
  type: 'of',
  index: 0,
}

export const BEAD_COORDINATES: BeadCoord[] = [medalBead, ...loopBeads, ...pendantBeads]

/** 십자가 위치 */
export const CRUCIFIX_POS = {
  x: JUNCTION_X,
  y: PENDANT_LG_Y + 40,
}

/* ── 기도 매핑 (60 스텝) ── */
export const STEP_TO_BEAD: number[] = [
  // 펜던트 (시작)
  58,           // step 0: 사도신경 + 주님의 기도 (펜던트 큰 알)
  57,           // step 1: 성모송
  56,           // step 2: 성모송
  55,           // step 3: 성모송 + 영광송
  // 방석 → 1단
  0,            // step 4: 1단 신비 묵상 + 주님의 기도 (방석 메달)
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,  // step 5-14: 1단 HM × 10
  // 2단
  11,           // step 15: 영광송 + 구원송 + 2단 신비 + 주님의 기도
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, // step 16-25: 2단 HM × 10
  // 3단
  22,           // step 26: 영광송 + 구원송 + 3단 신비 + 주님의 기도
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, // step 27-36: 3단 HM × 10
  // 4단
  33,           // step 37: 영광송 + 구원송 + 4단 신비 + 주님의 기도
  34, 35, 36, 37, 38, 39, 40, 41, 42, 43, // step 38-47: 4단 HM × 10
  // 5단
  44,           // step 48: 영광송 + 구원송 + 5단 신비 + 주님의 기도
  45, 46, 47, 48, 49, 50, 51, 52, 53, 54, // step 49-58: 5단 HM × 10
  // 방석 귀환 (마침)
  0,            // step 59: 영광송 + 구원송 + 성모찬송 (방석으로 귀환)
]

export const TOTAL_STEPS = STEP_TO_BEAD.length  // 60

/** 단 끝 (영광송 표시) */
export const DECADE_END_STEPS = new Set([3, 14, 25, 36, 47, 58, 59])

export const DECADE_BEAD_RANGES: number[][] = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
  [23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
  [34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
  [45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
]
