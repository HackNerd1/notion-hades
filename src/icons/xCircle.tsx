import { ReactNode } from "react";
import { HadesIcon } from "./icon";

export class IconXCircle extends HadesIcon {
  render(): ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        width={this.props.size}
        height={this.props.size}
        stroke={this.props.color || "currentColor"}
        className={this.props.classNames}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    );
  }
}
