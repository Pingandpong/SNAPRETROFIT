# Gemini Project Overview

## 1. Project Goal

이 프로젝트는 React Native와 Expo로 구축된 모바일 애플리케이션입니다. Firebase를 백엔드 서비스로 사용하며 TypeScript로 작성되었습니다. 이 프로젝트의 궁극적인 목표는 **모든 새로운 모바일 앱 개발의 견고한 기본 베이스를 구축**하는 것입니다. 이를 통해 앱 아이디어가 생길 때마다 이 베이스에 필요한 기능만 추가하여 빠르고 효율적으로 개발할 수 있도록 합니다.

**`app_base`의 핵심 원칙**은 특정 비즈니스 로직을 포함하지 않는 것입니다. 즉, 사용자 인증(로그인)이나 Firestore를 사용한 데이터 관리(CRUD) 등 특정 앱에서만 필요한 기능은 **의도적으로 제외**합니다. 대신, Firebase 설정, 다국어 지원, UI 프레임워크, 내비게이션 등 어떤 앱에서든 필요한 공통 기반만 제공하여, 새로운 프로젝트가 시작될 때 즉시 핵심 기능 개발에 집중할 수 있도록 돕는 것을 목표로 합니다.

## 2. Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **Backend**: Firebase
- **UI Framework**: Gluestack UI
- **Fonts**: @expo-google-fonts/roboto

## 3. Project Structure

- `index.ts`: The entry point of the application.
- `src/`: Contains the main source code.
  - `App.tsx`: The root component of the application, which initializes Firebase, i18n and the main navigator.
  - `components/`: Directory for reusable UI components (e.g., `AppCard.tsx`).
  - `config/`: Configuration files, including Firebase setup (`firebaseConfig.ts`).
  - `context/`: Contains React context providers (e.g., `ThemeContext.tsx`).
  - `locales/`: Contains translation files for i18n (e.g., `ko.json`, `en.json`).
  - `navigation/`: Navigation setup using React Navigation.
    - `AppNavigator.tsx`: Defines the main stack navigator for the app.
    - `types.ts`: Centralized type definitions for React Navigation.
  - `screens/`: Contains the different screens of the application.
    - `HomeScreen.tsx`: The main screen displayed after the app launches.
    - `DetailScreen.tsx`: A screen for displaying detailed information.
    - `SettingsScreen.tsx`: A screen for application settings, including language selection.
    - `ProfileScreen.tsx`: User profile screen.
    - `ListScreen.tsx`: A generic list screen.
    - `CreateEditScreen.tsx`: A screen for creating or editing items.
    - `PaymentScreen.tsx`: A screen for handling payments.
  - `services/`: Contains services like i18n setup (`i18n.ts`).
- `package.json`: Lists project dependencies and scripts.
- `tsconfig.json`: TypeScript compiler configuration.
- `app.json`: Expo configuration file.
- `assets/`: Static assets like images and icons.
- `android/` and `ios/`: Native project directories (though managed by Expo).

## 4. Key Features & Development Status

- **UI Framework**: The UI is built upon **React Native's built-in components** and **StyleSheet** for a consistent and efficient development experience, moving away from Gluestack UI for core screen layouts. The application's overall UI has been redesigned to incorporate a **Neumorphism (Soft UI) style** with a consistent dark theme using `LinearGradient` backgrounds across all main screens.
- **Layout & Responsiveness**: All screens now feature top padding (considering `SafeAreaView`) and global padding, ensuring UI elements are not obscured and have appropriate spacing. Content alignment (vertical/horizontal) has been adjusted for visual balance.
- **Code Refactoring**: Styling code has been refactored to use `StyleSheet.create` and common styles have been extracted into `src/styles/commonStyles.ts` for improved consistency and maintainability.
- **Development Environment Stability**: Resolved development environment configuration errors, including the missing `nativewind/babel` plugin in `babel.config.js`, `global.css` import path issues in `src/App.tsx`, and JSX structure errors in `AppCard.tsx` and `DetailScreen.tsx`. This ensures UI changes are applied stably.
- **Internationalization (i18n)**: The app supports multiple languages (Korean, English, Japanese, Spanish) using `i18next`, ready for any project. **Expanded translation coverage** to include hardcoded strings in `CreateEditScreen.tsx`, `DetailScreen.tsx`, `PaymentScreen.tsx`, `ProfileScreen.tsx`, and `HomeScreen.tsx`, ensuring a fully localized experience.
- **Theme Switching (Light/Dark Mode)**: A theme context (`ThemeContext.tsx`) and a UI toggle in the settings screen have been implemented. This allows users to switch between light and dark modes across the entire app.
- **Ready-to-Use Firebase**: Firebase is fully configured (`firebaseConfig.ts`). While `app_base` itself does not implement features like Auth or Firestore, any project using this base can immediately start using Firebase services without initial setup.
- **Example Navigation Flow**: A mock data-driven list-to-detail flow (`ListScreen` -> `DetailScreen`) has been implemented. This provides a clear, working example of how to structure navigation and display data within the `app_base`. **HomeScreen now includes navigation links to all main screens** (`Payment`, `Settings`, `List`, `CreateEdit`, `Profile`) for easy access and demonstration.
- **Robust Navigation Types**: All navigation-related types have been centralized in `src/navigation/types.ts` to improve type safety and maintainability.
- **MCP Experimentation**: An initial experiment was conducted to integrate Model Context Protocol (MCP) servers. The conclusion was that **Gemini CLI's native capabilities are powerful and sufficient for most development tasks** like file operations, git management, and running commands. Therefore, direct MCP server integration is no longer a primary focus. The development workflow prioritizes using Gemini CLI's built-in tools.

