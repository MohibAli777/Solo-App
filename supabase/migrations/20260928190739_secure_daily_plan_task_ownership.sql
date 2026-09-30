alter table public.daily_plans
drop constraint daily_plans_task_id_fkey;

alter table public.daily_plans
add constraint daily_plans_task_user_fkey
foreign key (task_id, user_id)
references public.tasks (id, user_id)
on delete set null;