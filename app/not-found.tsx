import Link from 'next/link'

/**
 * 404 페이지
 * - 존재하지 않는 경로 접속 시 표시
 * - Tailwind CSS로 스타일링
 * - 다크모드 테마 적용
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="text-xl text-muted-foreground">페이지를 찾을 수 없습니다</p>
      <Link
        href="/"
        className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
