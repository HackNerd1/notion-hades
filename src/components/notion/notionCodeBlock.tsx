"use client";
import { useCopy } from "@/hooks/useCopy";
import { IconSparkles } from "@/icons/sparkles";
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from "react-syntax-highlighter";

export function NotionCodeBlock(props: SyntaxHighlighterProps) {
  const { copied, handleCopy } = useCopy(props.children);

  const eventCopyHandler = async () => {
    try {
      handleCopy();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative rounded-lg">
      {props.language && (
        <span className="select-none absolute top-o letf-0 px-3 capitalize py-1 rounded-tl-md rounded-br-md bg-[var(--tag-code-block)] text-xs text-[var(--text-default)]">
          {props.language}
        </span>
      )}
      <span
        className="select-none cursor-pointer transition-all duration-300 hover:bg-gray-700 absolute top-o right-0 px-3 capitalize py-1 rounded-tr-md rounded-bl-md bg-[var(--tag-code-block)] text-xs text-[var(--text-default)]"
        onClick={eventCopyHandler}
      >
        {copied ? (
          <>
            Copied
            <IconSparkles size={16} classNames="ml-1" />
          </>
        ) : (
          "Copy"
        )}
      </span>
      <SyntaxHighlighter {...props} customStyle={{ paddingTop: "2rem" }}></SyntaxHighlighter>
    </div>
  );
}
