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
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { suggestImprovements } from '@/ai/flows/template-best-practices-integration';

interface AIImprovementSuggesterProps {
  proposalSection: string;
  onSuggestedContent: (content: string) => void;
}

export function AIImprovementSuggester({ proposalSection, onSuggestedContent }: AIImprovementSuggesterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggest = async () => {
    if (!proposalSection) {
      toast({
        variant: 'destructive',
        title: 'Empty Section',
        description: 'Please write some content before asking for suggestions.',
      });
      return;
    }
    setIsLoading(true);
    setSuggestions('');
    try {
      // In a real app, you would fetch past proposals from a database.
      const pastSuccessfulProposals = 'Example of a successful proposal section...';
      const result = await suggestImprovements({
        proposalSection,
        pastSuccessfulProposals,
      });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleSuggest}>
          <Lightbulb className="mr-2 h-4 w-4" />
          Get Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Improvement Suggestions</DialogTitle>
          <DialogDescription>
            Here are some AI-powered suggestions to improve your text based on best practices.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 min-h-[200px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
              <span className="text-muted-foreground">Analyzing your text...</span>
            </div>
          ) : (
            <Card className="bg-muted/50 max-h-96 overflow-y-auto">
              <CardContent className="p-4">
                <pre className="text-sm whitespace-pre-wrap font-body">{suggestions || "No suggestions available."}</pre>
              </CardContent>
            </Card>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
