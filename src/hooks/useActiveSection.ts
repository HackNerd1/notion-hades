"use client"

import { useState, useEffect } from "react"

export function useActiveSection(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const elements = itemIds.map(id => document.getElementById(id))

    function handleScroll() {
      const scrollPosition = window.scrollY + window.innerHeight / 5

      elements.forEach(element => {
        if (element && element.offsetTop < scrollPosition) {
          setActiveId(element.id)
        }
      })
    }

    handleScroll() // Call once to set initial active section
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [itemIds])

  return activeId
}

