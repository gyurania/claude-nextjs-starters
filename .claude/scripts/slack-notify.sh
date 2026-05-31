#!/bin/bash
# Claude Code Slack 알림 스크립트
# 사용: bash slack-notify.sh [stop|permission]

WEBHOOK_URL="${SLACK_WEBHOOK_URL}"
EVENT_TYPE="${1:-unknown}"

# Webhook URL이 없으면 조용히 종료 (오류 없음)
[ -z "$WEBHOOK_URL" ] && exit 0

TIMESTAMP=$(date '+%H:%M:%S')

case "$EVENT_TYPE" in
  "stop")
    TEXT=":white_check_mark: *Claude Code 작업 완료* (${TIMESTAMP})"
    ;;
  "permission")
    TEXT=":lock: *Claude Code 권한 요청* — 승인이 필요합니다 (${TIMESTAMP})"
    ;;
  *)
    exit 0
    ;;
esac

curl.exe -s -X POST \
  -H 'Content-type: application/json' \
  -d "{\"text\":\"${TEXT}\"}" \
  "${WEBHOOK_URL}"
