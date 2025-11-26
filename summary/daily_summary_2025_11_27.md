# 2025-11-27 작업 요약

## 오늘 한 일
- 기존 base_project를 토대로 SNAPRETROFIT 아이디어 프로젝트 첫 착수 (Expo/Firebase 베이스 활용)
- 앱 기본 뼈대 구성(앱 엔트리/내비게이션/서비스 스텁 흐름 정리)
- `.gitignore`를 Expo/React Native에 맞게 재작성(환경 변수, 빌드 산출물, 캐시, OS/에디터, Gemini 키 제외)

## 테스트/검증
- Xcode CoreSimulator 삭제로 iOS 시뮬레이터 실행 불가 → 오늘 실행 테스트 미진행
- 타입체크/린트/빌드는 시뮬레이터 복구 후 진행 예정

## 내일 할 일
- Xcode 재설치 및 CoreSimulator 복구
- `expo run:ios` (또는 `npm run ios`) 실행 검증
- 기본 검증 재개: `npx tsc --noEmit`, `npm run lint`, `expo run:android`
