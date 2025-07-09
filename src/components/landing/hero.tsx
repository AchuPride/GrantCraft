import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none">
                Secure Funding Faster with AI-Powered Grant Proposals
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                GrantCraft AI transforms your grant writing process. From drafting compelling narratives to predicting success, we're your partner in making an impact.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/signup">Start for Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                 <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <Image
            src="https://placehold.co/600/600.png"
            width="600"
            height="600"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            data-ai-hint="grant proposal"
          />
        </div>
      </div>
    </section>
  );
}
