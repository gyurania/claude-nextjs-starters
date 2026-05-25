'use client'

import { useEffect, useState } from 'react'

/**
 * 모바일 기기 감지 훅
 * @description 주어진 media query에 매칭되는지 여부를 반환합니다.
 * SSR 환경에서 hydration mismatch를 방지하기 위해 초기값은 false입니다.
 *
 * @example
 * const isMobile = useMobile()  // (max-width: 768px) 기본값
 * const isSmall = useMobile('(max-width: 640px)')
 */
export function useMobile(query: string = '(max-width: 768px)'): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // Media query list 생성
    const mediaQueryList = window.matchMedia(query)

    // 초기 상태 설정
    setIsMobile(mediaQueryList.matches)

    // 변경 감지 리스너
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    // 리스너 등록 (구식 브라우저 지원)
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange)
    } else {
      mediaQueryList.addListener(handleChange)
    }

    // 정리
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange)
      } else {
        mediaQueryList.removeListener(handleChange)
      }
    }
  }, [query])

  return isMobile
}
