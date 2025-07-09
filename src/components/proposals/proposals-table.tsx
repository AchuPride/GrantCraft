'use client';

import * as React from 'react';
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
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Proposal } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';

interface ProposalsTableProps {
  proposals: Proposal[];
}

export function ProposalsTable({ proposals }: ProposalsTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proposal Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Modified</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map(proposal => (
              <TableRow key={proposal.id}>
                <TableCell className="font-medium">
                  <Link href={`/dashboard/proposals/${proposal.id}`} className="hover:underline">
                    {proposal.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant={proposal.status === 'Awarded' ? 'default' : proposal.status === 'Submitted' ? 'secondary' : 'outline'} 
                         className={proposal.status === 'Awarded' ? 'bg-accent text-accent-foreground' : ''}>
                    {proposal.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {proposal.last_modified ? formatDistanceToNow(new Date(proposal.last_modified), { addSuffix: true }) : '-'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <Link href={`/dashboard/proposals/${proposal.id}`} passHref>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
