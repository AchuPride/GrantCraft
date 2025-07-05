import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { RecentProposalsTable } from '@/components/dashboard/recent-proposals-table';
import { FilePlus2, ListTodo, Percent, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { ProposalStatusChart } from '@/components/dashboard/proposal-status-chart';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
            <Link href="/dashboard/proposals/new">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <FilePlus2 className="mr-2 h-4 w-4" />
                    New Proposal
                </Button>
            </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Proposals" value="12" icon={TrendingUp} description="+2 from last month" />
        <StatCard title="Tasks Due" value="5" icon={ListTodo} description="2 overdue" />
        <StatCard title="Avg. Success Rate" value="78%" icon={Percent} description="Based on 16 submissions" />
        <StatCard title="New Grants Matched" value="8" icon={FilePlus2} description="In the last 7 days" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold font-headline mb-4">Recent Proposals</h2>
          <RecentProposalsTable />
        </div>
        <div className="lg:col-span-2">
           <ProposalStatusChart />
        </div>
      </div>
    </div>
  );
}
