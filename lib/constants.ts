// 사이트 전체 설정
export const SITE_CONFIG = {
  name: 'Modern Starter Kit',
  description: 'Next.js 16 + TypeScript + Tailwind CSS + ShadcnUI로 만든 모던 웹 스타터킷',
  url: 'https://starter-kit.example.com',
  ogImage: 'https://starter-kit.example.com/og.jpg',
  links: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    docs: 'https://nextjs.org/docs',
  },
}

// 네비게이션 항목 (사이드바 + 헤더에서 공유)
import {
  LayoutDashboard,
  BarChart3,
  FolderOpen,
  Users,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  description?: string
  disabled?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: '대시보드',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: '주요 통계와 지표',
  },
  {
    title: '분석',
    href: '/dashboard/analytics',
    icon: BarChart3,
    description: '데이터 분석 및 리포트',
  },
  {
    title: '프로젝트',
    href: '/dashboard/projects',
    icon: FolderOpen,
    description: '프로젝트 관리',
  },
  {
    title: '팀',
    href: '/dashboard/team',
    icon: Users,
    description: '팀 멤버 관리',
  },
  {
    title: '설정',
    href: '/dashboard/settings',
    icon: Settings,
    description: '애플리케이션 설정',
  },
]

// 사용자 네비게이션 (드롭다운 메뉴)
export const USER_NAV_ITEMS = [
  { label: '프로필', href: '/dashboard/profile' },
  { label: '설정', href: '/dashboard/settings' },
  { label: '로그아웃', href: '/auth/logout', isDangerous: true },
]

// 랜딩 페이지 Features
export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    icon: LayoutDashboard,
    title: '빠른 시작',
    description: '사전 구성된 레이아웃과 컴포넌트로 즉시 개발 시작',
  },
  {
    icon: BarChart3,
    title: '타입 안전',
    description: 'TypeScript로 런타임 에러를 사전에 방지',
  },
  {
    icon: FolderOpen,
    title: 'UI 라이브러리',
    description: 'ShadcnUI로 아름답고 기능성 있는 컴포넌트 제공',
  },
  {
    icon: Users,
    title: '반응형 디자인',
    description: 'Tailwind CSS로 모든 기기에 완벽 최적화',
  },
  {
    icon: Settings,
    title: '다크모드',
    description: 'next-themes로 우아한 다크/라이트 모드 지원',
  },
  {
    icon: BarChart3,
    title: '확장 가능',
    description: '계층적 컴포넌트 구조로 쉬운 커스터마이징',
  },
]

// 기술 스택
export const TECH_STACK = [
  { name: 'Next.js', version: '16' },
  { name: 'React', version: '19' },
  { name: 'TypeScript', version: '5' },
  { name: 'Tailwind CSS', version: '4' },
  { name: 'ShadcnUI', version: '4' },
  { name: 'lucide-react', version: '1.16' },
]
