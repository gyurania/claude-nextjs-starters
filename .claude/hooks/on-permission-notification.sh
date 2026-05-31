#!/bin/bash

# 권한 요청 시 슬랙 알림 발송

# 프로젝트 root의 .env 파일에서 환경변수 로드
ENV_FILE="$(git rev-parse --show-toplevel 2>/dev/null)/.env"
if [ -f "$ENV_FILE" ]; then
    set -a
    source "$ENV_FILE"
    set +a
fi

SLACK_WEBHOOK_URL="${SLACK_WEBHOOK_URL}"

# Webhook URL이 설정되지 않았으면 스크립트 종료
if [ -z "$SLACK_WEBHOOK_URL" ]; then
    echo "⚠️  SLACK_WEBHOOK_URL이 설정되지 않았습니다."
    exit 0
fi

# 타임스탬프
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# 권한 요청 정보 (환경변수에서 받음)
PERMISSION_TYPE="${PERMISSION_TYPE:-Unknown}"
TOOL_NAME="${TOOL_NAME:-Unknown}"

# 슬랙 메시지 구성 (JSON)
PAYLOAD=$(cat <<EOF
{
  "channel": "#notifications",
  "username": "Claude Code",
  "text": ":lock: 권한 요청 발생",
  "attachments": [
    {
      "color": "warning",
      "fields": [
        {
          "title": "권한 유형",
          "value": "$PERMISSION_TYPE",
          "short": true
        },
        {
          "title": "도구",
          "value": "$TOOL_NAME",
          "short": true
        },
        {
          "title": "요청 시간",
          "value": "$TIMESTAMP",
          "short": false
        },
        {
          "title": "상태",
          "value": "사용자의 승인을 기다리는 중",
          "short": false
        }
      ]
    }
  ]
}
EOF
)

# Slack으로 메시지 발송
curl -X POST -H 'Content-type: application/json' \
    --data "$PAYLOAD" \
    "$SLACK_WEBHOOK_URL" \
    && echo "✅ 슬랙 알림이 발송되었습니다." \
    || echo "❌ 슬랙 알림 발송 실패"
