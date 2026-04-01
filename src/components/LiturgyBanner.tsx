'use client'

import { useState, useEffect } from 'react'
import { MYSTERY_SETS, getMysteryKeyForToday } from '@/lib/mysteries'

const DAILY_VERSES = [
  { verse: '주님은 나의 목자, 나는 아쉬울 것 없어라.',                        ref: '시편 23, 1' },
  { verse: '주님의 자비는 영원하시며 그 진실하심도 영원하다.',                  ref: '시편 117, 2' },
  { verse: '주님, 저를 불쌍히 여기소서, 죄인인 저를.',                         ref: '루카 18, 13' },
  { verse: '내가 분명히 말한다. 너희는 회개하지 않으면 모두 멸망할 것이다.',    ref: '루카 13, 5' },
  { verse: '두려워하지 마라. 나는 처음이요 마지막이며 살아있는 자다.',           ref: '묵시 1, 17-18' },
  { verse: '나도 너를 단죄하지 않는다. 가거라. 이제부터 다시는 죄짓지 마라.',   ref: '요한 8, 11' },
  { verse: '그는 우리의 병고를 메고 갔으며 우리의 고통을 짊어졌다.',            ref: '이사 53, 4' },
]

export default function LiturgyBanner() {
  const [open, setOpen] = useState(false)

  // 날짜 기반 값은 클라이언트에서만 계산 — SSR/CSR 불일치(hydration error) 방지
  const [ms, setMs]       = useState(MYSTERY_SETS['joyful'])
  const [verse, setVerse] = useState(DAILY_VERSES[0])

  useEffect(() => {
    const mk = getMysteryKeyForToday()
    setMs(MYSTERY_SETS[mk])
    setVerse(DAILY_VERSES[new Date().getDay()])
  }, [])

  return (
    <div className="liturgy-banner">
      {/* 토글 버튼 — 오늘의 신비를 표시 */}
      <button
        type="button"
        className="liturgy-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="liturgy-panel"
      >
        <span>
          <span className="liturgy-section-label">오늘의 전례</span>
          {/* 날짜 대신 신비 표시 */}
          <span className="liturgy-date">
            {ms.emoji}&nbsp;{ms.label}
          </span>
        </span>
        <span className={`liturgy-chevron ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {/* 접이식 패널 */}
      <div
        id="liturgy-panel"
        className={`liturgy-panel ${open ? 'liturgy-panel-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="liturgy-panel-inner">
          {/* 성서 말씀 카드 */}
          <div className="scripture-card">
            <p className="scripture-card-label">오늘의 성서 말씀</p>
            <blockquote className="scripture-quote">
              「{verse.verse}」
            </blockquote>
            <p className="scripture-ref">{verse.ref}</p>
          </div>

          {/* 이번 주 신비 소제목 목록 */}
          <div className="mysteries-list">
            {ms.mysteries.map((m, i) => (
              <div key={i} className="mystery-item">
                <span className="mystery-num">{i + 1}</span>
                <span className="mystery-subtitle">{m.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
