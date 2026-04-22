import Image from "next/image";

export function Wordmark({
  className = "",
  tone = "ink",
  priority = false,
}: {
  className?: string;
  tone?: "ink" | "paper";
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/elekka-wordmark.jpg"
      alt="Elekka"
      width={220}
      height={60}
      priority={priority}
      className={`select-none object-contain ${
        tone === "ink"
          ? "[mix-blend-mode:multiply]"
          : "invert [mix-blend-mode:screen]"
      } ${className}`}
    />
  );
}
