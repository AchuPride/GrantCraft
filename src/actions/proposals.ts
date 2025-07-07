'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import type { Proposal } from '@/lib/data';

type ProposalUpdatable = Omit<Proposal, 'created_at' | 'user_id'>;

export async function saveProposal(proposalData: ProposalUpdatable) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: { message: 'You must be logged in to save a proposal.' } };
  }
  
  const isNew = proposalData.id === 'new';

  const dataToUpsert = {
    ...proposalData,
    id: isNew ? uuidv4() : proposalData.id,
    user_id: user.id,
    last_modified: new Date().toISOString(),
  };

  const { data, error } = await supabase.from('proposals').upsert(dataToUpsert).select().single();

  if (error) {
    console.error('Error saving proposal:', error);
    return { error };
  }

  revalidatePath('/dashboard/proposals');
  revalidatePath(`/dashboard/proposals/${data.id}`);

  if (isNew) {
    redirect(`/dashboard/proposals/${data.id}`);
  }

  return { data };
}
