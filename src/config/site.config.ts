import { Metadata } from "next";

class HadesSiteConfig implements Metadata {
  title = "Hackneard"
  description = "Passionate web developer and blogger."
  icons = {
    icon: "/favicon.ico"
  }
  backgroundFPS = 30
}

export const HADES_SITE_CONFIG = new HadesSiteConfig()