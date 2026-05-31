# 권한 요청 시 슬랙 알림 발송 (PowerShell)

# PowerShell 출력 인코딩 UTF-8 강제 설정
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# 프로젝트 root의 .env 파일에서 환경변수 로드
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$envFile = Join-Path $projectRoot ".env"

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match "^([^=]+)=(.*)$") {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
}

$slackWebhookUrl = $env:SLACK_WEBHOOK_URL

# Webhook URL이 설정되지 않았으면 스크립트 종료
if ([string]::IsNullOrEmpty($slackWebhookUrl)) {
    Write-Host "⚠️  SLACK_WEBHOOK_URL이 설정되지 않았습니다."
    exit 0
}

# 타임스탐프
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# 권한 요청 정보 (환경변수에서 받음)
$permissionType = if ($env:PERMISSION_TYPE) { $env:PERMISSION_TYPE } else { "Unknown" }
$toolName = if ($env:TOOL_NAME) { $env:TOOL_NAME } else { "Unknown" }

# 슬랙 메시지 구성 (JSON)
$payload = @{
    channel = "#notifications"
    username = "Claude Code"
    text = ":lock: 권한 요청 발생"
    attachments = @(
        @{
            color = "warning"
            fields = @(
                @{
                    title = "권한 유형"
                    value = $permissionType
                    short = $true
                },
                @{
                    title = "도구"
                    value = $toolName
                    short = $true
                },
                @{
                    title = "요청 시간"
                    value = $timestamp
                    short = $false
                },
                @{
                    title = "상태"
                    value = "사용자의 승인을 기다리는 중"
                    short = $false
                }
            )
        }
    )
} | ConvertTo-Json -Depth 10

# Slack으로 메시지 발송
try {
    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
    $response = Invoke-WebRequest -Uri $slackWebhookUrl `
        -Method Post `
        -ContentType "application/json; charset=utf-8" `
        -Body $bodyBytes `
        -ErrorAction Stop

    if ($response.StatusCode -eq 200) {
        Write-Host "✅ 슬랙 알림이 발송되었습니다."
        exit 0
    }
} catch {
    Write-Host "❌ 슬랙 알림 발송 실패: $_"
    exit 1
}
