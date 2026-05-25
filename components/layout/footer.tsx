import { SITE_CONFIG } from '@/lib/constants'
import { ExternalLink, Mail } from 'lucide-react'

/**
 * 랜딩 페이지 푸터
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 메인 푸터 콘텐츠 */}
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* 브랜드 영역 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
              <span className="font-bold">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">{SITE_CONFIG.description}</p>
          </div>

          {/* 링크 섹션 */}
          <div>
            <h4 className="mb-4 font-semibold">문서</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={SITE_CONFIG.links.docs}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  설명서
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  API 문서
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  가이드
                </a>
              </li>
            </ul>
          </div>

          {/* 커뮤니티 섹션 */}
          <div>
            <h4 className="mb-4 font-semibold">커뮤니티</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={SITE_CONFIG.links.github}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="mb-4 font-semibold">연락처</h4>
            <div className="flex gap-4">
              <a
                href={SITE_CONFIG.links.github}
                className="rounded-lg bg-muted p-2 transition-colors hover:bg-muted hover:text-foreground"
                aria-label="GitHub"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
              <a
                href={`mailto:info@example.com`}
                className="rounded-lg bg-muted p-2 transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-8 h-px bg-border" />

        {/* 하단 정보 */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {SITE_CONFIG.name}. 모든 권리 보유.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              개인정보처리방침
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              이용약관
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
