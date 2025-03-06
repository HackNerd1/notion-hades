import HackerBackground from "@/components/hackerBackground";
import SiteInfo from "@/components/siteInfo";
import ScrollDownButton from "@/components/scrollDownButton";
import { notionApiGetHomePage } from "@/apis/notion-apis";
import { PostModel } from "@/models/notion.model";
import { Alert } from "@/components/alert";
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
      <section className="absolute flex h-full w-full items-center justify-center p-[20%]">
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
