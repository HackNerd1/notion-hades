import { Github } from "@/icons/github";
import { Instagram } from "@/icons/Instagram";
import { Twitter } from "@/icons/twitter";
import { Zhihu } from "@/icons/zhihu";

export interface SocialLink {
  platform: "github" | "twitter" | "zhihu" | "instagram";
  url: string;
}

export function SocialIcon({ platform }: { platform: SocialLink["platform"] }) {
  switch (platform) {
    case "github":
      return <Github size={20} />;
    case "twitter":
      return <Twitter size={24} />;
    case "zhihu":
      return <Zhihu size={24} />;
    case "instagram":
      return <Instagram size={24} />;
    default:
      return null;
  }
}
