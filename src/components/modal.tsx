"use client";

import { IconXCircle } from "@/icons/xCircle";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  closeable?: boolean;
  wrapClassName?: string;
  title?: string;
  showHeader?: boolean;
}
export function Modal({
  isOpen,
  onClose,
  children,
  closeable = true,
  wrapClassName = "",
  title,
  showHeader = true,
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      // 获取滚动条的宽度
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      window.addEventListener("scroll", preventScroll, { passive: false });
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const preventScroll = (event: Event) => {
    console.log("run");

    event.preventDefault();
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  if (!isOpen && !isClosing) return null;

  if (!isOpen) return null; // 如果没有打开弹窗，不渲染

  return createPortal(
    <div
      className={`fixed h-full inset-0 z-50 flex justify-center p-12 bg-black bg-opacity-80 transition-opacity duration-300 
        ${isClosing ? "opacity-0" : "opacity-100"} ${wrapClassName}
      `}
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className={`rounded-lg h-fit shadow-xl w-full max-w-2xl bg-gray-800 transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {showHeader && (
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
            {closeable && (
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <IconXCircle size={24} />
              </button>
            )}
          </div>
        )}
        <div className="h-full">{children}</div>
      </div>
    </div>,
    document.body // 渲染到 body
  );
}
