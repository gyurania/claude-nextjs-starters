import { PageHeader } from '@/components/shared/page-header'

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="프로필"
        description="당신의 프로필을 관리하세요"
      />
      <p className="text-muted-foreground">프로필 관리 기능은 준비 중입니다.</p>
    </div>
  )
}
