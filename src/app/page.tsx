"use client";

import { useEffect, useState } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import HackerBackground from "@/components/hackerBackground";
import AuthorInfo from "@/components/authorInfo";
import { aboutUs, author, siteInfo, tags } from "@/mock/sampleData";
import ThemeToggle from "@/components/themeToggle";
import ScrollDownButton from "@/components/scrollDownButton";
import BlogCarousel from "@/components/blogCarousel";
import TagList from "@/components/tagList";
import LoadMoreButton from "@/components/loadMoreButton";
import { Title } from "@/components/title";
import AboutUs from "@/components/aboutUs";
import BlogPostList from "@/components/blogPostList";
import { notionApiGetPublishedBlogPosts } from "@/apis/notionApi";
import { PostModel } from "../models/notionModels";
import Skeleton from "@/components/skeleton";

function scrollDown() {
  const targetY = window.innerHeight;
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
}

export default function Home() {
  const { currentSection, setCurrentSection } = useSmoothScroll(2);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await notionApiGetPublishedBlogPosts();
        setPosts(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const targetY = window.innerHeight * currentSection;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, [currentSection]);

  const carouselPosts = posts.slice(0, 3);
  const listPosts = posts.slice(3);

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
      <div className="min-h-screen max-w-6xl m-auto p-12">
        <Title title="Recent Posts">
          <LoadMoreButton></LoadMoreButton>
        </Title>
        {loading ? <Skeleton type="carousel" /> : <BlogCarousel posts={carouselPosts}></BlogCarousel>}
        {loading ? <Skeleton type="post" count={6} /> : <BlogPostList posts={listPosts}></BlogPostList>}

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
