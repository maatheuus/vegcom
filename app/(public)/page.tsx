import { AboutSection } from "@/components/landing/AboutSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { CTASection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { MostViewedSection } from "@/components/landing/MostViewedSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/community");
  return (
    <main className="flex flex-col">
      <HeroSection />
      <CategoriesSection />
      <FeaturesSection />
      <MostViewedSection />
      {/* <StatsSection /> */}
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
