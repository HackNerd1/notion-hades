"use client";

import { useEffect } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import HackerBackground from "@/components/hackerBackground";
import AuthorInfo from "@/components/authorInfo";
import { aboutUs, author, recentPosts, siteInfo, tags } from "@/mock/sampleData";
import ThemeToggle from "@/components/themeToggle";
import ScrollDownButton from "@/components/scrollDownButton";
import BlogCarousel from "@/components/blogCarousel";
import TagList from "@/components/tagList";
import LoadMoreButton from "@/components/loadMoreButton";
import { Title } from "@/components/title";
import AboutUs from "@/components/aboutUs";
import BlogPostList from "@/components/blogPostList";

function scrollDown() {
  const targetY = window.innerHeight;
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
}

export default function Home() {
  const { currentSection, setCurrentSection } = useSmoothScroll(2);

  useEffect(() => {
    const targetY = window.innerHeight * currentSection;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, [currentSection]);

  const carouselPosts = recentPosts.slice(0, 3);
  const listPosts = recentPosts.slice(3);

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
        <ScrollDownButton onClick={scrollDown} />
      </div>
      <div className="min-h-screen p-12">
        <Title title="Recent Posts">
          <LoadMoreButton></LoadMoreButton>
        </Title>
        <BlogCarousel posts={carouselPosts}></BlogCarousel>
        <BlogPostList posts={listPosts}></BlogPostList>

        <Title title="Tags">
          <LoadMoreButton></LoadMoreButton>
        </Title>
        <TagList tags={tags}></TagList>

        <Title title="About Us"></Title>
        <AboutUs content={aboutUs}></AboutUs>
      </div>
    </>
  );
}
