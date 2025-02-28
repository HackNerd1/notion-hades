"use client";

import { NotionDataBase, NotionDataBaseRequest } from "@/interfaces/notion.interface";
import { withCache } from "@/lib/cache";
import { BookMarkModel } from "@/models/bookmark.model";
import { PageModel, PostModel } from "@/models/notion.model";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// 获取已发布博客文章
export async function notionApiGetPublishedBlogPosts(param: NotionDataBaseRequest): Promise<NotionDataBase> {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(param),
    headers: { "Content-Type": "application/json" },
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message);
  }

  return {
    hasMore: result.has_more,
    nextCursor: result.next_cursor,
    results: result.results.map((item: DatabaseObjectResponse) => PageModel.createEntityFromResponse(item)),
  };
}

// 获取已发布博客文章
export async function notionApiGetPostPage(id?: string): Promise<PostModel> {
  const response = await fetch(`/api/posts/${id}`)
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message);
  }
  return PostModel.createEntityFromResponse(result);
}

// 获取首页
export const notionApiGetHomePage = withCache(async (): Promise<PostModel> => {
  const response = await fetch(`/api/home`)
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message);
  }
  return PostModel.createEntityFromResponse(result);
});

// 获取已发布博客文章
export async function notionApiSearchPosts(searchQuery: string): Promise<PageModel[]> {
  const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`)
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result.results.map((item: DatabaseObjectResponse) => PageModel.createEntityFromResponse(item));
}

// 获取已发布博客文章
export const notionApiGetMetaData = withCache(async (url: string): Promise<BookMarkModel> => {
  const result = await (await fetch(`/api/bookmark?url=${encodeURIComponent(url)}`)).json();
  return BookMarkModel.createEntityFromResponse(result);
}, 60 * 60 * 24 * 1000);
