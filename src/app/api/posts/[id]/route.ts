import { type NextRequest, NextResponse } from "next/server";
import { notionLibGetPost } from "@/lib/notion";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const post = await notionLibGetPost(id);
    return NextResponse.json(post);
  } catch (error: any) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(JSON.parse(error.body), { status: error.status });
  }
}
