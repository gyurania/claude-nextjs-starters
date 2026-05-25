import { DashboardHeader } from '@/components/layout/dashboard-header'
import { Sidebar } from '@/components/layout/sidebar'

/**
 * 대시보드 레이아웃
 * - 데스크톱: 좌측 고정 Sidebar + 우측 메인 콘텐츠
 * - 모바일: Sheet으로 사이드바 표시 (헤더의 햄버거 메뉴)
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 상단 헤더 */}
      <DashboardHeader />

      <div className="flex flex-1">
        {/* 좌측 사이드바 (데스크톱만) */}
        <Sidebar />

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 overflow-auto lg:ml-64">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
