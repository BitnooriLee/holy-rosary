# 프로젝트명: 내 손안의 디지털 묵주 (Digital Rosary KR)

## 1. 핵심 철학
- **사용자t**: 대한민국 천주교구 천주교 신자 
- **Local-First**: 모든 기도문, 전례 데이터, 로직은 클라이언트 사이드(`data.js`)에 내장한다.
- **PWA**: 오프라인 사용이 가능해야 하며, 설치 가능한 웹 앱이어야 한다.
- **UX**: 카톨릭 전례의 경건함을 유지하되, 직관적인 인터페이스를 제공한다.

## 2. 기술 스택
- Framework: Next.js (Static Export) 또는 순수 HTML/JS (PWA 최적화)
- State Management: React Context API / LocalStorage
- Styling: Tailwind CSS (테마 시스템 적용)
- PWA: Service Workers (Next-PWA)

## 3. 핵심 데이터 구조 (data.js)
- `PRAYER_DATA`: 사도신경, 주님의 기도, 성모송 등 기본 기도문 텍스트.
- `MYSTERY_DATA`: 요일별 신비(환희, 고통, 영광, 빛) 및 각 단별 묵상/해설(500자 이상).
- `LITURGY_CALENDAR`: 한국 천주교 전례 주간 계산 로직 및 2026년 주요 전례일 데이터.
- `DAILY_MEDITATION`: 애드센스 승인용 요일별 성경 구절 및 300자 내외 묵상글.

## 4. 개발 규칙
- `currentStep` 변수(0-58)를 기반으로 UI를 동기화할 것.
- 모든 날짜 계산은 `Intl.DateTimeFormat` (ko-KR) 및 사용자 기기 시스템 시간을 기준으로 한다.
- 진동 피드백: `navigator.vibrate` API를 사용하여 챕터 완료 시 적용.
- 광고: `adsbygoogle.js`는 비동기로 로드하며, 오프라인 시 레이아웃이 깨지지 않게 조건부 렌더링.

### UI/UX 디자인 고도화 규칙
- **단순 도형 금지**: 묵주 알을 단순한 `<circle>`이나 `div` 배경색으로 처리하지 말 것.
- **이미지 기반 렌더링**: 
  - 각 테마별(티파니, 에르메스 등)로 준비된 고해상도 구슬 이미지 에셋을 사용할 수 있도록 구조를 짤 것.
  - 현재 기도 단계(`currentStep`)의 구슬은 `filter: drop-shadow` 또는 `brightness`를 조절하여 실제 보석이 빛나는 듯한 효과를 줄 것.
- **애니메이션**: 
  - 구슬이 활성화될 때 `scale`이 살짝 커졌다가 돌아오는 효과와 함께, 주변으로 은은한 빛(Glow)이 퍼지는 CSS 애니메이션을 적용할 것.
  - 한 단이 끝날 때(10번째 성모송)는 10개의 구슬이 동시에 순차적으로 반짝이는 '축하 효과'를 구현할 것.
- **좌표 최적화**: 
  - 59개 구슬의 위치를 배열(`CONSTANTS.BEAD_COORDINATES`)로 관리하여, 배경 묵주 이미지의 실제 구슬 위치와 정확히 일치시킬 것.

  ## 테마 시스템 (Theme System)
- `THEMES` 객체를 만들어 각 브랜드(Tiffany, Channel, Dior, Hermes 등)의 에셋 경로와 시그니처 컬러 코드를 관리할 것.
- 사용자가 테마를 변경하면 `document.documentElement.style`을 통해 배경색과 `img src`를 일괄 교체할 것.
- 구슬 렌더링 시, 단순히 이미지만 보여주는 게 아니라 `transition: all 0.3s ease`를 주어 부드럽게 강조되도록 할 것.

3. [중요] 5단계 개발 로드맵 

### Step 1: 환경 설정 및 PWA 기본 구조 
- [ ] Next.js 프로젝트 초기화 및 `manifest.json` 설정.
- [ ] Service Worker를 통한 오프라인 캐싱 전략 수립 (이미지/폰트 우선 캐싱).
- [ ] 테마 시스템 설계: CSS 변수(`--brand-color`, `--bead-image`)를 활용한 4가지 테마(티파니, 샤넬 등) 기본 세팅.

### Step 2: 로컬 데이터 및 전례 로직 구축 
- [ ] `data.js`: 모든 기도문 및 신비별 묵상 데이터(500자 이상) 구축.
- [ ] 전례력 엔진: 한국 천주교 방식 날짜 변환 함수 구현 (예: "사순 제5주간 월요일").
- [ ] 신비 자동 매칭: 요일에 따른 신비(환희/고통/영광/빛) 자동 선택 로직.

### Step 3: 묵주 인터페이스 및 상태 관리 
- [ ] **Asset Rendering**: `rosary_frame.png` 위에 `bead_unit.png`를 59개 좌표 배열에 맞춰 배치.
- [ ] **State Logic**: `currentStep`(0-58) 관리 및 클릭 시 다음 구슬 이동 로직.
- [ ] **Visual Effect**: 현재 단계 구슬의 CSS Filter(brightness, drop-shadow) 반짝임 효과.
- [ ] **Persistence**: LocalStorage를 활용한 기도 단계 자동 저장/복구.

### Step 4: 콘텐츠 보강 (애드센스 승인용) 
- [ ] 상단 '오늘의 성서 말씀' 카드 구현 및 요일별 묵상글 바인딩.
- [ ] 상세 페이지: '묵주기도 바치는 법', '신비별 상세 해설', '개인정보처리방침' 추가.
- [ ] 텍스트 분량 확보: 구글 봇이 읽을 수 있는 풍부한 묵상 콘텐츠 노출.

### Step 5: 감성 디테일 및 최적화 
- [ ] **Haptic**: 기도 한 단(10알) 종료 시 `navigator.vibrate` 진동 피드백.
- [ ] **BGM**: 은은한 그레고리오 성가 루프 재생 및 On/Off 토글 기능.
- [ ] **Monetization**: 온라인 상태에서만 활성화되는 AdSense 광고 단위 배치.


## [Core Protocol: The Interview First]
- Claude MUST interview the user before implementing complex logic or major UI changes.
- **Stop Point**: Do not proceed with coding until the user says: "Interview finished, start implementation."
