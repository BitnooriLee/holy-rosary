'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { STEP_TO_BEAD, DECADE_END_STEPS, DECADE_BEAD_RANGES, TOTAL_STEPS } from '@/lib/coordinates'
import { getMysteryKeyForToday, type MysteryKey } from '@/lib/mysteries'
import { type ThemeId } from '@/lib/themes'

const STORAGE_KEY = 'digitalRosaryKR.v3'

interface SavedState {
  step: number
  theme: ThemeId
  mysteryKey: MysteryKey
  savedAt: number
  dateKey: string
}

function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function loadSaved(): Partial<SavedState> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as SavedState
    // 날짜가 바뀌면 step만 초기화 (테마는 유지)
    if (data.dateKey !== todayKey()) {
      return { theme: data.theme, mysteryKey: data.mysteryKey }
    }
    return data
  } catch {
    return null
  }
}

export interface UseRosaryReturn {
  currentStep: number
  totalSteps: number
  activeBead: number
  theme: ThemeId
  mysteryKey: MysteryKey
  celebratingBeads: Set<number>
  tappingBead: number | null
  progress: number
  isComplete: boolean
  advance: () => void
  back: () => void
  setTheme: (t: ThemeId) => void
  restart: () => void
}

export function useRosary(): UseRosaryReturn {
  const [step, setStep] = useState(0)
  const [theme, setThemeState] = useState<ThemeId>('tiffany')
  const [mysteryKey, setMysteryKey] = useState<MysteryKey>(getMysteryKeyForToday())
  const [celebratingBeads, setCelebratingBeads] = useState<Set<number>>(new Set())
  const [tappingBead, setTappingBead] = useState<number | null>(null)
  const celebrateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── 초기 로드 ── */
  useEffect(() => {
    const saved = loadSaved()
    if (saved) {
      if (saved.step !== undefined) setStep(saved.step)
      if (saved.theme) setThemeState(saved.theme)
      if (saved.mysteryKey) setMysteryKey(saved.mysteryKey)
      else setMysteryKey(getMysteryKeyForToday())
    }
  }, [])

  /* ── 저장 ── */
  const persist = useCallback(
    (s: number, t: ThemeId, mk: MysteryKey) => {
      try {
        const data: SavedState = {
          step: s, theme: t, mysteryKey: mk,
          savedAt: Date.now(), dateKey: todayKey(),
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch { /* private mode */ }
    },
    []
  )

  /* ── pagehide 저장 ── */
  useEffect(() => {
    const save = () => persist(step, theme, mysteryKey)
    window.addEventListener('pagehide', save)
    return () => window.removeEventListener('pagehide', save)
  }, [step, theme, mysteryKey, persist])

  /* ── 진동 피드백 ── */
  const haptic = useCallback((ms: number | number[]) => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(ms)
      }
    } catch { /* 지원 안 하는 환경 */ }
  }, [])

  /* ── 단 완료 축하 애니메이션 ── */
  const triggerCelebration = useCallback((beadIndices: number[]) => {
    if (celebrateTimerRef.current) clearTimeout(celebrateTimerRef.current)
    setCelebratingBeads(new Set(beadIndices))
    haptic([60, 40, 60, 40, 80])
    celebrateTimerRef.current = setTimeout(() => {
      setCelebratingBeads(new Set())
    }, 1200)
  }, [haptic])

  /* ── 다음 단계 ── */
  const advance = useCallback(() => {
    if (step >= TOTAL_STEPS - 1) return
    const nextStep = step + 1
    haptic(45)

    // 탭 애니메이션
    setTappingBead(STEP_TO_BEAD[step])
    setTimeout(() => setTappingBead(null), 320)

    // 단 완료 체크: step 14=1단끝, 25=2단끝, 36=3단끝, 47=4단끝, 58=5단끝
    const decadeEndToRange: Record<number, number> = { 14: 0, 25: 1, 36: 2, 47: 3, 58: 4 }
    if (step in decadeEndToRange) {
      const rangeIdx = decadeEndToRange[step]
      if (DECADE_BEAD_RANGES[rangeIdx]) triggerCelebration(DECADE_BEAD_RANGES[rangeIdx])
    }

    setStep(nextStep)
    persist(nextStep, theme, mysteryKey)
  }, [step, theme, mysteryKey, haptic, persist, triggerCelebration])

  /* ── 이전 단계 ── */
  const back = useCallback(() => {
    if (step <= 0) return
    haptic(30)
    const prevStep = step - 1
    setStep(prevStep)
    persist(prevStep, theme, mysteryKey)
  }, [step, theme, mysteryKey, haptic, persist])

  /* ── 테마 변경 ── */
  const setTheme = useCallback((t: ThemeId) => {
    haptic(50)
    setThemeState(t)
    persist(step, t, mysteryKey)
  }, [step, mysteryKey, haptic, persist])

  /* ── 처음부터 ── */
  const restart = useCallback(() => {
    haptic([80, 40, 80])
    setStep(0)
    const mk = getMysteryKeyForToday()
    setMysteryKey(mk)
    persist(0, theme, mk)
  }, [theme, haptic, persist])

  return {
    currentStep: step,
    totalSteps: TOTAL_STEPS,
    activeBead: STEP_TO_BEAD[step],
    theme,
    mysteryKey,
    celebratingBeads,
    tappingBead,
    progress: step / (TOTAL_STEPS - 1),
    isComplete: step >= TOTAL_STEPS - 1,  // step 59 = 방석 귀환 완료
    advance,
    back,
    setTheme,
    restart,
  }
}
