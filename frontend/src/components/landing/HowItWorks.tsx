import { MousePointerClick, Container, TerminalSquare } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    title: "Pick a lab",
    desc: "Choose from Python, Data Science, MySQL, CN Simulation or Cyber.",
  },
  {
    icon: Container,
    title: "We spin up a container",
    desc: "An isolated environment boots in the cloud in a few seconds.",
  },
  {
    icon: TerminalSquare,
    title: "Code in the browser",
    desc: "Use the terminal, editor and notebooks. Your laptop stays cool.",
  },
];

const HowItWorks = () => (
  <section id="how" className="relative py-20 md:py-28 bg-muted/30 border-y border-border">
    <div className="container">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">How It Works</h2>
        <p className="mt-4 text-muted-foreground">From homepage to terminal in under 10 seconds.</p>
      </div>

      <ol className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="absolute -top-3 left-6 text-xs font-mono text-primary bg-card border border-primary/20 px-2 py-0.5 rounded-full">
              0{i + 1}
            </div>
            <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
              <s.icon size={20} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
