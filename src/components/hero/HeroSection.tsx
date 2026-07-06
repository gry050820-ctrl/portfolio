"use client";

import { siteConfig } from "@/data/site.config";
import { Container } from "@/components/ui/Container";
import { HeroBackground } from "./HeroBackground";
import { HeroGreeting } from "./HeroGreeting";
import { HeroTitle } from "./HeroTitle";
import { HeroSubtitle } from "./HeroSubtitle";
import { HeroCTA } from "./HeroCTA";
import { HeroScrollIndicator } from "./HeroScrollIndicator";

/**
 * Hero Section — the first thing HR sees.
 *
 * Orchestrates background, greeting, title, subtitle, CTAs,
 * and scroll indicator with staggered entry animation.
 * Total animation timeline: ~0.8s from first to last element.
 */
export function HeroSection() {
  const { greeting, title, subtitle, cta } = siteConfig.hero;

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Atmospheric background — radial glow + grid */}
      <HeroBackground />

      {/* Content — vertically centered, horizontally centered */}
      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto py-20">
          <HeroGreeting text={greeting} />
          <HeroTitle text={title} />
          <HeroSubtitle text={subtitle} />
          <HeroCTA primary={cta.primary} secondary={cta.secondary} />
        </div>
      </Container>

      {/* Scroll indicator — positioned at bottom */}
      <HeroScrollIndicator />
    </section>
  );
}
