# SnapRetrofit 환경 변수 설정 가이드

## 필요한 환경 변수

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 추가하세요:

```bash
# OpenAI API
OPENAI_API_KEY=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

# Supabase
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aWRvZ2NuZmt2aWF2eG95bWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTkwMjMsImV4cCI6MjA3OTczNTAyM30.fn5LJJgrTb_WFnCjf1a3hZ5KaXwEN_s02vxm1dye230

# App Configuration
APP_ENV=development
DEBUG_MODE=true

# Feature Flags
ENABLE_PREMIUM_FEATURES=false
ENABLE_CONTRACTOR_MATCHING=false
```

## 설정 방법

1. **OpenAI API 키 발급**
   - https://platform.openai.com/api-keys 방문
   - "Create new secret key" 클릭
   - 생성된 키를 `OPENAI_API_KEY`에 입력

2. **Supabase 프로젝트 생성**
   - https://supabase.com 방문
   - 새 프로젝트 생성
   - Settings > API에서 URL과 anon key 복사
   - `SUPABASE_URL`과 `SUPABASE_ANON_KEY`에 입력

3. **환경 변수 로드 확인**
   ```bash
   npm install dotenv
   ```

4. **app.json에 환경 변수 추가** (Expo 앱에서 사용하려면)
   ```json
   {
     "expo": {
       "extra": {
         "openaiApiKey": process.env.OPENAI_API_KEY,
         "supabaseUrl": process.env.SUPABASE_URL,
         "supabaseAnonKey": process.env.SUPABASE_ANON_KEY
       }
     }
   }
   ```
