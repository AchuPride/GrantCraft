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
    
    // Combine all content sections into a single string for analysis
    const fullProposalText = Object.values(proposal.content).join('\n\n');

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
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="problem">Problem</TabsTrigger>
                    <TabsTrigger value="objectives">Objectives</TabsTrigger>
                    <TabsTrigger value="methodology">Methodology</TabsTrigger>
                    <TabsTrigger value="budget">Budget</TabsTrigger>
                    <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                </TabsList>
                <div className="flex-grow mt-4">
                    <TabsContent value="overview" className="h-full">
                        <ProposalSection title="Project Overview" content={proposal.content.overview} sectionType="executiveSummary" />
                    </TabsContent>
                    <TabsContent value="problem" className="h-full">
                        <ProposalSection title="Problem Statement" content={proposal.content.problemStatement} sectionType="problemStatement" />
                    </TabsContent>
                    <TabsContent value="objectives" className="h-full">
                        <ProposalSection title="Objectives" content={proposal.content.objectives} sectionType="objectives" />
                    </TabsContent>
                    <TabsContent value="methodology" className="h-full">
                        <ProposalSection title="Methodology" content={proposal.content.methodology} sectionType="methodology" />
                    </TabsContent>
                    <TabsContent value="budget" className="h-full">
                        <ProposalSection title="Budget Justification" content={proposal.content.budget} sectionType="budgetJustification" />
                    </TabsContent>
                    <TabsContent value="analysis" className="h-full">
                        <AiProposalAnalyzer proposalText={fullProposalText} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
