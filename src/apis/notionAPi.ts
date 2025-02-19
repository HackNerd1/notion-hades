'use client'

import { PostModel } from "@/models/notionModels"
import { DatabaseObjectResponse, PartialDatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints"

// 获取已发布博客文章
export async function notionApiGetPublishedBlogPosts(): Promise<PostModel[]> {
  const result = await (await fetch('/api/posts')).json()
  return result.results.map((item: DatabaseObjectResponse) => PostModel.generatePostModelFromResponse(item))
}

// 获取已发布博客文章
export async function notionApiGetPostPage(id: string): Promise<PostModel[]> {
  const result = await (await fetch(`/api/posts${id}`)).json()
  return result.results.map((item: PartialDatabaseObjectResponse) => PostModel.generatePostModelFromResponse(item))
}