import { ProposalEditor } from '@/components/proposals/proposal-editor';
import { mockProposals } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Download, Share2 } from 'lucide-react';

export default async function ProposalPage({ params }: { params: { id: string } }) {
  const proposal = mockProposals.find(p => p.id === params.id);

  if (!proposal) {
    if (params.id === 'new') {
      // Allow creating a new proposal
    } else {
        notFound();
    }
  }

  const newProposalTemplate = {
    id: 'new',
    name: 'New Proposal',
    status: 'Draft' as const,
    lastModified: new Date().toLocaleDateString(),
    content: {
      overview: '',
      problemStatement: '',
      objectives: '',
      methodology: '',
      budget: '',
    },
  };

  const currentProposal = params.id === 'new' ? newProposalTemplate : proposal!;


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
                <h1 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">{currentProposal.name}</h1>
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