## 5. How to Run

1.  Install dependencies: `npm install`
2.  Start the development server: `npm start`
3.  Run on Android: `npm run android`
4.  Run on iOS: `npm run ios`

This `GEMINI.md` file provides a clear and concise overview of the project, making it easy for Gemini to understand its purpose, technology stack, and structure.

---

## 한국어 요약

이 프로젝트는 TypeScript 기반의 React Native 모바일 앱의 **재사용 가능한 베이스**입니다. Expo, Gluestack UI, 다국어(i18n), **라이트/다크 모드 테마 전환**, React Navigation, Firebase 설정 등 앱 개발에 필요한 핵심 기반이 미리 구축되어 있습니다. 또한, 목업 데이터를 활용한 **목록-상세 화면(List-Detail) 구현 예시**를 포함하여, 새로운 프로젝트에서 데이터 흐름과 내비게이션을 어떻게 구성할지에 대한 명확한 가이드를 제공합니다. **로그인이나 데이터 관리 등 특정 앱에 종속적인 기능은 의도적으로 제외**하여, 어떤 프로젝트든 이 베이스 위에서 빠르게 핵심 기능 개발을 시작할 수 있도록 하는 데 중점을 둡니다.

## Gemini 지침

- **응답 언어:** 항상 한국어로 답변해주세요.
- **폴더 무시:** `node_modules`, `.expo`, `build` 폴더의 내용은 분석하거나 수정하지 마세요.

## 참고 링크 


MCP git hub main - https://github.com/modelcontextprotocol

MCP 기본 개념 git - https://github.com/modelcontextprotocol/modelcontextprotocol

MPC 서버 모음 git - https://github.com/modelcontextprotocol/servers

## 4-1. Gemini CLI와 MCP 서버 활용 방안

### Gemini CLI 중심의 워크플로우
이 프로젝트는 VS Code 환경에서 **Gemini CLI의 내장 기능**을 중심으로 개발 생산성을 높이는 것을 권장합니다. 초기 실험 결과, 파일 시스템 접근, Git 관리, 터미널 명령어 실행 등 대부분의 작업이 Gemini CLI의 자체 기능만으로 충분히 효율적이라는 결론을 내렸습니다.

- **주요 활용 도구**: Gemini CLI의 `read_file`, `write_file`, `run_shell_command`, `git` 관련 명령어
- **권장 워크플로우**:
    1. Gemini CLI의 파일 및 코드 분석 기능으로 UI/로직 리뷰
    2. Gemini의 제안을 바탕으로 코드 수정 및 적용
    3. `run_shell_command`로 `npx expo lint`, `npm test` 등 각종 스크립트 실행 및 결과 분석
    4. `git` 관련 명령어로 변경사항 확인 및 커밋

### MCP 서버의 역할
`.gemini/settings.json`에 설정된 MCP 서버(Filesystem, Git, Commands 등)들은 Gemini CLI의 내장 기능으로 처리하기 어려운 특수한 경우를 위한 **보조 도구**로 활용될 수 있습니다. 예를 들어, Gemini CLI가 지원하지 않는 특정 외부 서비스 연동이나 실시간 데이터 스트리밍 같은 독점적인 기능을 가진 MCP 서버가 있다면 연동을 고려할 수 있습니다. 하지만 일반적인 개발 작업에서는 Gemini CLI의 내장 기능을 우선적으로 사용하는 것이 좋습니다.



### 참고 링크

MCP git hub main - https://github.com/modelcontextprotocol

MCP 기본 개념 git - https://github.com/modelcontextprotocol/modelcontextprotocol

MCP 서버 모음 git - https://github.com/modelcontextprotocol/servers

GEMINI_CLI_MCP DOC -https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md

Gluestack UI 참고 -https://gluestack.io/ui/docs/home/overview/introduction