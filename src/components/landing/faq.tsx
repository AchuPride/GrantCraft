import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQ() {
  const faqs = [
    {
      question: "Is GrantCraft AI suitable for first-time grant writers?",
      answer: "Absolutely! Our platform is designed to be intuitive for all skill levels. The AI assistance, templates, and best-practice suggestions provide a strong foundation for beginners, while the advanced analytics and collaboration tools are powerful assets for seasoned professionals."
    },
    {
      question: "How does the AI success prediction work?",
      answer: "Our AI model has been trained on a vast database of successful and unsuccessful grant proposals across various sectors. It analyzes your draft for clarity, coherence, alignment with common funder priorities, and other key metrics to provide a predictive score and actionable feedback to help you improve."
    },
    {
      question: "Is my proposal data kept confidential and secure?",
      answer: "Yes, security and confidentiality are our top priorities. All your data is encrypted in transit and at rest. We use industry-standard security practices, and our RLS policies ensure that only you and your authorized team members can access your work. We never use your proposal data to train our models."
    },
    {
      question: "Can I export my proposals to different formats?",
      answer: "Yes, you can easily export your completed proposals to both PDF and Microsoft Word (.docx) formats, making it simple to submit them according to the funder's requirements."
    },
  ];

  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
             <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions? We've got answers.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl w-full py-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
