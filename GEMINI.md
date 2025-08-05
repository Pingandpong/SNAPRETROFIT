# Gemini Project Overview

## 1. Project Goal

이 프로젝트는 React Native와 Expo로 구축된 모바일 애플리케이션입니다. Firebase를 백엔드 서비스로 사용하며 TypeScript로 작성되었습니다. 이 프로젝트의 궁극적인 목표는 **모든 새로운 모바일 앱 개발의 견고한 기본 베이스를 구축**하는 것입니다. 이를 통해 앱 아이디어가 생길 때마다 이 베이스에 필요한 기능만 추가하여 빠르고 효율적으로 개발할 수 있도록 합니다. 특히, UI 및 백엔드 통합을 위해 Model Context Protocol (MCP)을 실험적으로 도입하여, 앱 개발의 초기 설정을 최소화하고 핵심 기능 구현에 집중할 수 있는 환경을 마련하는 것을 목표로 합니다.

## 2. Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **Backend**: Firebase
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

MCP git hub - https://github.com/modelcontextprotocol
