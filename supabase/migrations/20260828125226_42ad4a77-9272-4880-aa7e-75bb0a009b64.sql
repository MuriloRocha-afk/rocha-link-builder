drop policy "admins leem avaliacoes" on public.avaliacoes;
drop function if exists public.has_role(uuid, app_role);
create policy "admins leem avaliacoes" on public.avaliacoes for select to authenticated
using (exists (select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'admin'));