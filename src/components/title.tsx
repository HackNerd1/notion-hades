export interface Title {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export function Title(props: Title) {
  return (
    <div
      className={`align-center mb-4 flex justify-between overflow-hidden whitespace-nowrap text-3xl font-semibold text-white ${props.className}`}
    >
      <span className="flex-1 overflow-ellipsis">{props.title}</span>
      <span className="overflow-ellipsis">{props.children}</span>
    </div>
  );
}
