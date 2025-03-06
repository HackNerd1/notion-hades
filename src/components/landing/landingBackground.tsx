import SiteInfo from "@/components/siteInfo";
import { notionApiGetHomePage } from "@/apis/notion-apis";
import { PostModel } from "@/models/notion.model";
import { Alert } from "@/components/alert";
import { lazy } from "react";
const HackerBackground = lazy(() => import("@/components/hackerBackground"));
const ScrollDownButton = lazy(() => import("@/components/scrollDownButton"));

export async function LandingBackground() {
  let siteInfo: PostModel | undefined = undefined;
  let error = "";
  try {
    siteInfo = await (await notionApiGetHomePage()).json();
  } catch (err: any) {
    error = err.message;
  }
  return (
    <>
      <HackerBackground />
      <section className="absolute flex h-full w-full items-center justify-center p-[10%] md:p-[20%]">
        {siteInfo && <SiteInfo {...siteInfo} />}
        {error && <Alert message={error} type="error" />}
      </section>
      {/* <div className="fixed bottom-4 right-4 z-50">
            <ThemeToggle />
          </div> */}
      {siteInfo && <ScrollDownButton />}
    </>
  );
}
