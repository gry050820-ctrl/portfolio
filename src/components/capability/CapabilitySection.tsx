"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { Container } from "@/components/ui/Container";
import { CapabilityCard } from "./CapabilityCard";

/**
 * Capability Map Section.
 *
 * 5 capability dimensions, each with depth levels and project evidence.
 * Click to expand the evidence chain.
 *
 * Answers: "Why are these capabilities real?"
 */
export function CapabilitySection() {
  const { capabilities } = siteConfig;
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });

  return (
    <section id={siteConfig.sections.capability} className="py-32 md:py-40">
      <Container>
        {/* Section title */}
        <motion.div
          ref={titleRef}
          className="mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-widest text-text-tertiary mb-3">
            Capability Map
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-3">
            为什么这些能力是真实的？
          </h2>
          <p className="text-sm text-text-tertiary max-w-lg">
            每一项能力都有对应的项目作为证据。点击卡片展开证据链，
            查看从入门到精通的成长路径。
          </p>
        </motion.div>

        {/* Capability grid — 3+2 layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <CapabilityCard
              key={cap.id}
              icon={cap.icon}
              name={cap.name}
              definition={cap.definition}
              currentLevel={cap.currentLevel}
              maxLevel={cap.maxLevel}
              growth={cap.growth}
              levels={cap.levels}
              relatedProjects={cap.relatedProjects}
              index={i}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm text-text-tertiary mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          每个深度层级都有对应的项目证据 · 这是一个持续成长的能力地图
        </motion.p>
      </Container>
    </section>
  );
}
