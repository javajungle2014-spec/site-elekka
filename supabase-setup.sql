-- ── Favoris ───────────────────────────────────────────────────────────────────

create table if not exists public.favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_slug text not null,
  created_at timestamptz default now(),
  unique(user_id, product_slug)
);

alter table public.favorites enable row level security;

create policy "Users can read own favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert own favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own favorites"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- ── Profils utilisateurs ──────────────────────────────────────────────────────

create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  first_name text,
  last_name text,
  phone text,
  address_line1 text,
  address_line2 text,
  city text,
  postal_code text,
  country text default 'France',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Crée automatiquement un profil lors de l'inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Commandes ─────────────────────────────────────────────────────────────────

create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now(),
  status text not null default 'en_preparation'
    check (status in ('en_preparation', 'expediee', 'livree', 'annulee')),
  total_eur numeric(10,2) not null,
  tracking_number text,
  shipping_address jsonb not null,
  -- items: [{slug, name, colourLabel, size, qty, priceEUR}]
  items jsonb not null
);

alter table public.orders enable row level security;

create policy "Users can read own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- ── Promotions utilisateurs ───────────────────────────────────────────────────
-- Chaque code est assigné manuellement par l'admin (insert direct en SQL ou via dashboard Supabase)

create table if not exists public.user_promotions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  code text not null,
  label text,                          -- ex: "Bienvenue chez Elekka"
  discount_type text not null default 'percent'
    check (discount_type in ('percent', 'eur')),
  discount_value numeric(10,2) not null,
  valid_until timestamptz,             -- null = sans expiration
  used boolean default false,
  created_at timestamptz default now()
);

alter table public.user_promotions enable row level security;

create policy "Users can read own promotions"
  on public.user_promotions for select
  using (auth.uid() = user_id);

-- ── Exemple : insérer une commande de test ────────────────────────────────────
-- (remplacer <user_id> par un UUID réel depuis auth.users)
--
-- insert into public.orders (user_id, status, total_eur, tracking_number, shipping_address, items)
-- values (
--   '<user_id>',
--   'expediee',
--   110.00,
--   'FR123456789',
--   '{"firstName":"Lucas","lastName":"Mourier","line1":"12 rue des Écuries","city":"Paris","postalCode":"75008","country":"France"}',
--   '[{"slug":"signature","name":"Bridon Anatomique Elekka Signature","colourLabel":"Havana Brown","size":"Full","qty":1,"priceEUR":110}]'
-- );
--
-- ── Exemple : attribuer un code promo ─────────────────────────────────────────
--
-- insert into public.user_promotions (user_id, code, label, discount_type, discount_value, valid_until)
-- values (
--   '<user_id>',
--   'BIENVENUE10',
--   'Bienvenue chez Elekka',
--   'percent',
--   10,
--   now() + interval '6 months'
-- );
