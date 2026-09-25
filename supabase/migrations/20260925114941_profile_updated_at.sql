create or replace function public.handle_updated_at()
returns trigger -- This function is designed to be executed by a database trigger.
language plpgsql --  The code inside this function is written using PL/pgSQL.
security invoker --  This controls whose permissions are used when the function executes. Run the function using Alice's permissions — the person who called it. Execute this function using the permissions of the user who called it.
set search_path = public  --  Defines the default schema to search for tables and other database objects.
as $$  -- The actual function code starts here. 
begin -- This starts the executable section of the PL/pgSQL function.
  new.updated_at = now(); --  Sets the updated_at column of the row being modified to the current time. new is a special trigger variable. it is used when updating a row
  return new; --  Returns the modified row, which will then be inserted or updated. The trigger function needs to tell PostgreSQL which row should continue through the operation.
end; -- This marks the end of the function's executable code. end of executable block
$$; -- The double dollar sign marks the end of the function definition. end of function body

create trigger profiles_set_updated_at -- This line names the trigger.
before update on public.profiles -- Run the trigger before the update is actually saved. This specifies when the trigger should fire: before an update operation on the profiles table.
for each row -- Run the trigger separately for every row affected by the update. This indicates that the trigger should execute once for every row affected by the update operation.
execute function public.handle_updated_at(); -- This identifies the function to be executed when the trigger fires. **Note**: When this function is called, the `new` keyword refers to the row that is about to be inserted or updated.