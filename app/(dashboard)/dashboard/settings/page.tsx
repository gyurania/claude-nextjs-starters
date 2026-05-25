import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { PageHeader } from '@/components/shared/page-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <PageHeader
        title="설정"
        description="계정 및 애플리케이션 설정을 관리하세요"
      />

      {/* 프로필 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>프로필</CardTitle>
          <CardDescription>당신의 계정 정보를 업데이트하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 아바타 */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>GY</AvatarFallback>
            </Avatar>
            <Button variant="outline">아바타 변경</Button>
          </div>
          <Separator />

          {/* 프로필 입력 필드 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="홍길동" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">자기소개</Label>
              <Input id="bio" placeholder="당신에 대해 간단히 소개해주세요" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 알림 설정 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>알림</CardTitle>
          <CardDescription>알림 설정을 관리하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 이메일 알림 */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">이메일 알림</Label>
              <p className="text-sm text-muted-foreground">중요한 업데이트를 이메일로 받으세요</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          {/* 마케팅 이메일 */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">마케팅 이메일</Label>
              <p className="text-sm text-muted-foreground">새로운 기능과 이벤트에 대해 알려주세요</p>
            </div>
            <Switch />
          </div>

          <Separator />

          {/* 보안 알림 */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">보안 알림</Label>
              <p className="text-sm text-muted-foreground">비정상 활동 감지 시 알림을 받으세요</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* 위험 영역 */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">위험 영역</CardTitle>
          <CardDescription>주의: 다음 작업은 되돌릴 수 없습니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="destructive">계정 삭제</Button>
        </CardContent>
      </Card>

      {/* 저장 버튼 */}
      <div className="flex gap-4">
        <Button>변경 사항 저장</Button>
        <Button variant="outline">취소</Button>
      </div>
    </div>
  )
}
