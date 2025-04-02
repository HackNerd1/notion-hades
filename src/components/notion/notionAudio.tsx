import { BlockModel } from "@/models/notion.model";

export function NotionAudio(props: BlockModel) {
  const caption = (props.caption?.length && props.caption[0].content) || "Audio";

  return (
    <figure className="mb-6">
      <audio src={props.url} controls className="w-full" preload="metadata">
        Your browser does not support the audio element.
      </audio>
      <figcaption className="mt-2 text-center text-sm text-gray-500">{caption}</figcaption>
    </figure>
  );
}
