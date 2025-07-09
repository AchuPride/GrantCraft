import { Handshake, Landmark, Leaf, School } from 'lucide-react';

export function SocialProof() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Trusted by Leading Non-profits & Institutions</h2>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                    <Landmark className="h-6 w-6" />
                    <span className="text-lg">Heritage Foundation</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                    <Handshake className="h-6 w-6" />
                    <span className="text-lg">Community Partners</span>
                </div>
                 <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                    <Leaf className="h-6 w-6" />
                    <span className="text-lg">GreenScape Alliance</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                    <School className="h-6 w-6" />
                    <span className="text-lg">Innovate Academy</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
