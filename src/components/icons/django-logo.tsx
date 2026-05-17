
import * as React from "react";
import type { SVGProps } from "react";

export function DjangoLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.05 0h7.893a1.4 1.4 0 011.4 1.4v8.107a.35.35 0 01-.19.304l-4.704 2.646a1.05 1.05 0 01-1.022 0L1.84 12.457a.35.35 0 01-.19-.304V1.4A1.4 1.4 0 013.05 0zm.35 1.4v9.81l4.095 2.3v-2.3h2.1V1.4H3.4z"
        fill="currentColor"
      />
    </svg>
  );
}
