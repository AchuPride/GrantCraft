import { Pencil, ScanSearch, Lightbulb, Send } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Pencil className="h-10 w-10 text-primary" />,
      title: "1. Draft with AI",
      description: "Start a new proposal and use our AI to generate initial drafts for any section in minutes.",
    },
    {
      icon: <ScanSearch className="h-10 w-10 text-primary" />,
      title: "2. Analyze & Review",
      description: "Run our AI analysis to get a success score, improvement tips, and check for plagiarism.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "3. Refine & Collaborate",
      description: "Implement suggestions and invite team members to collaborate and refine your proposal.",
    },
    {
      icon: <Send className="h-10 w-10 text-primary" />,
      title: "4. Export & Submit",
      description: "Export your finished proposal in PDF or DOCX format, ready for submission.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">A Simpler Path to Funding</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our intuitive workflow guides you from a blank page to a submission-ready proposal in four simple steps.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="grid gap-2 text-center">
              <div className="flex justify-center items-center">
                 <div className="bg-primary/10 rounded-full p-5">{step.icon}</div>
              </div>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
