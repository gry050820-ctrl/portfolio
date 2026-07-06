/**
 * Portfolio V1 · Home Page
 *
 * Single-page scroll structure. Each section answers one question
 * in the narrative chain: 身份 → 可信度 → 证据 → 能力溯源 → 方法论 → 成长 → 联系
 */

import { HeroSection } from "@/components/hero";
import { DashboardSection } from "@/components/dashboard";
import { LabSection } from "@/components/lab";
import { CapabilitySection } from "@/components/capability";
import { MethodologySection } from "@/components/methodology";
import { TimelineSection } from "@/components/timeline";
import { ContactSection } from "@/components/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DashboardSection />
      <LabSection />
      <CapabilitySection />
      <MethodologySection />
      <TimelineSection />
      <ContactSection />
    </>
  );
}
