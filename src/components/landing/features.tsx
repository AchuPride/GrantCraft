import { BarChart, Bot, FileCheck, Group, Search, ShieldCheck } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-accent" />,
      title: 'AI Content Generation',
      description: 'Draft proposals faster with AI assistance for every section, from problem statements to budgets.',
    },
    {
      icon: <BarChart className="h-8 w-8 text-accent" />,
      title: 'Success Prediction',
      description: 'Our AI analyzes your draft, providing a success score and actionable tips for improvement.',
    },
    {
      icon: <Search className="h-8 w-8 text-accent" />,
      title: 'AI Grant Matcher',
      description: 'Describe your project and let our AI find the most relevant funding opportunities for you.',
    },
    {
      icon: <Group className="h-8 w-8 text-accent" />,
      title: 'Real-time Collaboration',
      description: 'Work with your team in real-time, leaving comments and tracking changes seamlessly.',
    },
    {
      icon: <FileCheck className="h-8 w-8 text-accent" />,
      title: 'Best Practices Engine',
      description: 'Get phrasing and structural suggestions based on an analysis of thousands of winning proposals.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-accent" />,
      title: 'Plagiarism Checker',
      description: 'Ensure the originality of your work with our integrated AI-powered plagiarism detection tool.',
    },
  ];

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent font-semibold">Key Features</div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Everything You Need to Win</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              GrantCraft AI provides a comprehensive suite of tools designed to streamline your grant writing workflow and maximize your funding success.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-2 p-4 rounded-lg hover:bg-background transition-colors">
              <div className="bg-accent/10 rounded-full p-4">{feature.icon}</div>
              <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
