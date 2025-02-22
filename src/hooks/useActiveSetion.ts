"use client";

import { useState, useEffect } from "react";

export function useActiveSection(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Create an observer for each heading
    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(id);
              }
            });
          },
          {
            rootMargin: "0px 0px -50% 0px", // Adjust these values to change when the active state triggers
            threshold: 0,
          }
        );

        observer.observe(element);
        observers.push(observer);
      }
    });

    // Cleanup observers on unmount
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [itemIds]);

  return activeId;
}
