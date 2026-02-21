import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What happens when I tap or scan it?",
    answer: "You're instantly taken to a page with clear guidance, emergency steps, and mental health support resources.",
  },
  {
    question: "Is it complicated to use?",
    answer: "Not at all. If you can tap your phone or scan a QR code, you can use Love Key.",
  },
  {
    question: "Does it work without an app?",
    answer: "Yes. No app required. Just your phone.",
  },
  {
    question: "Is it suitable as a gift?",
    answer: "Absolutely. Many people give Love Key to those they care about most.",
  },
];

const FAQ = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-background border border-border rounded-xl px-4"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
