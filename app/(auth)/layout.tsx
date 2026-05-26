import type { ReactNode } from 'react'

/**
 * 인증 레이아웃
 * - 화면 중앙에 카드 형태로 콘텐츠 배치
 * - 배경에 미묘한 그라디언트
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* 배경 그라디언트 (선택사항) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-muted/50" />

      {/* 중앙 카드 */}
      <div className="w-full max-w-sm px-4 py-8">{children}</div>
    </div>
  )
}
