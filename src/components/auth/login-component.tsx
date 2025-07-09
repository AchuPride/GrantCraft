
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Rocket, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Vercel adds this
    'http://localhost:9002/'; // dev fallback
  // Make sure to include `https` in production
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export function LoginComponent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message,
      });
      setIsLoading(false);
      return;
    }

    router.refresh();
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getURL()}auth/callback`,
      },
    });
     if (error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Could not authenticate with Google. Please try again.',
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 font-body">
      <Card className="mx-auto max-w-sm w-full shadow-xl">
        <CardHeader className="items-center text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
          <CardTitle className="text-3xl font-headline">GrantCraft AI</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm text-primary/80 hover:text-primary underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              Login
            </Button>
            <Button variant="outline" className="w-full" type="button" onClick={handleGoogleLogin}>
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline text-primary/80 hover:text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
