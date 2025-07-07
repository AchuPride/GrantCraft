'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Grant } from '@/lib/grants-data';
import { DollarSign, Calendar, Loader2, Wand2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { matchGrants } from '@/ai/flows/grant-matcher';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

type MatchedGrant = Grant & {
  matchScore?: number;
  justification?: string;
};

interface GrantClientPageProps {
    initialGrants: Grant[];
}

export function GrantClientPage({ initialGrants }: GrantClientPageProps) {
  const [proposalAbstract, setProposalAbstract] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [grants, setGrants] = useState<MatchedGrant[]>(initialGrants);
  const { toast } = useToast();

  const handleMatchGrants = async () => {
    if (!proposalAbstract.trim()) {
      toast({
        variant: 'destructive',
        title: 'Empty Abstract',
        description: 'Please provide a proposal abstract to find matches.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const result = await matchGrants({ proposalAbstract });
      if (result.matchedGrants.length === 0) {
        toast({
          title: 'No Matches Found',
          description: 'The AI could not find any strong matches. Try refining your abstract.',
        });
      }
      setGrants(result.matchedGrants.length > 0 ? result.matchedGrants : initialGrants);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to find grant matches. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">AI Grant Matcher</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Find Matching Grants</CardTitle>
          <CardDescription>Paste your proposal abstract below and let our AI find the best funding opportunities for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div>
              <Label htmlFor="proposal-abstract" className="sr-only">Proposal Abstract</Label>
              <Textarea
                id="proposal-abstract"
                value={proposalAbstract}
                onChange={e => setProposalAbstract(e.target.value)}
                placeholder="Enter your proposal abstract here..."
                className="min-h-[150px] text-base"
              />
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleMatchGrants} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Find Matches
            </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {grants.length > 0 ? grants.map(grant => (
          <GrantCard key={grant.id} grant={grant} />
        )) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No grants found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function GrantCard({ grant }: { grant: MatchedGrant }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{grant.title}</CardTitle>
        <CardDescription>{grant.funder}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground">{grant.description}</p>
        <div className="flex flex-wrap gap-2">
          {grant.categories.map(cat => (
            <Badge key={cat} variant="secondary">{cat}</Badge>
          ))}
        </div>
        {grant.matchScore && grant.justification && (
          <Card className="mt-4 bg-accent/10 border-accent/30">
            <CardHeader className="p-3">
                <CardTitle className="text-sm text-accent font-semibold flex items-center justify-between">
                  <span>Match Score: {Math.round(grant.matchScore * 100)}%</span>
                </CardTitle>
                 <Progress value={grant.matchScore * 100} className="w-full h-1.5 mt-1 bg-accent/20 [&>div]:bg-accent" />
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-accent/90">Justification:</span> {grant.justification}
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 pt-4 border-t">
        <div className="flex items-center text-sm font-semibold">
          <DollarSign className="mr-2 h-4 w-4 text-accent" />
          <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(grant.amount)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Deadline: {new Date(grant.deadline).toLocaleDateString()}</span>
        </div>
        <Button className="w-full mt-2 bg-accent hover:bg-accent/90">View Details</Button>
      </CardFooter>
    </Card>
  )
}
