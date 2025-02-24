import Image from "next/image";
import { SocialIcon, SocialLink } from "./socialIcon";

interface AuthorInfoProps {
  author: {
    name: string;
    bio: string;
    avatar: string;
    socialLinks: SocialLink[];
  };
  siteInfo: {
    title: string;
    description: string;
  };
}

export default function AuthorInfo({ author }: AuthorInfoProps) {
  return (
    <div className="text-center p-6 max-w-2xl mx-auto">
      {/* <Image
        src={author.avatar || "/placeholder.svg"}
        alt={author.name}
        width={150}
        height={150}
        className="rounded-full mx-auto mb-4 bg-white"
      /> */}
      <h2 className="text-6xl tracking-tighter sm:text-7xl lg:text-8xl font-bold text-gray-800 dark:text-white mb-2">
        {author.name}
      </h2>
      <p className="max-w-[600px] text-lg text-gray-400 sm:text-xl mb-4">{author.bio}</p>
      <div className="flex justify-center items-center space-x-4">
        {author.socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
          >
            <SocialIcon platform={link.platform} />
          </a>
        ))}
      </div>
    </div>
  );
}
