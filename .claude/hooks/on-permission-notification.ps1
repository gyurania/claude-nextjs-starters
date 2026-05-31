# Slack notification on permission request (PowerShell 5.1 compatible)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

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

if ([string]::IsNullOrEmpty($slackWebhookUrl)) {
    Write-Host "SLACK_WEBHOOK_URL is not configured."
    exit 0
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

$permissionType = if ($env:PERMISSION_TYPE) { $env:PERMISSION_TYPE } else { "Unknown" }
$toolName = if ($env:TOOL_NAME) { $env:TOOL_NAME } else { "Unknown" }

$payload = @{
    text = "Permission request awaiting approval"
    attachments = @(
        @{
            color = "warning"
            fields = @(
                @{
                    title = "Permission Type"
                    value = $permissionType
                    short = $true
                },
                @{
                    title = "Tool"
                    value = $toolName
                    short = $true
                },
                @{
                    title = "Request Time"
                    value = $timestamp
                    short = $false
                },
                @{
                    title = "Status"
                    value = "Awaiting user approval"
                    short = $false
                }
            )
        }
    )
} | ConvertTo-Json -Depth 10

try {
    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
    $response = Invoke-WebRequest -Uri $slackWebhookUrl `
        -Method Post `
        -ContentType "application/json; charset=utf-8" `
        -Body $bodyBytes `
        -ErrorAction Stop

    if ($response.StatusCode -eq 200) {
        Write-Host "Slack notification sent."
        exit 0
    }
} catch {
    Write-Host "Slack notification failed: $_"
    exit 1
}
