"use client";

import { useCallback, useEffect, useState } from "react";
import HackerBackground from "@/components/hackerBackground";
import SiteInfo from "@/components/siteInfo";
import ScrollDownButton from "@/components/scrollDownButton";
import BlogCarousel from "@/components/blogCarousel";
import LoadMoreButton from "@/components/loadMoreButton";
import { Title } from "@/components/title";
import BlogPostList from "@/components/blogPostList";
import { notionApiGetHomePage, notionApiGetPublishedBlogPosts } from "@/apis/notion-apis";
import Skeleton from "@/components/skeleton";
import { PageModel, PostModel } from "@/models/notion.model";
import { Search } from "@/components/search";
import { Alert } from "@/components/alert";
import { IconLoading } from "@/icons/loading";

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
  const [siteInfo, setSiteInfo] = useState<PostModel | undefined>();
  const [error, setError] = useState("");
  const [homePageError, setHomePageError] = useState("");

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
      setError(error.message);
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
    try {
      const result = await notionApiGetHomePage();
      setSiteInfo(result);
    } catch (error: any) {
      setHomePageError(error.message);
    }
  };

  const eventHandlerLoadMore = useCallback(() => {
    fetchPosts(true);
  }, [nextCursor]);

  useEffect(() => {
    fetchPosts();
    fetchHomePage();
  }, []);

  return (
    <>
      <div className="relative h-full min-h-screen">
        <HackerBackground />

        <section className="absolute flex h-full w-full items-center justify-center p-[20%]">
          {siteInfo && <SiteInfo {...siteInfo} />}
          {homePageError && <Alert message={homePageError} type="error" />}
          {!siteInfo && !homePageError && <IconLoading classNames="animate-spin" size={32}></IconLoading>}
        </section>
        {/* <div className="fixed bottom-4 right-4 z-50">
          <ThemeToggle />
        </div> */}
        <ScrollDownButton onClick={scrollDown} />
      </div>
      <div className="m-auto max-w-6xl p-12">
        <Title title="Recent Posts">
          <Search></Search>
        </Title>
        {loading && (
          <>
            <Skeleton type="carousel" />
            <Skeleton type="post" count={6} />
          </>
        )}
        {!loading && !error && (
          <>
            <BlogCarousel posts={carouselPosts}></BlogCarousel>
            <BlogPostList posts={listPosts}></BlogPostList>

            <div className="text-center">
              <LoadMoreButton
                loading={searchLoading}
                hasMore={!!nextCursor}
                onClick={eventHandlerLoadMore}
                className="mb-2"
              ></LoadMoreButton>
            </div>
          </>
        )}
        {error && <Alert message={error} type="error" />}
      </div>
    </>
  );
}
