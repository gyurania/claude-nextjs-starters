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

**기술 스택**: Next.js 16.2, React 19.2, TypeScript 5, Tailwind CSS 4, ShadcnUI 4

모던 웹 애플리케이션을 빠르게 시작할 수 있도록 설계된 프로덕션 수준의 스타터킷입니다. Route Groups를 사용하여 페이지를 논리적 섹션으로 구성: 공개 랜딩 페이지, 인증(auth), 대시보드 관리 기능. 모든 컴포넌트는 TypeScript strict mode로 타입 안전성을 보장하며, Tailwind CSS와 ShadcnUI로 즉시 사용 가능한 높은 품질의 UI를 제공합니다.

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

1. **Route Groups** - 괄호를 사용한 논리적 페이지 조직 (URL에 반영되지 않음):
   - `(auth)` - 인증 관련 페이지 (로그인, 회원가입)
   - `(dashboard)` - 대시보드 관련 페이지들
   - 동일 Route Group 내 페이지들이 동일 레이아웃 공유

2. **Server vs Client 컴포넌트** (Next.js 중요 개념):
   - **기본값 = Server Component**: 데이터 페칭, DB 접근, 보안 로직에 사용
   - **'use client' 마크 필수인 경우**:
     - `useState`, `useEffect`, `useContext` 등 클라이언트 훅 사용
     - 사용자 상호작용 (onClick, onChange 등)
     - `next-themes`, `next/navigation` 훅 사용 (usePathname, useRouter 등)
   - **예시**:
     ```tsx
     // Server Component (기본)
     export default function Page() {
       const data = await fetchFromDB();
       return <div>{data}</div>;
     }

     // Client Component
     'use client'
     import { usePathname } from 'next/navigation'
     export function Navigation() {
       const pathname = usePathname();
       return <nav>...</nav>;
     }
     ```

3. **전역 상태 및 프로바이더** - `/components/providers.tsx`:
   - `ThemeProvider` (next-themes) - 다크/라이트 모드 (HTML class 기반, `<html className="dark">`)
   - `Toaster` (sonner) - Toast 알림 시스템 (위치: 우측 하단)

4. **네비게이션 관리** - 모든 네비게이션이 `lib/constants.ts`에서 중앙화:
   - `NAV_ITEMS` - 메인 네비게이션 (사이드바에서 렌더링)
   - `USER_NAV_ITEMS` - 사용자 드롭다운 메뉴
   - `Sidebar` 컴포넌트에서 `usePathname()`으로 현재 경로 감지하여 활성 항목 강조

5. **컴포넌트 계층 구조**:
   ```
   Page (app/(group)/*/page.tsx)
   ├── Layout (app/(group)/layout.tsx)
   ├── Layout 컴포넌트들 (Header, Sidebar 등)
   └── UI 컴포넌트 (Button, Card, Input 등)
   
   예: /dashboard/analytics
   Page → DashboardLayout → DashboardHeader + Sidebar + PageHeader
   ```

6. **스타일링 시스템** - Tailwind CSS 4 + Radix UI 테마:
   - **CSS 변수**: `app/globals.css`에서 `@theme inline` 블록으로 정의
   - **색상**: `--background`, `--foreground`, `--primary`, `--sidebar` 등 미리 정의됨
   - **Tailwind 클래스**: `bg-background`, `text-foreground` 등으로 사용
   - **조건부 클래스**: `cn()` 유틸리티로 안전하게 병합 (`clsx` + `tailwind-merge`)
     ```tsx
     <div className={cn(
       "base-classes",
       isActive && "text-primary",
       disabled && "opacity-50"
     )} />
     ```

## 중요한 주의사항

### TypeScript Strict Mode
- `tsconfig.json`의 `strict: true` 활성화 — 암시적 `any` 타입 금지
- **모든 함수 매개변수와 반환값은 명시적 타입 필요**
  ```tsx
  // ✅ 올바른
  function handleClick(value: string): void { }
  const items: Item[] = [];

  // ❌ 잘못된 (타입스크립트 에러)
  function handleClick(value) { }  // any 타입
  const items = [];  // any[]로 추론됨
  ```

### Import 경로
- `@/` 경로 별칭 사용 (프로젝트 루트로 resolve):
  ```tsx
  import { cn } from '@/lib/utils'
  import { Button } from '@/components/ui/button'
  import { NAV_ITEMS } from '@/lib/constants'
  ```

