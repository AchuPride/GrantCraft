'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockGrants, Grant } from '@/lib/grants-data';
import { DollarSign, Calendar, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allCategories = Array.from(new Set(mockGrants.flatMap(g => g.categories))).sort();

export default function GrantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredGrants = useMemo(() => {
    return mockGrants.filter(grant => {
      const searchMatch = grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          grant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          grant.funder.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = selectedCategory === 'all' || grant.categories.includes(selectedCategory);
      
      return searchMatch && categoryMatch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">Find Grants</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Grant Search</CardTitle>
          <CardDescription>Search our database for funding opportunities.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by keyword, funder, etc."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGrants.length > 0 ? filteredGrants.map(grant => (
          <GrantCard key={grant.id} grant={grant} />
        )) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No grants found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function GrantCard({ grant }: { grant: Grant }) {
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
