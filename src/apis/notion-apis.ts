"use client";

import { NotionDataBase, NotionDataBaseRequest, PageResponse } from "@/interfaces/notion.interface";
import { PageModel, PostModel } from "@/models/notion.model";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// 获取已发布博客文章
export async function notionApiGetPublishedBlogPosts(param: NotionDataBaseRequest): Promise<NotionDataBase> {
  const result = await (
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(param),
      headers: { "Content-Type": "application/json" },
    })
  ).json();

  return {
    hasMore: result.has_more,
    nextCursor: result.next_cursor,
    results: result.results.map((item: DatabaseObjectResponse) => PageModel.createEntityFromResponse(item)),
  };
}

// 获取已发布博客文章
export async function notionApiGetPostPage(id?: string): Promise<PostModel> {
  const result: PageResponse = await (await fetch(`/api/posts/${id}`)).json();
  return PostModel.createEntityFromResponse(result);
}

// 获取已发布博客文章
export async function notionApiGetHomePage(): Promise<PageModel> {
  const result: DatabaseObjectResponse = await (await fetch(`/api/home`)).json();
  return PageModel.createEntityFromResponse(result);
}
