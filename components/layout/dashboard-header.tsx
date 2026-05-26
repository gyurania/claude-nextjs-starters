'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from './theme-toggle'
import { Sidebar } from './sidebar'
import { CURRENT_USER } from '@/lib/constants'

/**
 * 대시보드 헤더
 * - 'use client'로 marked (모바일 Sheet 토글 사용)
 * - 모바일: 햄버거 메뉴로 Sidebar를 Sheet로 표시
 * - 데스크톱: 테마 토글 + 유저 메뉴
 */
export function DashboardHeader() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
      {/* 모바일 햄버거 메뉴 */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">사이드바 열기</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* 우측 액션 영역 */}
      <div className="ml-auto flex items-center gap-4">
        {/* 테마 토글 */}
        <ThemeToggle />

        {/* 유저 드롭다운 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="유저 아바타" />
                <AvatarFallback>GY</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {/* 유저 정보 */}
            <div className="flex items-center gap-3 px-2 py-1.5">
              <Avatar className="h-8 w-8">
                <AvatarImage src={CURRENT_USER.avatarUrl} alt="유저 아바타" />
                <AvatarFallback>{CURRENT_USER.initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{CURRENT_USER.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{CURRENT_USER.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />

            {/* 메뉴 항목 */}
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">프로필</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">설정</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/team">팀 관리</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/api/auth/logout">로그아웃</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
