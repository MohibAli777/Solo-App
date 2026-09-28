create table public.daily_plans (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  plan_date date not null,

  task_id uuid
    references public.tasks(id)
    on delete set null,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  constraint one_plan_per_user_per_day
    unique (user_id, plan_date)
);


alter table public.daily_plans enable row level security;

create policy "users_can_view_own_daily_plans"
on public.daily_plans
for select
to authenticated
using (auth.uid() = user_id);

create policy "users_can_create_own_daily_plans"
on public.daily_plans
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "users_can_update_own_daily_plans"
on public.daily_plans
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users_can_delete_own_daily_plans"
on public.daily_plans
for delete
to authenticated
using (auth.uid() = user_id);


create trigger daily_plans_set_updated_at
before update on public.daily_plans
for each row
execute function public.handle_updated_at();