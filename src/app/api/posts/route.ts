import { NextRequest, NextResponse } from "next/server";
import { notionLibGetPublishedBlogPosts } from "@/lib/notion";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const posts = await notionLibGetPublishedBlogPosts(body);

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(JSON.parse(error.body), { status: error.status });
  }
}
