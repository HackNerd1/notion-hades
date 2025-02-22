"use client";

import { PageResponse } from "@/interfaces/notion.interface";
import { PageModel, PostModel } from "@/models/notion.model";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// 获取已发布博客文章
export async function notionApiGetPublishedBlogPosts(): Promise<PageModel[]> {
  const result = await (await fetch("/api/posts")).json();
  return result.results.map((item: DatabaseObjectResponse) => PageModel.createEntityFromResponse(item));
}

// 获取已发布博客文章
export async function notionApiGetPostPage(id?: string): Promise<PostModel> {
  const result: PageResponse = await (await fetch(`/api/posts/${id}`)).json();
  return PostModel.createEntityFromResponse(result);
}
