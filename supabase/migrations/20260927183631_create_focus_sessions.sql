create table public.focus_sessions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  task_id uuid not null
    references public.tasks(id)
    on delete cascade,

  status text not null default 'active'
    check (
      status in ('active', 'paused', 'completed', 'abandoned')
    ),

  started_at timestamptz not null default now(),

  paused_at timestamptz,

  completed_at timestamptz,

  duration_seconds integer
    check (
      duration_seconds is null
      or duration_seconds >= 0
    ),

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);


alter table public.focus_sessions enable row level security;

create policy "users_can_view_own_focus_sessions"
on public.focus_sessions
for select
to authenticated
using (auth.uid() = user_id);

create policy "users_can_create_own_focus_sessions"
on public.focus_sessions
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "users_can_update_own_focus_sessions"
on public.focus_sessions
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users_can_delete_own_focus_sessions"
on public.focus_sessions
for delete
to authenticated
using (auth.uid() = user_id);


create trigger focus_sessions_set_updated_at
before update on public.focus_sessions
for each row
execute function public.handle_updated_at();


alter table public.focus_sessions
add constraint paused_session_requires_paused_at
check (
  status <> 'paused'
  or paused_at is not null
);

alter table public.focus_sessions
add constraint completed_session_requires_completed_at
check (
  status <> 'completed'
  or completed_at is not null
);  

alter table public.focus_sessions
add constraint completed_after_started
check (
  completed_at is null
  or completed_at >= started_at
);

alter table public.focus_sessions
add constraint paused_after_started
check (
  paused_at is null
  or paused_at >= started_at
);

create unique index focus_sessions_one_active_per_user
on public.focus_sessions (user_id)
where status = 'active';