# AGENTS.md - AI Agent Development Guidelines

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [개발 원칙](#개발-원칙)
3. [코드 작성 규칙](#코드-작성-규칙)
4. [검증 및 테스트](#검증-및-테스트)
5. [프로젝트 구조](#프로젝트-구조)
6. [기술 스택](#기술-스택)
7. [주요 기능](#주요-기능)
8. [참고 링크](#참고-링크)

---

## 프로젝트 개요

이 프로젝트는 **React Native + Expo + Firebase** 기반의 **재사용 가능한 모바일 앱 베이스**입니다.

### 핵심 목표
- 새로운 모바일 앱 개발 시 **즉시 사용 가능한 견고한 기반** 제공
- **특정 비즈니스 로직을 포함하지 않음** (로그인, CRUD 등은 의도적으로 제외)
- 공통 기능(Firebase 설정, i18n, 내비게이션, 테마 등)만 제공하여 **빠른 개발 시작** 지원

### 프로젝트 철학
> "앱 아이디어가 생기면 이 베이스에 필요한 기능만 추가하여 빠르게 개발"

---

## 개발 원칙

### 1. 코드 수정 후 자동 검증 (CRITICAL)
**모든 코드 수정 후 반드시 다음을 실행:**

```bash
# TypeScript 타입 체크
npx tsc --noEmit

# 특정 파일만 체크
npx tsc --noEmit --project tsconfig.json 2>&1 | grep "파일경로"

# Lint 실행
npm run lint
```

**규칙:**
- 파일 수정 후 **자동으로** `npx tsc --noEmit` 실행
- 사용자가 에러를 복붙하기 전에 **먼저 감지하고 수정**
- IDE lint 피드백만 믿지 말고 **명시적으로 검증**

### 2. 응답 언어
- **항상 한국어로 답변**
- 코드 주석은 영어 또는 한국어 (일관성 유지)

### 3. 폴더 무시
다음 폴더는 **절대 분석하거나 수정하지 않음:**
- `node_modules/`
- `.expo/`
- `build/`
- `android/` (Expo managed workflow)
- `ios/` (Expo managed workflow)

### 4. 파일명 규칙
- **GEMINI.md는 사용하지 않음**
- **AGENTS.md**를 프로젝트 가이드라인으로 사용
- 컴포넌트: PascalCase (예: `ScreenCard.tsx`)
- 유틸/서비스: camelCase (예: `validation.ts`, `iap.ts`)
- 타입 정의: camelCase (예: `iap.ts`)

---

## 코드 작성 규칙

### TypeScript
- **엄격한 타입 정의** 사용
- `any` 사용 최소화 (불가피한 경우 주석으로 이유 설명)
- 모든 함수에 **명시적 반환 타입** 지정
- `interface`보다 `type` 선호 (일관성)

### React Native / Expo
- **함수형 컴포넌트** + **Hooks** 사용
- StyleSheet.create 사용 (인라인 스타일 지양)
- 공통 스타일은 `src/styles/commonStyles.ts`에 정의
- Neumorphism (Soft UI) 스타일 유지

### Firebase
- `firebaseConfig.ts`에서 모든 Firebase 서비스 초기화
- 환경 변수 사용 (예: `FIREBASE_API_KEY`)
- 현재 초기화된 서비스:
  - `auth` (Authentication)
  - `db` (Realtime Database)
  - `functions` (Cloud Functions)

### In-App Purchase (IAP)
- `react-native-iap` v14 사용
- **v14 API 사용 필수:**
  - ❌ `getSubscriptions` → ✅ `fetchProducts({ type: 'subs' })`
  - ❌ `requestSubscription` → ✅ `requestPurchase({ type: 'subs' })`
  - ✅ `acknowledgePurchaseAndroid(token)` (문자열 직접 전달)
- 제품 ID는 `src/services/iap.ts`에서 관리
- Firebase Realtime Database에 구독 정보 저장
- Cloud Functions로 서버 검증 필수

### 국제화 (i18n)
- `i18next` 사용
- 모든 사용자 대면 텍스트는 **번역 키** 사용
- 하드코딩된 문자열 금지
- 지원 언어: 한국어(ko), 영어(en), 일본어(ja), 스페인어(es)
- 번역 파일 위치: `src/locales/*.json`

### 내비게이션
- React Navigation 사용
- 모든 타입은 `src/navigation/types.ts`에 중앙화
- Screen 파라미터 타입 명시 필수

### 상태 관리
- **Context API** 사용 (Redux 사용 안 함)
- 현재 Context:
  - `ThemeContext` (라이트/다크 모드)
  - `AuthContext` (Firebase 인증 상태)
  - `SubscriptionContext` (IAP 구독 상태)
- 새 Context 추가 시 `src/context/` 디렉토리 사용

---

## 검증 및 테스트

### 필수 검증 단계
1. **타입 체크**: `npx tsc --noEmit`
2. **Lint**: `npm run lint`
3. **빌드 테스트**: `npm run android` 또는 `npm run ios`

### 코드 수정 후 체크리스트
- [ ] TypeScript 에러 없음
- [ ] Lint 에러 없음
- [ ] 번역 키 누락 없음
- [ ] 공통 스타일 사용 (인라인 스타일 지양)
- [ ] 타입 정의 명시적으로 작성

---

## 프로젝트 구조

```
expo_firebase_base/
├── src/
│   ├── App.tsx                 # 앱 루트 컴포넌트
│   ├── components/             # 재사용 가능한 UI 컴포넌트
│   ├── config/
│   │   └── firebaseConfig.ts   # Firebase 초기화
│   ├── context/                # React Context Providers
│   │   ├── AuthContext.tsx
│   │   ├── SubscriptionContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/                  # 커스텀 Hooks
│   │   ├── useAsync.ts
│   │   ├── useAuth.ts
│   │   └── useBoolean.ts
│   ├── locales/                # i18n 번역 파일
│   │   ├── ko.json
│   │   ├── en.json
│   │   ├── ja.json
│   │   └── es.json
│   ├── navigation/             # 내비게이션 설정
│   │   ├── AppNavigator.tsx
│   │   └── types.ts
│   ├── screens/                # 화면 컴포넌트
│   │   ├── HomeScreen.tsx
│   │   ├── PaymentScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── ...
│   ├── services/               # 비즈니스 로직 서비스
│   │   ├── i18n.ts
│   │   ├── iap.ts              # In-App Purchase 로직
│   │   └── notifications.ts
│   ├── styles/
│   │   └── commonStyles.ts     # 공통 스타일
│   ├── types/                  # TypeScript 타입 정의
│   │   └── iap.ts
│   └── utils/                  # 유틸리티 함수
│       ├── format.ts           # 날짜/통화 포맷
│       └── validation.ts       # Zod 스키마
├── assets/                     # 정적 리소스
├── package.json
├── tsconfig.json
├── app.json                    # Expo 설정
└── AGENTS.md                   # 이 파일
```

---

## 기술 스택

### 핵심 기술
- **Framework**: React Native 0.79.5 + Expo 53
- **Language**: TypeScript 5.8.3
- **Backend**: Firebase 12.0.0
  - Authentication
  - Realtime Database
  - Cloud Functions
- **Navigation**: React Navigation 7.x
- **State Management**: React Context API
- **Styling**: StyleSheet + LinearGradient (Neumorphism)
- **UI Components**: React Native 내장 + Gluestack UI (일부)

### 주요 라이브러리
- `react-native-iap`: 14.4.46 (In-App Purchase)
- `i18next`: 25.3.5 (국제화)
- `react-i18next`: 15.6.1
- `zod`: 4.1.13 (유효성 검사)
- `date-fns`: 4.1.0 (날짜 포맷)
- `@expo-google-fonts/roboto`, `@expo-google-fonts/poppins`

### 개발 도구
- ESLint (expo 설정)
- TypeScript
- Jest (테스트)

---

## 주요 기능

### ✅ 구현 완료
1. **Firebase 통합**
   - Authentication, Realtime Database, Cloud Functions 초기화
   - 환경 변수 기반 설정

2. **국제화 (i18n)**
   - 4개 언어 지원 (ko, en, ja, es)
   - 모든 화면 번역 완료

3. **테마 전환**
   - 라이트/다크 모드 지원
   - `ThemeContext`로 전역 관리

4. **In-App Purchase (IAP)**
   - `react-native-iap` v14 통합
   - Basic/Premium 플랜 구독
   - Firebase Realtime Database 연동
   - 구독 복원 기능
   - ⚠️ **제품 ID는 플레이스홀더** (실제 스토어 ID로 교체 필요)
   - ⚠️ **Cloud Function 미구현** (`restorePurchase` 함수 필요)

5. **유틸리티 & Hooks**
   - `useAsync`: 비동기 작업 관리
   - `useBoolean`: boolean 상태 토글
   - `useAuth`: Firebase 인증 상태 접근
   - `validation.ts`: Zod 스키마 (이메일, 비밀번호)
   - `format.ts`: 날짜/통화 포맷팅

6. **내비게이션**
   - 타입 안전한 내비게이션
   - 중앙화된 타입 정의 (`types.ts`)

### ⚠️ 미완성 / 주의사항
1. **IAP 제품 ID**
   - `src/services/iap.ts`의 `iosProductIds`, `androidProductId`를 실제 값으로 교체 필요

2. **Firebase Cloud Function**
   - `restorePurchase` 함수 미구현
   - 서버 측 구독 검증 로직 필요

3. **Firebase 설정**
   - Realtime Database, Cloud Functions 활성화 필요 (Firebase 콘솔)

4. **환경 변수**
   - `.env` 파일에 Firebase 설정 필요

### 🚫 의도적으로 제외된 기능
- 로그인/회원가입 UI (Firebase Auth는 설정되어 있음)
- Firestore CRUD 로직
- 특정 비즈니스 로직

---

## 참고 링크

### Firebase
- [Firebase 문서](https://firebase.google.com/docs)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)

### React Native IAP
- [react-native-iap GitHub](https://github.com/dooboolab-community/react-native-iap)
- [v14 마이그레이션 가이드](https://github.com/dooboolab-community/react-native-iap/blob/main/docs/migration/v14.md)

### Expo
- [Expo 문서](https://docs.expo.dev/)
- [Expo Config Plugins](https://docs.expo.dev/config-plugins/introduction/)

### UI/UX
- [Gluestack UI](https://gluestack.io/ui/docs/home/overview/introduction)
- [React Navigation](https://reactnavigation.org/)

### MCP (참고용)
- [MCP GitHub](https://github.com/modelcontextprotocol)
- [MCP 서버 모음](https://github.com/modelcontextprotocol/servers)
- [Gemini CLI MCP 문서](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md)

---

## 개발 워크플로우

### 1. 새 기능 추가 시
1. `AGENTS.md` (이 파일) 검토
2. 관련 타입 정의 (`src/types/`)
3. 서비스 로직 구현 (`src/services/`)
4. Context 필요 시 추가 (`src/context/`)
5. UI 컴포넌트 작성 (`src/screens/`, `src/components/`)
6. 번역 추가 (`src/locales/*.json`)
7. **검증**: `npx tsc --noEmit` + `npm run lint`

### 2. 버그 수정 시
1. 문제 파악 및 재현
2. 관련 파일 수정
3. **즉시 검증**: `npx tsc --noEmit`
4. 테스트 (수동 또는 자동)

### 3. 리팩토링 시
1. 변경 범위 파악
2. 타입 정의 먼저 수정
3. 구현 수정
4. **단계별 검증**: 각 파일 수정 후 타입 체크

---

## AI Agent 특별 지침

### 우선순위
1. **타입 안전성** > 코드 간결성
2. **명시적 에러 처리** > 암묵적 처리
3. **재사용성** > 중복 코드
4. **문서화** > 주석 없는 코드

### 금지 사항
- ❌ `any` 타입 남발
- ❌ 하드코딩된 문자열 (i18n 사용)
- ❌ 인라인 스타일 (StyleSheet 사용)
- ❌ 사용자 에러 보고 전 검증 생략
- ❌ `GEMINI.md` 파일 사용

### 권장 사항
- ✅ 코드 수정 후 자동 검증
- ✅ 명시적 타입 정의
- ✅ 공통 패턴 재사용
- ✅ 에러 메시지 i18n 처리
- ✅ `AGENTS.md` 업데이트 (새 패턴 발견 시)

---

## 버전 관리

### 현재 버전
- 프로젝트: 1.0.0
- React Native: 0.79.5
- Expo: 53.0.22
- react-native-iap: 14.4.46
- Firebase: 12.0.0

### 주요 변경 이력
- **2025-01-26**: IAP 기능 추가 (react-native-iap v14)
- **2025-01-25**: 유틸리티 & Hooks 추가 (useAsync, validation, format)
- **이전**: 초기 베이스 프로젝트 구축

---

**마지막 업데이트**: 2025-01-26  
**관리자**: AI Agent (Gemini)