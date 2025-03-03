"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Skeleton from "@/components/skeleton";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ContentTable } from "@/components/notion/contentTable";
import { NotionBlock } from "@/components/notion/notionBlock";
import { notionApiGetPostPage } from "@/apis/notion-apis";
import { NotionTag } from "@/components/notion/notionTag";
import { PostModel, TocModel } from "@/models/notion.model";
import { NotionDivider } from "@/components/notion/notionDivider";
import { SkeletonImage } from "@/components/skeletonImage";
import { Alert } from "@/components/alert";

// function getBannerStyle(url: string) {
//   return {
//     background: `url('${url}') center / cover no-repeat`,
//   };
// }

export default function BlogPost() {
  const [post, setPost] = useState<PostModel>();
  const [tableOfContents, setTableOfContents] = useState<TocModel[]>([]);
  const { id } = useParams();
  const headingIds = tableOfContents.map((item) => item.id);
  const activeId = useActiveSection(headingIds);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await notionApiGetPostPage(id as string);

        setPost(data);

        setTableOfContents(data.toc);
      } catch (error: any) {
        setError(error.message);
      }
    }
    if (id) {
      fetchPost();
    }
  }, [id]);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center px-6">
        <Alert type="error" message={`Error fetching blog post: ${error}`}></Alert>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex h-full w-full items-center justify-center px-6">
        <div className="w-full max-w-6xl">
          <Skeleton type="page"></Skeleton>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <section className="px-6">
        <figure className={`m-auto mb-12 aspect-[4/1] h-full min-h-64 w-full max-w-6xl rounded-2xl`}>
          <SkeletonImage
            src={post.page.cover || "/placeholder.svg"}
            fill
            alt="blog cover"
            className="h-full"
            imageClassName="object-cover"
          ></SkeletonImage>
        </figure>
      </section>
      <article className="m-auto max-w-4xl px-12">
        <h1 className="mb-4 text-4xl font-bold leading-[1.5]">
          <span className="text-[1.3em]">{post.page.icon}</span> {post.page.title}
        </h1>

        <section className="mb-8 flex gap-4">
          {post.page.tags.map((tag, index) => (
            <NotionTag {...tag} key={index}></NotionTag>
          ))}
        </section>

        <div className="mb-12 flex gap-8">
          <div className="min-w-0 flex-[4_1_0%]">
            {post.blocks.map((block) => (
              <NotionBlock {...block} key={block.id}></NotionBlock>
            ))}
          </div>

          <div className="hidden flex-1 opacity-100 sm:block">
            <ContentTable activeId={activeId} data={tableOfContents}></ContentTable>
          </div>
        </div>
        <NotionDivider />
        <section className="font-normal text-text-default"> {post.page.publishDate}</section>
      </article>
    </div>
  );
}
