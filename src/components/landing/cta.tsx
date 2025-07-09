import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Cta() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50/50">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">
            Ready to Revolutionize Your Grant Writing?
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join hundreds of organizations securing the funding they need to make a difference. Sign up for free today and start crafting your winning proposal.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
           <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/signup">Start Your Free Trial</Link>
            </Button>
          <p className="text-xs text-muted-foreground">No credit card required. Start winning grants now.</p>
        </div>
      </div>
    </section>
  );
}
