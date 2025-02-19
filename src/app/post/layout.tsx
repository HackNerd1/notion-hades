import { Search } from "@/components/search";
import Link from "next/link";
import { ReactNode } from "react";

interface PostLayputProp {
  children?: ReactNode;
}

export default function PostLayput(props: PostLayputProp) {
  return (
    <>
      <header className="px-6 py-2 w-full sticky top-0 flex justify-between items-center h-12 text-md bg-black">
        Hacknerd
        <Search></Search>
        {/* <Link href={"/about"}>About</Link>
        <Link href={"/Contract"}>Contract</Link> */}
      </header>
      <div className="py-12">
      {props.children}

      </div>
    </>
  );
}
