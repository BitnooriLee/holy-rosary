import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보처리방침 | 디지털 묵주 — 천주교 묵주기도 앱',
  description:
    '디지털 묵주(Digital Rosary KR) 개인정보처리방침. 로컬 저장소 사용 현황, Google AdSense 행동 기반 광고·DART 쿠키 정책, 맞춤 광고 거부 방법, 아동 정보 보호 정책을 안내합니다.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacy' },
}

const LAST_UPDATED = '2026년 3월 31일'
const SITE_NAME    = '디지털 묵주 (Digital Rosary KR)'
const SITE_URL     = 'https://holy-rosary.vercel.app'
const CONTACT      = 'bitnoorii@gmail.com'

const S = {
  wrap: {
    fontFamily: "-apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
    letterSpacing: '-0.02em',
    color: '#1c1c1e',
    lineHeight: 1.8,
  } as React.CSSProperties,
  main: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '0 1.25rem 4rem',
  } as React.CSSProperties,
  h2: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#1c1c1e',
    margin: '2.5rem 0 0.75rem',
    paddingBottom: '0.4rem',
    borderBottom: '1px solid #e5e5ea',
  } as React.CSSProperties,
  h3: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#3a3a3c',
    margin: '1.5rem 0 0.4rem',
  } as React.CSSProperties,
  p: {
    margin: '0 0 1rem',
    color: '#3a3a3c',
    fontSize: '0.95rem',
    lineHeight: 1.8,
  } as React.CSSProperties,
  ul: {
    paddingLeft: '1.25rem',
    color: '#3a3a3c',
    fontSize: '0.95rem',
    lineHeight: 2.1,
    marginBottom: '1rem',
  } as React.CSSProperties,
  note: {
    fontSize: '0.83rem',
    color: '#888',
    lineHeight: 1.7,
    margin: '0 0 1rem',
  } as React.CSSProperties,
  adBox: {
    margin: '1.25rem 0',
    padding: '1rem 1.25rem',
    background: '#fff8e1',
    borderLeft: '4px solid #f59e0b',
    borderRadius: '0 10px 10px 0',
    fontSize: '0.9rem',
    lineHeight: 1.75,
    color: '#78350f',
  } as React.CSSProperties,
  link: {
    color: '#1a6b5c',
    wordBreak: 'break-all',
  } as React.CSSProperties,
}

