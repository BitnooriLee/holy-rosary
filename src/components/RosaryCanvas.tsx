'use client'

import React, { useMemo } from 'react'
import {
  BEAD_COORDINATES, STEP_TO_BEAD, CRUCIFIX_POS, JUNCTION_X, JUNCTION_Y,
  ROSARY_CX, ROSARY_CY, ROSARY_RX, ROSARY_RY, ROSARY_VW, ROSARY_VH,
  type BeadCoord,
} from '@/lib/coordinates'
import { THEMES, type ThemeId } from '@/lib/themes'

interface RosaryCanvasProps {
  activeBead: number
  currentStep: number
  theme: ThemeId
  celebratingBeads: Set<number>
  tappingBead: number | null
}

/* ── SVG 치수 (coordinates.ts 와 동기화) ── */
const VW  = ROSARY_VW    // 360
const VH  = ROSARY_VH    // 500
const CX  = ROSARY_CX    // 180
const CY  = ROSARY_CY    // 182
const RX  = ROSARY_RX    // 145
const RY  = ROSARY_RY    // 133

/* ── 구슬 반지름: 큰 알(OF) / 작은 알(HM) 명확히 구분 ── */
const R_HM  = 6.5
const R_OF  = 11
const R_MEDAL = 12   // 방석 메달 반지름

function getRadius(type: 'hm' | 'of') {
  return type === 'of' ? R_OF : R_HM
}

/* ─────────────────────────────────────────
   그라디언트 & 필터 정의
───────────────────────────────────────── */
function BeadGradientDefs({ themeId }: { themeId: ThemeId }) {
  const t = THEMES[themeId]
  return (
    <defs>
      <radialGradient id={`grad-hm-${themeId}`} cx="32%" cy="28%" r="72%" fx="32%" fy="28%">
        {t.beadHm.map((s, i) => <stop key={i} offset={s.offset} stopColor={s.color} />)}
      </radialGradient>

      <radialGradient id={`grad-of-${themeId}`} cx="32%" cy="28%" r="72%" fx="32%" fy="28%">
        {t.beadOf.map((s, i) => <stop key={i} offset={s.offset} stopColor={s.color} />)}
      </radialGradient>

      {/* 방석 그라디언트 — 금빛 */}
      <radialGradient id={`grad-medal-${themeId}`} cx="35%" cy="30%" r="70%">
        <stop offset="0%"   stopColor="#fff9e6" />
        <stop offset="35%"  stopColor="#e8c84a" />
        <stop offset="70%"  stopColor="#b8961e" />
        <stop offset="100%" stopColor="#7a5c0a" />
      </radialGradient>

      {/* 활성 구슬 발광 필터 */}
      <filter id={`glow-filter-${themeId}`} x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="7"   result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* 축하 필터 */}
      <filter id="celebrate-filter" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  )
}

/* ─────────────────────────────────────────
   십자가
───────────────────────────────────────── */
function Crucifix({ x, y, color }: { x: number; y: number; color: string }) {
  const arm  = 12
  const vert = 17
  return (
    <g>
      {/* 세로 */}
      <line x1={x} y1={y - vert} x2={x} y2={y + vert}
        stroke={color} strokeWidth={3} strokeLinecap="round" />
      {/* 가로 */}
      <line x1={x - arm} y1={y - 5} x2={x + arm} y2={y - 5}
        stroke={color} strokeWidth={3} strokeLinecap="round" />
      {/* 중심점 */}
      <circle cx={x} cy={y - 5} r={2.5} fill={color} />
    </g>
  )
}

