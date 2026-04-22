import { LogoMark } from "./logo";

export function ProductPlaceholder({
  label,
  className = "",
  tone = "ink",
}: {
  label?: string;
  className?: string;
  tone?: "ink" | "graphite";
}) {
  const bg = tone === "ink" ? "bg-ink" : "bg-[#1a1a1a]";
  return (
    <div
      className={`relative w-full h-full ${bg} overflow-hidden isolate ${className}`}
      aria-label={label ?? "Photographie à venir"}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06), transparent 60%)" }}
        aria-hidden
      />
      <div className="absolute inset-6 border border-line-ink/40" aria-hidden />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-on-ink">
        <LogoMark className="h-10 w-auto text-ink" />
        <div className="text-center px-6">
          <p className="kicker text-on-ink-muted">Photographie</p>
          <p className="mt-2 text-sm tracking-wide">{label ?? "à venir"}</p>
        </div>
      </div>
    </div>
  );
}
