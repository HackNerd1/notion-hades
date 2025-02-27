import { IconLoading } from "@/icons/loading";

interface LoadMoreButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  hasMore?: boolean;
  onClick?: () => any;
  loading?: boolean;
}

export default function LoadMoreButton({ hasMore, onClick, loading, className, ...rest }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={!hasMore}
      className={`
        text-md rounded-md text-[var(--text-default)] 
        hover:bg-gray-700 bg-[var(--button-color-default)]
        disabled:cursor-not-allowed disabled:pointer-events-none
        px-6 py-1 transition duration-300
        ${className}`}
      {...rest}
    >
      {hasMore ? "More" : "No More"}
      {loading && <IconLoading size={24} classNames="animate-spin ml-1"></IconLoading>}
    </button>
  );
}
