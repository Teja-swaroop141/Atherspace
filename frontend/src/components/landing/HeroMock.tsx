import React from "react";
import { Cpu, MemoryStick, Globe, Activity } from "lucide-react";

const tabs = ["Python", "Data Science", "MySQL", "CN Sim", "Cyber"];

const HeroMock = () => {
  return (
    <section className="container -mt-4 md:-mt-8 pb-16 md:pb-24">
      <div className="relative mx-auto max-w-5xl rounded-3xl border border-border bg-card shadow-card overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 h-10 border-b border-border bg-muted/40">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          </div>
          <div className="ml-4 flex-1 max-w-sm rounded-md bg-background/80 border border-border px-3 py-1 text-xs text-muted-foreground font-mono">
            atherspace.io / lab / python
          </div>
        </div>

        {/* Tab strip */}
        <div className="flex items-center gap-1 px-4 pt-3 border-b border-border bg-card overflow-x-auto">
          {tabs.map((t, i) => (
            <div
              key={t}
              className={`px-3 py-2 text-xs rounded-t-lg font-medium whitespace-nowrap ${
                i === 0
                  ? "bg-primary-soft text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Terminal panel */}
          <div className="lg:col-span-2 p-5 font-mono text-[12px] leading-relaxed bg-card">
            <div className="text-muted-foreground"># Welcome to AtherSpace · Python 3.12 container</div>
            <div className="mt-1"><span className="text-primary">ather@lab</span>:~$ <span>python</span></div>
            <div className="text-muted-foreground">Python 3.12.2 (main) [GCC 12.2.0] on linux</div>
            <div>&gt;&gt;&gt; <span className="text-primary">import</span> numpy <span className="text-primary">as</span> np</div>
            <div>&gt;&gt;&gt; np.linspace(0, 1, 5)</div>
            <div className="text-muted-foreground">array([0.  , 0.25, 0.5 , 0.75, 1.  ])</div>
            <div>&gt;&gt;&gt; <span className="text-primary">print</span>(<span className="text-accent-foreground">"hello, ather"</span>)</div>
            <div className="text-muted-foreground">hello, ather</div>
            <div className="mt-1">&gt;&gt;&gt; <span className="inline-block w-2 h-3.5 align-middle bg-primary animate-pulse" /></div>
          </div>

          {/* Status panel */}
          <aside className="border-t lg:border-t-0 lg:border-l border-border p-5 bg-muted/20">
            <div className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Container</div>
            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="font-medium">Running</span>
              <span className="ml-auto text-muted-foreground font-mono text-xs">02:14</span>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <Stat icon={<Cpu size={14} />} label="CPU" value="2 vCPU" bar={32} />
              <Stat icon={<MemoryStick size={14} />} label="RAM" value="1.2 / 4 GB" bar={30} />
              <Stat icon={<Activity size={14} />} label="Disk" value="0.4 / 10 GB" bar={4} />
              <Stat icon={<Globe size={14} />} label="Region" value="ap-south-1" />
            </div>

            <button className="mt-6 w-full rounded-full bg-primary text-primary-foreground text-sm font-medium py-2 shadow-pop hover:opacity-90 transition">
              Open Editor
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

const Stat = ({
  icon,
  label,
  value,
  bar,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bar?: number;
}) => (
  <div>
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {icon}
      <span>{label}</span>
      <span className="ml-auto font-mono text-foreground">{value}</span>
    </div>
    {bar !== undefined && (
      <div className="mt-1.5 h-1.5 rounded-full bg-border overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${bar}%` }} />
      </div>
    )}
  </div>
);

export default HeroMock;
