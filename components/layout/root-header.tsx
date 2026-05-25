import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'
import { SITE_CONFIG } from '@/lib/constants'

/**
 * 랜딩 페이지 헤더
 * - 로고 및 사이트명
 * - 네비게이션 링크
 * - 로그인/시작하기 버튼
 * - 테마 토글
 */
export function RootHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 로고 및 사이트명 */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
          <span className="hidden sm:inline">{SITE_CONFIG.name}</span>
        </Link>

        {/* 네비게이션 링크 (데스크톱) */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            기능
          </a>
          <a href="#tech-stack" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            기술 스택
          </a>
          <a
            href={SITE_CONFIG.links.docs}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            문서
          </a>
          <a
            href={SITE_CONFIG.links.github}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </nav>

        {/* 우측 액션 버튼 */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              로그인
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="hidden sm:inline-flex">
              시작하기
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
