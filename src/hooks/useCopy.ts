import { useState } from "react";

export function useCopy(code: string | string[]) {
  const [copied, setCopied] = useState(false);

  let context = "";
  if (code) {
    if (typeof code === "string") {
      context = code;
    } else if (Array.isArray(code)) {
      context = code.join("\n");
    }
  }

  async function handleCopy() {
    // 将代码复制到剪贴板
    await navigator.clipboard.writeText(context);
    setCopied(true); // 设置 copied 为 true
    setTimeout(() => {
      setCopied(false); // 恢复 copied 为 false
    }, 1500);
  }

  return { copied, handleCopy };
}
