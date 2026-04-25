import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const links = [
  { label: "Labs", href: "#labs" },
  { label: "How it works", href: "#how" },
  { label: "Use cases", href: "#use-cases" },
  { label: "FAQ", href: "#faq" },
];

const Nav = () => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button asChild size="sm" className="rounded-full px-5 shadow-pop">
          <a href="#labs">Launch a Lab</a>
        </Button>
      </div>
    </header>
  );
};

export default Nav;
