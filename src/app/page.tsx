"use client";

import { useCallback, useEffect, useState } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import HackerBackground from "@/components/hackerBackground";
import AuthorInfo from "@/components/authorInfo";
import { aboutUs, author, siteInfo } from "@/mock/sampleData";
import ThemeToggle from "@/components/themeToggle";
import ScrollDownButton from "@/components/scrollDownButton";
import BlogCarousel from "@/components/blogCarousel";
import LoadMoreButton from "@/components/loadMoreButton";
import { Title } from "@/components/title";
import BlogPostList from "@/components/blogPostList";
import { notionApiGetHomePage, notionApiGetPublishedBlogPosts } from "@/apis/notion-apis";
import Skeleton from "@/components/skeleton";
import { PageModel } from "@/models/notion.model";
import { Search } from "@/components/search";

function scrollDown() {
  const targetY = window.innerHeight;
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
}

export default function Home() {
  const [carouselPosts, setCarouselPosts] = useState<PageModel[]>([]);
  const [listPosts, setListPosts] = useState<PageModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string>();

  const fetchPosts = async (loadMore = false) => {
    try {
      if (loadMore) {
        setSearchLoading(true);
      }

      const { results, hasMore, nextCursor: next } = await notionApiGetPublishedBlogPosts({ nextCursor: nextCursor });

      if (loadMore) {
        setListPosts(listPosts.concat(results));
      } else {
        setCarouselPosts(results.slice(0, 3));
        setListPosts(results.slice(3));
      }
      setNextCursor(hasMore ? next : undefined);
    } catch (error: any) {
      console.error(error);
    } finally {
      if (loadMore) {
        setSearchLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const fetchHomePage = async () => {
    const result = await notionApiGetHomePage();
    console.log(result);
  };

  const eventHandlerLoadMore = useCallback(() => {
    fetchPosts(true);
  }, [nextCursor]);

  useEffect(() => {
    fetchPosts();
    fetchHomePage();
  }, []);

  // useEffect(() => {
  //   const targetY = window.innerHeight * currentSection;
  //   window.scrollTo({
  //     top: targetY,
  //     behavior: "smooth",
  //   });
  // }, [currentSection]);
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
          <Search></Search>
        </Title>
        {loading ? <Skeleton type="carousel" /> : <BlogCarousel posts={carouselPosts}></BlogCarousel>}
        {loading ? <Skeleton type="post" count={6} /> : <BlogPostList posts={listPosts}></BlogPostList>}
        <div className="text-center">
          <LoadMoreButton
            loading={searchLoading}
            hasMore={!!nextCursor}
            onClick={eventHandlerLoadMore}
            className="mb-2"
          ></LoadMoreButton>
        </div>
        {/* <NotionDivider /> */}
        {/* <Title title="About Us"></Title>
        <AboutUs content={aboutUs}></AboutUs> */}
      </div>
    </>
  );
}
