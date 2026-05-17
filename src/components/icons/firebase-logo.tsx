
import * as React from "react";
import type { SVGProps } from "react";

export function FirebaseLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3.755 18.423l7.428 3.546 7.245-3.546-3.156-10.14L12 2 3.755 18.423zm14.736-1.168l-3.182-8.325L12 12.037l3.491 5.222zm-10.86-5.218L12 12.037l-3.232-8.33L3.498 17.25l5.133.004z"/>
    </svg>
  );
}
