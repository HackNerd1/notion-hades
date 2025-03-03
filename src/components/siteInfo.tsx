import { PostModel } from "@/models/notion.model";
import { NotionBlock } from "./notion/notionBlock";

export default function SiteInfo(props: PostModel) {
  return (
    <div className="mx-auto max-w-2xl p-6 text-center">
      {/* <Image
        src={author.avatar }
        alt={author.name}
        width={150}
        height={150}
        className="rounded-full mx-auto mb-4 bg-white"
      /> */}
      <h2 className="mb-2 text-6xl font-bold tracking-tighter text-white sm:text-7xl lg:text-8xl">
        {props.page.title}
      </h2>
      <div className="mb-4 max-w-[600px] text-lg text-gray-400 sm:text-xl">
        {props.blocks.map((block) => (
          <div key={block.id}>
            <NotionBlock {...block}></NotionBlock>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-4">
        {/* {author.socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
          >
            <SocialIcon platform={link.platform} />
          </a>
        ))} */}
      </div>
    </div>
  );
}
