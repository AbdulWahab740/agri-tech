import { Hero } from "@/components/landing/Hero";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/shared/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </main>
  );
}
