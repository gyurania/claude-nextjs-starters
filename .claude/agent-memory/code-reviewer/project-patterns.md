---
name: project-patterns
description: Next.js 16 스타터킷의 핵심 설계 패턴, 반복 발견 이슈, 프로젝트 관례
metadata:
  type: project
---

## 프로젝트 개요
Next.js 16 (16.2.6) + React 19 + TypeScript strict + Tailwind CSS v4 + ShadcnUI v4 기반 스타터킷.
Route Group 구조: `(auth)` → `/login`, `/register` / `(dashboard)` → `/dashboard/**`

## 반복적으로 발견된 이슈

- **form 태그 누락**: login/register 페이지에 `<form>` 없이 `type="submit"` 버튼만 존재. Server Action 또는 `<form>` 래퍼 필요.
- **잘못된 로그아웃 경로**: `constants.ts`와 `dashboard-header.tsx` 양쪽에서 `/auth/logout` 하드코딩. Route Group 구조상 실제 URL은 `/logout`이어야 함 (또는 별도 구현 필요).
- **개인 정보 하드코딩**: `dashboard-header.tsx`에 실제 개인 이메일(`gyuraniakim@gmail.com`)과 외부 아바타 URL(`github.com/shadcn.png`) 하드코딩.
- **lang 속성**: `app/layout.tsx`의 `lang="en"` — 한국어 서비스에 맞지 않음. `lang="ko"`로 변경 권장.
- **React 임포트 누락 + type 직접 참조**: `(auth)/layout.tsx`에서 `React` 임포트 없이 `React.ReactNode` 타입 사용. `react-jsx` pragma로 런타임은 괜찮으나, TypeScript strict에서 타입 에러 가능. `import type { ReactNode } from 'react'` 패턴 권장.
- **not-found.tsx 스타일 불일치**: 인라인 style + 네이티브 `<a>` 태그 사용. Tailwind + `next/link` 미사용.
- **사이드바 이중 활성화**: `isNavItemActive`의 `startsWith` 로직으로 `/dashboard` 경로 방문 시 대시보드 메뉴와 하위 메뉴 항목 동시 활성화 가능.
- **"신규" Badge 항상 표시**: `sidebar.tsx`에서 `isActive` 조건으로 모든 활성 메뉴에 "신규" Badge 표시 — 실용적 의미 없음.

## 아키텍처 특이사항
- Dashboard 레이아웃이 Server Component이나 내부 `<Sidebar>`와 `<DashboardHeader>`는 'use client'
- `Sidebar`가 `lg:fixed` 포지셔닝을 사용하여 Sheet 내부에서 렌더링 시 stacking context 문제 가능성
- `useMobile` 훅은 SSR hydration mismatch 방지 로직 포함 (초기값 false)

## 현재 구현 상태
- 인증 폼: UI만 존재, 실제 로직(Server Action, API route) 미구현
- 대시보드 하위 페이지들: stub 상태 (analytics, projects, team, profile)
- 설정 페이지의 Switch 토글: 상태 관리 없음 (uncontrolled)
