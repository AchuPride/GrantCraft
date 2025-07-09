'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function logout() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error logging out:', error);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