/* ─────────────────────────────────────────
   방석 메달 (bead 0) — 기도 1단 시작 / 마침 지점
   십자가 문양 없이 순수 메달 형태
───────────────────────────────────────── */
function CenterMedal({
  themeId, isActive, isVisited, isTapping,
}: {
  themeId: ThemeId
  isActive: boolean
  isVisited: boolean
  isTapping: boolean
}) {
  const t = THEMES[themeId]
  const r = R_MEDAL
  const [glow1, glow2] = t.glowColors

  let animClass = ''
  if (isTapping)    animClass = 'animate-bead-tap'
  else if (isActive) animClass = 'animate-jewel-glow'

  const style: React.CSSProperties = {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    ['--glow-1' as string]: glow1,
    ['--glow-2' as string]: glow2,
  }

  return (
    <g
      className={animClass}
      style={style}
      filter={isActive ? `url(#glow-filter-${themeId})` : undefined}
    >
      {/* 활성 링 */}
      {isActive && (
        <circle cx={JUNCTION_X} cy={JUNCTION_Y} r={r + 6}
          fill="none" stroke={glow1} strokeWidth={1.5} opacity={0.5}
          className="animate-pulse"
        />
      )}
      {/* 외곽 링 */}
      <circle
        cx={JUNCTION_X} cy={JUNCTION_Y} r={r + 3}
        fill="none" stroke={t.chainColor} strokeWidth={1.2} opacity={0.6}
      />
      {/* 메달 본체 */}
      <circle
        cx={JUNCTION_X} cy={JUNCTION_Y} r={r}
        fill={`url(#grad-medal-${themeId})`}
        stroke={isActive ? glow1 : 'rgba(255,215,0,0.5)'}
        strokeWidth={isActive ? 1.5 : 1}
      />
      {/* 방문 오버레이 */}
      {isVisited && !isActive && (
        <circle cx={JUNCTION_X} cy={JUNCTION_Y} r={r} fill={t.visitedTint} />
      )}
      {/* 3D 하이라이트 */}
      <circle
        cx={JUNCTION_X - 3.5} cy={JUNCTION_Y - 3.5} r={3.5}
        fill="rgba(255,255,255,0.38)"
        style={{ pointerEvents: 'none' }}
      />
      <circle
        cx={JUNCTION_X + 2.5} cy={JUNCTION_Y + 3} r={2}
        fill="rgba(255,255,255,0.15)"
        style={{ pointerEvents: 'none' }}
      />
    </g>
  )
}

/* ─────────────────────────────────────────
   개별 구슬
───────────────────────────────────────── */
interface BeadProps {
  bead: BeadCoord
  themeId: ThemeId
  isActive: boolean
  isVisited: boolean
  isCelebrating: boolean
  isTapping: boolean
  decadeDelay?: number
}

