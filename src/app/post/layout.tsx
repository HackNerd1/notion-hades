import { Search } from "@/components/search";
import Link from "next/link";
import { ReactNode } from "react";

interface PostLayputProp {
  children?: ReactNode;
}

export default function PostLayput(props: PostLayputProp) {
  return (
    <>
      <header className="px-6 py-2 w-full h-14 text-md">
        <div className="max-w-6xl m-auto h-full flex justify-between items-center">
          <Link href="/">Hacknerd</Link>
          <Search></Search>
        </div>
        {/* <Link href={"/about"}>About</Link>
        <Link href={"/Contract"}>Contract</Link> */}
      </header>
      <div className="pb-12 w-full h-full">{props.children}</div>
    </>
  );
}
