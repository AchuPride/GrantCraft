import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="mx-auto max-w-sm w-full text-center">
                <CardHeader>
                    <div className="mx-auto bg-destructive/10 rounded-full p-4 w-fit">
                        <AlertTriangle className="h-12 w-12 text-destructive" />
                    </div>
                    <CardTitle className="font-headline mt-4">Authentication Error</CardTitle>
                    <CardDescription>
                        There was a problem authenticating your account. Please try logging in again.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/">Return to Login</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
