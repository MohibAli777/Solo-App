create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer --Run the function using the permissions of the function's owner.
set search_path = public
as $$
begin

  insert into public.profiles (id)
  values (new.id);

  insert into public.user_preferences (user_id)
  values (new.id);

  return new;

end;
$$;

-- create trigger on_auth_user_created
-- after insert on auth.users
-- for each row
-- execute function public.handle_new_user();