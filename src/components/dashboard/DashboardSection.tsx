"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { Container } from "@/components/ui/Container";
import { MetricCard } from "./MetricCard";
import { StatusBar } from "./StatusBar";

/**
 * Data Dashboard Section.
 *
 * 4 metric cards + status bar.
 * Answers: "Why should I believe this person?"
 * Each clickable card links to project evidence.
 */
export function DashboardSection() {
  const { metrics, status } = siteConfig.dashboard;
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });

  return (
    <section id={siteConfig.sections.dashboard} className="py-32 md:py-40">
      <Container>
        {/* Section title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-widest text-text-tertiary mb-3">
            数据看板
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary">
            为什么值得相信？
          </h2>
          <p className="text-sm text-text-tertiary mt-2">
            每一个数字，都有对应的项目作为证据
          </p>
        </motion.div>

        {/* Metric cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              icon={metric.icon}
              description={metric.description}
              evidence={metric.evidence}
              lastUpdated={metric.lastUpdated}
              clickable={metric.clickable}
              index={i}
            />
          ))}
        </div>

        {/* Status bar */}
        <StatusBar
          nowBuilding={status.nowBuilding}
          lastUpdated={status.lastUpdated}
          currentExploration={status.currentExploration}
        />
      </Container>
    </section>
  );
}
