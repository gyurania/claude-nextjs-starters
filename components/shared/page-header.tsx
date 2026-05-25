import { ReactNode } from 'react'

export interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

/**
 * 페이지 헤더 컴포넌트
 * 페이지 제목, 설명, 그리고 선택적 액션 버튼을 표시합니다.
 *
 * @example
 * <PageHeader
 *   title="대시보드"
 *   description="주요 통계 및 지표를 한눈에 확인하세요"
 *   action={<Button>새로 추가</Button>}
 * />
 */
export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  )
}
