import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import HeroMock from "@/components/landing/HeroMock";
import ValueCards from "@/components/landing/ValueCards";
import LabsGrid from "@/components/landing/LabsGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import UseCases from "@/components/landing/UseCases";
import FAQ from "@/components/landing/FAQ";
import CTABanner from "@/components/landing/CTABanner";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <HeroMock />
        <ValueCards />
        <LabsGrid />
        <HowItWorks />
        <UseCases />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
