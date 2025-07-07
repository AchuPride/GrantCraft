import { ProposalEditor } from '@/components/proposals/proposal-editor';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Download, Share2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { ProposalContent } from '@/lib/data';

export default async function ProposalPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
      return redirect('/');
  }

  const isNew = params.id === 'new';
  let proposal = null;

  if (!isNew) {
    const { data } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();
    
    if (!data) {
        notFound();
    }
    proposal = data;
  }

  const newProposalTemplate = {
    id: 'new',
    name: '',
    status: 'Draft' as const,
    last_modified: new Date().toISOString(),
    created_at: new Date().toISOString(),
    user_id: user.id,
    content: {
      overview: '',
      problemStatement: '',
      objectives: '',
      methodology: '',
      budget: '',
      abstract: '',
    } as ProposalContent,
  };

  const currentProposal = isNew ? newProposalTemplate : proposal!;


  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-center gap-4">
           <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/proposals">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back to proposals</span>
                </Link>
            </Button>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">{isNew ? 'New Proposal' : currentProposal.name}</h1>
                <p className="text-muted-foreground">Status: {currentProposal.status}</p>
            </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
          <Button><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </div>
      <ProposalEditor proposal={currentProposal} />
    </div>
  );
}
