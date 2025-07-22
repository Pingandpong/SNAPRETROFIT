# Gemini Project Overview

## 1. Project Goal

This project is a mobile application built with React Native and Expo. It uses Firebase for backend services and is written in TypeScript. The goal is to create a foundational application structure that can be extended with more features in the future.

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

## 4. How to Run

1.  Install dependencies: `npm install`
2.  Start the development server: `npm start`
3.  Run on Android: `npm run android`
4.  Run on iOS: `npm run ios`

This `GEMINI.md` file provides a clear and concise overview of the project, making it easy for Gemini to understand its purpose, technology stack, and structure.

---

## 한국어 요약

이 프로젝트는 TypeScript 기반의 React Native 모바일 앱입니다. Expo 프레임워크를 사용하여 개발되었으며, Firebase를 백엔드로 활용합니다. React Navigation을 통해 화면 전환을 관리하며, 현재는 기본적인 홈 화면, 상세 화면, 설정 화면이 구현된 초기 단계의 앱입니다.

## Gemini 지침

- **응답 언어:** 항상 한국어로 답변해주세요.
- **폴더 무시:** `node_modules`, `.expo`, `build` 폴더의 내용은 분석하거나 수정하지 마세요.