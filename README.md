# app_base: React Native & Expo Boilerplate

`app_base` is a robust and reusable boilerplate for building mobile applications with React Native and Expo. It's designed to provide a solid foundation, allowing developers to quickly kickstart new projects by focusing on core features rather than initial setup.

## ✨ Features

-   **Framework**: React Native with Expo
-   **Language**: TypeScript
-   **Navigation**: React Navigation (with centralized type definitions)
-   **Backend**: Firebase (fully configured, ready for integration)
-   **UI/Styling**: React Native's built-in components and StyleSheet, incorporating a Neumorphism (Soft UI) style with a consistent dark theme. Gluestack UI is used for specific elements.
-   **Internationalization (i18n)**: Multi-language support (Korean, English, Japanese, Spanish) using `i18next`.
-   **Theme Switching**: Light/Dark mode toggle via `ThemeContext`.
-   **Example Flow**: Mock data-driven List-Detail navigation flow.
-   **Development Environment**: Stable and pre-configured for immediate development.

## 🚀 Getting Started

To get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js, npm (or Yarn), and Expo CLI installed.

```bash
npm install -g expo-cli
```

### Installation

1.  Clone the repository:
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd app_base
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

-   **Start Development Server**:
    ```bash
    npm start
    ```
-   **Run on Android**:
    ```bash
    npm run android
    ```
-   **Run on iOS**:
    ```bash
    npm run ios
    ```
-   **Run on Web**:
    ```bash
    npm run web
    ```

## 📂 Project Structure

```
.
├── src/
│   ├── App.tsx                 # Root component, initializes Firebase, i18n, navigator
│   ├── components/             # Reusable UI components (e.g., ScreenCard.tsx)
│   ├── config/                 # Configuration files (e.g., firebaseConfig.ts)
│   ├── context/                # React context providers (e.g., ThemeContext.tsx)
│   ├── data/                   # Mock data
│   ├── locales/                # Translation files (ko.json, en.json, ja.json, es.json)
│   ├── navigation/             # React Navigation setup (AppNavigator.tsx, types.ts)
│   ├── providers/              # React context providers (e.g., ToastProvider.tsx)
│   ├── screens/                # Application screens (HomeScreen.tsx, SettingsScreen.tsx, etc.)
│   ├── services/               # Services (i18n.ts, notifications.ts)
│   ├── styles/                 # Common styles (commonStyles.ts)
│   └── theme/                  # UI theme configuration
├── app.json                    # Expo configuration
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── ...                         # Other configuration files and assets
```

## 💡 Usage as a Base

This `app_base` is intentionally kept free of specific business logic. To build your application:

-   **Add New Screens/Features**: Create new files in `src/screens/` and integrate them into `src/navigation/AppNavigator.tsx`.
-   **Manage State**: Utilize React Context for global state or local component state. For complex state management, consider integrating libraries like Redux, Zustand, or Jotai.
-   **Extend i18n**: Add new keys to `src/locales/*.json` files and use the `useTranslation` hook.
-   **Firebase Integration**: Start using Firebase services (Auth, Firestore, etc.) directly, as it's already configured.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving this base, please open an issue or submit a pull request.

## 📄 License

[Specify your license here, e.g., MIT License]

## 🇰🇷 한국어 요약

이 프로젝트는 React Native와 Expo 기반의 모바일 앱 개발을 위한 **재사용 가능한 기본 템플릿**입니다. TypeScript, React Navigation, Firebase 설정, 다국어(i18n), 라이트/다크 모드 테마 전환 등 핵심 기능이 미리 구축되어 있습니다. 특정 비즈니스 로직은 제외되어 있어, 새로운 앱 개발 시 이 베이스 위에서 빠르게 시작할 수 있습니다.