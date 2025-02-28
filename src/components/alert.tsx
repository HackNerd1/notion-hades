interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning";
}

export function Alert({ message, type = "success" }: AlertProps) {
  switch (type) {
    case "error":
      return <div className="mb-4 rounded-lg bg-red-900 p-4 text-red-100">{message}</div>;

    case "warning":
      return <div className="mb-4 rounded-lg bg-yellow-900 p-4 text-yellow-100">{message}</div>;
    default:
      return <div className="mb-4 rounded-lg bg-green-900 p-4 text-green-100">{message}</div>;
  }
}