### 테마 시스템 (next-themes 기반)
- 다크 모드는 HTML의 `class="dark"` 속성으로 제어됨
- CSS 변수는 Tailwind의 `dark:` 프리픽스와 자동 통합
  ```tsx
  // Tailwind로 다크 모드 반응
  <div className="bg-white dark:bg-gray-900" />

  // 클라이언트에서 테마 제어
  'use client'
  import { useTheme } from 'next-themes'
  export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
  }
  ```

### 폰트 설정
- **Geist 폰트**: Google Fonts에서 제공하는 산세리프 폰트 (sans, mono 두 가지)
- `app/layout.tsx`에서 설정되며, 자동으로 CSS 변수 (`--font-geist-sans`, `--font-geist-mono`)로 주입됨
- Tailwind의 `font-sans`, `font-mono` 클래스로 사용

### ShadcnUI 컴포넌트
- **위치**: `/components/ui/` 디렉토리
- **특징**: 모두 "eject된" 컴포넌트 (복사본) — 안전하게 커스터마이징 가능
- **스타일**: Tailwind CSS 클래스로 구성되어 있으며, CSS 변수로 자동 테마 적용
- **패턴**: Controlled props 사용 (React의 일반적인 패턴)
  ```tsx
  <Button 
    onClick={handleClick}
    disabled={isLoading}
    className="custom-class"
  />
  ```

### Next.js 16 API 주의사항
- 이전 버전과 API 변경이 있으므로 deprecated 경고를 주의깊게 봅니다
- `next/image`, `next/link` 등의 최신 문법 사용 (자동 최적화)

### 반응형 디자인
- **Tailwind 반응형 프리픽스**: `sm:`, `md:`, `lg:`, `xl:` 등 사용
  ```tsx
  {/* 모바일에서는 숨김, 데스크톱에서는 표시 */}
  <aside className="hidden lg:fixed lg:flex" />
  
  {/* 사이즈별 패딩 조정 */}
  <main className="px-4 sm:px-6 lg:px-8" />
  ```
- **모바일 네비게이션**: Sidebar는 `lg:` 브레이크포인트에서만 표시, 모바일은 Sheet 컴포넌트로 전환

### 모바일 감지 훅
- `use-mobile.ts` 훅으로 미디어 쿼리 매칭 감지 가능
  ```tsx
  'use client'
  import { useMobile } from '@/hooks/use-mobile'
  export function MyComponent() {
    const isMobile = useMobile()
    return isMobile ? <MobileView /> : <DesktopView />
  }
  ```

## 개발 워크플로우

### 새 페이지 생성
```tsx
// 1. 파일 생성: app/(dashboard)/dashboard/newpage/page.tsx
'use client'  // 필요시만 추가

import { PageHeader } from '@/components/shared/page-header'

export default function NewPage() {
  return (
    <div>
      <PageHeader title="페이지 제목" description="설명" />
      {/* 컨텐츠 */}
    </div>
  )
}

// 2. 네비게이션에 추가: lib/constants.ts의 NAV_ITEMS에 항목 추가
// 3. 자동으로 Sidebar에 표시됨
```

### 새 컴포넌트 생성
```tsx
// 파일 위치: components/[category]/[component-name].tsx
// 카테고리: ui (ShadcnUI), layout (레이아웃), shared (공유 패턴)

'use client'  // 인터랙션 필요시
import { cn } from '@/lib/utils'

interface MyComponentProps {
  variant?: 'default' | 'secondary'
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export function MyComponent({ 
  variant = 'default', 
  disabled = false,
  className,
  children 
}: MyComponentProps) {
  return (
    <div className={cn(
      'base-styles',
      variant === 'default' && 'default-variant',
      disabled && 'opacity-50',
      className
    )}>
      {children}
    </div>
  )
}
```

### 아이콘 추가
```tsx
import { Heart, Share2, MoreVertical } from 'lucide-react'

export function MyComponent() {
  return (
    <div>
      <Heart className="w-5 h-5" />
      <Share2 className="w-5 h-5" />
      <MoreVertical className="w-5 h-5" />
    </div>
  )
}
// lucide-react 공식 사이트에서 아이콘 검색: lucide.dev
```

