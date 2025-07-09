'use client';

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltipContent, ChartContainer, ChartConfig } from '@/components/ui/chart';
import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Proposal } from '@/lib/data';
import { Skeleton } from '../ui/skeleton';

const chartConfig = {
  count: {
    label: 'Proposals',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export function ProposalStatusChart() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getUser();
        if (!authData?.user) {
            setLoading(false);
            return;
        }
        const user = authData.user;

        const { data, error } = await supabase
            .from('proposals')
            .select('status')
            .eq('user_id', user.id);
        
        if (data) {
            setProposals(data as Proposal[]);
        }
        setLoading(false);
    };
    fetchProposals();
  }, []);

  const chartData = useMemo(() => {
    const statusCounts = proposals.reduce((acc, proposal) => {
      acc[proposal.status] = (acc[proposal.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
  }, [proposals]);

  if (loading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="min-h-[200px] w-full h-72" />
            </CardContent>
        </Card>
    )
  }

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
