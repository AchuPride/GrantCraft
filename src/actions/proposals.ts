'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import type { Proposal } from '@/lib/data';

export async function saveProposal(proposalData: Proposal) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: { message: 'You must be logged in to save a proposal.' } };
  }
  
  const isNew = proposalData.id === 'new';

  // Omit fields that should not be sent on update or are handled by the DB.
  const { created_at, last_modified, ...restOfProposalData } = proposalData;

  const dataToUpsert: any = {
    ...restOfProposalData,
    id: isNew ? uuidv4() : proposalData.id,
    user_id: user.id,
  };

  // The database trigger handles last_modified on UPDATE.
  // We only set it here manually on INSERT, since the trigger only fires on update.
  if (isNew) {
    dataToUpsert.last_modified = new Date().toISOString();
  }

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
