'use client';

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltipContent, ChartContainer, ChartConfig } from '@/components/ui/chart';
import { mockProposals } from '@/lib/data';
import { useMemo } from 'react';

const chartConfig = {
  count: {
    label: 'Proposals',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export function ProposalStatusChart() {
  const chartData = useMemo(() => {
    const statusCounts = mockProposals.reduce((acc, proposal) => {
      acc[proposal.status] = (acc[proposal.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proposal Status Overview</CardTitle>
        <CardDescription>A summary of your current proposal pipeline.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-72">
          <RechartsBarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
             <XAxis
              dataKey="status"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              fontSize={12}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
