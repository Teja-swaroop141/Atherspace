import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I need to install anything on my computer?",
    a: "No. Every lab runs as a container in the cloud and is accessed through your browser. Any modern laptop or Chromebook works.",
  },
  {
    q: "Will my work be saved between sessions?",
    a: "Each lab session has a working directory. In this demo build, persistence is per-session — durable storage is on the roadmap.",
  },
  {
    q: "Are the containers isolated from each other?",
    a: "Yes. Every lab session runs in its own sandboxed container with limited networking, so your experiments stay safely contained.",
  },
  {
    q: "What happens when I close the tab?",
    a: "The container is paused and reaped after a short timeout. Open the lab again and a fresh environment spins up in seconds.",
  },
  {
    q: "Is AtherSpace free?",
    a: "The 5 labs are free to use during this demo. Heavier compute tiers may come later, but the core learning labs will stay accessible.",
  },
];

const FAQ = () => (
  <section id="faq" className="container py-20 md:py-28">
    <div className="grid md:grid-cols-12 gap-10">
      <div className="md:col-span-4">
        <div className="text-xs font-medium uppercase tracking-wider text-primary">FAQ</div>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
          Questions, answered.
        </h2>
        <p className="mt-4 text-muted-foreground text-sm">
          Still curious? The labs explain themselves better than any FAQ — go open one.
        </p>
      </div>
      <div className="md:col-span-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQ;
