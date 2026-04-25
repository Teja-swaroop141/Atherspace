import { useState, useEffect } from "react";
import axios from "axios";
import { Code2, BarChart3, Database, Network, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const API_BASE = import.meta.env.VITE_API_URL;

const labs = [
  {
    icon: Code2,
    id: "python",
    endpoint: "start-python-lab",
    name: "Python Lab",
    blurb:
      "Interactive Python 3 with notebooks, pip, and a full shell. Build, test and iterate without touching your local Python.",
    tags: ["Python 3.12", "Jupyter", "pip"],
    visual: "python",
  },
  {
    icon: BarChart3,
    id: "ds",
    endpoint: "start-ds-lab",
    name: "Data Science Lab",
    blurb:
      "Pre-loaded with NumPy, Pandas, scikit-learn and Matplotlib. Open a notebook and start exploring datasets right away.",
    tags: ["Pandas", "scikit-learn", "Jupyter"],
    visual: "ds",
  },
  {
    icon: Database,
    id: "sql",
    endpoint: "start-sql-lab",
    name: "MySQL Lab",
    blurb:
      "A live MySQL 8 server with a query console and sample datasets. Practice joins, indexes and stored procedures on real data.",
    tags: ["MySQL 8", "Query Console", "Sample DBs"],
    visual: "sql",
  },
  {
    icon: Network,
    id: "net",
    endpoint: "start-cn-lab",
    name: "CN Simulation Lab",
    blurb:
      "Simulate routing, packet flow and topologies in a sandboxed network. Experiment with subnets and protocols safely.",
    tags: ["Topologies", "Cisco-style CLI", "Packet trace"],
    visual: "net",
  },
  {
    icon: ShieldCheck,
    id: "cyber",
    endpoint: "start-cyber-lab",
    name: "Cyber Lab",
    blurb:
      "An isolated container loaded with common security tooling for ethical hacking practice and CTF-style exercises.",
    tags: ["Kali tools", "CTF-ready", "Sandboxed"],
    visual: "cyber",
  },
];

type LabState = {
  loading: boolean;
  url: string | null;
  pod: string | null;
};

const LabsGrid = () => {
  const { toast } = useToast();
  const [backendOnline, setBackendOnline] = useState(false);
  const [slotsAvailable, setSlotsAvailable] = useState<number | null>(null);

  const [labStates, setLabStates] = useState<Record<string, LabState>>({
    python: { loading: false, url: null, pod: null },
    ds: { loading: false, url: null, pod: null },
    sql: { loading: false, url: null, pod: null },
    net: { loading: false, url: null, pod: null },
    cyber: { loading: false, url: null, pod: null },
  });

  useEffect(() => {
    const checkBackend = async () => {
      if (!API_BASE) return;
      try {
        const res = await axios.get(`${API_BASE}/status`, { timeout: 5000 });
        setBackendOnline(true);
        setSlotsAvailable(res.data.slots_available);
      } catch {
        setBackendOnline(false);
      }
    };
    checkBackend();
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  const launchLab = async (id: string, endpoint: string, name: string) => {
    setLabStates(prev => ({ ...prev, [id]: { ...prev[id], loading: true } }));
    toast({
      title: `${name} is warming up`,
      description: "Your container will be ready in a few seconds.",
    });

    try {
      const response = await axios.post(`${API_BASE}/${endpoint}`, {}, { timeout: 30000 });
      if (response.data.status === "Failure") {
        toast({ title: "Launch Failed", description: response.data.message, variant: "destructive" });
        setLabStates(prev => ({ ...prev, [id]: { ...prev[id], loading: false } }));
      } else if (response.data.url) {
        setLabStates(prev => ({
          ...prev,
          [id]: { loading: false, url: response.data.url, pod: response.data.pod_name }
        }));
        setSlotsAvailable(prev => prev !== null ? prev - 1 : null);
        toast({ title: `${name} Ready`, description: "Your lab is now accessible." });
      }
    } catch (error: any) {
      if (error.code === 'ECONNABORTED') {
        toast({ title: "Timeout", description: "Request timed out. Backend may be starting up.", variant: "destructive" });
      } else {
        toast({ title: "Connection Error", description: "Cannot reach backend. Is the EC2 instance running?", variant: "destructive" });
      }
      setLabStates(prev => ({ ...prev, [id]: { ...prev[id], loading: false } }));
    }
  };

  const stopLab = async (id: string, podName: string) => {
    setLabStates(prev => ({ ...prev, [id]: { ...prev[id], loading: true } }));
    try {
      await axios.delete(`${API_BASE}/stop-lab/${podName}`);
      setLabStates(prev => ({
        ...prev,
        [id]: { loading: false, url: null, pod: null }
      }));
      setSlotsAvailable(prev => prev !== null ? prev + 1 : null);
      toast({ title: "Lab Stopped", description: "Container has been successfully terminated." });
    } catch {
      toast({ title: "Error", description: "Could not stop lab.", variant: "destructive" });
      setLabStates(prev => ({ ...prev, [id]: { ...prev[id], loading: false } }));
    }
  };

  return (
    <section id="labs" className="container py-20 md:py-28">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
          The Labs
        </div>
        <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
          Five Labs. <span className="text-primary">One Click Away.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Each lab spins up in its own container with everything pre-installed. Pick one
          and start building.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 text-sm font-medium">
          <span className={backendOnline ? "text-green-500" : "text-destructive"}>
            ● {backendOnline ? 'SYSTEM ONLINE' : 'BACKEND OFFLINE'}
          </span>
          <span className="text-muted-foreground">
            SLOTS: {slotsAvailable !== null ? `${slotsAvailable}/3` : '...'}
          </span>
        </div>
      </div>

      <div className="mt-14 space-y-12">
        {labs.map((lab, i) => (
          <div
            key={lab.name}
            className={`grid gap-8 md:gap-12 md:grid-cols-2 items-center ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Visual */}
            <div className="rounded-3xl border border-border bg-card shadow-card p-5 md:p-6">
              <LabVisual kind={lab.visual} />
            </div>

            {/* Copy */}
            <div>
              <div className="h-12 w-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center">
                <lab.icon size={22} />
              </div>
              <h3 className="mt-5 text-2xl md:text-3xl font-bold">{lab.name}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed max-w-md">{lab.blurb}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {lab.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium rounded-full border border-border bg-muted/40 px-3 py-1 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {!labStates[lab.id].url ? (
                <Button
                  onClick={() => launchLab(lab.id, lab.endpoint, lab.name)}
                  disabled={labStates[lab.id].loading || !backendOnline}
                  className="mt-7 rounded-full px-6 shadow-pop"
                >
                  {labStates[lab.id].loading ? "Initializing..." : <>Launch <ArrowRight /></>}
                </Button>
              ) : (
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full px-6 shadow-pop">
                    <a href={labStates[lab.id].url!} target="_blank" rel="noopener noreferrer">
                      Open Terminal <ArrowRight />
                    </a>
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => stopLab(lab.id, labStates[lab.id].pod!)}
                    disabled={labStates[lab.id].loading}
                    className="rounded-full px-6"
                  >
                    {labStates[lab.id].loading ? "Stopping..." : "Stop Lab"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* Lightweight visual mock per lab — pure CSS. */
const LabVisual = ({ kind }: { kind: string }) => {
  switch (kind) {
    case "python":
      return (
        <div className="font-mono text-[12px] leading-relaxed">
          <div className="text-muted-foreground"># notebook · py</div>
          <div><span className="text-primary">def</span> greet(name):</div>
          <div className="pl-4"><span className="text-primary">return</span> f<span className="text-accent-foreground">"hi, &#123;name&#125;"</span></div>
          <div className="mt-2">greet(<span className="text-accent-foreground">"ather"</span>)</div>
          <div className="text-muted-foreground">→ "hi, ather"</div>
          <div className="mt-3 flex gap-1">
            {[60, 35, 80, 45].map((w, i) => (
              <div key={i} className="h-1 rounded-full bg-primary/30 flex-1" style={{ opacity: w / 100 }} />
            ))}
          </div>
        </div>
      );
    case "ds":
      return (
        <div>
          <div className="text-xs font-semibold mb-3">Iris classification · accuracy</div>
          <div className="flex items-end gap-2 h-32">
            {[48, 62, 71, 84, 90, 93, 96].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary/40 to-primary" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mt-2 text-[10px] text-muted-foreground font-mono flex justify-between">
            <span>e1</span><span>e2</span><span>e3</span><span>e4</span><span>e5</span><span>e6</span><span>e7</span>
          </div>
        </div>
      );
    case "sql":
      return (
        <div className="font-mono text-[12px]">
          <div><span className="text-primary">SELECT</span> name, COUNT(*)</div>
          <div><span className="text-primary">FROM</span> orders <span className="text-primary">JOIN</span> users</div>
          <div><span className="text-primary">GROUP BY</span> name;</div>
          <div className="mt-3 rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-2 text-[11px] font-semibold bg-muted/50 px-3 py-1.5">
              <span>name</span><span>count</span>
            </div>
            {[["arjun", 12], ["meera", 9], ["devi", 7], ["kabir", 4]].map(([n, c]) => (
              <div key={n as string} className="grid grid-cols-2 text-[11px] px-3 py-1.5 border-t border-border">
                <span>{n}</span><span className="text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "net":
      return (
        <div>
          <svg viewBox="0 0 320 160" className="w-full h-40">
            <defs>
              <marker id="dot" markerWidth="6" markerHeight="6" refX="3" refY="3">
                <circle cx="3" cy="3" r="3" fill="hsl(var(--primary))" />
              </marker>
            </defs>
            {[
              ["40,80", "120,40"],
              ["120,40", "200,80"],
              ["120,40", "120,120"],
              ["200,80", "280,40"],
              ["200,80", "280,120"],
            ].map(([a, b], i) => (
              <line
                key={i}
                x1={a.split(",")[0]} y1={a.split(",")[1]}
                x2={b.split(",")[0]} y2={b.split(",")[1]}
                stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="3 3"
                opacity="0.6"
              />
            ))}
            {[
              [40, 80, "R1"], [120, 40, "R2"], [200, 80, "R3"],
              [120, 120, "H1"], [280, 40, "H2"], [280, 120, "H3"],
            ].map(([x, y, l], i) => (
              <g key={i}>
                <circle cx={x as number} cy={y as number} r="14" fill="hsl(var(--primary-soft))" stroke="hsl(var(--primary))" />
                <text x={x as number} y={(y as number) + 4} textAnchor="middle" fontSize="10" fill="hsl(var(--primary))" fontWeight="600">{l}</text>
              </g>
            ))}
          </svg>
          <div className="text-[10px] text-muted-foreground font-mono">ping R1 → R2 → R3 · 12ms</div>
        </div>
      );
    case "cyber":
      return (
        <div className="font-mono text-[12px]">
          <div><span className="text-primary">$</span> nmap -sV target.local</div>
          <div className="text-muted-foreground">Starting Nmap 7.94 ...</div>
          <div className="mt-1 grid grid-cols-3 text-[11px] gap-y-1">
            <span className="text-muted-foreground">PORT</span>
            <span className="text-muted-foreground">STATE</span>
            <span className="text-muted-foreground">SERVICE</span>
            <span>22/tcp</span><span className="text-primary">open</span><span>ssh</span>
            <span>80/tcp</span><span className="text-primary">open</span><span>http</span>
            <span>443/tcp</span><span className="text-primary">open</span><span>https</span>
            <span>3306/tcp</span><span>filtered</span><span>mysql</span>
          </div>
          <div className="mt-3 inline-flex items-center gap-1 text-[10px] text-primary">
            <ShieldCheck size={12} /> Sandboxed · No outbound traffic
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default LabsGrid;
