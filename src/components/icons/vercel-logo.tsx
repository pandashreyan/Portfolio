
import * as React from "react";
import type { SVGProps } from "react";

export function VercelLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2L2 22h20L12 2z"/>
    </svg>
  );
}
