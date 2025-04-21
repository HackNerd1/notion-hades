import { NextResponse } from "next/server";
import { getServerSideSitemap } from "next-sitemap";
import type { ISitemapField } from 'next-sitemap';
import { notionApiGetPublishedBlogPosts } from "@/apis/notion-apis";
import { join } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { notionLibGetPublishedBlogPosts } from "@/lib/notion";

export async function GET() {
  try {
    // 获取所有文章
    const results = [];
    let hasMore = true;
    let nextCursor: string | undefined = undefined;

    while (hasMore) {
      const response = await notionLibGetPublishedBlogPosts({ nextCursor })
      results.push(...response.results);
      hasMore = response.has_more;
      nextCursor = response.next_cursor ?? undefined;
    }

    // 生成 sitemap 条目
    const fields: ISitemapField[] = [
      {
        loc: `${process.env.SITE_URL}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily' as const,
        priority: 1,
      },
      ...results.map((post) => ({
        loc: `${process.env.SITE_URL}/post/${post.id}`,
        // @ts-expect-error 类型错误
        lastmod: new Date(post.last_edited_time).toISOString(),
        changefreq: 'daily' as const,
        priority: 0.8,
      })),
    ];

    // 生成 sitemap XML
    const sitemap = await getServerSideSitemap(fields);

    // 将 sitemap 写入文件
    const publicDir = join(process.cwd(), 'public');

    // 确保目录存在
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }

    // 写入 sitemap.xml
    writeFileSync(
      join(publicDir, 'sitemap.xml'),
      await sitemap.text()
    );

    return NextResponse.json(
      { success: true, message: "Sitemap generated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate sitemap" },
      { status: 500 }
    );
  }
} 