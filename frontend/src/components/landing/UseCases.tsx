import { GraduationCap, School, Compass } from "lucide-react";

const cases = [
  {
    icon: GraduationCap,
    title: "For Students",
    desc: "Practice Python, SQL or networking without trashing your laptop or installing five different tools.",
  },
  {
    icon: School,
    title: "For Classrooms",
    desc: "Every student gets the exact same environment, instantly — no 'it doesn't work on mine'.",
  },
  {
    icon: Compass,
    title: "For Self-Learners",
    desc: "Explore Cyber and CN labs in a safe, sandboxed space designed for experimentation.",
  },
];

const UseCases = () => (
  <section id="use-cases" className="container py-20 md:py-28">
    <div className="grid md:grid-cols-12 gap-10 items-start">
      <div className="md:col-span-5">
        <div className="text-xs font-medium uppercase tracking-wider text-primary">Why It Matters</div>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
          Built so anyone can <span className="text-primary">just start.</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
          AtherSpace removes the part everyone hates — setup. The result is more time
          actually building, breaking, and learning.
        </p>
      </div>

      <ul className="md:col-span-7 grid gap-4">
        {cases.map((c) => (
          <li
            key={c.title}
            className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"
          >
            <div className="shrink-0 h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
              <c.icon size={20} />
            </div>
            <div>
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default UseCases;
