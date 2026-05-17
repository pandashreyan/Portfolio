
import * as React from "react";
import type { SVGProps } from "react";

export function RedisLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      fill="currentColor"
      {...props}
    >
      <path
        d="M128 14.933C66.042 14.933 14.933 66.042 14.933 128S66.042 241.067 128 241.067 241.067 189.958 241.067 128 189.958 14.933 128 14.933zm-2.56 141.867h-14.08l-7.68-18.987h-21.547l-7.68 18.987H59.958l26.56-64h15.04l26.453 64zm-29.226-32.106l-10.026-24.96-10.027 24.96h20.053zM193.43 156.8h-29.013v-24.107h27.2v-14.08h-27.2V94.496h29.44v-14.08h-43.52v90.464h43.094v-14.08z"
      />
    </svg>
  );
}
