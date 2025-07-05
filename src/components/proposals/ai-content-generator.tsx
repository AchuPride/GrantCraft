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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiAssistedContentGeneration } from '@/ai/flows/ai-assisted-content-generation';

type SectionType = 'problemStatement' | 'objectives' | 'budgetJustification' | 'executiveSummary' | 'abstract' | 'methodology';

interface AIContentGeneratorProps {
  sectionType: SectionType;
  onContentGenerated: (content: string) => void;
}

export function AIContentGenerator({ sectionType, onContentGenerated }: AIContentGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!keywords || !summary) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both keywords and a project summary.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const result = await aiAssistedContentGeneration({
        sectionType,
        keywords,
        projectSummary: summary,
      });
      onContentGenerated(result.generatedContent);
      toast({
        title: 'Content Generated',
        description: 'AI-assisted content has been added to your editor.',
      });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate content. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Content Generation</DialogTitle>
          <DialogDescription>
            Provide some context for the AI to generate a draft for your {sectionType.replace(/([A-Z])/g, ' $1').toLowerCase()} section.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="keywords" className="text-right">
              Keywords
            </Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              className="col-span-3"
              placeholder="e.g., STEM, education, youth"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="summary" className="text-right pt-2">
              Project Summary
            </Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={e => setSummary(e.target.value)}
              className="col-span-3"
              placeholder="Briefly describe your project's goals and activities."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
