
import * as React from "react";
import type { SVGProps } from "react";

export function PythonLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM16 11.143v-2.2c0-.893-.404-1.428-1.25-1.428H11v3.628h3.75c.846 0 1.25-.535 1.25-1zm-5-6.2h3.75c2.053 0 3.25 1.2 3.25 3.2v1.428h-6.25V4.943zm-.75 7.072H6.5v1.428c0 2 .958 3.2 3.25 3.2H13v-3.628H10.25zm7.5-2.2v2.2c0 .893-.404 1.428-1.25 1.428H13v-3.628h3.75c.846 0 1.25.535 1.25 1zm-7.5 6.2h-3.75c-2.053 0-3.25-1.2-3.25-3.2v-1.428h6.25v4.628z"
        fill="currentColor"
      />
      <circle cx="14.75" cy="6.75" r="1.25" fill="#fff" />
      <circle cx="9.25" cy="17.25" r="1.25" fill="#fff" />
    </svg>
  );
}
