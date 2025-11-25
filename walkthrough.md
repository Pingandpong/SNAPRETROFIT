# 빠른 개발 베이스 강화 가이드

`expo_firebase_base` 프로젝트에 빠른 앱 개발을 위한 필수 기능들을 성공적으로 추가했습니다. 이제 반복적인 작업 없이 아이디어 구현에만 집중할 수 있습니다.

## 변경 사항

### 1. 새로운 라이브러리 (Dependencies)
- **`zod`**: 강력한 데이터 유효성 검사를 위해 추가했습니다.
- **`date-fns`**: 날짜와 시간을 쉽게 다루고 포맷팅하기 위해 추가했습니다.

### 2. 새로운 유틸리티 (`src/utils`)
- **[validation.ts](file:///Users/siwoo/Documents/expo_firebase_base/src/utils/validation.ts)**:
    - `emailSchema`, `passwordSchema`: 이메일 및 비밀번호 검증 규칙
    - `loginSchema`, `signUpSchema`: 로그인 및 회원가입 폼 검증용 스키마
- **[format.ts](file:///Users/siwoo/Documents/expo_firebase_base/src/utils/format.ts)**:
    - `formatDate`: 날짜를 "2024-01-01" 형태로 변환 (기본값)
    - `formatRelativeTime`: "5분 전", "방금 전" 같은 상대 시간 표시
    - `formatCurrency`: 원화(KRW) 금액 표기

### 3. 새로운 커스텀 훅 (`src/hooks`)
- **[useBoolean.ts](file:///Users/siwoo/Documents/expo_firebase_base/src/hooks/useBoolean.ts)**: 모달이나 토글 버튼의 상태(True/False)를 쉽게 관리합니다 (`on`, `off`, `toggle`).
- **[useAsync.ts](file:///Users/siwoo/Documents/expo_firebase_base/src/hooks/useAsync.ts)**: 비동기 작업의 로딩(`loading`), 에러(`error`), 결과(`value`) 상태를 한 번에 관리합니다.
- **[useAuth.ts](file:///Users/siwoo/Documents/expo_firebase_base/src/hooks/useAuth.ts)**: 어디서든 현재 로그인한 사용자 정보(`user`)와 로그아웃 기능(`signOut`)을 사용할 수 있습니다.

### 4. 인증 컨텍스트 (Authentication Context)
- **[AuthContext.tsx](file:///Users/siwoo/Documents/expo_firebase_base/src/context/AuthContext.tsx)**:
    - Firebase 인증 상태를 앱 전체에서 관리합니다.
    - 앱이 켜질 때 로그인 상태를 자동으로 확인합니다.
- **[App.tsx](file:///Users/siwoo/Documents/expo_firebase_base/src/App.tsx)**:
    - `AuthProvider`로 앱 전체를 감싸서, 어디서든 인증 정보를 사용할 수 있게 설정했습니다.

## 검증 결과

### 자동화 테스트
- `npm run lint`: 코드 스타일 및 잠재적 오류 검사를 완료했습니다.

### 수동 검증
1.  **인증 연동**: 앱 실행 시 `AuthContext`가 정상적으로 초기화되는 것을 확인했습니다.
2.  **개발 편의성**: 이제 컴포넌트 어디서든 `useAuth`, `useBoolean`, `formatDate`를 import하여 즉시 사용할 수 있습니다.

## 다음 단계
- 이제 이 기반 위에서 새로운 기능을 빠르게 만들어보세요!
- 예시: `useAuth`를 사용하여 로그인 여부에 따라 홈 화면이나 로그인 화면을 보여주는 분기 처리를 쉽게 구현할 수 있습니다.
