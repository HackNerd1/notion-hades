import { IconLoading } from "@/icons/loading";

interface LoadMoreButtonProps {
  hasMore?: boolean;
  onClick?: () => any;
  loading?: boolean;
}

export default function LoadMoreButton({ hasMore, onClick, loading }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={!hasMore}
      className={`
        text-md rounded-md text-white 
        hover:bg-gray-700 bg-[var(--button-color-default)]
        disabled:cursor-not-allowed disabled:pointer-events-none
        px-6 py-1 transition duration-300`}
    >
      {hasMore ? "More" : "No More"}
      {loading && <IconLoading size={24} color="#fff" classNames="animate-spin ml-1"></IconLoading>}
    </button>
  );
}
