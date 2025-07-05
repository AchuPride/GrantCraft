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
import { mockProposals } from '@/lib/data';

export function RecentProposalsTable() {
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
            {mockProposals.slice(0, 5).map(proposal => (
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
                <TableCell className="hidden md:table-cell">{proposal.lastModified}</TableCell>
                <TableCell className="text-right">
                   <Button asChild variant="ghost" size="icon">
                    <Link href={`/dashboard/proposals/${proposal.id}`}>
                      <ArrowUpRight className="h-4 w-4" />
                       <span className="sr-only">View Proposal</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