### 스타일링 방법
```tsx
// 1. Tailwind 유틸리티 클래스 (권장)
<button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90" />

// 2. cn() 유틸리티로 조건부 클래스 병합
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  customClass
)} />

// 3. ShadcnUI 컴포넌트 사용 (최고 권장)
<Button variant="primary" size="lg" disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

## 린팅 및 코드 품질

### ESLint
- **설정**: `eslint.config.mjs` (Next.js 공식 권장 규칙 포함)
- **체크 항목**: Core Web Vitals, TypeScript strict, React 베스트 프랙티스
- **실행**: `npm run lint`
- **무시**: 특정 라인에 `// eslint-disable-next-line [규칙]` 주석

### TypeScript 검사
- 빌드 시 자동으로 TypeScript 타입 검사 수행
- IDE에서도 실시간 에러 표시 (VS Code 권장)

## 환경 설정

### 환경 변수
1. `.env.local` 파일 생성 (프로젝트 루트)
2. Next.js에서 자동으로 로드됨 (로컬 개발용)
3. 클라이언트에서 접근하려면 `NEXT_PUBLIC_` 프리픅스 필요:
   ```bash
   # .env.local
   NEXT_PUBLIC_API_URL=http://localhost:3000
   DATABASE_URL=postgresql://...  # 서버용 (숨김)
   ```
4. 클라이언트 컴포넌트에서 접근:
   ```tsx
   const apiUrl = process.env.NEXT_PUBLIC_API_URL
   ```

### 포트 설정
- 기본 포트: 3000
- 변경: `npm run dev -- -p 3001`

## 배포

### 프로덕션 빌드
```bash
npm run build        # 최적화 빌드 생성 (.next 디렉토리)
npm start            # 빌드된 앱 실행 (프로덕션 모드)
```

### 배포 플랫폼별 가이드
- **Vercel** (권장): Git 리포 연결하면 자동 배포, 환경변수 UI에서 관리
- **Docker**: `npm run build` 후 `npm start`로 컨테이너 실행
- **다른 호스팅**: Node.js 18+ 필요, `npm run build && npm start` 실행

### 빌드 최적화
- 자동으로 수행됨 (Next.js의 고급 최적화):
  - 정적 페이지 자동 생성 (Static Generation)
  - 코드 스플리팅 (각 라우트별 JS 분리)
  - 이미지 최적화 (`next/image` 사용시)
  - CSS 자동 최소화

## 일반적인 문제 해결

### "Module not found" 오류
```
Module not found: Can't resolve '@/components/...'
```
**해결**: `tsconfig.json`의 `paths` 옵션 확인 (`"@/*": ["./*"]` 맞는지)

### 타입 에러 "any" 타입
```
Parameter 'x' implicitly has an 'any' type.
```
**해결**: 명시적 타입 추가
```tsx
// ❌ 전
function handleChange(e) { }

// ✅ 후
function handleChange(e: React.ChangeEvent<HTMLInputElement>) { }
```

### 'use client' 에러
```
"usePathname" only works in Client Components
```
**해결**: 파일 최상단에 `'use client'` 추가

### 다크모드가 적용 안 됨
- `Providers` 컴포넌트가 `<html>` 래핑하는지 확인
- `next-themes`의 `suppressHydrationWarning` 속성 확인
- 브라우저 개발자도구에서 `<html class="dark">` 존재 확인

### 성능 이슈 (느린 로딩)
1. **개발 모드 vs 프로덕션**: `npm run build && npm start`로 프로덕션 빌드 테스트
2. **네트워크 탭**: 개발자도구에서 느린 리소스 확인
3. **Image 최적화**: `<Image>` 컴포넌트 사용 (웹페이지 크기 축소)

## 고급 팁

### TypeScript 타입 재사용
```tsx
// types/index.ts에 공통 타입 정의
export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

// 컴포넌트에서 import
import type { NavItem } from '@/types'
```

### 조건부 'use client'
```tsx
// 서버 컴포넌트에서 클라이언트 컴포넌트 import (권장 패턴)
import { InteractiveButton } from '@/components/interactive-button'  // 'use client'

export default function Page() {
  // 서버 로직
  const data = await fetchData()
  
  // 클라이언트 컴포넌트에 props로 전달
  return <InteractiveButton data={data} />
}
```

### 동적 import (대형 라이브러리 로딩 최적화)
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/heavy'), {
  loading: () => <div>로딩 중...</div>,
})

export default function Page() {
  return <HeavyComponent />  // 필요할 때만 로드
}
```
