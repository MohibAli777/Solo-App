alter table public.tasks
add constraint tasks_id_user_id_unique
unique (id, user_id);

alter table public.focus_sessions
drop constraint focus_sessions_task_id_fkey;

alter table public.focus_sessions
add constraint focus_sessions_task_user_fkey
foreign key (task_id, user_id)
references public.tasks (id, user_id)
on delete cascade;