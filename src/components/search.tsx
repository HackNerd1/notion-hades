"use client";
import { IconSearch } from "@/icons/search";
import { useState } from "react";
import { Modal } from "./modal";
import { NotionSearch } from "./notion/notionSearch";

export function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <button
        className={`button-default text-md flex h-full items-center gap-2 rounded-lg p-2 text-sm`}
        onClick={openModal}
      >
        <IconSearch size={20}></IconSearch>
        {/* <span className="hidden sm:block">Search articles...</span> */}
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} showHeader={false}>
        <NotionSearch></NotionSearch>
      </Modal>
    </>
  );
}