function BeadNode({
  bead, themeId, isActive, isVisited, isCelebrating, isTapping, decadeDelay = 0,
}: BeadProps) {
  const t      = THEMES[themeId]
  const r      = getRadius(bead.type)
  const gradId = `grad-${bead.type}-${themeId}`
  const [glow1, glow2] = t.glowColors

  let animClass = ''
  if (isTapping)      animClass = 'animate-bead-tap'
  else if (isCelebrating) animClass = 'animate-decade-sparkle'
  else if (isActive)  animClass = 'animate-jewel-glow'

  const style: React.CSSProperties = {
    transformBox:   'fill-box',
    transformOrigin:'center',
    animationDelay: isCelebrating ? `${decadeDelay}ms` : '0ms',
    ['--glow-1' as string]: glow1,
    ['--glow-2' as string]: glow2,
  }

  return (
    <g
      className={animClass}
      style={style}
      filter={isActive ? `url(#glow-filter-${themeId})` : undefined}
    >
      {/* 활성 링 */}
      {isActive && (
        <circle
          cx={bead.x} cy={bead.y} r={r + 5}
          fill="none"
          stroke={glow1}
          strokeWidth={1.5}
          opacity={0.5}
          className="animate-pulse"
        />
      )}

      {/* 구슬 본체 */}
      <circle
        cx={bead.x} cy={bead.y} r={r}
        fill={`url(#${gradId})`}
        stroke={isActive
          ? glow1
          : isVisited
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(0,0,0,0.2)'}
        strokeWidth={isActive ? 1.3 : 0.6}
      />

      {/* 방문 오버레이 */}
      {isVisited && !isActive && (
        <circle cx={bead.x} cy={bead.y} r={r} fill={t.visitedTint} />
      )}

      {/* 3D 하이라이트 */}
      <circle
        cx={bead.x - r * 0.28}
        cy={bead.y - r * 0.30}
        r={r * 0.30}
        fill={t.beadHighlight}
        style={{ pointerEvents: 'none' }}
      />
      {bead.type === 'of' && (
        <circle
          cx={bead.x + r * 0.18}
          cy={bead.y + r * 0.22}
          r={r * 0.13}
          fill="rgba(255,255,255,0.22)"
          style={{ pointerEvents: 'none' }}
        />
      )}
    </g>
  )
}

/* ─────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────── */
export default function RosaryCanvas({
  activeBead,
  currentStep,
  theme: themeId,
  celebratingBeads,
  tappingBead,
}: RosaryCanvasProps) {
  const t = THEMES[themeId]

  const visitedBeads = useMemo(() => {
    const visited = new Set<number>()
    for (let s = 0; s < currentStep; s++) visited.add(STEP_TO_BEAD[s])
    return visited
  }, [currentStep])

  const celebrateDelayMap = useMemo(() => {
    const map = new Map<number, number>()
    const ranges = [
      [1,2,3,4,5,6,7,8,9,10],
      [12,13,14,15,16,17,18,19,20,21],
      [23,24,25,26,27,28,29,30,31,32],
      [34,35,36,37,38,39,40,41,42,43],
      [45,46,47,48,49,50,51,52,53,54],
    ]
    for (const range of ranges) {
      range.forEach((idx, pos) => map.set(idx, pos * 60))
    }
    return map
  }, [])

  /**
   * 체인 호: 루프 54개 beads(bead 1~54) 반시계방향 arc
   * SVG arc sweep-flag=0 → 반시계방향
   * large-arc-flag=1 (335° > 180°)
   */
  const chainArcPath = useMemo(() => {
    const first = BEAD_COORDINATES[1]   // bead 1 (77.5°, 오른쪽 하단)
    const last  = BEAD_COORDINATES[54]  // bead 54 (102.5°, 왼쪽 하단)
    // sweep-flag=0 → counter-clockwise
    return `M ${first.x} ${first.y} A ${RX} ${RY} 0 1 0 ${last.x} ${last.y}`
  }, [])

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="묵주 구슬 UI"
      style={{ display: 'block' }}
    >
      <BeadGradientDefs themeId={themeId} />

      {/* ── 체인: 루프 호 ── */}
      <path
        d={chainArcPath}
        fill="none"
        stroke={t.chainColor}
        strokeWidth={1.8}
      />

      {/* ── 체인: 방석(bead 0)→루프 시작 bead 1 연결 ── */}
      <line
        x1={JUNCTION_X} y1={JUNCTION_Y}
        x2={BEAD_COORDINATES[1].x} y2={BEAD_COORDINATES[1].y}
        stroke={t.chainColor} strokeWidth={1.8}
      />
      {/* ── 체인: 방석(bead 0)→루프 끝 bead 54 연결 ── */}
      <line
        x1={JUNCTION_X} y1={JUNCTION_Y}
        x2={BEAD_COORDINATES[54].x} y2={BEAD_COORDINATES[54].y}
        stroke={t.chainColor} strokeWidth={1.8}
      />

      {/* ── 체인: 방석→십자가 펜던트 세로선 ── */}
      <line
        x1={JUNCTION_X} y1={JUNCTION_Y}
        x2={CRUCIFIX_POS.x} y2={CRUCIFIX_POS.y - 5}
        stroke={t.chainColor} strokeWidth={1.8}
      />

      {/* ── 방석 메달 (bead 0, 체인 위에 렌더) ── */}
      <CenterMedal
        themeId={themeId}
        isActive={activeBead === 0}
        isVisited={visitedBeads.has(0)}
        isTapping={tappingBead === 0}
      />

      {/* ── 나머지 58개 구슬 (bead 1-58, bead 0은 CenterMedal로 처리) ── */}
      {BEAD_COORDINATES.filter(b => b.index !== 0).map((bead) => (
        <BeadNode
          key={bead.index}
          bead={bead}
          themeId={themeId}
          isActive={bead.index === activeBead}
          isVisited={visitedBeads.has(bead.index)}
          isCelebrating={celebratingBeads.has(bead.index)}
          isTapping={bead.index === tappingBead}
          decadeDelay={celebrateDelayMap.get(bead.index) ?? 0}
        />
      ))}

      {/* ── 십자가 ── */}
      <Crucifix x={CRUCIFIX_POS.x} y={CRUCIFIX_POS.y} color={t.crossColor} />
    </svg>
  )
}
