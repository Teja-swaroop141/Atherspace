import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const CTABanner = () => (
  <section className="container pb-20">
    <div className="relative overflow-hidden rounded-3xl bg-gradient-cta px-8 py-16 md:py-24 text-center text-primary-foreground shadow-pop">
      <div className="absolute inset-0 bg-dot-grid opacity-20 [--dot-color:0_0%_100%]" />
      <h2 className="relative text-3xl md:text-5xl font-bold leading-tight max-w-2xl mx-auto">
        Your next lab session is <br className="hidden md:block" /> one click away.
      </h2>
      <p className="relative mt-4 text-primary-foreground/80 max-w-md mx-auto">
        No sign up. No setup. Just open a lab and start.
      </p>
      <Button
        asChild
        size="lg"
        variant="secondary"
        className="relative mt-8 rounded-full h-12 px-7 bg-background text-foreground hover:bg-background/90"
      >
        <a href="#labs">
          Launch a Lab <ArrowUpRight />
        </a>
      </Button>
    </div>
  </section>
);

export default CTABanner;
