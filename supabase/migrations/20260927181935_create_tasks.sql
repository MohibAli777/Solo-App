create table public.tasks (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  capture_id uuid
    references public.captures(id)
    on delete set null,

  title text not null
    check (length(btrim(title)) between 1 and 200),

  description text,

  status text not null default 'active'
    check (
      status in ('active', 'completed', 'archived')
    ),

  priority text not null default 'normal'
    check (
      priority in ('low', 'normal', 'high')
    ),

  due_at timestamptz,

  started_at timestamptz,

  completed_at timestamptz,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  constraint completed_task_requires_completed_at
    check (
      status <> 'completed'
      or completed_at is not null
    ),

  constraint active_task_requires_started_at
    check (
      status <> 'active'
      or started_at is not null
    )
);

create unique index tasks_one_active_per_user
on public.tasks (user_id)
where status = 'active';

alter table public.tasks enable row level security;

create policy "users_can_view_own_tasks"
on public.tasks
for select
to authenticated
using (auth.uid() = user_id);

create policy "users_can_create_own_tasks"
on public.tasks
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "users_can_update_own_tasks"
on public.tasks
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users_can_delete_own_tasks"
on public.tasks
for delete
to authenticated
using (auth.uid() = user_id);


create trigger tasks_set_updated_at
before update on public.tasks
for each row
execute function public.handle_updated_at();



-- 1. Create table
-- 2. Enforce data integrity
-- 3. Enforce one-active-task rule
-- 4. Protect rows with RLS
-- 5. Automatically maintain updated_at