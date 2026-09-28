create table public.user_preferences (
  user_id uuid primary key
    references public.profiles(id)
    on delete cascade,

  timezone text not null default 'UTC',

  notifications_enabled boolean not null default true,

  default_focus_duration_seconds integer not null default 1500
    check (
      default_focus_duration_seconds between 60 and 7200
    ),

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);

alter table public.user_preferences enable row level security;

create policy "users_can_view_own_preferences"
on public.user_preferences
for select
to authenticated
using (auth.uid() = user_id);

create policy "users_can_update_own_preferences"
on public.user_preferences
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);