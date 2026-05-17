
import * as React from "react";
import type { SVGProps } from "react";

export function NextjsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Next.js logomark"
      role="img"
      {...props}
    >
      <path
        d="M12.151 7.113L18.31 21h2.138L12.15 3 3.553 21h2.14L12.15 7.113zM12.15 11.27L8.19 18.4h7.92L12.15 11.27z"
        fill="currentColor"
      />
    </svg>
  );
}
