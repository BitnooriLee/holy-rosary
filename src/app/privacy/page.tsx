import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보처리방침 | 디지털 묵주',
  description:
    '디지털 묵주 앱의 개인정보처리방침입니다. Google AdSense 광고 사용, 쿠키 정책, 데이터 수집 내역을 안내합니다.',
}

const LAST_UPDATED = '2026년 3월 31일'
const SITE_NAME    = '디지털 묵주 (Digital Rosary KR)'
const CONTACT      = 'bitnoorii@gmail.com'   /* 실제 연락처로 변경 */

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
  p: {
    margin: '0 0 1rem',
    color: '#3a3a3c',
    fontSize: '0.95rem',
    lineHeight: 1.8,
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

        {/* 요약 배너 */}
        <div style={{
          margin: '2rem 0',
          padding: '1.125rem 1.375rem',
          background: '#e8f5e9',
          borderRadius: '12px',
          borderLeft: '4px solid #2e7d32',
        }}>
          <strong style={{ display: 'block', color: '#1b5e20', marginBottom: '0.3rem', fontSize: '0.95rem' }}>
            핵심 요약
          </strong>
          <p style={{ margin: 0, color: '#2e7d32', fontSize: '0.9rem', lineHeight: 1.7 }}>
            본 앱은 이용자의 개인 식별 정보를 수집하거나 외부 서버로 전송하지 않습니다.
            기기 내 localStorage에 기도 진행 상태만 저장하며, Google AdSense 광고를 통해
            쿠키가 사용될 수 있습니다.
          </p>
        </div>

        {/* ── 조항 ── */}
        <section>
          <h2 style={S.h2}>제1조 (목적)</h2>
          <p style={S.p}>
            {SITE_NAME}(이하 "서비스")은 이용자의 개인정보 보호를 중요시하며, 「개인정보 보호법」,
            「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수합니다.
            본 방침은 서비스가 어떤 정보를 어떻게 수집·이용·보관·파기하는지를 명확히 안내하기 위해 작성되었습니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제2조 (수집하는 개인정보 항목)</h2>
          <p style={S.p}>
            서비스 자체는 이름, 이메일, 전화번호, IP 주소 등 개인을 식별할 수 있는 정보를 수집하지 않습니다.
            서비스 이용 중 이용자 기기의 <strong>브라우저 로컬 저장소(localStorage)</strong>에 다음 항목이 저장됩니다.
          </p>
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
                  ['기도 진행 단계 (step)',  '기기 localStorage', '앱 재시작 시 이어하기',      '날짜가 바뀌면 자동 초기화'],
                  ['선택 테마 (theme)',       '기기 localStorage', '테마 설정 유지',             '앱 데이터 삭제 시'],
                  ['오늘의 신비 (mysteryKey)','기기 localStorage', '요일별 신비 자동 선택',      '앱 데이터 삭제 시'],
                  ['마지막 저장 날짜',        '기기 localStorage', '날짜 변경 여부 확인',        '앱 데이터 삭제 시'],
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
          <p style={{ ...S.p, fontSize: '0.82rem', color: '#888' }}>
            ※ 위 데이터는 이용자의 기기에만 저장되며, 인터넷을 통해 외부로 전송되지 않습니다.
            브라우저 캐시·사이트 데이터를 삭제하면 즉시 파기됩니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제3조 (개인정보의 이용 목적)</h2>
          <p style={S.p}>
            서비스는 수집한 정보를 아래 목적 이외에 사용하지 않습니다.
          </p>
          <ul style={{ paddingLeft: '1.25rem', color: '#3a3a3c', fontSize: '0.95rem', lineHeight: 2 }}>
            <li>기도 진행 상태 저장 및 복원 (이어하기 기능)</li>
            <li>이용자가 선택한 테마·신비 설정 유지</li>
          </ul>
        </section>

        <section>
          <h2 style={S.h2}>제4조 (제3자 서비스 — Google AdSense)</h2>
          <p style={S.p}>
            서비스는 광고 수익을 통한 운영을 위해 <strong>Google AdSense</strong>를 사용합니다.
            Google AdSense는 이용자의 관심사에 맞는 광고를 표시하기 위해 쿠키(Cookie)를 사용할 수 있습니다.
          </p>
          <p style={S.p}>
            Google은 광고 제공을 위해 다음 정보를 수집할 수 있습니다.
          </p>
          <ul style={{ paddingLeft: '1.25rem', color: '#3a3a3c', fontSize: '0.95rem', lineHeight: 2 }}>
            <li>브라우저 쿠키 (광고 개인화 및 빈도 조절)</li>
            <li>방문 페이지 URL 및 참조 URL</li>
            <li>기기 유형, 브라우저 종류, 운영 체제 (집계 통계용)</li>
            <li>대략적인 위치 정보 (국가·지역 수준)</li>
          </ul>
          <p style={S.p}>
            Google의 개인정보처리방침은{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#1a6b5c' }}>
              https://policies.google.com/privacy
            </a>
            에서 확인하실 수 있습니다.
            Google의 광고 데이터 사용 방식에 대한 정보는{' '}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#1a6b5c' }}>
              https://policies.google.com/technologies/ads
            </a>
            를 참조하십시오.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제5조 (맞춤 광고 거부 방법)</h2>
          <p style={S.p}>
            이용자는 아래 방법으로 Google 맞춤 광고를 비활성화하거나 개인정보 수집을 제한할 수 있습니다.
          </p>
          <ul style={{ paddingLeft: '1.25rem', color: '#3a3a3c', fontSize: '0.95rem', lineHeight: 2.2 }}>
            <li>
              <strong>Google 광고 설정 페이지:</strong>{' '}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#1a6b5c' }}>
                https://adssettings.google.com
              </a>
            </li>
            <li>
              <strong>NAI(Network Advertising Initiative) 탈퇴:</strong>{' '}
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#1a6b5c' }}>
                https://optout.networkadvertising.org/
              </a>
            </li>
            <li>
              <strong>DAA 소비자 선택 도구:</strong>{' '}
              <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" style={{ color: '#1a6b5c' }}>
                https://optout.aboutads.info/
              </a>
            </li>
            <li>브라우저 설정에서 서드파티 쿠키를 차단하거나 전체 쿠키를 삭제</li>
          </ul>
          <p style={{ ...S.p, fontSize: '0.85rem', color: '#888' }}>
            ※ 맞춤 광고를 비활성화해도 광고는 계속 표시될 수 있으나, 이용자와 관련성이 낮은 일반 광고가 표시됩니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제6조 (쿠키 정책)</h2>
          <p style={S.p}>
            서비스 자체는 별도의 쿠키를 생성하거나 사용하지 않습니다.
            다만 Google AdSense 등 통합 제3자 서비스가 쿠키를 사용할 수 있습니다.
          </p>
          <p style={S.p}>쿠키를 비활성화하는 방법:</p>
          <ul style={{ paddingLeft: '1.25rem', color: '#3a3a3c', fontSize: '0.9rem', lineHeight: 2 }}>
            <li><strong>Chrome:</strong> 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터</li>
            <li><strong>Safari:</strong> 설정 → Safari → 개인정보 보호 → 모든 쿠키 차단</li>
            <li><strong>Firefox:</strong> 설정 → 개인정보 및 보안 → 쿠키 및 사이트 데이터</li>
            <li><strong>Edge:</strong> 설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리</li>
          </ul>
        </section>

        <section>
          <h2 style={S.h2}>제7조 (제3자 데이터 제공 금지)</h2>
          <p style={S.p}>
            서비스는 이용자의 데이터를 어떠한 제3자에게도 판매·제공·위탁하지 않습니다.
            단, 법령의 규정에 의거하거나 수사 기관의 요청이 있는 경우는 예외로 합니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제8조 (이용자의 권리)</h2>
          <p style={S.p}>
            이용자는 언제든지 기기에 저장된 앱 데이터를 직접 삭제할 수 있습니다.
          </p>
          <ol style={{ paddingLeft: '1.25rem', color: '#3a3a3c', fontSize: '0.95rem', lineHeight: 2 }}>
            <li>브라우저 → 해당 사이트의 사이트 데이터/캐시 삭제</li>
            <li>브라우저 설정 → 쿠키 및 사이트 데이터 전체 삭제</li>
            <li>모바일 PWA → 앱 설정 → 저장소 초기화</li>
          </ol>
        </section>

        <section>
          <h2 style={S.h2}>제9조 (만 14세 미만 아동의 개인정보)</h2>
          <p style={S.p}>
            서비스는 만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다.
            만 14세 미만 이용자는 보호자와 함께 서비스를 이용하시기 바랍니다.
            아동의 개인정보가 수집되었다고 판단될 경우 즉시 삭제합니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제10조 (개인정보의 보유 및 파기)</h2>
          <p style={S.p}>
            서비스가 localStorage에 저장하는 데이터는 이용자가 직접 브라우저 데이터를 삭제할 때
            즉시 파기됩니다. 서버에 개인정보를 저장하지 않으므로 별도의 서버 측 파기 절차는 없습니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제11조 (개인정보처리방침의 변경)</h2>
          <p style={S.p}>
            본 방침은 관련 법령 또는 서비스 정책 변경에 따라 개정될 수 있습니다.
            변경 시 이 페이지 상단의 "최종 업데이트" 날짜를 갱신하고,
            중요한 변경은 앱 내 공지를 통해 안내합니다.
            변경 사항은 게시일로부터 <strong>7일 후</strong> 효력이 발생합니다.
          </p>
        </section>

        <section>
          <h2 style={S.h2}>제12조 (개인정보보호책임자 및 연락처)</h2>
          <p style={S.p}>
            개인정보 처리에 관한 문의, 열람·정정·삭제 요청은 아래로 연락해 주십시오.
          </p>
          <div style={{ padding: '1.125rem 1.375rem', background: '#f2f2f7', borderRadius: '12px', fontSize: '0.9rem', lineHeight: 2.1, color: '#3a3a3c' }}>
            <strong>서비스명:</strong> {SITE_NAME}<br />
            <strong>문의 이메일:</strong>{' '}
            <a href={`mailto:${CONTACT}`} style={{ color: '#1a6b5c' }}>{CONTACT}</a><br />
            <strong>시행일:</strong> {LAST_UPDATED}
          </div>
        </section>

        {/* 하단 링크 */}
        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.8rem', color: '#aaa' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>← 홈</Link>
          <Link href="/guide" style={{ color: 'inherit', textDecoration: 'none' }}>묵주기도 바치는 법</Link>
        </div>
      </main>
    </div>
  )
}
