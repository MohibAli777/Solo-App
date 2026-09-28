create table public.captures (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  content text not null
    check (
      length(btrim(content)) between 1 and 2000
    ),

  status text not null default 'inbox'
    check (status in ('inbox', 'converted', 'archived')),

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);

alter table public.captures enable row level security;

create policy "users_can_view_own_captures"
on public.captures
for select
to authenticated
using (auth.uid() = user_id);

create policy "users_can_create_own_captures"
on public.captures
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "users_can_update_own_captures"
on public.captures
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users_can_delete_own_captures"
on public.captures
for delete
to authenticated
using (auth.uid() = user_id);


-- in our previous file , we have created the function of updating updated_at column and also calling that function using trigger on any change in profile table
-- here we are again calling the smae function for captures table to update its's updated_at column whenever it is updated

create trigger captures_set_updated_at
before update on public.captures
for each row
execute function public.handle_updated_at();