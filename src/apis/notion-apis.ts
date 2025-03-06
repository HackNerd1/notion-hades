
import { NotionDataBase, NotionDataBaseRequest } from "@/interfaces/notion.interface";
import { notionLibGetHomePage, notionLibGetPost } from "@/lib/notion";
import { BookMarkModel } from "@/models/bookmark.model";
import { PageModel, PostModel } from "@/models/notion.model";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextResponse } from "next/server";

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
export async function notionApiGetPostPage(id?: string) {
  try {
    const response = await notionLibGetPost(id!);
    return NextResponse.json(PostModel.createEntityFromResponse(response));

  } catch (error: any) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(JSON.parse(error.body), { status: error.status });
  }
}

// 获取首页
export async function notionApiGetHomePage() {
  try {
    const page = await notionLibGetHomePage();
    return NextResponse.json(PostModel.createEntityFromResponse(page));
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(JSON.parse(error.body), { status: error.status });
  }
};

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
export async function notionApiGetMetaData(url: string): Promise<BookMarkModel> {
  const result = await (await fetch(`/api/bookmark?url=${encodeURIComponent(url)}`)).json();
  return BookMarkModel.createEntityFromResponse(result);
}
