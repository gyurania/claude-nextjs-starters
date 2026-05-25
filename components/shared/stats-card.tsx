import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StatsCardProps {
  title: string
  description?: string
  value: string | number
  change?: {
    value: number
    direction: 'up' | 'down'
  }
  icon: LucideIcon
  variant?: 'default' | 'revenue' | 'users' | 'orders' | 'growth'
}

/**
 * 대시보드 통계 카드
 * variant prop으로 색상 스키마를 구분합니다.
 *
 * @example
 * <StatsCard
 *   title="총 매출"
 *   value="$45,231.89"
 *   change={{ value: 20.1, direction: 'up' }}
 *   icon={DollarSign}
 *   variant="revenue"
 * />
 */
export function StatsCard({ title, description, value, change, icon: Icon, variant = 'default' }: StatsCardProps) {
  const variants = {
    default: 'text-blue-500 bg-blue-50 dark:bg-blue-950',
    revenue: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950',
    users: 'text-purple-500 bg-purple-50 dark:bg-purple-950',
    orders: 'text-orange-500 bg-orange-50 dark:bg-orange-950',
    growth: 'text-pink-500 bg-pink-50 dark:bg-pink-950',
  }

  const trendVariants = {
    up: 'text-emerald-600 dark:text-emerald-400',
    down: 'text-red-600 dark:text-red-400',
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {description && <CardDescription className="text-xs mt-1">{description}</CardDescription>}
        </div>
        <div className={cn('p-2 rounded-lg', variants[variant])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-4">
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <div className={cn('text-xs font-semibold', trendVariants[change.direction])}>
              {change.direction === 'up' ? '↑' : '↓'} {Math.abs(change.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
