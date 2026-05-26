import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function LoginPage() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>계정에 로그인하여 계속 진행하세요</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" name="email" type="email" placeholder="name@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full">
            로그인
          </Button>
        </form>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          계정이 없으신가요?{' '}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            회원가입
          </Link>
        </p>
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
          ← 돌아가기
        </Link>
      </CardFooter>
    </Card>
  )
}
