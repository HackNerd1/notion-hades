import { BlockModel } from "@/models/notion.model";
import { videoUtilGetVideoUrl } from "@/utils/video.utils";

export function NotionVideo(props: BlockModel) {
  const videoCaption = props.caption && props.caption.length > 0 ? props.caption[0].content : "";
  const { url, caption: defaultCaption } = videoUtilGetVideoUrl(props.url);
  const caption = videoCaption || defaultCaption;

  return (
    <figure className="mb-6">
      <div className="relative overflow-hidden rounded-lg bg-gray-100 pt-[56.25%] dark:bg-gray-800">
        <iframe
          src={url}
          className="absolute inset-0 h-full w-full"
          title={caption}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-gray-500">{caption}</figcaption>}
    </figure>
  );
}
