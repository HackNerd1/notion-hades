import { BlockModel } from "@/models/notion.model";
import { FileIcon } from "react-file-icon";

export function NotionFile(props: BlockModel) {
  return (
    <div className="mb-6">
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        download={props.fileName}
        className="block rounded-lg text-text-default underline transition-colors hover:text-text-default-hover"
      >
        <div className="flex items-center gap-3">
          <div className="w-2">
            <FileIcon extension={props.fileName.split(".").pop()?.toLowerCase()} />
          </div>

          <div className="min-w-0 flex-1">{props.fileName}</div>
        </div>
      </a>
    </div>
  );
}
