import { ContentTable } from "@/components/notion/contentTable";
import { NotionBlock } from "@/components/notion/notionBlock";
import { notionApiGetPostPage, notionApiRetrievePage } from "@/apis/notion-apis";
import { NotionTag } from "@/components/notion/notionTag";
import { PageModel, PostModel } from "@/models/notion.model";
import { NotionDivider } from "@/components/notion/notionDivider";
import { SkeletonImage } from "@/components/skeletonImage";
import { Alert } from "@/components/alert";
import { Metadata } from "next";
import { HADES_SITE_CONFIG } from "@/config/site.config";
import JsonLd from "@/components/JsonLd";
import { generateBlogPostJsonLd, generateBreadcrumbJsonLd } from "@/utils/jsonLd";

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const post: PostModel = await (await notionApiGetPostPage(id as string)).json();
    const toc = post.toc;

    const blogPostJsonLd = generateBlogPostJsonLd({
      title: post.page.title,
      description: post.page.description || "",
      url: `${process.env.SITE_URL}/post/${id}`,
      imageUrl: post.page.cover || undefined,
      datePublished: post.page.publishDate,
      dateModified: post.page.publishDate,
      authorName: HADES_SITE_CONFIG.author || "Anonymous",
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
      { name: "Home", url: process.env.SITE_URL || "" },
      { name: post.page.title, url: `${process.env.SITE_URL}/post/${id}` },
    ]);

    return (
      <>
        <JsonLd data={[blogPostJsonLd, breadcrumbJsonLd]} />
        <div className="mx-auto">
          <section className="px-6">
            <figure
              className={`m-auto mb-6 aspect-[4/1] h-full min-h-48 w-full max-w-7xl rounded-2xl md:mb-12 md:min-h-64`}
            >
              <SkeletonImage
                src={post.page.cover}
                fill
                alt="blog cover"
                className="h-full"
                imageClassName="object-cover"
              ></SkeletonImage>
            </figure>
          </section>
          <article className="m-auto max-w-5xl px-6 md:px-12">
            <h1 className="leading-1 mb-2 text-2xl font-bold md:mb-4 md:text-4xl md:leading-[1.5]">
              <span className="text-[1.3em]">{post.page.icon}</span> {post.page.title}
            </h1>

            <section className="mb-2 flex flex-wrap gap-2 md:mb-8 md:gap-4">
              {post.page.tags.map((tag, index) => (
                <NotionTag {...tag} key={index} responsive></NotionTag>
              ))}
            </section>

            <div className="mb-12 flex gap-8">
              <div className="min-w-0 flex-[4_1_0%]">
                {post.blocks.map((block) => (
                  <NotionBlock {...block} key={block.id}></NotionBlock>
                ))}
              </div>

              <div className="hidden flex-1 opacity-100 sm:block">
                <ContentTable data={toc}></ContentTable>
              </div>
            </div>
            <NotionDivider />
            <section className="font-normal text-text-default"> {post.page.publishDate}</section>
          </article>
        </div>
      </>
    );
  } catch (error: any) {
    return (
      <div className="flex h-full w-full items-center justify-center px-6">
        <Alert type="error" message={`Error fetching blog post: ${error.message}`}></Alert>
      </div>
    );
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const id = (await params).id;
  const page: PageModel = await (await notionApiRetrievePage(id as string)).json();
  const title = `${page.title}${HADES_SITE_CONFIG.metaData.title ? ` | ${HADES_SITE_CONFIG.metaData.title}` : ""}`;
  const description = page.description || HADES_SITE_CONFIG.metaData.description || "";
  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: `/post/${id}`,
      title,
      description,
      images: [
        {
          url: `/post/${id}/opengraph-image`,
          alt: title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/post/${id}/opengraph-image`],
    },
  };
}
