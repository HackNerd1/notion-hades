"use client";
import { ReactNode } from "react";
import { HadesIcon } from "./icon";

export class IconSearch extends HadesIcon {
  render(): ReactNode {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={this.props.size}
        height={this.props.size}
        stroke={this.props.color || "currentColor"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={this.props.classNames}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    );
  }
}
