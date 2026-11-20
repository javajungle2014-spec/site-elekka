-- Migration Elekka — novembre 2026
-- À exécuter une fois dans Supabase : SQL Editor → coller → Run.
-- Sans risque pour les données existantes (vérifié : aucun doublon en base).

-- 1. Déduction de stock atomique (la fonction était appelée par le site mais n'existait pas)
--    Ne descend jamais sous zéro. Renvoie la quantité restante, ou null si la variante est introuvable.
create or replace function public.deduct_stock(
  p_model_id bigint,
  p_colour text,
  p_size text,
  p_qty integer
) returns integer
language sql
security definer
set search_path = public
as $$
  update public.stock_variants
     set quantity = greatest(quantity - p_qty, 0)
   where model_id = p_model_id
     and colour = p_colour
     and size = p_size
  returning quantity;
$$;

revoke all on function public.deduct_stock(bigint, text, text, integer) from public, anon, authenticated;

-- 2. Codes promo : un code ne peut exister qu'une fois
create unique index if not exists promo_codes_code_unique on public.promo_codes (code);

-- 3. Une variante de stock (modèle + couleur + taille) ne peut exister qu'une fois
create unique index if not exists stock_variants_unique on public.stock_variants (model_id, colour, size);

-- 4. Incrément d'usage atomique, sans dépasser max_uses
drop function if exists public.increment_promo_usage(text);
create function public.increment_promo_usage(promo_code text)
returns boolean
language sql
security definer
set search_path = public
as $$
  with u as (
    update public.promo_codes
       set used_count = used_count + 1
     where code = upper(trim(promo_code))
       and (max_uses is null or used_count < max_uses)
    returning 1
  )
  select exists (select 1 from u);
$$;

revoke all on function public.increment_promo_usage(text) from public, anon, authenticated;
