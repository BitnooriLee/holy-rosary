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
    <div className="rosary-app-root relative flex flex-col h-screen">

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

      {/* ── ④ 앱 푸터 ── */}
      <footer
        className="shrink-0 flex flex-col items-center justify-center text-center"
        style={{
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)',
          paddingTop: '0.35rem',
          color: 'var(--text-muted)',
          letterSpacing: '-0.01em',
          opacity: 0.75,
        }}
      >
        <nav aria-label="하단 메뉴" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem' }}>
          <Link href="/guide" style={{ color: 'inherit', textDecoration: 'none', padding: '0.25rem 0.4rem' }}>
            묵주기도 바치는 법
          </Link>
          <span aria-hidden style={{ opacity: 0.4 }}>|</span>
          <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none', padding: '0.25rem 0.4rem' }}>
            개인정보처리방침
          </Link>
        </nav>
        <p style={{ fontSize: '0.62rem', opacity: 0.5, margin: 0 }}>
          © 2026 은총이 가득히 · Digital Rosary KR
        </p>
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

/** 스크롤 시 노출되는 SEO 전용 묵주기도 가이드 섹션 */
function RosaryGuideSection() {
  return (
    <section
      aria-label="묵주기도 안내"
      style={{
        fontFamily: "-apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
        letterSpacing: '-0.02em',
        background: 'var(--bg-fallback, #f2f2f7)',
        padding: '3rem 1.5rem 4rem',
        color: '#1c1c1e',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
          묵주기도 바치는 법 — 간편 안내
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#8e8e93', marginBottom: '2rem' }}>
          더 자세한 내용은{' '}
          <Link href="/guide" style={{ color: '#1a6b5c', textDecoration: 'underline' }}>
            묵주기도 완전 가이드 페이지
          </Link>
          에서 확인하세요.
        </p>

        {/* ── 개요 ── */}
        <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: '#3a3a3c', marginBottom: '1.5rem' }}>
          묵주기도(黙珠祈禱, Rosary Prayer)는 천주교 신자들이 가장 많이 바치는 기도 가운데 하나입니다.
          59개의 묵주알을 손에 쥐고 사도신경·주님의 기도·성모송·영광송을 순서에 따라 바치며,
          예수님의 삶을 묵상하는 <strong>묵상 기도</strong>입니다.
          단순한 암송이 아니라 마음으로 예수님의 신비 — 탄생, 수난, 부활, 승천 — 에 함께 머무는
          <strong>복음 기도</strong>라고도 불립니다.
        </p>

        {/* ── 묵주 구조 ── */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.75rem 0 0.6rem' }}>묵주의 구조</h3>
        <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: '#3a3a3c', marginBottom: '1rem' }}>
          5단 묵주는 총 59개의 구슬로 이루어집니다.
          십자가에서 시작하여 큰 구슬 1개(주님의 기도) → 작은 구슬 3개(성모송) → 큰 구슬 1개(영광송)의
          <strong>시작 부분</strong>이 이어지고, 방석 메달(중앙 메달)을 지나
          <strong>5단 고리</strong>(큰 구슬 1개 + 작은 구슬 10개) × 5번 반복으로 구성됩니다.
          마지막 영광송을 바친 뒤 방석 메달로 돌아와 성모찬송(살베 레지나)을 바치며 마칩니다.
        </p>

        {/* ── 기도 순서 ── */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.75rem 0 0.6rem' }}>기도 순서</h3>
        <ol style={{ paddingLeft: '1.4rem', fontSize: '0.92rem', lineHeight: 2.1, color: '#3a3a3c' }}>
          <li>십자가를 잡고 <strong>사도신경</strong> 바침 — 신앙 고백</li>
          <li>큰 구슬 1개 — <strong>주님의 기도</strong></li>
          <li>작은 구슬 3개 — <strong>성모송 3번</strong> (믿음·소망·사랑 지향)</li>
          <li>큰 구슬 1개 — <strong>영광송</strong> + 파티마 기도</li>
          <li>방석 메달에서 오늘의 <strong>신비 선포</strong> (예: "제1단 고통의 신비, 예수님의 겟세마니 기도를 묵상합시다")</li>
          <li>큰 구슬 1개 — 주님의 기도</li>
          <li>작은 구슬 10개 — 성모송 10번 (신비 묵상하며)</li>
          <li>영광송 + 파티마 기도</li>
          <li>2단~5단 반복 (5→8 반복)</li>
          <li>방석 메달로 돌아와 <strong>성모찬송(살베 레지나)</strong>으로 마침</li>
        </ol>

        {/* ── 요일별 신비 ── */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.75rem 0 0.6rem' }}>요일별 신비 배정</h3>
        <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: '#3a3a3c', marginBottom: '0.75rem' }}>
          교회 전통에 따라 요일마다 묵상하는 신비가 다릅니다. 이 앱은 날짜에 맞춰 자동으로 신비를 선택합니다.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem', fontSize: '0.88rem', color: '#3a3a3c' }}>
          {[
            ['월요일·토요일', '환희의 신비 🌸', '예수님의 탄생과 유년 시절'],
            ['화요일·금요일', '고통의 신비 🩸', '수난과 십자가의 죽음'],
            ['수요일·일요일', '영광의 신비 ✨', '부활·승천·성령 강림'],
            ['목요일', '빛의 신비 💫', '공생활과 기적들'],
          ].map(([day, mystery, desc]) => (
            <div key={day} style={{ background: 'rgba(0,0,0,0.04)', borderRadius: '10px', padding: '0.6rem 0.8rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{day}</div>
              <div style={{ color: '#555', fontSize: '0.82rem' }}>{mystery}</div>
              <div style={{ color: '#888', fontSize: '0.78rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* ── 핵심 기도문 ── */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.75rem 0 0.6rem' }}>핵심 기도문 소개</h3>
        <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: '#3a3a3c', marginBottom: '1rem' }}>
          <strong>사도신경</strong>은 교회가 세례 준비 교육에서 사용하던 신앙 고백문으로, 삼위일체 신앙을 요약합니다.
          <strong> 주님의 기도</strong>는 예수님께서 직접 제자들에게 가르치신 유일한 기도(마태 6,9)이며,
          하느님 중심의 삶("아버지의 나라가 오시며")과 우리의 필요("일용할 양식")를 함께 담고 있습니다.
          <strong> 성모송</strong>의 전반부는 루카복음의 천사 가브리엘 인사(루카 1,28)와 엘리사벳의 인사(루카 1,42)를
          그대로 기도문으로 한 것이며, 후반부 "이제와 저희 죽을 때에"는 15세기에 덧붙여졌습니다.
          묵주기도 한 번에 성모송을 53번 반복하는 것은 단순한 주문이 아니라, 예수님을 품으신 마리아의
          마음속에 머무르는 묵상의 방법입니다.
        </p>

        {/* ── 4가지 신비 ── */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.75rem 0 0.6rem' }}>4가지 신비 (20단)</h3>
        <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: '#3a3a3c', marginBottom: '1rem' }}>
          묵주기도는 예수님의 삶을 <strong>환희·빛·고통·영광</strong>의 4가지 주제로 묵상합니다.
          <br /><br />
          <strong>환희의 신비</strong>: 예수님의 탄생과 유년 시절 — 수태고지, 엘리사벳 방문, 예수님 탄생, 성전 봉헌, 성전에서 발견.<br />
          <strong>빛의 신비</strong>: 예수님의 공생활 기적 — 세례, 카나 혼인 기적, 하느님 나라 선포, 거룩한 변모, 성체 제정.<br />
          <strong>고통의 신비</strong>: 수난과 죽음 — 겟세마니 기도, 채찍질, 가시 면류관, 십자가 지심, 십자가 죽음.<br />
          <strong>영광의 신비</strong>: 부활과 승천 — 부활, 승천, 성령 강림, 성모 승천, 성모의 영광스러운 모후직.
        </p>

        {/* ── 효과와 팁 ── */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.75rem 0 0.6rem' }}>처음 시작하는 분을 위한 팁</h3>
        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.92rem', lineHeight: 2.1, color: '#3a3a3c' }}>
          <li>처음에는 <strong>1단만</strong> 바쳐보세요. 10분이면 충분합니다.</li>
          <li>기도문을 외우지 못해도 괜찮습니다. 이 앱이 모든 기도문을 안내합니다.</li>
          <li>잡념이 와도 자책하지 마세요. 다시 기도문으로 돌아오면 됩니다.</li>
          <li>걷거나 버스 안에서도 바칠 수 있습니다. 장소와 자세에 제한이 없습니다.</li>
          <li>묵상이 어렵다면 신비의 장면을 <strong>머릿속에 그림으로</strong> 떠올려보세요.</li>
        </ul>

        {/* ── CTA ── */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1.25rem 1.5rem',
          background: 'rgba(26,107,92,0.08)',
          borderRadius: '16px',
          borderLeft: '3px solid #1a6b5c',
          fontSize: '0.88rem',
          lineHeight: 1.8,
          color: '#2d4a44',
        }}>
          <strong>지금 위로 스크롤하여 묵주기도를 시작하세요.</strong><br />
          오늘의 신비가 자동으로 선택되어 있습니다.
          기도 진행 상태는 자동 저장되어 언제든 이어서 바칠 수 있습니다.
        </div>

        <footer style={{ textAlign: 'center', marginTop: '2.5rem', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.5rem' }}>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
            <Link href="/guide" style={{ color: '#1a6b5c', textDecoration: 'none' }}>묵주기도 바치는 법</Link>
            <span style={{ color: '#ccc' }}>|</span>
            <Link href="/privacy" style={{ color: '#1a6b5c', textDecoration: 'none' }}>개인정보처리방침</Link>
            <span style={{ color: '#ccc' }}>|</span>
            <Link href="/" style={{ color: '#1a6b5c', textDecoration: 'none' }}>묵주기도 앱</Link>
          </nav>
          <p style={{ fontSize: '0.72rem', color: '#bbb', margin: 0 }}>
            © 2026 은총이 가득히 · Digital Rosary KR · All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  )
}

/** 페이지 진입점 — RosaryProvider 로 상태 공급 */
export default function HomePage() {
  return (
    <RosaryProvider>
      <RosaryApp />
      <RosaryGuideSection />
    </RosaryProvider>
  )
}
