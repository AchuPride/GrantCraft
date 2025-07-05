import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">Settings</h1>
      <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
         <CardHeader>
            <div className="mx-auto bg-muted rounded-full p-4 w-fit">
                <SettingsIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="font-headline mt-4">Application Settings</CardTitle>
            <CardDescription>Manage your account, organization, and billing information here.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Settings forms will go here */}
        </CardContent>
      </Card>
    </div>
  );
}
