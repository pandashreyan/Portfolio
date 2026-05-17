
import * as React from "react";
import type { SVGProps } from "react";

// Simple placeholder - replace with a better SVG if available
export function PostgresLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2v-2h2v2zm0-4h-2V8h2v4z"/>
    </svg>
  );
}
