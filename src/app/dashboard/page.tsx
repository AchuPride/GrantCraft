import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { RecentProposalsTable } from '@/components/dashboard/recent-proposals-table';
import { FilePlus2, ListTodo, Percent, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { ProposalStatusChart } from '@/components/dashboard/proposal-status-chart';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/');
  }

  const [activeResult, awardedResult, totalResult] = await Promise.all([
    supabase
      .from('proposals')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .in('status', ['Draft', 'Submitted']),
    supabase
      .from('proposals')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'Awarded'),
    supabase
      .from('proposals')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .in('status', ['Awarded', 'Rejected', 'Submitted'])
  ]);

  if (activeResult.error || awardedResult.error || totalResult.error) {
      console.error('Error fetching dashboard stats:', activeResult.error || awardedResult.error || totalResult.error);
      // To prevent a crash, we'll proceed with 0 counts, but log the error for debugging.
  }

  const activeProposalsCount = activeResult.count ?? 0;
  const awardedCount = awardedResult.count ?? 0;
  const totalSubmittedCount = totalResult.count ?? 0;

  const successRate = totalSubmittedCount > 0 ? Math.round((awardedCount / totalSubmittedCount) * 100) : 0;
  
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
        <StatCard title="Active Proposals" value={activeProposalsCount.toString()} icon={TrendingUp} />
        <StatCard title="Tasks Due" value="0" icon={ListTodo} description="Coming soon" />
        <StatCard title="Avg. Success Rate" value={`${successRate}%`} icon={Percent} description={`Based on ${totalSubmittedCount || 0} submissions`} />
        <StatCard title="New Grants Matched" value="0" icon={FilePlus2} description="Run AI Grant Matcher" />
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
