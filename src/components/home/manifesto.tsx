export function Manifesto() {
  const pillars = [
    {
      k: "01",
      title: "Pensé sur le terrain, pas dans un bureau.",
      body: "Chaque modèle est développé par des cavaliers, à partir des besoins réels de leurs chevaux. Ajustement précis, confort immédiat, efficacité prouvée.",
    },
    {
      k: "02",
      title: "Respecte le cheval avant tout.",
      body: "Nos formes anatomiques libèrent les zones de pression et suivent la morphologie naturelle. Plus de confort, plus de décontraction, plus de précision.",
    },
    {
      k: "03",
      title: "Moins de marketing, plus de produit.",
      body: "Notre priorité : la qualité et la performance, pas les dépenses superflues. Un positionnement clair.",
    },
  ];

  return (
    <section className="mt-24 md:mt-36 on-ink bg-ink text-on-ink py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
          <div className="md:col-span-7 md:pr-10">
            <p className="kicker text-on-ink-muted">Manifeste</p>
            <p className="display mt-6 text-3xl md:text-5xl text-on-ink leading-[1.02]">
              Le prix ne fait pas la qualité d'une bride.
              <br />
              <span className="text-on-ink-muted">
                Ce sont le cuir, la technologie et le savoir-faire de l'artisan qui font la différence.
              </span>
            </p>
            <div className="mt-10 flex items-baseline gap-3">
              <span className="font-mono text-4xl font-bold text-on-ink">54</span>
              <span className="text-sm text-on-ink-muted">cavaliers nous font déjà confiance.</span>
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col divide-y divide-line-ink">
            {pillars.map((p) => (
              <div key={p.k} className="py-6 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-xs text-on-ink-muted tabular-nums">{p.k}</span>
                  <div>
                    <h3 className="text-lg font-medium text-on-ink">{p.title}</h3>
                    <p className="mt-2 text-sm text-on-ink-muted leading-relaxed max-w-[42ch]">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
