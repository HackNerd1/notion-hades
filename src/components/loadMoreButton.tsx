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
      className={`button-default text-md rounded-md px-4 py-1 disabled:pointer-events-none disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {hasMore ? "More" : "No More"}
      {loading && <IconLoading size={24} classNames="animate-spin ml-1"></IconLoading>}
    </button>
  );
}
