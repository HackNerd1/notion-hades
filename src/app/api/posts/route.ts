import { NextRequest, NextResponse } from "next/server";
import { notionLibGetPublishedBlogPosts } from "@/lib/notion";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const posts = await notionLibGetPublishedBlogPosts(body);

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw NextResponse.json({ body: "Error fetching blog posts" }, { status: 500 });
  }
}
