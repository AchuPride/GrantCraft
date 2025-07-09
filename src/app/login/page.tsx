import { LoginComponent } from '@/components/auth/login-component';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/dashboard');
  }
  
  return <LoginComponent />;
}
