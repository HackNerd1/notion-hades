import { Search } from "@/components/search";
import Link from "next/link";
import { ReactNode } from "react";

interface PostLayputProp {
  children?: ReactNode;
}

export default function PostLayput(props: PostLayputProp) {
  return (
    <>
      <header className="px-12 py-2 w-full h-14 text-md bg-[#1c222b]">
        <div className="max-w-6xl m-auto h-full flex justify-between items-center">
          <Link href="/">Hacknerd</Link>
          <Search></Search>
        </div>
        {/* <Link href={"/about"}>About</Link>
        <Link href={"/Contract"}>Contract</Link> */}
      </header>
      <div className="py-12 w-full h-full">{props.children}</div>
    </>
  );
}
