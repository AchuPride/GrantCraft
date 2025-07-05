'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AIContentGenerator } from './ai-content-generator';
import { AIImprovementSuggester } from './ai-improvement-suggester';
import { PlagiarismChecker } from './plagiarism-checker';

type SectionType = 'problemStatement' | 'objectives' | 'budgetJustification' | 'executiveSummary' | 'abstract' | 'methodology';

interface ProposalSectionProps {
  title: string;
  content: string;
  sectionType: SectionType;
}

export function ProposalSection({ title, content: initialContent, sectionType }: ProposalSectionProps) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  return (
    <Card className="h-full flex flex-col min-h-[500px]">
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription>Draft the {title.toLowerCase()} section of your proposal here. Use the AI tools to help you.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-full w-full text-base resize-none"
          placeholder={`Enter your ${title.toLowerCase()}...`}
        />
      </CardContent>
      <CardFooter className="flex flex-wrap justify-end gap-2">
        <PlagiarismChecker textToCheck={content} />
        <AIImprovementSuggester proposalSection={content} />
        <AIContentGenerator
          sectionType={sectionType}
          onContentGenerated={(newContent) => setContent(content + '\n\n' + newContent)}
        />
      </CardFooter>
    </Card>
  );
}
