import { NextResponse } from "next/server";
import { notionLibGetHomePage } from "@/lib/notion";

export async function GET() {
  try {
    const page = await notionLibGetHomePage();
    return NextResponse.json(page);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(JSON.parse(error.body), { status: error.status });
  }
}
