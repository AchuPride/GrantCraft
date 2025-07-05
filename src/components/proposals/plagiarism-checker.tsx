'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { plagiarismCheck } from '@/ai/flows/plagiarism-check';
import type { PlagiarismCheckOutput } from '@/ai/flows/plagiarism-check';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PlagiarismCheckerProps {
  textToCheck: string;
}

export function PlagiarismChecker({ textToCheck }: PlagiarismCheckerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<PlagiarismCheckOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setResult(null);
    }
  };

  const handleCheck = async () => {
    if (!textToCheck.trim()) {
      toast({
        variant: 'destructive',
        title: 'Empty Content',
        description: 'There is no content to check for plagiarism.',
      });
      return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const analysis = await plagiarismCheck({ text: textToCheck });
      setResult(analysis);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to perform plagiarism check. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => handleOpenChange(true)}>
          <ShieldCheck className="mr-2 h-4 w-4" />
          Plagiarism Check
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>AI Plagiarism Check</DialogTitle>
          <DialogDescription>
            Check your content for potential plagiarism against public sources.
          </DialogDescription>
        </DialogHeader>
        
        {!result && !isLoading && (
            <div className="py-8 flex flex-col items-center justify-center text-center gap-4">
                <ShieldCheck className="h-16 w-16 text-muted-foreground/50" />
                <p className="text-muted-foreground">Click below to start the plagiarism analysis.</p>
                <Button onClick={handleCheck} disabled={isLoading}>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Start Check
                </Button>
            </div>
        )}

        {isLoading && (
            <div className="py-8 flex items-center justify-center h-full min-h-[300px]">
              <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
              <span className="text-muted-foreground">Performing analysis...</span>
            </div>
        )}

        {result && !isLoading && (
          <div className="py-4 space-y-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Overall Similarity Score</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-4">
                    <span className={`text-2xl font-bold ${result.overallScore > 0.1 ? 'text-destructive' : 'text-accent'}`}>
                      {Math.round(result.overallScore * 100)}%
                    </span>
                    <Progress value={result.overallScore * 100} className="w-full" />
                </div>
                 <p className="text-xs text-muted-foreground mt-2">
                   {result.overallScore > 0.1 ? "Potential issues found. Please review the sources below." : "Content appears to be original."}
                 </p>
              </CardContent>
            </Card>

            {result.sources.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Potential Sources</h3>
                <ScrollArea className="h-72">
                  <div className="space-y-4 pr-4">
                    {result.sources.map((source, index) => (
                      <Card key={index} className="bg-muted/50">
                        <CardContent className="p-4">
                          <p className="text-sm font-semibold truncate">
                            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {source.url}
                            </a>
                          </p>
                          <blockquote className="mt-2 pl-4 border-l-2 border-border italic text-sm text-muted-foreground">
                            "{source.snippet}"
                          </blockquote>
                          <p className="text-xs text-right mt-2 font-mono">Similarity: {(source.similarity * 100).toFixed(0)}%</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}
        
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => handleOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
