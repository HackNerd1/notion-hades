export interface Title {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export function Title(props: Title) {
  return (
    <div
      className={`align-center mb-4 flex justify-between overflow-hidden whitespace-nowrap text-2xl font-semibold text-white md:text-3xl ${props.className}`}
    >
      <span className="flex-1 overflow-ellipsis">{props.title}</span>
      <span className="overflow-ellipsis">{props.children}</span>
    </div>
  );
}
