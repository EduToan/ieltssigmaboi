-- UUID & updated_at helpers
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- USERS: app profile table keyed to Supabase auth.users
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  -- Optional: store email for convenience; Auth remains source of truth
  email text unique,
  -- Demo-only column (unused). Remove in prod.
  password text,  -- DEMO ONLY! DO NOT USE FOR AUTH
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_users_updated_at
before update on public.users
for each row execute function public.set_updated_at();

-- USER_STATS
create table if not exists public.user_stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  quizzes_taken int not null default 0,
  completion_rate numeric(5,2) not null default 0.00 check (completion_rate between 0 and 100),
  average_score numeric(5,2) not null default 0.00 check (average_score between 0 and 100),
  last_quiz_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_user_stats_user_id on public.user_stats(user_id);

create trigger trg_user_stats_updated_at
before update on public.user_stats
for each row execute function public.set_updated_at();

-- RLS
alter table public.users enable row level security;
alter table public.user_stats enable row level security;

-- Policies: user can only manage own rows
create policy "users.select_own" on public.users
  for select using (id = auth.uid());

create policy "users.update_own" on public.users
  for update using (id = auth.uid());

create policy "users.delete_own" on public.users
  for delete using (id = auth.uid());

create policy "users.insert_self" on public.users
  for insert with check (id = auth.uid());

create policy "stats.read_own" on public.user_stats
  for select using (user_id = auth.uid());

create policy "stats.insert_own" on public.user_stats
  for insert with check (user_id = auth.uid());

create policy "stats.update_own" on public.user_stats
  for update using (user_id = auth.uid());

create policy "stats.delete_own" on public.user_stats
  for delete using (user_id = auth.uid());
