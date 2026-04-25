import Logo from "./Logo";

const cols = [
  { title: "Labs", items: ["Python", "Data Science", "MySQL", "CN Simulation", "Cyber"] },
  { title: "Resources", items: ["Docs", "FAQ", "Changelog", "Status"] },
  { title: "About", items: ["Mission", "Tech Stack", "Roadmap"] },
  { title: "Contact", items: ["Twitter / X", "GitHub", "Email"] },
];

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container py-14">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Cloud labs for builders. Spin up real Linux environments for Python, Data
            Science, SQL, Networking and Cyber — all from your browser.
          </p>
        </div>
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold tracking-wider uppercase text-foreground">
                {c.title}
              </div>
              <ul className="mt-3 space-y-2">
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} AtherSpace. All rights reserved.</span>
        <span className="font-mono">cloud labs · for builders</span>
      </div>
    </div>
  </footer>
);

export default Footer;
