
import * as React from "react";
import type { SVGProps } from "react";

export function GenkitLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12.33 2C6.63 2 2 6.53 2 12.11S6.63 22.22 12.33 22.22c3.09 0 5.88-1.22 7.89-3.21l-2.3-2.26a7.57 7.57 0 0 1-5.59 2.47c-4.28 0-7.78-3.42-7.78-7.61S8.05 4.5 12.33 4.5c2.35 0 4.08.95 5.36 2.2l2.38-2.38C18.16 2.49 15.49 2 12.33 2Zm7.08 13.31h-7.08v-2.91h4.84c-.21 1.22-.88 2.19-1.86 2.91Z"/>
    </svg>
  );
}
