import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <Rocket className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-bold font-headline">GrantCraft AI</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
        <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Features
        </Link>
        <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Testimonials
        </Link>
        <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          FAQ
        </Link>
      </nav>
      <div className="ml-auto lg:ml-4 flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/signup">Sign Up Free</Link>
        </Button>
      </div>
    </header>
  );
}
