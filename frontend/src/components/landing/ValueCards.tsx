import { Zap, Globe2, Boxes } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "Zero Setup",
    desc: "No installs, no dependency hell, no 'works on my machine'. Open a lab and you're already inside a fresh environment.",
  },
  {
    icon: Globe2,
    title: "Runs Anywhere",
    desc: "An old laptop, a Chromebook, a borrowed PC — it all works. The heavy compute lives on our cloud, not your CPU.",
  },
  {
    icon: Boxes,
    title: "Real Environments",
    desc: "Full Linux containers, not toy sandboxes. The same tools, ports, and shell you'd use on a production server.",
  },
];

const ValueCards = () => {
  return (
    <section className="container py-20 md:py-28">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          What You Get With <span className="text-brand">AtherSpace</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Built for learners, students, and anyone who wants real environments without the
          local-machine pain.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group relative rounded-2xl border border-border bg-card p-6 shadow-card hover:-translate-y-0.5 transition"
          >
            <div className="h-11 w-11 rounded-xl bg-brand-soft text-brand flex items-center justify-center">
              <Icon size={20} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueCards;

