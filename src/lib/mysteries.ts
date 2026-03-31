/**
 * 신비 선택 로직
 * 실제 신비 데이터는 /src/data/mysteries.ts 에 있습니다.
 * 요일별 신비 배정 로직은 /src/data/liturgy.ts 에 있습니다.
 */
import { MYSTERY_SETS } from '@/data/mysteries'
import { getMysteryKeyForToday } from '@/data/liturgy'

/** 기존 컴포넌트 import 경로 유지 — re-export */
export type { MysteryKey, Mystery, MysterySet } from '@/data/mysteries'
export { MYSTERY_SETS } from '@/data/mysteries'
export { getMysteryKeyForToday } from '@/data/liturgy'

export function getMysteryForToday() {
  return MYSTERY_SETS[getMysteryKeyForToday()]
}
