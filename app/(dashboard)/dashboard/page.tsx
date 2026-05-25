import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/shared/page-header'
import { StatsCard } from '@/components/shared/stats-card'
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react'

// 샘플 데이터
const recentOrders = [
  { id: '1', customer: 'Acme Corp', amount: '$2,500.00', status: 'completed', date: '2024-05-15' },
  { id: '2', customer: 'Tech Startup', amount: '$1,800.00', status: 'pending', date: '2024-05-14' },
  { id: '3', customer: 'Global Industries', amount: '$3,200.00', status: 'failed', date: '2024-05-13' },
  { id: '4', customer: 'Small Business LLC', amount: '$900.00', status: 'completed', date: '2024-05-12' },
  { id: '5', customer: 'Enterprise Corp', amount: '$5,100.00', status: 'completed', date: '2024-05-11' },
]

const statusConfig = {
  completed: { label: '완료', variant: 'default' as const },
  pending: { label: '대기중', variant: 'secondary' as const },
  failed: { label: '실패', variant: 'destructive' as const },
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <PageHeader
        title="대시보드"
        description="주요 통계 및 최근 활동을 확인하세요"
        action={<Button>보고서 생성</Button>}
      />

      {/* 통계 카드 그리드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="총 매출"
          value="$45,231.89"
          change={{ value: 20.1, direction: 'up' }}
          icon={DollarSign}
          variant="revenue"
        />
        <StatsCard
          title="총 구독자"
          value="8,234"
          change={{ value: 5.2, direction: 'up' }}
          icon={Users}
          variant="users"
        />
        <StatsCard
          title="총 주문"
          value="1,204"
          change={{ value: 2.1, direction: 'down' }}
          icon={ShoppingCart}
          variant="orders"
        />
        <StatsCard
          title="성장률"
          value="12.5%"
          change={{ value: 8.3, direction: 'up' }}
          icon={TrendingUp}
          variant="growth"
        />
      </div>

      {/* 최근 주문 테이블 */}
      <div className="rounded-lg border border-border">
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold">최근 주문</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/40">
              <TableHead>고객</TableHead>
              <TableHead>금액</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">날짜</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => {
              const config = statusConfig[order.status as keyof typeof statusConfig]
              return (
                <TableRow key={order.id} className="border-b border-border/40 hover:bg-muted/50">
                  <TableCell className="font-medium">{order.customer}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">{order.date}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
