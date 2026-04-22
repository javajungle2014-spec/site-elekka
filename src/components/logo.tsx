import { type SVGProps } from "react";

export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Elekka"
      className={className}
      {...props}
    >
      <rect width="40" height="40" fill="currentColor" />
      <path d="M6 8 H18 V11 H9 V18.5 H17 V21.5 H9 V29 H18 V32 H6 Z" fill="var(--paper)" />
      <path d="M22 8 H25 V19 L32 8 H35.5 L28.5 19.5 L35.5 32 H32 L25 20.5 V32 H22 Z" fill="var(--paper)" />
    </svg>
  );
}
