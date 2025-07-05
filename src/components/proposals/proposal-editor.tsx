'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProposalSection } from './proposal-section';
import { AiProposalAnalyzer } from './ai-proposal-analyzer';
import type { Proposal } from '@/lib/data';
import { Input } from '../ui/input';

interface ProposalEditorProps {
    proposal: Proposal;
}

export function ProposalEditor({ proposal }: ProposalEditorProps) {
    const [proposalName, setProposalName] = useState(proposal.name);
    const [content, setContent] = useState(proposal.content);

    const handleContentChange = (section: keyof Proposal['content'], newText: string) => {
        setContent(prev => ({...prev, [section]: newText}));
    }
    
    const fullProposalText = Object.values(content).join('\n\n');

    return (
        <div className="flex flex-col gap-4">
             {proposal.id === 'new' && (
                <Input 
                    placeholder="Enter Proposal Title" 
                    value={proposalName}
                    onChange={e => setProposalName(e.target.value)}
                    className="text-2xl h-12 font-headline"
                />
            )}
            <Tabs defaultValue="overview" className="flex-grow flex flex-col">
                <TabsList className="grid w-full grid-cols-4 sm:grid-cols-5 md:grid-cols-7">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="abstract">Abstract</TabsTrigger>
                    <TabsTrigger value="problem">Problem</TabsTrigger>
                    <TabsTrigger value="objectives">Objectives</TabsTrigger>
                    <TabsTrigger value="methodology">Methodology</TabsTrigger>
                    <TabsTrigger value="budget">Budget</TabsTrigger>
                    <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                </TabsList>
                <div className="flex-grow mt-4">
                    <TabsContent value="overview" className="h-full">
                        <ProposalSection title="Project Overview" content={content.overview} sectionType="executiveSummary" onContentChange={(newText) => handleContentChange('overview', newText)} />
                    </TabsContent>
                    <TabsContent value="abstract" className="h-full">
                        <ProposalSection title="Abstract" content={content.abstract} sectionType="abstract" onContentChange={(newText) => handleContentChange('abstract', newText)} />
                    </TabsContent>
                    <TabsContent value="problem" className="h-full">
                        <ProposalSection title="Problem Statement" content={content.problemStatement} sectionType="problemStatement" onContentChange={(newText) => handleContentChange('problemStatement', newText)} />
                    </TabsContent>
                    <TabsContent value="objectives" className="h-full">
                        <ProposalSection title="Objectives" content={content.objectives} sectionType="objectives" onContentChange={(newText) => handleContentChange('objectives', newText)} />
                    </TabsContent>
                    <TabsContent value="methodology" className="h-full">
                        <ProposalSection title="Methodology" content={content.methodology} sectionType="methodology" onContentChange={(newText) => handleContentChange('methodology', newText)} />
                    </TabsContent>
                    <TabsContent value="budget" className="h-full">
                        <ProposalSection title="Budget Justification" content={content.budget} sectionType="budgetJustification" onContentChange={(newText) => handleContentChange('budget', newText)} />
                    </TabsContent>
                    <TabsContent value="analysis" className="h-full">
                        <AiProposalAnalyzer proposalText={fullProposalText} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
