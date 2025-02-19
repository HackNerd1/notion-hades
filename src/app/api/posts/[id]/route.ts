import { type NextRequest, NextResponse } from "next/server"
import { getBlogPost } from "@/lib/notion"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const post = await getBlogPost(id)
    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    throw NextResponse.json({ error: "Error fetching blog post" }, { status: 500 })
  }
}

