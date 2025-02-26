import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();

    return NextResponse.json(html);
  } catch (error) {
    console.error("Error fetching bookmark metadata:", error);
    return NextResponse.json({ error: "Failed to fetch bookmark metadata" }, { status: 500 });
  }
}
