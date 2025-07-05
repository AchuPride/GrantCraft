'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { BarChart, Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeProposal } from '@/ai/flows/success-prediction-improvement-tips';

interface AiProposalAnalyzerProps {
  proposalText: string;
}

interface AnalysisResult {
  successLikelihood: number;
  feedback: string;
}

export function AiProposalAnalyzer({ proposalText }: AiProposalAnalyzerProps) {
  const [funderPriorities, setFunderPriorities] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [funderPrioritiesError, setFunderPrioritiesError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!proposalText) {
      toast({
        variant: 'destructive',
        title: 'Empty Proposal',
        description: 'There is no content to analyze.',
      });
      return;
    }
     if (!funderPriorities) {
      setFunderPrioritiesError('Please describe the funder priorities for an accurate analysis.');
      return;
    }
    setFunderPrioritiesError(null);
    setIsLoading(true);
    setResult(null);
    try {
      const pastSuccessfulProposals = 'Database of past proposals...';
      const analysis = await analyzeProposal({
        proposalText,
        funderPriorities,
        pastSuccessfulProposals,
      });
      setResult(analysis);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to analyze the proposal. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Run AI Analysis</CardTitle>
            <CardDescription>
              Get a success prediction and improvement tips based on your draft and funder priorities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="funder-priorities">Funder Priorities</Label>
              <Textarea
                id="funder-priorities"
                value={funderPriorities}
                onChange={e => {
                  setFunderPriorities(e.target.value)
                  if (funderPrioritiesError) {
                    setFunderPrioritiesError(null);
                  }
                }}
                placeholder="e.g., Focus on youth empowerment, sustainable projects, measurable impact..."
                className="min-h-[120px]"
                aria-invalid={!!funderPrioritiesError}
                aria-describedby="funder-priorities-error"
              />
               {funderPrioritiesError && (
                <p id="funder-priorities-error" className="mt-2 text-sm font-medium text-destructive">
                  {funderPrioritiesError}
                </p>
              )}
            </div>
            <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Analyze Proposal
            </Button>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="min-h-[365px]">
          <CardHeader>
            <CardTitle className="font-headline">Analysis Results</CardTitle>
            <CardDescription>
              Review the AI's feedback to strengthen your proposal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">AI is analyzing your proposal...</p>
              </div>
            )}
            {result && (
              <div className="space-y-4">
                <div>
                  <Label>Success Likelihood</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={result.successLikelihood * 100} className="w-[calc(100%-4rem)]" />
                    <span className="font-bold text-lg text-primary">{Math.round(result.successLikelihood * 100)}%</span>
                  </div>
                </div>
                <div>
                  <Label>Actionable Feedback</Label>
                  <Card className="bg-muted/50 max-h-64 overflow-y-auto">
                    <CardContent className="p-4">
                       <pre className="text-sm whitespace-pre-wrap font-body">{result.feedback}</pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            {!isLoading && !result && (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                    <BarChart className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">Your analysis results will appear here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
