# App Base (Expo + React Native + TypeScript)

이 저장소는 새로운 모바일 앱을 빠르게 시작하기 위한 재사용 가능한 베이스입니다. Firebase 초기 구성, 다국어(i18n), 라이트/다크 테마, React Navigation, Gluestack UI, 공통 UI 컴포넌트를 포함합니다. 비즈니스 로직(로그인/CRUD 등)은 의도적으로 제외되어 있으며, 어떤 앱에도 공통적으로 필요한 기반만 제공합니다.

## 주요 기능
- UI/레이아웃: AppScreen(SafeArea + 전역 패딩 + 기본 그라디언트), Neumorphism 톤의 카드/버튼
- 내비게이션: React Navigation 스택/탭 + 중앙화된 타입 정의(`src/navigation/types.ts`)
- 다국어(i18n): en/ko/ja/es 지원, Settings 화면에서 언어 변경(AsyncStorage 저장)
- 테마: 라이트/다크 모드 전환, 앱 전역 토큰(`src/theme/gluestack-ui.theme.ts`)
- Firebase: 초기 설정만 포함(서비스 사용은 프로젝트에서 선택 적용)
- 알림: Expo Notifications 권한/토큰 유틸 포함
- 예제 흐름: List → Detail, Onboarding, Settings, Profile, Create/Edit, Payment

## 기술 스택
- Expo 53, React Native 0.79, TypeScript
- React Navigation (native-stack, bottom-tabs)
- Gluestack UI + Tailwind 스타일(네이티브윈드)
- i18next + react-i18next
- Firebase Web SDK(초기화만)

## 폴더 구조
- `index.ts`: 엔트리
- `src/`
  - `App.tsx`: 폰트/i18n/Firebase 초기화, 테마/토스트 Provider, 네비 연결
  - `components/`: 공통 UI (아래 참조)
  - `config/`: `env.ts`, `firebaseConfig.ts`
  - `context/`: `ThemeContext.tsx`
  - `locales/`: en/ko/ja/es 번역 JSON
  - `navigation/`: `AppNavigator.tsx`, `TabNavigator.tsx`, `types.ts`
  - `screens/`: Home/List/Detail/Settings/Profile/CreateEdit/Payment/Onboarding
  - `services/`: `i18n.ts`, `notifications.ts`
  - `theme/`: `gluestack-ui.theme.ts`
  - `__tests__/`: App/i18n 기본 테스트

## 설치/실행
```bash
npm install
npm start        # 개발 서버 시작
npm run android  # Android 실행
npm run ios      # iOS 실행
npm run web      # 웹 미리보기(옵션)
```

## 환경 변수
- `.env.example`를 참고해 `.env`를 추가하세요. Firebase 키가 비어 있어도 부팅은 되지만, 실제 서비스 사용 시 오류가 날 수 있습니다.

## 공통 UI 컴포넌트(발췌)
- `AppScreen`: 화면 컨테이너(SafeArea + 패딩 + 기본 그라디언트). 화면별로 `variant="solid"`나 `gradientColors`로 오버라이드 가능.
- `AppHeader`: 테마 대응 헤더(뒤로가기/우측 액션)
- `AppButton`: variant(primary/secondary/outline), size(sm/md/lg), loading/disabled, leftIcon, fullWidth
- `AppInput`: password 토글, leading/trailing 아이콘, 에러 텍스트
- `FormField`: 라벨/필수/도움말/에러 래퍼(입력 컴포넌트 감싸기)
- `ListItem`: 아이콘/아바타 + 제목/부제목 + chevron 범용 리스트 행
- `SearchBar`: 라이트/다크 대비 자동 조정
- `FloatingActionButton`: 중앙 하단 고정, 아이콘 중앙 정렬
- `SectionHeader`, `Divider`, `AppBadge`, `AppIconButton`, `AnimatedCard` 등

## i18n 사용
- Settings 화면에서 언어 변경 → AsyncStorage 저장 → 재실행 시 복원
- 번역 키 추가: `src/locales/*.json`에 키-값 추가 후 `t('key')`로 사용

## 테마/접근성
- `ThemeContext`로 라이트/다크 전환(AsyncStorage 저장)
- Gluestack 토큰(`src/theme/gluestack-ui.theme.ts`)으로 색/타이포/간격 관리
- 대비/터치영역(hitSlop) 등 접근성 개선 기본 반영

## 네비게이션
- 스택 라우트 타입: `src/navigation/types.ts`
- 네비게이션 컨테이너는 테마에 맞춰 라이트/다크 배경을 적용하도록 커스터마이즈됨

## MCP/Codex(선택)
- VS Code Codex CLI를 사용할 경우 사용자 홈 TOML 설정 지원
  - 예시: `codex.config.example.toml` → `%USERPROFILE%\\.codex\\config.toml`로 복사
  - Python MCP 서버 설치 예: `py -3.11 -m pip install -e mcp_servers/screenshot_mcp_server`
- 일부 확장은 워크스페이스 `.gemini/settings.json`의 `mcpServers`를 읽어 자동 기동합니다.

## 개발 스크립트
```bash
npm run lint   # Expo lint
npm test       # Jest(기본 테스트 포함)
```

## 완료 기준(추천)
- 앱 부팅 → 온보딩 → 네비게이션 이동 정상
- 라이트/다크 전환/언어 변경/토스트 동작
- 홈 FAB 하단 중앙 고정, 모달 X 버튼 카드 하단 중앙 표시
- 린트/테스트 통과, `.env.example` 최신화

## 라이선스
MIT

