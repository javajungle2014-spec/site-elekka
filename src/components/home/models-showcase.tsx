import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { products, formatPrice } from "@/lib/products";
import { ProductPlaceholder } from "@/components/product-placeholder";

export function ModelsShowcase() {
  const [essentiel, signature, fusion] = products;

  return (
    <section className="mt-24 md:mt-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <p className="kicker text-muted">La gamme</p>
            <h2 className="display mt-4 text-4xl md:text-6xl">
              Trois bridons.
              <br />
              <span className="text-muted">Un seul niveau d'exigence.</span>
            </h2>
          </div>
          <Link href="/boutique" className="group inline-flex items-center gap-3 text-sm tracking-wide text-ink press self-start md:self-auto">
            <span className="underline underline-offset-[6px] decoration-line group-hover:decoration-ink">Voir toute la boutique</span>
            <ArrowUpRight size={16} weight="regular" />
          </Link>
        </header>

        <FeaturedTile product={essentiel} />

        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <SecondaryTile product={signature} />
          <SecondaryTile product={fusion} />
        </div>
      </div>
    </section>
  );
}

function FeaturedTile({ product }: { product: (typeof products)[number] }) {
  const hero = product.colours[0].images[0];
  return (
    <Link href={`/boutique/${product.slug}`} aria-label={`${product.name} — découvrir`} className="group block">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
        <div className="md:col-span-8 relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-paper-2">
          {hero ? (
            <Image src={hero} alt={`${product.name} — ${product.colours[0].label}`} fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]" />
          ) : (
            <ProductPlaceholder label={product.name} />
          )}
          <div className="absolute top-5 left-5 bg-paper/95 px-3 py-1.5 text-xs tracking-[0.18em] uppercase">En vedette</div>
        </div>
        <div className="md:col-span-4 flex flex-col justify-between py-2 md:py-4">
          <div>
            <p className="kicker text-muted">{product.family}</p>
            <h3 className="display mt-3 text-3xl md:text-4xl">{product.name}</h3>
            <p className="mt-4 text-base text-muted leading-relaxed max-w-[38ch]">{product.description}</p>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-line pt-5">
            <span className="font-mono text-lg text-ink tabular-nums">{formatPrice(product.priceEUR)}</span>
            <span className="inline-flex items-center gap-2 text-sm text-ink group-hover:gap-3 transition-[gap] duration-300">
              Découvrir <ArrowUpRight size={16} weight="regular" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SecondaryTile({ product }: { product: (typeof products)[number] }) {
  const hero = product.colours[0].images[0];
  return (
    <Link href={`/boutique/${product.slug}`} aria-label={`${product.name} — découvrir`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
        {hero ? (
          <Image src={hero} alt={`${product.name} — ${product.colours[0].label}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]" />
        ) : (
          <ProductPlaceholder label={product.name} />
        )}
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="kicker text-muted">{product.family}</p>
          <h3 className="mt-2 text-lg md:text-xl font-semibold tracking-tight text-ink">{product.name}</h3>
          <p className="mt-1.5 text-sm text-muted max-w-[34ch] leading-relaxed">{product.tagline}</p>
        </div>
        <div className="shrink-0 text-right">
          <span className="font-mono text-base text-ink tabular-nums">{formatPrice(product.priceEUR)}</span>
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted group-hover:text-ink transition-colors">
            Découvrir <ArrowUpRight size={12} weight="regular" />
          </div>
        </div>
      </div>
    </Link>
  );
}
