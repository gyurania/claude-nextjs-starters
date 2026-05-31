# Slack notification on task complete (PowerShell 5.1 compatible)

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

$payload = @{
    text = "Task completed - check Slack for details"
    attachments = @(
        @{
            color = "good"
            fields = @(
                @{
                    title = "Status"
                    value = "Task completed successfully"
                    short = $false
                },
                @{
                    title = "Completed at"
                    value = $timestamp
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
