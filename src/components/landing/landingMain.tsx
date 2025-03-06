"use client";

import { notionApiGetPublishedBlogPosts } from "@/apis/notion-apis";
import { useCallback, useEffect, useState } from "react";
import BlogCarousel from "@/components/blogCarousel";
import LoadMoreButton from "@/components/loadMoreButton";
import { Title } from "@/components/title";
import BlogPostList from "@/components/blogPostList";
import Skeleton from "@/components/skeleton";
import { PageModel } from "@/models/notion.model";
import { Search } from "@/components/search";
import { Alert } from "../alert";

export default function LandingMain() {
  const [carouselPosts, setCarouselPosts] = useState<PageModel[]>([]);
  const [listPosts, setListPosts] = useState<PageModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string>();
  const [error, setError] = useState("");

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
    } finally {
      if (loadMore) {
        setSearchLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const eventHandlerLoadMore = useCallback(() => {
    fetchPosts(true);
  }, [nextCursor]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
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
    </>
  );
}