export default function PrivacyPage() {
  return (
    <div style={S.wrap}>

      {/* ── 헤더 ── */}
      <header style={{
        background: '#1c1c1e',
        color: '#fff',
        padding: 'clamp(2.5rem,7vw,4rem) 1.5rem 2.25rem',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,.55)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block', marginBottom: '1.75rem' }}>
            ← 묵주기도 앱으로
          </Link>
          <h1 style={{ fontSize: 'clamp(1.6rem,5vw,2.25rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.4rem' }}>
            개인정보처리방침
          </h1>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '0.85rem' }}>
            {SITE_NAME} &middot; 최종 업데이트: {LAST_UPDATED}
          </p>
        </div>
      </header>

      <main style={S.main}>

        {/* 핵심 요약 */}
        <div style={{ margin: '2rem 0', padding: '1.125rem 1.375rem', background: '#e8f5e9', borderRadius: '12px', borderLeft: '4px solid #2e7d32' }}>
          <strong style={{ display: 'block', color: '#1b5e20', marginBottom: '0.3rem', fontSize: '0.95rem' }}>
            핵심 요약
          </strong>
          <p style={{ margin: 0, color: '#2e7d32', fontSize: '0.9rem', lineHeight: 1.7 }}>
            본 앱은 이용자의 개인 식별 정보를 직접 수집하거나 외부 서버로 전송하지 않습니다.
            기기 내 localStorage에 기도 진행 상태만 저장합니다.
            단, <strong>Google AdSense 광고</strong>가 표시될 경우 Google이
            쿠키·광고 식별자를 통해 이용자의 관심사 기반 맞춤 광고를 제공할 수 있으며,
            이에 따라 제한적인 데이터가 Google 서버로 전송될 수 있습니다.
          </p>
        </div>

        {/* 광고 고지 박스 — AdSense 심사 필수 */}
        <div style={S.adBox}>
          <strong style={{ display: 'block', marginBottom: '0.4rem' }}>📢 광고 게재 고지 (Advertising Disclosure)</strong>
          본 웹사이트는 <strong>Google AdSense</strong>를 통해 제3자 광고를 게재합니다.
          Google을 포함한 제3자 광고 사업자는 이용자의 본 사이트 및 타 사이트 방문 이력을 기반으로
          맞춤형 광고(Interest-Based Advertising)를 표시하기 위해 <strong>쿠키</strong> 및
          <strong> 광고 식별자</strong>를 사용합니다.
          이용자는 언제든지 아래 제5조의 방법으로 맞춤 광고를 거부할 수 있습니다.
        </div>

        {/* ══════════════ 조항 ══════════════ */}

        <section>
          <h2 style={S.h2}>제1조 (목적 및 적용 범위)</h2>
          <p style={S.p}>
            {SITE_NAME}(이하 &quot;서비스&quot;, URL: {SITE_URL})은 이용자의 개인정보 보호를 중요시하며,
            「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」,
            EU 일반 개인정보 보호 규정(GDPR) 등 관련 법령을 준수합니다.
            본 방침은 서비스가 어떤 정보를 어떻게 수집·이용·보관·파기하는지, 그리고 제3자 광고 서비스의 데이터 처리에 대해 명확히 안내합니다.
          </p>
          <p style={S.p}>
            본 방침은 서비스의 웹사이트 및 PWA(Progressive Web App) 전체에 적용됩니다.
            서비스가 연결하는 외부 링크(Google, Vercel 등)는 각 사업자의 개인정보 방침에 따라 별도로 적용됩니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제2조 (수집하는 정보 및 방법)</h2>

          <h3 style={S.h3}>① 서비스가 직접 저장하는 정보 (기기 로컬, 외부 전송 없음)</h3>
          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', minWidth: '480px' }}>
              <thead>
                <tr style={{ background: '#f2f2f7' }}>
                  {['저장 항목', '저장 위치', '목적', '보유 기간'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.875rem', color: '#555', fontWeight: 600, borderBottom: '1px solid #ddd' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['기도 진행 단계 (step)',   '기기 localStorage', '앱 재시작 시 이어하기',   '날짜가 바뀌면 자동 초기화'],
                  ['선택 테마 (theme)',        '기기 localStorage', '테마 설정 유지',           '앱 데이터 삭제 시'],
                  ['오늘의 신비 (mysteryKey)', '기기 localStorage', '요일별 신비 자동 선택',    '앱 데이터 삭제 시'],
                  ['마지막 저장 날짜',          '기기 localStorage', '날짜 변경 여부 확인',      '앱 데이터 삭제 시'],
                ].map(([item, loc, purpose, period]) => (
                  <tr key={item} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    {[item, loc, purpose, period].map((v, i) => (
                      <td key={i} style={{ padding: '0.55rem 0.875rem', color: '#333', verticalAlign: 'top' }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={S.note}>
            ※ 위 데이터는 이용자의 기기에만 저장되며, 인터넷을 통해 외부로 전송되지 않습니다.
            브라우저 캐시·사이트 데이터를 삭제하면 즉시 파기됩니다.
          </p>

          <h3 style={S.h3}>② Google AdSense가 수집하는 정보 (제3자 수집)</h3>
          <p style={S.p}>
            본 서비스는 <strong>Google AdSense</strong>를 통해 광고를 게재합니다.
            Google 및 그 파트너사는 광고 제공을 위해 이용자 기기에 쿠키를 저장하거나
            유사한 기술(광고 식별자, 픽셀 태그 등)을 사용하여 아래 정보를 수집할 수 있습니다.
          </p>
          <ul style={S.ul}>
            <li><strong>DART 쿠키(DoubleClick Cookie)</strong> — 광고 게재·빈도 조절·사기 방지용</li>
            <li>방문 페이지 URL, 참조(Referrer) URL</li>
            <li>IP 주소 (광고 지역 타겟팅 및 집계 통계용)</li>
            <li>기기 유형, 브라우저 종류, 운영 체제</li>
            <li>광고 클릭 이력 및 페이지 체류 시간 (집계 통계)</li>
            <li>대략적인 위치 정보 (국가·도시 수준)</li>
          </ul>
          <p style={S.p}>
            Google은 수집한 정보를 자체 개인정보 방침에 따라 처리합니다.
            Google이 데이터를 수집·사용하는 방식에 대한 자세한 내용은{' '}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={S.link}>
              Google 파트너 사이트에서의 Google 데이터 사용
            </a>
            을 참조하십시오.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제3조 (개인정보의 이용 목적)</h2>
          <p style={S.p}>서비스는 수집한 정보를 아래 목적 이외에 사용하지 않습니다.</p>
          <ul style={S.ul}>
            <li>기도 진행 상태 저장 및 복원 (이어하기 기능)</li>
            <li>이용자가 선택한 테마·신비 설정 유지</li>
          </ul>
          <p style={S.p}>
            Google AdSense가 수집하는 데이터는 서비스와 무관하며, Google의 목적에 따라 처리됩니다
            (행동 기반 광고 게재, 광고 효과 측정, 사기 방지 등).
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제4조 (쿠키(Cookie) 정책 — 유형별 분류)</h2>

          <h3 style={S.h3}>① 필수 쿠키 (Essential Cookies)</h3>
          <p style={S.p}>
            서비스 자체는 쿠키를 사용하지 않습니다. 기도 진행 상태는 쿠키가 아닌 <code>localStorage</code>에 저장됩니다.
          </p>

          <h3 style={S.h3}>② 광고/타겟팅 쿠키 (Advertising Cookies) — Google AdSense</h3>
          <p style={S.p}>
            Google AdSense는 이용자에게 맞춤형 광고를 제공하기 위해 아래 쿠키를 사용합니다.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', minWidth: '500px' }}>
              <thead>
                <tr style={{ background: '#f2f2f7' }}>
                  {['쿠키 이름', '제공사', '목적', '만료'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.875rem', color: '#555', fontWeight: 600, borderBottom: '1px solid #ddd' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['NID / DSID',  'Google', '맞춤형 광고 게재 (DART)', '6개월'],
                  ['IDE',         'Google DoubleClick', '광고 빈도 조절 및 효과 측정', '1년'],
                  ['ANID',        'Google', '사용자 관심사 기반 광고', '1년 6개월'],
                  ['1P_JAR',      'Google', '광고 전환 추적', '1개월'],
                  ['CONSENT',     'Google', '이용자 동의 상태 저장', '20년'],
                ].map(([name, provider, purpose, expires]) => (
                  <tr key={name} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    {[name, provider, purpose, expires].map((v, i) => (
                      <td key={i} style={{ padding: '0.55rem 0.875rem', color: '#333', verticalAlign: 'top', fontSize: '0.85rem' }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={S.note}>
            ※ 위 목록은 대표적인 Google AdSense 쿠키이며, Google 정책 변경에 따라 달라질 수 있습니다.
            최신 정보는{' '}
            <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" style={S.link}>
              Google 쿠키 정책
            </a>
            을 참조하십시오.
          </p>

          <h3 style={S.h3}>③ 쿠키 비활성화 방법</h3>
          <ul style={S.ul}>
            <li><strong>Chrome:</strong> 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터</li>
            <li><strong>Safari(iOS):</strong> 설정 → Safari → 개인정보 보호 → 크로스 사이트 추적 방지</li>
            <li><strong>Firefox:</strong> 설정 → 개인정보 및 보안 → 쿠키 및 사이트 데이터</li>
            <li><strong>Edge:</strong> 설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리</li>
          </ul>
          <p style={S.note}>※ 쿠키를 비활성화해도 서비스 이용에는 영향이 없습니다. 단, Google 광고는 계속 표시되나 관련성이 낮아질 수 있습니다.</p>
        </section>

        <section>
          <h2 style={S.h2}>제5조 (맞춤 광고 거부 — 행동 기반 광고 opt-out)</h2>
          <p style={S.p}>
            본 서비스에는 Google AdSense를 통한 <strong>관심사 기반 광고(Interest-Based Advertising, IBA)</strong>가
            표시될 수 있습니다. IBA는 이용자의 웹 브라우징 이력을 바탕으로 관련성 높은 광고를 보여주는 기술입니다.
            이용자는 아래 방법으로 IBA를 거부할 수 있습니다.
          </p>
          <ul style={S.ul}>
            <li>
              <strong>Google 광고 설정 (권장):</strong>{' '}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={S.link}>
                https://adssettings.google.com
              </a>
              {' '}— Google 계정에서 맞춤 광고 ON/OFF 제어
            </li>
            <li>
              <strong>Google Analytics 거부 플러그인 (브라우저 확장):</strong>{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={S.link}>
                https://tools.google.com/dlpage/gaoptout
              </a>
            </li>
            <li>
              <strong>NAI(Network Advertising Initiative) 탈퇴:</strong>{' '}
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" style={S.link}>
                https://optout.networkadvertising.org/
              </a>
            </li>
            <li>
              <strong>DAA(Digital Advertising Alliance) 소비자 선택:</strong>{' '}
              <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" style={S.link}>
                https://optout.aboutads.info/
              </a>
            </li>
            <li>
              <strong>모바일 기기 광고 ID 초기화:</strong>{' '}
              iOS: 설정 → 개인정보 보호 및 보안 → Apple 광고 → 광고 ID 재설정 /
              Android: 설정 → 개인정보 보호 → 광고 → 광고 ID 초기화
            </li>
          </ul>
          <p style={S.note}>
            ※ 거부 설정은 해당 기기의 해당 브라우저에만 적용됩니다. 기기 변경 또는 쿠키 삭제 시 재설정이 필요합니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제6조 (제3자 서비스 목록 및 데이터 처리)</h2>
          <p style={S.p}>본 서비스는 아래 제3자 서비스를 사용하며, 각 사업자는 자체 개인정보 방침에 따라 데이터를 처리합니다.</p>
          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', minWidth: '500px' }}>
              <thead>
                <tr style={{ background: '#f2f2f7' }}>
                  {['서비스명', '목적', '처리 국가', '개인정보 방침'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.875rem', color: '#555', fontWeight: 600, borderBottom: '1px solid #ddd' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Google AdSense', '광고 게재·맞춤 광고', '미국 (+ 전세계 Google 데이터센터)', 'policies.google.com/privacy'],
                  ['Vercel', '웹사이트 호스팅·CDN', '미국 (+ EU 가능)', 'vercel.com/legal/privacy-policy'],
                  ['Google Fonts', '웹폰트(Noto Sans KR)', '미국', 'policies.google.com/privacy'],
                ].map(([name, purpose, country, policy]) => (
                  <tr key={name} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '0.55rem 0.875rem', color: '#333', verticalAlign: 'top', fontSize: '0.85rem', fontWeight: 600 }}>{name}</td>
                    <td style={{ padding: '0.55rem 0.875rem', color: '#333', verticalAlign: 'top', fontSize: '0.85rem' }}>{purpose}</td>
                    <td style={{ padding: '0.55rem 0.875rem', color: '#333', verticalAlign: 'top', fontSize: '0.85rem' }}>{country}</td>
                    <td style={{ padding: '0.55rem 0.875rem', verticalAlign: 'top', fontSize: '0.82rem' }}>
                      <a href={`https://${policy}`} target="_blank" rel="noopener noreferrer" style={S.link}>{policy}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={S.p}>
            <strong>국제 데이터 이전:</strong> Google AdSense 및 Vercel은 미국 및 기타 국가에 서버를 운영합니다.
            이에 따라 이용자의 데이터(IP 주소, 쿠키 등)가 대한민국 외부로 전송될 수 있습니다.
            Google은 EU-US 데이터 프라이버시 프레임워크(Data Privacy Framework)에 가입되어 있으며,
            GDPR 표준 계약 조항(SCC)을 통해 데이터를 보호합니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제7조 (제3자 데이터 판매·제공 금지)</h2>
          <p style={S.p}>
            서비스 운영자는 이용자의 데이터를 어떠한 제3자에게도 <strong>판매·임대·제공·위탁하지 않습니다.</strong>
            단, 다음 경우는 예외입니다.
          </p>
          <ul style={S.ul}>
            <li>법령의 규정에 의거하거나 수사기관·법원의 적법한 요청이 있는 경우</li>
            <li>이용자의 생명·신체·재산 보호를 위해 긴급하게 필요한 경우</li>
          </ul>
          <p style={S.note}>※ Google AdSense 등 제3자 서비스가 자체 방침에 따라 데이터를 처리하는 것은 위 금지 조항에 해당하지 않습니다.</p>
        </section>

        <section>
          <h2 style={S.h2}>제8조 (이용자의 권리)</h2>
          <p style={S.p}>이용자는 다음 권리를 행사할 수 있습니다.</p>
          <ul style={S.ul}>
            <li><strong>열람권:</strong> localStorage에 저장된 데이터는 브라우저 DevTools → Application → Local Storage에서 직접 확인 가능</li>
            <li><strong>삭제권:</strong> 브라우저 설정 → 사이트 데이터 삭제, 또는 앱 내 &quot;처음부터&quot; 버튼으로 진행 데이터 초기화</li>
            <li><strong>이의 제기권:</strong> 서비스가 수집하지 않는 정보에 대한 이의는 이메일로 연락 가능</li>
          </ul>

          <h3 style={S.h3}>EU/EEA 이용자 추가 권리 (GDPR Art. 15–22)</h3>
          <p style={S.p}>
            유럽 경제 지역(EEA) 내 이용자는 GDPR에 따라 추가적인 권리를 보유합니다.
            서비스 운영자가 직접 수집하는 데이터가 없으므로, Google AdSense 관련 GDPR 요청은
            Google의 데이터 주체 권리 요청 포털(
            <a href="https://support.google.com/policies/troubleshooter/7575787" target="_blank" rel="noopener noreferrer" style={S.link}>
              Google DSR
            </a>
            )을 통해 행사하십시오.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제9조 (만 14세 미만 아동의 개인정보 — COPPA 준수)</h2>
          <p style={S.p}>
            서비스는 만 14세 미만 아동(미국 기준 만 13세 미만, COPPA 적용)을 대상으로
            개인정보를 의도적으로 수집하지 않습니다.
            보호자는 자녀의 서비스 이용 시 Google Family Link 또는 브라우저 자녀 보호 기능을 활용하여
            맞춤 광고를 제한할 수 있습니다.
            아동의 개인정보가 수집되었다고 판단될 경우 즉시 삭제 조치합니다.
            관련 문의는 아래 연락처로 보내주십시오.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제10조 (개인정보의 보유 및 파기)</h2>
          <p style={S.p}>
            서비스가 localStorage에 저장하는 데이터는 이용자가 직접 브라우저 데이터를 삭제하거나
            앱 내 &quot;처음부터&quot; 기능을 사용할 때 즉시 파기됩니다.
            서버에 개인정보를 저장하지 않으므로 별도의 서버 측 파기 절차는 없습니다.
          </p>
          <p style={S.p}>
            Google AdSense 쿠키의 보유 기간은 제4조 표를 참조하십시오.
            Google은 데이터 보유 정책에 따라 일정 기간 후 자동 삭제합니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제11조 (개인정보처리방침의 변경)</h2>
          <p style={S.p}>
            본 방침은 관련 법령 또는 서비스 정책 변경에 따라 개정될 수 있습니다.
            변경 시 이 페이지 상단의 &quot;최종 업데이트&quot; 날짜를 갱신합니다.
            중요한 변경 사항은 앱 내 공지를 통해 별도로 안내합니다.
            변경 사항은 게시일로부터 <strong>7일 후</strong> 효력이 발생합니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제12조 (개인정보보호책임자 및 연락처)</h2>
          <p style={S.p}>개인정보 처리에 관한 문의, 열람·정정·삭제 요청은 아래로 연락해 주십시오.</p>
          <div style={{ padding: '1.125rem 1.375rem', background: '#f2f2f7', borderRadius: '12px', fontSize: '0.9rem', lineHeight: 2.2, color: '#3a3a3c' }}>
            <strong>서비스명:</strong> {SITE_NAME}<br />
            <strong>웹사이트:</strong> <a href={SITE_URL} style={S.link}>{SITE_URL}</a><br />
            <strong>문의 이메일:</strong>{' '}
            <a href={`mailto:${CONTACT}`} style={S.link}>{CONTACT}</a><br />
            <strong>처리 기한:</strong> 수신 후 영업일 기준 7일 이내<br />
            <strong>시행일:</strong> {LAST_UPDATED}
          </div>
        </section>

        {/* 하단 링크 */}
        <footer style={{ marginTop: '3rem', borderTop: '1px solid #e5e5ea', paddingTop: '1.5rem', textAlign: 'center' }}>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ color: '#1a6b5c', textDecoration: 'none' }}>← 묵주기도 앱</Link>
            <span style={{ color: '#ccc' }}>|</span>
            <Link href="/guide" style={{ color: '#1a6b5c', textDecoration: 'none' }}>묵주기도 바치는 법</Link>
          </nav>
          <p style={{ fontSize: '0.72rem', color: '#bbb', margin: 0 }}>
            © 2026 은총이 가득히 · Digital Rosary KR · All rights reserved.
          </p>
        </footer>

      </main>
    </div>
  )
}
