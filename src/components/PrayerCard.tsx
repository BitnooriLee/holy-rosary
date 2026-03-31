'use client'

import { useMemo } from 'react'
import { PRAYER_STEPS, PRAYERS } from '@/lib/prayers'
import { MYSTERY_SETS, type MysteryKey } from '@/lib/mysteries'
import { TOTAL_STEPS } from '@/lib/coordinates'

interface PrayerCardProps {
  currentStep: number
  mysteryKey: MysteryKey
  onNext: () => void
  onPrev: () => void
  isComplete: boolean
  progress: number
}

export default function PrayerCard({
  currentStep,
  mysteryKey,
  onNext,
  onPrev,
  isComplete,
  progress,
}: PrayerCardProps) {
  const stepInfo  = PRAYER_STEPS[currentStep]
  const mysteries = MYSTERY_SETS[mysteryKey]

  const { title, prayerText, subtitle } = useMemo(() => {
    if (!stepInfo) return { title: '묵주기도', prayerText: '', subtitle: '' }
    const { type, decade, hmIndex, mysteryIndex } = stepInfo

    switch (type) {
      case 'creed':
        return {
          title: '사도신경 · 주님의 기도',
          prayerText: `${PRAYERS.apostlesCreed}\n\n${PRAYERS.ourFather}`,
          subtitle: '묵주기도를 시작합니다',
        }
      case 'ourFather': {
        const m = mysteryIndex !== undefined ? mysteries.mysteries[mysteryIndex] : null
        return {
          title: `주님의 기도 — 제${decade}단`,
          subtitle: m ? m.subtitle : '',
          prayerText: m
            ? `✦ ${m.title}\n「${m.scripture}」\n\n${m.meditation.slice(0, 120)}…\n\n${PRAYERS.ourFather}`
            : PRAYERS.ourFather,
        }
      }
      case 'hailMary':
        return {
          title: `성모송${decade ? ` — 제${decade}단 ${hmIndex}/10` : ` (예비 ${hmIndex}/3)`}`,
          subtitle: stepInfo.isDecadeEnd ? '영광송 · 구원을 비는 기도' : '',
          prayerText: stepInfo.isDecadeEnd
            ? `${PRAYERS.hailMary}\n\n──────────\n${PRAYERS.gloryBe}\n\n${PRAYERS.fatima}`
            : PRAYERS.hailMary,
        }
      case 'final':
        return {
          title: '마침 기도',
          subtitle: '묵주기도를 마칩니다',
          prayerText: `${PRAYERS.gloryBe}\n\n${PRAYERS.fatima}\n\n──────────\n${PRAYERS.hailHolyQueen}`,
        }
      default:
        return { title: '', prayerText: '', subtitle: '' }
    }
  }, [stepInfo, mysteries, mysteryKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const progressPct = Math.round(progress * 100)

  return (
    /**
     * 레이아웃: flex-column 3-zone
     *   ① .prayer-content  — flex:1, overflow-y:auto (텍스트 스크롤)
     *   ② .prayer-nav      — flex-shrink:0, 버튼 항상 고정
     *   ③ .progress-bottom-track — flex-shrink:0, 진행바
     */
    <>
      {/* ── ① 텍스트 영역 (스크롤 가능, 버튼을 밀지 않음) ── */}
      <div className="prayer-content" key={currentStep}>
        {subtitle && <p className="prayer-subtitle">{subtitle}</p>}
        <h2 className="prayer-title">{title}</h2>

        <div className="prayer-text-scroll">
          {prayerText.split('\n').map((line, i) =>
            line === '' ? (
              <br key={i} />
            ) : (
              <p
                key={i}
                className={
                  line.startsWith('✦')  ? 'mystery-announce'
                  : line.startsWith('「') ? 'scripture-line'
                  : line.startsWith('──') ? 'divider-line'
                  : 'prayer-line'
                }
              >
                {line}
              </p>
            )
          )}
        </div>
      </div>

      {/* ── ② 네비게이션 (항상 하단 고정) ── */}
      <div className="prayer-nav">
        <p className="step-counter">{currentStep + 1} / {TOTAL_STEPS}</p>
        <div className="prayer-nav-buttons">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentStep === 0}
            className="btn-prev"
            aria-label="이전"
          >
            ← 이전
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={isComplete}
            className="btn-next"
            aria-label={isComplete ? '완료' : '다음'}
          >
            {isComplete ? '🙏 완료' : '다음 →'}
          </button>
        </div>
      </div>

      {/* ── ③ 하단 진행바 ── */}
      <div className="progress-bottom-track">
        <div className="progress-bottom-fill" style={{ width: `${progressPct}%` }} />
      </div>
    </>
  )
}
