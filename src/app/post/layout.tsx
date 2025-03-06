import { notionApiGetHomePage } from "@/apis/notion-apis";
import { Search } from "@/components/search";
import { SkeletonImage } from "@/components/skeletonImage";
import Link from "next/link";
import { ReactNode } from "react";

interface PostLayoutProp {
  children?: ReactNode;
}

export default async function PostLayout(props: PostLayoutProp) {
  const siteInfo = await (await notionApiGetHomePage()).json();

  return (
    <main className="flex h-full flex-col">
      <header className="text-md h-14 w-full px-6 py-2">
        <div className="m-auto flex h-full max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="flex h-full items-center gap-2 text-lg text-white duration-300 hover:text-text-default-hover"
          >
            {siteInfo && (
              <>
                <SkeletonImage
                  type="avatar"
                  src={siteInfo.page.icon}
                  width={30}
                  height={30}
                  alt="site info"
                  className="max-h-8 max-w-8"
                ></SkeletonImage>
                {siteInfo.page.title}
              </>
            )}
          </Link>
          <Search></Search>
        </div>
        {/* <Link href={"/about"}>About</Link>
        <Link href={"/Contract"}>Contract</Link> */}
      </header>
      <div className="flex-1 pb-12 pt-1">{props.children}</div>
    </main>
  );
}
