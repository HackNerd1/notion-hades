import { notionLibSearchPosts } from "@/lib/notion"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const results = await notionLibSearchPosts(query)
    return NextResponse.json(results)
  } catch (error: any) {
    console.error("Search error:", error)
    return NextResponse.json(JSON.parse(error.body), { status: error.status });
  }
}

