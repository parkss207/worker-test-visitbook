# Worker Test Visitbook

SvelteKit 프로젝트 - Bun + Cloudflare Pages

## ✅ 검증된 안정 버전

- `@sveltejs/adapter-cloudflare`: 4.7.2
- `@sveltejs/kit`: 2.5.28
- `@sveltejs/vite-plugin-svelte`: 3.1.2
- `svelte`: 4.2.19
- `vite`: 5.4.8

## 로컬 개발

```bash
# 의존성 설치
bun install

# 개발 서버 실행 (http://localhost:5173)
bun dev

# 프로덕션 빌드
bun run build

# 프로덕션 미리보기
bun run preview
```

## Cloudflare Pages 배포 설정

### 빌드 설정
- **프레임워크 프리셋**: SvelteKit
- **빌드 명령어**: `npm install && npm run build`
- **빌드 출력 디렉토리**: `.svelte-kit/cloudflare`
- **Node 버전**: 18 이상

### 환경 변수 (선택사항)
필요한 경우 Cloudflare Pages 대시보드에서 환경 변수를 추가하세요.

## ⚠️ 중요 사항

- **로컬 개발**: Bun만 사용하세요! (npm/node/npx 사용 금지)
- **Cloudflare 배포**: Cloudflare Pages는 내부적으로 npm을 사용하므로 빌드 명령어에 npm 사용
- **버전 고정**: package.json의 버전은 정확히 고정되어 있어 안정성 보장

## 프로젝트 구조

```
worker-test-visitbook/
├── src/
│   ├── routes/
│   │   └── +page.svelte      # 메인 페이지
│   └── app.html               # HTML 템플릿
├── static/
│   └── favicon.png            # 파비콘
├── .svelte-kit/
│   └── cloudflare/            # 빌드 출력 (배포용)
├── package.json               # 의존성 (버전 고정)
├── bunfig.toml                # Bun 설정
├── svelte.config.js           # SvelteKit + Cloudflare 어댑터
├── vite.config.js             # Vite 설정
├── wrangler.toml              # Cloudflare 로컬 개발 설정
└── .node-version              # Node 버전 지정
```

## 문제 해결

### 빌드 오류 발생 시
```bash
# 클린 재설치
rm -rf node_modules .svelte-kit bun.lock
bun install
bun run build
```

### 개발 서버 포트 변경
`vite.config.js`에서 `server.port` 설정 추가

## Cloudflare D1 데이터베이스 설정 (방명록)

### 1. 데이터베이스 생성
```bash
bunx wrangler d1 create visitbook-db
```
위 명령어를 실행하면 `database_id`가 출력됩니다. 이 ID를 `wrangler.toml` 파일의 `database_id` 항목에 붙여넣으세요.

### 2. 스키마 적용
데이터베이스 테이블을 생성합니다.

**로컬 개발용 (임시 DB):**
```bash
bunx wrangler d1 execute visitbook-db --local --file=./schema.sql
```

**실제 배포용 (Cloudflare D1):**
```bash
bunx wrangler d1 execute visitbook-db --remote --file=./schema.sql
```

## 라이선스

Private

