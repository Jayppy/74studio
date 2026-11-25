DROP TRIGGER IF EXISTS on_auth_user_created_assign_admin ON auth.users;
DO $$ DECLARE t record; BEGIN
  FOR t IN SELECT tgname FROM pg_trigger WHERE tgrelid='auth.users'::regclass AND tgfoid='public.assign_first_admin'::regproc LOOP
    EXECUTE format('DROP TRIGGER %I ON auth.users', t.tgname);
  END LOOP;
END $$;
DROP FUNCTION IF EXISTS public.assign_first_admin();