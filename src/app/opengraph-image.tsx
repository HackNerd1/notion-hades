import { ImageResponse } from "next/og";
import { notionApiRetrieveHomePage } from "@/apis/notion-apis";
import { PageModel } from "@/models/notion.model";
import { HADES_SITE_CONFIG } from "@/config/site.config";

export const runtime = "edge";

export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const page: PageModel = await (await notionApiRetrieveHomePage()).json();

  const description = page.description || HADES_SITE_CONFIG.metaData.description;
  const siteName = HADES_SITE_CONFIG.metaData.title || "Notion Hades";
  const coverImage = page.cover || null;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(to bottom, #1a202c, #2d3748)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "0px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {coverImage && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.3,
            }}
          />
        )}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "40px",
            background: "linear-gradient(0deg,rgba(0,0,0,.67),transparent 75%)",
          }}
        >
          <div style={{ fontSize: "64px", fontWeight: "bold", marginBottom: "20px", maxWidth: "900px" }}>
            {siteName.toString()}
          </div>

          {description && (
            <div style={{ fontSize: "24px", marginTop: "40px", opacity: 0.7 }}>
              {description.length > 100 ? `${description.substring(0, 100)}...` : description}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
