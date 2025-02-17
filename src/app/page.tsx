"use client";

import { useEffect } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import HackerBackground from "@/components/hackerBackground";
import AuthorInfo from "@/components/authorInfo";
import { author, recentPosts, siteInfo } from "@/mock/sampleData";
import ThemeToggle from "@/components/themeToggle";
import ScrollDownButton from "@/components/scrollDownButton";
import BlogCarousel from "@/components/blogCarousel";

export default function Home() {
  const { currentSection, setCurrentSection } = useSmoothScroll(2);

  useEffect(() => {
    const targetY = window.innerHeight * currentSection;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, [currentSection]);

  return (
    <>
      <div className="min-h-screen relative h-full">
        <HackerBackground />

        <section className="h-full flex items-center justify-center absolute  w-full">
          <AuthorInfo author={author} siteInfo={siteInfo} />
        </section>
        <div className="fixed bottom-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <ScrollDownButton onClick={() => setCurrentSection((prev) => prev + 1)} />
      </div>
      <div className="min-h-screen p-[2rem] h-full">
        <BlogCarousel posts={recentPosts}></BlogCarousel>
      </div>
    </>
  );
}
