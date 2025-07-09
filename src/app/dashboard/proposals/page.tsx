import { Button } from '@/components/ui/button';
import { ProposalsTable } from '@/components/proposals/proposals-table';
import { FilePlus2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function ProposalsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return redirect('/login');
  }

  const { data: proposals, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('user_id', data.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching proposals:', error);
    // You might want to show an error message to the user
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Proposals</h1>
        <div className="flex items-center gap-2">
            <Link href="/dashboard/proposals/new">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <FilePlus2 className="mr-2 h-4 w-4" />
                    New Proposal
                </Button>
            </Link>
        </div>
      </div>
      <ProposalsTable proposals={proposals || []} />
    </div>
  );
}
