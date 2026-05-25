import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RootHeader } from '@/components/layout/root-header'
import { Footer } from '@/components/layout/footer'
import { FEATURES, TECH_STACK } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <RootHeader />

      {/* 메인 콘텐츠 */}
      <main className="flex-1">
        {/* Hero 섹션 */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 inline-block" variant="secondary">
              🚀 Modern Starter Kit
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Next.js로 빠르게 시작하세요
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              TypeScript, Tailwind CSS, ShadcnUI로 구성된 프로덕션 레디 스타터킷.
              <br />
              모던한 컴포넌트 계층과 최적화된 레이아웃으로 개발 시간을 단축하세요.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  시작하기 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  대시보드 보기
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features 섹션 */}
        <section id="features" className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">주요 기능</h2>
              <p className="text-lg text-muted-foreground">
                현대적인 웹 개발에 필요한 모든 것이 포함되어 있습니다
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="transition-all hover:shadow-md">
                    <CardHeader>
                      <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Tech Stack 섹션 */}
        <section id="tech-stack" className="border-t border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">기술 스택</h2>
            <p className="mb-12 text-lg text-muted-foreground">최신 기술을 활용한 현대적인 개발 환경</p>
            <div className="flex flex-wrap justify-center gap-3">
              {TECH_STACK.map((tech) => (
                <Badge key={tech.name} variant="secondary" className="px-4 py-2 text-sm">
                  {tech.name} <span className="ml-2 text-xs opacity-75">v{tech.version}</span>
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 배너 */}
        <section className="border-t border-border px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 px-8 py-12 text-center">
            <h2 className="mb-4 text-2xl font-bold">지금 시작해보세요</h2>
            <p className="mb-8 text-muted-foreground">
              이 스타터킷으로 당신의 다음 프로젝트를 빠르게 시작할 수 있습니다.
            </p>
            <Link href="/register">
              <Button size="lg">무료로 시작하기</Button>
            </Link>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  )
}
