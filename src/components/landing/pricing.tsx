import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50/50">
      <div className="container px-4 md:px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent font-semibold">
              Simple Pricing
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Choose Your Plan</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Select the perfect plan for your needs with transparent pricing and no hidden fees.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-2 lg:gap-12">
          <Card className="relative flex flex-col h-full">
            <CardHeader>
              <CardTitle className="font-headline">Free</CardTitle>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription>
                Get started with basic AI-powered proposal features.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Up to 3 proposals</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>1 user account</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>AI Content Generation</span>
                </li>
                 <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Standard templates</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/signup">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="relative flex flex-col h-full border-2 border-primary shadow-2xl">
            <div className="absolute top-0 right-4 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="font-headline">Pro</CardTitle>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$20</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription>
                Enhanced features for professional grant writers and teams.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Unlimited proposals</span>
                </li>
                 <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Advanced AI Analysis & Prediction</span>
                </li>
                 <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>AI Grant Matcher</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Real-time Collaboration</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/signup">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
