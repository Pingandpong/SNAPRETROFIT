# Gemini Project Overview

## 1. Project Goal

이 프로젝트는 React Native와 Expo로 구축된 모바일 애플리케이션입니다. Firebase를 백엔드 서비스로 사용하며 TypeScript로 작성되었습니다. 이 프로젝트의 궁극적인 목표는 **모든 새로운 모바일 앱 개발의 견고한 기본 베이스를 구축**하는 것입니다. 이를 통해 앱 아이디어가 생길 때마다 이 베이스에 필요한 기능만 추가하여 빠르고 효율적으로 개발할 수 있도록 합니다. 특히, UI 및 백엔드 통합을 위해 Model Context Protocol (MCP)을 실험적으로 도입하여, 앱 개발의 초기 설정을 최소화하고 핵심 기능 구현에 집중할 수 있는 환경을 마련하는 것을 목표로 합니다.

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
  - `App.tsx`: The root component of the application, which initializes Firebase and the main navigator.
  - `components/`: Directory for reusable UI components.
  - `config/`: Configuration files, including Firebase setup (`firebaseConfig.ts`).
  - `navigation/`: Navigation setup using React Navigation.
    - `AppNavigator.tsx`: Defines the main stack navigator for the app.
  - `screens/`: Contains the different screens of the application.
    - `HomeScreen.tsx`: The main screen displayed after the app launches.
    - `DetailScreen.tsx`: A screen for displaying detailed information.
    - `SettingsScreen.tsx`: A screen for application settings.
- `package.json`: Lists project dependencies and scripts.
- `tsconfig.json`: TypeScript compiler configuration.
- `app.json`: Expo configuration file.
- `assets/`: Static assets like images and icons.
- `android/` and `ios/`: Native project directories (though managed by Expo).

## 4. Current Development Focus

The current development is focused on integrating **Model Context Protocol (MCP)** into the `app_base` to streamline UI and backend development.

- **MCP Exploration**: Investigating `modelcontextprotocol` (foundational server examples) and `servers` (collection of existing MCP servers) GitHub repositories. The plan is to leverage existing MCP servers from the `servers` repository.
- **Integration Goal**: To integrate UI-related MCP and Firebase MCP into `app_base`, pre-configuring both the UI and a basic backend. This will allow for rapid development of new app ideas by building upon this pre-established foundation.
- **Figma Consideration**: Noted that Figma Dev Mode (paid feature) is required for full MCP-related access, and this aspect is currently on hold.
- **UI Refactoring**: Ongoing refactoring of UI components to utilize Gluestack UI for a consistent and efficient development experience.

## 5. How to Run

1.  Install dependencies: `npm install`
2.  Start the development server: `npm start`
3.  Run on Android: `npm run android`
4.  Run on iOS: `npm run ios`

This `GEMINI.md` file provides a clear and concise overview of the project, making it easy for Gemini to understand its purpose, technology stack, and structure.

---

## 한국어 요약

이 프로젝트는 TypeScript 기반의 React Native 모바일 앱입니다. Expo 프레임워크를 사용하여 개발되었으며, Firebase를 백엔드로 활용합니다. React Navigation을 통해 화면 전환을 관리하며, 현재는 기본적인 홈 화면, 상세 화면, 설정 화면이 구현된 초기 단계의 앱입니다. 특히, UI 및 백엔드 통합을 위해 Model Context Protocol (MCP)을 실험적으로 도입하여, 모든 앱 개발의 기본 베이스를 구축하는 데 중점을 두고 있습니다.

## Gemini 지침

- **응답 언어:** 항상 한국어로 답변해주세요.
- **폴더 무시:** `node_modules`, `.expo`, `build` 폴더의 내용은 분석하거나 수정하지 마세요.

## 참고 링크 


MCP git hub main - https://github.com/modelcontextprotocol

MCP 기본 개념 git - https://github.com/modelcontextprotocol/modelcontextprotocol

MPC 서버 모음 git - https://github.com/modelcontextprotocol/servers

## 4-1. VS Code에서 Gemini CLI + MCP 서버 병행 사용

이 프로젝트는 VS Code 환경에서 **Gemini CLI**와 [기성 MCP 서버](https://github.com/modelcontextprotocol/servers)를 함께 사용하여 개발 생산성을 높입니다.

### 목적
- **Gemini CLI**: UI 리뷰, 리팩터 제안, 문구 생성 등 창의적·분석 작업
- **MCP 서버**: 파일 읽기/쓰기, Git 히스토리 확인, 명령 실행 등 로컬 액션

### 활용 가능한 MCP 서버
이 프로젝트는 `.gemini/settings.json` 파일에 다음 MCP 서버들이 미리 설정되어 있으며, Gemini CLI에서 바로 활용할 수 있습니다.

- **Filesystem**: 파일 읽기/쓰기, RN 컴포넌트/스크린 파일 관리
- **Git**: 변경사항 diff/commit 로그 확인, Git 작업 수행
- **Commands**: 터미널 명령 실행 (`npx expo lint`, `prebuild`, `start` 등)
- **Screenshot**: 사용자 화면 스크린샷 촬영

이 서버들은 별도의 설치나 실행 명령어 없이 Gemini CLI를 통해 자동으로 연동됩니다.

### 권장 워크플로우
1. MCP Filesystem으로 코드 읽기 → Gemini CLI로 UI 리뷰
2. Gemini의 제안 중 일부를 적용
3. MCP Commands로 `npx expo lint` 실행 → 로그를 Gemini CLI로 전달해 재분석
4. 필요 시 MCP Git으로 diff 확인 후 커밋

이 방식으로 **UI 리뷰**와 **명령 실행/파일 관리**를 VS Code 안에서 모두 처리할 수 있으며, 복사·붙여넣기 과정을 최소화할 수 있습니다.



### 참고 링크

MCP git hub main - https://github.com/modelcontextprotocol

MCP 기본 개념 git - https://github.com/modelcontextprotocol/modelcontextprotocol

MCP 서버 모음 git - https://github.com/modelcontextprotocol/servers

GEMINI_CLI_MCP DOC -https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md
