import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function GrantsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">Find Grants</h1>
      <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
        <CardHeader>
            <div className="mx-auto bg-muted rounded-full p-4 w-fit">
                <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="font-headline mt-4">Grant Matching Engine</CardTitle>
            <CardDescription>Our AI-powered grant matching engine is coming soon. <br/> It will analyze your profile to suggest relevant opportunities.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Search and filter components will go here */}
        </CardContent>
      </Card>
    </div>
  );
}
