'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

/**
 * 대시보드 사이드바
 * - 'use client'로 marked (usePathname 사용)
 * - 네비게이션 항목의 활성 상태를 감지하여 강조
 */
export function Sidebar() {
  const pathname = usePathname()

  const isNavItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="hidden border-r border-border bg-muted/40 lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 lg:overflow-y-auto lg:flex lg:flex-col">
      {/* 로고 영역 */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
        <div className="flex flex-col">
          <span className="font-bold text-sm">{SITE_CONFIG.name}</span>
          <span className="text-xs text-muted-foreground">Pro</span>
        </div>
      </div>

      <Separator className="mx-4" />

      {/* 네비게이션 메뉴 */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = isNavItemActive(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-primary/20 text-sidebar-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                item.disabled && 'pointer-events-none opacity-50'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.title}</span>
              {isActive && <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">신규</Badge>}
            </Link>
          )
        })}
      </nav>

      <Separator className="mx-4" />

      {/* 하단 정보 */}
      <div className="space-y-4 px-4 py-6">
        <div className="rounded-lg border border-border/50 bg-muted/50 p-3 text-xs text-muted-foreground">
          <p className="font-semibold mb-1">Starter Kit v1.0</p>
          <p>Next.js 16 + TypeScript + Tailwind CSS</p>
        </div>
      </div>
    </aside>
  )
}
