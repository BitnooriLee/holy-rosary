'use client'

import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useRosary, type UseRosaryReturn } from '@/hooks/useRosary'
import { type ThemeId } from '@/lib/themes'
import { type MysteryKey } from '@/lib/mysteries'

/** useRosary 와 동일한 스토리지 키 — 단일 진실 공급원 */
const STORAGE_KEY = 'digitalRosaryKR.v3'

function todayDateKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

/**
 * localStorage 초기화 헬퍼
 * — 앱 최초 마운트(또는 리로드) 시 저장된 상태를 읽어 반환합니다.
 * — 날짜가 바뀌면 step을 0으로 초기화하되, theme/mysteryKey는 유지합니다.
 */
export function loadPersistedState(): {
  step?: number
  theme?: ThemeId
  mysteryKey?: MysteryKey
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const data = JSON.parse(raw) as {
      step: number
      theme: ThemeId
      mysteryKey: MysteryKey
      dateKey: string
    }
    if (data.dateKey !== todayDateKey()) {
      // 날짜 변경 → step 초기화, 나머지 유지
      return { theme: data.theme, mysteryKey: data.mysteryKey }
    }
    return { step: data.step, theme: data.theme, mysteryKey: data.mysteryKey }
  } catch {
    return {}
  }
}

/**
 * localStorage 저장 헬퍼
 * — currentStep 이 변경될 때마다 호출됩니다.
 */
export function persistState(step: number, theme: ThemeId, mysteryKey: MysteryKey): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ step, theme, mysteryKey, savedAt: Date.now(), dateKey: todayDateKey() })
    )
  } catch {
    /* Private Mode 등 localStorage 차단 환경에서 무시 */
  }
}

const RosaryContext = createContext<UseRosaryReturn | null>(null)

/**
 * RosaryProvider
 *
 * - useRosary() 로 상태를 생성합니다.
 * - currentStep / theme / mysteryKey 가 바뀔 때마다
 *   localStorage.setItem 으로 자동 저장합니다.
 * - 초기화(getItem)는 useRosary 훅 내부 useEffect 에서 수행됩니다.
 *   (두 곳의 역할을 명확히 분리)
 */
export function RosaryProvider({ children }: { children: ReactNode }) {
  const rosary = useRosary()

  /**
   * ──────────────────────────────────────────────────
   * 단계/테마/신비 변경 → localStorage 즉시 동기화
   * useRosary 내부 persist() 가 이미 동작하지만,
   * Provider 레벨에서도 명시적으로 유지하여 이중 보장합니다.
   * ──────────────────────────────────────────────────
   */
  useEffect(() => {
    persistState(rosary.currentStep, rosary.theme, rosary.mysteryKey)
  }, [rosary.currentStep, rosary.theme, rosary.mysteryKey])

  return <RosaryContext.Provider value={rosary}>{children}</RosaryContext.Provider>
}

/**
 * useRosaryContext
 * — RosaryProvider 하위 어느 컴포넌트에서든 호출 가능합니다.
 * — props drilling 없이 currentStep, theme, advance 등에 접근합니다.
 */
export function useRosaryContext(): UseRosaryReturn {
  const ctx = useContext(RosaryContext)
  if (!ctx) throw new Error('useRosaryContext 는 반드시 <RosaryProvider> 안에서 사용해야 합니다.')
  return ctx
}
