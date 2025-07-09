import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export function Testimonials() {
  const testimonials = [
    {
      quote: "GrantCraft AI cut our proposal writing time in half. The success prediction feature is a game-changer for prioritizing our efforts.",
      name: "Maria Rodriguez",
      title: "Grant Manager, Futuro Now",
      avatar: "https://placehold.co/100x100.png",
      aiHint: "woman professional"
    },
    {
      quote: "As a small non-profit, we don't have a dedicated grant writer. This tool leveled the playing field for us. We just secured our largest grant ever!",
      name: "David Chen",
      title: "Executive Director, Hopeful Homes",
      avatar: "https://placehold.co/100x100.png",
      aiHint: "man professional"
    },
    {
      quote: "The collaboration features are seamless. Our entire team can work on a proposal together, and the AI suggestions keep our narrative strong and consistent.",
      name: "Dr. Emily Carter",
      title: "Research Lead, BioInnovate Labs",
      avatar: "https://placehold.co/100x100.png",
      aiHint: "woman scientist"
    },
  ];

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50/50">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">What Our Users Are Saying</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Hear from professionals who are already winning more grants with GrantCraft AI.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                 <Avatar className="w-20 h-20 border">
                    <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.aiHint} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='space-y-2'>
                  <p className="text-sm font-medium leading-loose">"{testimonial.quote}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
