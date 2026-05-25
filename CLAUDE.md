# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소의 코드로 작업할 때 참고할 수 있는 지침을 제공합니다.

## 자주 사용하는 커맨드

```bash
npm run dev          # 개발 서버 시작 (http://localhost:3000)
npm run build        # 프로덕션용 빌드
npm start            # 프로덕션 서버 실행
npm run lint         # ESLint 실행
```

## 프로젝트 개요

Next.js 16, TypeScript, Tailwind CSS, ShadcnUI 컴포넌트로 구성된 모던 스타터킷입니다. Route Groups를 사용하여 페이지를 논리적 섹션으로 구성: 공개 랜딩 페이지, 인증(auth), 대시보드 관리 기능.

## 아키텍처

### 디렉토리 구조

- **`/app`** - Next.js App Router with Route Groups
  - `page.tsx` - 랜딩 페이지
  - `layout.tsx` - 전역 프로바이더를 포함한 루트 레이아웃
  - `(auth)/` - 인증 페이지 (로그인, 회원가입)
  - `(dashboard)/` - 대시보드 라우트 및 중첩 페이지 (분석, 프로젝트, 팀, 설정, 프로필)
  - `not-found.tsx` - 404 오류 페이지
  
- **`/components`** - 카테고리별로 구성된 React 컴포넌트
  - `/ui/` - ShadcnUI 기본 컴포넌트 (button, card, input, dropdown-menu, sheet, table 등)
  - `/layout/` - 레이아웃 컴포넌트 (sidebar, header, footer, theme-toggle)
  - `/shared/` - 공유되는 UI 패턴 (stats-card, page-header)
  - `providers.tsx` - 전역 클라이언트 프로바이더 (ThemeProvider, Toaster)

- **`/lib`** - 유틸리티 및 상수
  - `utils.ts` - Tailwind 클래스 병합 함수 `cn()` (clsx + tailwind-merge)
  - `constants.ts` - 사이트 설정, 네비게이션 항목, 기능 정의, 기술 스택

- **`/hooks`** - 커스텀 React 훅
  - `use-mobile.ts` - 미디어 쿼리 매칭을 감지하는 반응형 디자인 훅

- **`/public`** - 정적 자산 (이미지, 폰트)

### 핵심 설계 패턴

1. **Route Groups** - 괄호를 사용한 논리적 페이지 조직: `(auth)`, `(dashboard)` 등. 그룹은 URL 구조에 영향을 주지 않습니다.

2. **클라이언트 프로바이더** - `/components/providers.tsx`에서 전역 상태 관리:
   - `ThemeProvider` - next-themes를 통한 다크/라이트 모드 (클래스 기반)
   - `Toaster` - sonner를 통한 Toast 알림

3. **컴포넌트 계층**
   - `/components/ui/`에 ShadcnUI 기본 컴포넌트
   - 레이아웃 래퍼 컴포넌트가 ShadcnUI 컴포넌트와 상수 사용
   - 페이지가 레이아웃 컴포넌트와 공유 컴포넌트 소비

4. **네비게이션** - `lib/constants.ts`에서 중앙화:
   - `NAV_ITEMS` 배열이 사이드바와 breadcrumb 제어
   - `USER_NAV_ITEMS`는 사용자 드롭다운 메뉴용
   - `usePathname()`을 통한 네비게이션 활성 상태 감지

5. **스타일링** - Radix UI와 Tailwind CSS:
   - `app/globals.css`의 CSS 변수로 테마 관리
   - ShadcnUI 컴포넌트는 Tailwind 클래스로 사전 구성됨
   - `cn()` 유틸리티로 조건부 Tailwind 클래스 안전하게 병합

## 중요한 주의사항

- **Next.js 16 Breaking Changes**: 이 버전은 이전 Next.js와 API 변경이 있습니다. 코드 작성 전에 `node_modules/next/dist/docs/`에서 현재 API 시그니처를 확인하세요. deprecated 알림에 주의하세요.

- **TypeScript Strict Mode**: `tsconfig.json`의 `strict: true` — 모든 암시적 `any` 타입은 에러입니다. 항상 명시적 타입을 제공하세요.

- **Import 경로**: `@/` 경로 별칭 (루트로 resolve됨) 사용: `import { cn } from '@/lib/utils'`

- **Server vs Client 컴포넌트**:
  - 기본은 Server Component (`'use server'` 또는 directive 없음)
  - 클라이언트 훅 사용 시에만 `'use client'` 마크 (useState, useEffect, useContext 등)
  - 최상위 레이아웃 컴포넌트는 반응형 기능을 위해 `'use client'` 사용

- **테마 시스템**: 
  - 다크모드는 `<html>` 요소의 `class` 속성 사용
  - next-themes로 제어되며 시스템 선호도 감지
  - 클라이언트 컴포넌트에서 `next-themes`의 `useTheme()` 훅으로 접근

- **ShadcnUI 컴포넌트**:
  - `/components/ui/`에서 import (components.json으로 이미 구성됨)
  - 모든 컴포넌트는 composable하고 eject되지 않음 — 커스터마이징 안전
  - 기본 컴포넌트는 controlled props 패턴 사용

## 개발 워크플로우

1. **새 페이지 생성** - `/app/`의 적절한 Route Group에 `.tsx` 파일 추가
2. **새 컴포넌트 생성** - 적절한 서브디렉토리를 사용하여 `/components/`에 추가
3. **네비게이션 확장** - `lib/constants.ts`의 `NAV_ITEMS` 수정
4. **아이콘 추가** - `lucide-react`에서 import (이미 의존성에 포함됨)
5. **스타일링** - Tailwind 유틸리티 클래스 사용; 일관된 디자인을 위해 ShadcnUI 컴포넌트 활용

## 린팅

ESLint는 Next.js 권장 규칙 (Core Web Vitals + TypeScript)으로 구성되어 있습니다. 이슈 확인하려면 `npm run lint`를 실행하세요. 설정은 `eslint.config.mjs`에 있습니다.
