"use client";

import { notionApiGetHomePage } from "@/apis/notion-apis";
import { Search } from "@/components/search";
import { SkeletonImage } from "@/components/skeletonImage";
import { PostModel } from "@/models/notion.model";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

interface PostLayoutProp {
  children?: ReactNode;
}

export default function PostLayout(props: PostLayoutProp) {
  const [siteInfo, setSiteInfo] = useState<PostModel>(PostModel.createEntity());
  const fetchHomePage = async () => {
    const result = await notionApiGetHomePage();
    setSiteInfo(result);
  };

  useEffect(() => {
    fetchHomePage();
  }, []);
  return (
    <>
      <header className="px-6 py-2 w-full h-14 text-md">
        <div className="max-w-6xl m-auto h-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-lg">
            <SkeletonImage src={siteInfo.page.icon} width={30} height={30} alt="site info"></SkeletonImage>{" "}
            {siteInfo.page.title}
          </Link>
          <Search></Search>
        </div>
        {/* <Link href={"/about"}>About</Link>
        <Link href={"/Contract"}>Contract</Link> */}
      </header>
      <div className="pb-12 w-full h-full">{props.children}</div>
    </>
  );
}
