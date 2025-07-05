import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">Team Management</h1>
      <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
         <CardHeader>
            <div className="mx-auto bg-muted rounded-full p-4 w-fit">
                <Users className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="font-headline mt-4">Collaboration Hub</CardTitle>
            <CardDescription>Invite and manage your team members to collaborate on proposals in real-time.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Team management UI will go here */}
        </CardContent>
      </Card>
    </div>
  );
}
