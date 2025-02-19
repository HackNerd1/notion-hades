import { NextResponse } from "next/server"
import { getPublishedBlogPosts } from "@/lib/notion"

export async function GET() {
  try {
    const posts = await getPublishedBlogPosts()

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    throw NextResponse.json({ body: "Error fetching blog posts" }, { status: 500 })
  }
}

