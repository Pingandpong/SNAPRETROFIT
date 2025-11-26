# SnapRetrofit 개발 가이드

## 현재 완료된 작업 ✅

### Phase 1: 환경 설정 (완료)
-  프로젝트 구조 생성 
-  TypeScript 타입 정의
-  Supabase 클라이언트 서비스
-  OpenAI 서비스 (Vision API + GPT-4o)
-  RAG 서비스 (벡터 검색)
-  SQL 스키마 작성

## 다음 단계 (사용자 작업 필요)

### 1. Supabase 프로젝트 생성 🔧

1. https://supabase.com 접속
2. "New Project" 클릭
3. 프로젝트 이름: `snapretrofit`
4. Database Password 설정 (안전하게 보관!)
5. Region: `Northeast Asia (Seoul)` 선택
6. "Create new project" 클릭

### 2. SQL 스키마 실행 📊

1. Supabase Dashboard → SQL Editor
2. `src/supabase_schema.sql` 파일 내용 복사
3. SQL Editor에 붙여넣기
4. "Run" 클릭
5. 성공 메시지 확인

### 3. Storage 버킷 생성 📁

1. Supabase Dashboard → Storage
2. "Create a new bucket" 클릭
3. Name: `scan-images`
4. Public: `OFF` (비공개)
5. "Create bucket" 클릭

### 4. 환경 변수 설정 🔑

프로젝트 루트에 `.env` 파일 생성:

```bash
# OpenAI API (https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-...

# Supabase (Dashboard → Settings → API)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. 샘플 리베이트 데이터 삽입 (선택사항) 💾

```typescript
// 터미널에서 실행
npm run seed-rebates
```

또는 수동으로:
1. `src/services/rag.ts` 파일의 `sampleRebates` 참고
2. 각 리베이트를 `ragService.embedAndStoreRebate()` 함수로 저장

## 테스트 방법 🧪

### 1. Supabase 연결 테스트

```typescript
import { supabase } from './src/services/supabase';

// 연결 테스트
const { data, error } = await supabase.from('scans').select('count');
console.log('Supabase connected:', !error);
```

### 2. OpenAI API 테스트

```typescript
import { openaiService } from './src/services/openai';

// 임베딩 테스트
const embedding = await openaiService.createEmbedding('테스트');
console.log('OpenAI connected:', embedding.length === 1536);
```

## 프로젝트 구조 📂

```
src/
├── screens/              # (다음 단계) 화면 컴포넌트
│   ├── CameraScreen.tsx
│   ├── ReportScreen.tsx
│   └── PaywallScreen.tsx
├── services/             # 완료
│   ├── supabase.ts      # Supabase 클라이언트
│   ├── openai.ts        # OpenAI API
│   └── rag.ts           # RAG 검색
├── types/                # 완료
│   └── index.ts         # TypeScript 타입
├── utils/                # (다음 단계) 유틸리티
│   ├── imageAnalysis.ts
│   └── reportGenerator.ts
├── components/           # (다음 단계) 재사용 컴포넌트
├── supabase_schema.sql   #  완료
└── ENV_SETUP.md          #  완료
```

## 다음 개발 단계 (Day 3-4)

### Phase 4: 카메라 UX
- [ ] CameraScreen 구현
- [ ] 촬영 가이드 UI
- [ ] 품질 체크 로직
- [ ] Supabase Storage 업로드

### Phase 5: RAG 및 리포트
- [ ] 이미지 분석 통합
- [ ] RAG 검색 통합
- [ ] 리포트 생성 UI
- [ ] PDF 생성

## 문제 해결 🔧

### "Supabase URL is required" 에러
→ `.env` 파일에 `SUPABASE_URL` 추가 확인

### "OpenAI API Key is required" 에러
→ `.env` 파일에 `OPENAI_API_KEY` 추가 확인

### Vector 검색이 작동하지 않음
→ Supabase에서 `vector` 확장이 활성화되었는지 확인

## 참고 문서 📚

- [Supabase 공식 문서](https://supabase.com/docs)
- [OpenAI API 문서](https://platform.openai.com/docs)
- [Expo Camera 문서](https://docs.expo.dev/versions/latest/sdk/camera/)
- [README_SNAPRETROFIT.md](../README_SNAPRETROFIT.md) - 전체 프로젝트 개요
