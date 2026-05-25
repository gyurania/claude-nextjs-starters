'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

/**
 * 애플리케이션 전역 프로바이더
 * - ThemeProvider: 다크/라이트 모드 관리 (next-themes)
 * - Toaster: Toast 알림 시스템 (sonner)
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}
