'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { RosaryProvider, useRosaryContext } from '@/context/RosaryContext'
import { THEMES } from '@/lib/themes'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LiturgyBanner from '@/components/LiturgyBanner'
import PrayerCard from '@/components/PrayerCard'
import { getLiturgicalDateLabel } from '@/data/liturgy'

const RosaryCanvas = dynamic(() => import('@/components/RosaryCanvas'), { ssr: false })

/** 실제 앱 UI — RosaryProvider 내부에서 context 소비 */
function RosaryApp() {
  const rosary = useRosaryContext()
  const t = THEMES[rosary.theme]
  const [liturgyDateStr, setLiturgyDateStr] = useState('')

  /* CSS 변수를 documentElement에 주입 */
  useEffect(() => {
    const root = document.documentElement
    Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v))
  }, [t])

  /* 천주교식 전례력 날짜 계산 (클라이언트에서만) */
  useEffect(() => {
    setLiturgyDateStr(getLiturgicalDateLabel())
  }, [])

  /* Service Worker 등록 */
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {})
    }
  }, [])

  return (
    /*
     * 전체 레이아웃: 4-zone flex-col
     *   ① header  — shrink-0, pt-safe(iOS safe area) + pt-10
     *   ② main    — flex-1, 묵주 SVG 영역
     *   ③ card    — shrink-0, 34vh 고정 (묵주 크기 불변 보장)
     *   ④ footer  — shrink-0, 극소 네비게이션
     */
    <div className="relative flex flex-col h-screen overflow-hidden">

      {/* ── 배경 ── */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-700"
        style={{ background: t.bg.fallback }}
        aria-hidden="true"
      />

      {/* ── ① 헤더 (iOS Safe Area + pt-10) ── */}
      <header className="app-header shrink-0 px-5 pt-safe-top pb-3"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 2.5rem)' }}>

        {/* 천주교식 전례력 날짜 */}
        <div className="mb-3 max-w-xl mx-auto">
          <p className="header-date">{liturgyDateStr}</p>
        </div>

        {/* iOS Segmented Control — 테마 선택 */}
        <div className="max-w-xl mx-auto mb-2.5">
          <ThemeSwitcher current={rosary.theme} onChange={rosary.setTheme} />
        </div>

        {/* 오늘의 전례 배너 */}
        <div className="max-w-xl mx-auto">
          <LiturgyBanner />
        </div>
      </header>

      {/* ── ② 묵주 메인 영역 ── */}
      <main
        className="flex-1 min-h-0 flex items-center justify-center cursor-pointer select-none"
        style={{ padding: '14px 20px' }}
        onClick={rosary.advance}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') ? rosary.advance() : undefined}
        aria-label="다음 기도로 이동"
      >
        <div className="rosary-viewport">
          <RosaryCanvas
            activeBead={rosary.activeBead}
            currentStep={rosary.currentStep}
            theme={rosary.theme}
            celebratingBeads={rosary.celebratingBeads}
            tappingBead={rosary.tappingBead}
          />
        </div>
      </main>

      {/* ── ③ 플로팅 기도 카드 (34vh 고정 → 묵주 크기 불변) ── */}
      <div className="shrink-0 px-5" style={{ height: '34vh', paddingBottom: '0', paddingTop: '2px' }}>
        <div className="floating-card h-full">
          {/* 처음부터 버튼 — 카드 우상단 고정 */}
          <button
            type="button"
            onClick={rosary.restart}
            className="btn-restart"
            aria-label="처음부터 다시 시작"
            title="처음부터"
          >
            ↺
          </button>
          <PrayerCard
            currentStep={rosary.currentStep}
            mysteryKey={rosary.mysteryKey}
            onNext={rosary.advance}
            onPrev={rosary.back}
            isComplete={rosary.isComplete}
            progress={rosary.progress}
          />
        </div>
      </div>

      {/* ── ④ 미니 푸터 네비게이션 ── */}
      <footer
        className="shrink-0 flex items-center justify-center gap-5 text-center"
        style={{
          height: 'calc(env(safe-area-inset-bottom, 0px) + 2.4rem)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          letterSpacing: '-0.01em',
          opacity: 0.7,
        }}
      >
        <Link href="/guide" style={{ color: 'inherit', textDecoration: 'none' }}>
          묵주기도 바치는 법
        </Link>
        <span aria-hidden>·</span>
        <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
          개인정보처리방침
        </Link>
      </footer>

      {/* ── 완료 오버레이 ── */}
      {rosary.isComplete && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={rosary.restart}
          style={{ animation: 'fadeIn .3s ease' }}
        >
          <div
            className="text-center rounded-[32px] mx-5"
            style={{
              padding: '2.5rem 2rem',
              background: 'var(--panel-bg)',
              border: '1px solid var(--panel-border)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
              maxWidth: '22rem',
              width: '100%',
            }}
          >
            <p style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '1rem' }}>🙏</p>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--accent)',
                marginBottom: '0.5rem',
              }}
            >
              묵주기도 완료
            </h2>
            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                marginBottom: '1.75rem',
              }}
            >
              오늘도 마리아님과 함께<br />기도를 마쳤습니다. 🌹
            </p>
            <button
              type="button"
              className="btn-next"
              style={{ width: '100%' }}
              onClick={(e) => { e.stopPropagation(); rosary.restart() }}
            >
              다시 시작
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/** 페이지 진입점 — RosaryProvider 로 상태 공급 */
export default function HomePage() {
  return (
    <RosaryProvider>
      <RosaryApp />
    </RosaryProvider>
  )
}
