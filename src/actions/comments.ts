'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Database } from '@/lib/database.types';

type CommentInsert = Database['public']['Tables']['comments']['Insert'];

export async function addComment(commentData: Omit<CommentInsert, 'user_id' | 'user_full_name' | 'user_avatar_url'>) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: { message: 'You must be logged in to comment.' } };
  }

  const { content, proposal_id } = commentData;

  const { data: userData } = await supabase.auth.getUser();

  const dataToInsert = {
    content,
    proposal_id,
    user_id: user.id,
    user_full_name: userData.user?.user_metadata?.full_name ?? userData.user?.email,
    user_avatar_url: userData.user?.user_metadata?.avatar_url,
  };

  const { data, error } = await supabase.from('comments').insert(dataToInsert).select().single();

  if (error) {
    console.error('Error adding comment:', error);
    return { error };
  }

  // Revalidating the path is less important with real-time, but good practice
  revalidatePath(`/dashboard/proposals/${proposal_id}`);

  return { data };
}
