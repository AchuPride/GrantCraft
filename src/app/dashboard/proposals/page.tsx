import { Button } from '@/components/ui/button';
import { ProposalsTable } from '@/components/proposals/proposals-table';
import { FilePlus2 } from 'lucide-react';
import Link from 'next/link';
import { mockProposals } from '@/lib/data';

export default function ProposalsPage() {
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
      <ProposalsTable proposals={mockProposals} />
    </div>
  );
}
