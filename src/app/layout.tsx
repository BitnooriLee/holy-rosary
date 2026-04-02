import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '천주교 묵주기도 — 매일의 신비와 묵상 가이드 | 디지털 묵주',
    template: '%s | 디지털 묵주',
  },
  description:
    '천주교 5단 묵주기도를 오프라인에서도 완벽히 바칠 수 있는 디지털 묵주 앱. 환희·고통·영광·빛의 신비 20단, 오늘의 전례 날짜, 사도신경·성모송·주님의 기도 전문 수록. 매일의 신비 자동 선택, 진행 상태 자동 저장.',
  keywords: [
    '묵주기도',
    '천주교 묵주기도',
    '가톨릭 묵주기도',
    '묵주기도 방법',
    '묵주기도 바치는 법',
    '묵주기도 순서',
    '환희의 신비',
    '고통의 신비',
    '영광의 신비',
    '빛의 신비',
    '성모송',
    '사도신경',
    '주님의 기도',
    '묵주기도 앱',
    '디지털 묵주',
    '오프라인 묵주기도',
    '천주교 기도',
    '가톨릭 기도문',
    '묵주기도 전례',
    '묵주기도 묵상',
  ],
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '디지털 묵주 — 천주교 묵주기도 앱',
    title: '천주교 묵주기도 — 매일의 신비와 묵상 가이드',
    description:
      '오프라인에서도 완벽히 작동하는 천주교 5단 묵주기도 앱. 환희·고통·영광·빛의 신비 20단 묵상, 오늘의 전례 날짜 표시, 진행 상태 자동 저장.',
  },
  twitter: {
    card: 'summary',
    title: '천주교 묵주기도 — 매일의 신비와 묵상 가이드',
    description: '오프라인 지원, 20단 신비 묵상, 오늘의 전례 날짜 — 매일 기도를 돕는 디지털 묵주.',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '묵주기도',
  },
  icons: {
    apple: '/icons/apple-touch-icon.png',
    icon: '/icons/icon-192.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: 'O63GXxyg92TuVmDg9WKMIna8BfjN62JxrOJWuFFX1O0',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0d2420',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>

      {/* Google AdSense — afterInteractive: 핵심 UI 로드 후 실행 */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8611023796152099"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </html>
  )
}
