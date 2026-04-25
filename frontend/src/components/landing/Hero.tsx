import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] pointer-events-none" />

      <div className="container relative pt-20 pb-16 md:pt-28 md:pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Cloud Labs
        </div>

        <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-4xl mx-auto">
          Spin Up Real Dev Labs.
          <br />
          <span className="text-primary">Right In Your Browser.</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          AtherSpace runs Python, Data Science, MySQL, Networking and Cyber labs as
          isolated cloud containers — independent of your laptop's specs. Click a lab,
          get a full Linux environment in seconds.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7 h-12 shadow-pop">
            <a href="#labs">
              Launch a Lab
              <ArrowRight className="ml-1" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost" className="rounded-full px-6 h-12 text-muted-foreground hover:text-foreground">
            <a href="#how">See how it works</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
