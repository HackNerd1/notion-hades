"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

function getBannerStyle(url: string) {
  return {
    background: `url('${url}') center / cover no-repeat`,
  };
}

export default function BlogPost() {
  const [post, setPost] = useState<any>(null);
  const [tableOfContents, setTableOfContents] = useState<any[]>([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(`/api/posts/${id}`);
      const data = await response.json();
      setPost(data);

      // Generate table of contents
      const toc = data.blocks
        .filter((block: any) => block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3")
        .map((block: any) => ({
          id: block.id,
          type: block.type,
          text: block[block.type].rich_text[0].plain_text,
        }));
      setTableOfContents(toc);
    }
    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const renderBlock = (block: any) => {
    switch (block.type) {
      case "paragraph":
        return <p className="mb-4">{block.paragraph.rich_text[0]?.plain_text}</p>;
      case "heading_1":
        return (
          <h1 id={block.id} className="text-3xl font-bold mt-8 mb-4">
            {block.heading_1.rich_text[0]?.plain_text}
          </h1>
        );
      case "heading_2":
        return (
          <h2 id={block.id} className="text-2xl font-bold mt-6 mb-3">
            {block.heading_2.rich_text[0]?.plain_text}
          </h2>
        );
      case "heading_3":
        return (
          <h3 id={block.id} className="text-xl font-bold mt-4 mb-2">
            {block.heading_3.rich_text[0]?.plain_text}
          </h3>
        );
      case "bulleted_list_item":
        return <li className="ml-6 mb-2">{block.bulleted_list_item.rich_text[0]?.plain_text}</li>;
      case "numbered_list_item":
        return <li className="ml-6 mb-2">{block.numbered_list_item.rich_text[0]?.plain_text}</li>;
      case "code":
        return (
          // <SyntaxHighlighter language="javascript" style={tomorrow}>
          <>{block.code.rich_text[0]?.plain_text}</>
          // </SyntaxHighlighter>
        );
      case "image":
        return (
          <div className="my-4">
            <Image
              src={block.image.file.url || "/placeholder.svg"}
              alt={block.image.caption[0]?.plain_text || "Blog post image"}
              width={700}
              height={400}
              className="rounded-lg"
            />
            {block.image.caption && (
              <p className="text-center text-sm text-gray-500 mt-2">{block.image.caption[0]?.plain_text}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto">
      <section className="px-6">
        <figure
          className={`aspect-[4/1] min-h-64 w-full max-w-6xl m-auto rounded-2xl mb-12 `}
          style={getBannerStyle(post.page.cover?.external?.url || "/placeholder.svg")}
        ></figure>
      </section>
      <article className="max-w-4xl m-auto px-12">
        <h1 className="text-4xl font-bold mb-8">{post.page.properties.Name.title[0]?.plain_text}</h1>

        <div className=" flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            {post.blocks.map((block: any) => (
              <div key={block.id}>{renderBlock(block)}</div>
            ))}
          </div>

          <div className="opacity-100 md:w-1/4 ">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
              <ul>
                {tableOfContents.map((item) => (
                  <li
                    key={item.id}
                    className={`mb-2 ${
                      item.type === "heading_1" ? "ml-0" : item.type === "heading_2" ? "ml-4" : "ml-8"
                    }`}
                  >
                    <a href={`#${item.id}`} className="text-blue-500 hover:underline">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
