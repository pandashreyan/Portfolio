
import * as React from "react";
import type { SVGProps } from "react";

// Simple placeholder - replace with a better SVG if available
export function DockerLogo(props: SVGProps<SVGSVGElement>) {
  return (
     <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <path d="M20.7 6.5H19V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v1.5H9V5c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-8.5c0-1.1-.9-2-2-2zm-15 1.5h2v2H5.7v-2zm0 4h2v2H5.7v-2zm0 4h2v2H5.7v-2zm10 0h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2z"/>
    </svg>
  );
}
