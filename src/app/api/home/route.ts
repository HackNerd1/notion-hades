import { NextResponse } from "next/server";
import { notionLibGetHomePage } from "@/lib/notion";

export async function GET() {
  try {
    const page = await notionLibGetHomePage();
    return NextResponse.json(page);
  } catch (error: any) {
    throw NextResponse.json({ error: "Error fetching blog post" });
  }
}
