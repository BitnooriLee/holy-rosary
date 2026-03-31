# 📿 내 손안의 디지털 묵주 (Digital Rosary KR)

한국 천주교 신자를 위한 **오프라인 완전 지원 묵주기도 PWA**입니다.  
인터넷 없이도 모든 기도문과 신비 묵상을 사용할 수 있으며,  
Apple Mindfulness 앱 스타일의 프리미엄 UI로 경건한 기도를 돕습니다.

---

## 주요 기능

- **완전 오프라인 지원** — 모든 기도문·신비 데이터를 앱 내부에 내장, 외부 API 미사용
- **59개 구슬 SVG 묵주** — 방석 메달에서 반시계 방향으로 진행하는 정확한 5단 묵주 구조
- **오늘의 신비 자동 선택** — 요일에 따라 환희·빛·고통·영광의 신비를 자동 매핑
- **천주교 전례력 표시** — "사순 1주 화요일 (2026년 3월 31일)" 형식의 전례 날짜 실시간 계산
- **진행 상태 자동 저장** — `localStorage`를 통해 앱 재실행 시 이어하기 가능
- **4가지 프리미엄 테마** — 천상의 블루 / 미드나잇 펄 / 대지의 온기 / 장미의 기도
- **햅틱 피드백** — 구슬 탭 시 `navigator.vibrate` 진동 지원 (모바일)
- **PWA 설치 가능** — 홈 화면에 추가하여 네이티브 앱처럼 사용

---

## 기술 스택

| 항목 | 내용 |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + 인라인 CSS 변수 |
| State | React Context API + `localStorage` |
| Offline | Service Worker (Cache-first 전략) |
| UI | SVG 묵주, Glassmorphism 카드, iOS Segmented Control |

---

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx          # 메인 묵주기도 화면
│   ├── guide/page.tsx    # 묵주기도 바치는 법 (SEO 콘텐츠)
│   ├── privacy/page.tsx  # 개인정보처리방침
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── RosaryCanvas.tsx  # SVG 묵주 시각화
│   ├── PrayerCard.tsx    # 기도문 카드 + 네비게이션
│   ├── LiturgyBanner.tsx # 오늘의 전례 배너 (접이식)
│   └── ThemeSwitcher.tsx # iOS 세그먼트 컨트롤 테마 선택
├── context/
│   └── RosaryContext.tsx # 전역 상태 (currentStep, theme, mysteryKey)
├── data/
│   ├── prayers.ts        # 기도문 원문 + 유래·영적 의미 설명
│   ├── mysteries.ts      # 20개 신비 묵상 (소설형 서술)
│   └── liturgy.ts        # 전례력 계산 로직 + 요일별 성경 구절
├── hooks/
│   └── useRosary.ts      # 묵주 상태 관리 훅
└── lib/
    ├── coordinates.ts    # 59개 구슬 SVG 좌표 배열
    ├── prayers.ts        # PRAYER_STEPS 배열 (0~59단계 매핑)
    ├── mysteries.ts      # getMysteryKeyForToday() 로직
    └── themes.ts         # 4가지 테마 정의 (CSS 변수, 구슬 색상)
```

---

## 시작하기

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

개발 서버 기본 포트: `http://localhost:3000`

---

## 묵주기도 구조

| 구간 | 기도 | 구슬 |
|---|---|---|
| 펜던트 | 사도신경 → 주님의 기도 → 성모송×3 → 영광송 | 십자가 + 작은 알 3개 + 큰 알 2개 |
| 제1~5단 | 주님의 기도 → 성모송×10 → 영광송 → 구원을 비는 기도 | 큰 알 1개 + 작은 알 10개 × 5 |
| 마침 | 성모 찬송 (Salve Regina) | 방석 메달 |

총 60단계 (방석 메달 시작 → 반시계 방향 → 방석 메달 귀환)

---

## 요일별 신비

| 요일 | 신비 |
|---|---|
| 월요일, 토요일 | 🌸 환희의 신비 |
| 화요일, 금요일 | 🩸 고통의 신비 |
| 수요일, 일요일 | 🌟 영광의 신비 |
| 목요일 | ✨ 빛의 신비 |

---

## 페이지

| 경로 | 내용 |
|---|---|
| `/` | 묵주기도 메인 앱 |
| `/guide` | 묵주기도 바치는 법 (블로그형 SEO 페이지) |
| `/privacy` | 개인정보처리방침 (Google AdSense 기준) |

---

## 라이선스

본 프로젝트의 기도문 원문은 **한국천주교중앙협의회** 및 **서울대교구** 공식 기도문을 따릅니다.  
소스 코드는 개인 비상업적 사용 목적으로 제작되었습니다.
