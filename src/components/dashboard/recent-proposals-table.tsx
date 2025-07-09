import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatDistanceToNow } from 'date-fns';
import { cookies } from 'next/headers';

export async function RecentProposalsTable() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    // This case should ideally not be hit if the component is used within DashboardLayout
    return null;
  }
  const user = authData.user;

  const { data: proposals, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('user_id', user.id)
    .order('last_modified', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching recent proposals:', error);
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>Error: Could not load recent proposals.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proposal Name</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Modified</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals && proposals.length > 0 ? (
              proposals.map(proposal => (
                <TableRow key={proposal.id}>
                  <TableCell>
                    <div className="font-medium">{proposal.name}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={proposal.status === 'Awarded' ? 'default' : proposal.status === 'Submitted' ? 'secondary' : 'outline'}
                      className={proposal.status === 'Awarded' ? 'bg-accent text-accent-foreground' : ''}
                    >
                      {proposal.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                      {proposal.last_modified ? formatDistanceToNow(new Date(proposal.last_modified), { addSuffix: true }) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/dashboard/proposals/${proposal.id}`}>
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">View Proposal</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  You have no recent proposals.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
