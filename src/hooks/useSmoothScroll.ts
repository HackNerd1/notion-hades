"use client"

import { useEffect, useState } from "react"

export function useSmoothScroll(sectionCount: number) {
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    // let scrollTimeout: NodeJS.Timeout
    let lastScrollTime = 0
    const scrollCooldown = 1000 // 1 second cooldown between scrolls

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastScrollTime < scrollCooldown) return

      if (e.deltaY > 0 && currentSection < sectionCount - 1) {
        setCurrentSection((prev) => prev + 1)
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1)
      }

      lastScrollTime = now
    }

    const smoothScroll = () => {
      const targetY = window.innerHeight * currentSection
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      })
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    const scrollTimeout = setTimeout(smoothScroll, 50)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      clearTimeout(scrollTimeout)
    }
  }, [currentSection, sectionCount])

  return { currentSection, setCurrentSection }
}

