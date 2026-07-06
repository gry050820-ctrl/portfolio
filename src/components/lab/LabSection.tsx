"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { Container } from "@/components/ui/Container";
import { ExplorationGroup } from "./ExplorationGroup";

/**
 * Product Lab Section.
 *
 * Projects organized under exploration questions, not as isolated cards.
 * Problem-First design: each card opens with a conflict, not a project name.
 *
 * Answers: "What problems have you solved? How did you think about them?"
 */
export function LabSection() {
  const { explorations } = siteConfig.lab;
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });

  return (
    <section id={siteConfig.sections.lab} className="py-32 md:py-40">
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
            Product Lab
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-3">
            我在探索的问题
          </h2>
          <p className="text-sm text-text-tertiary max-w-lg">
            不只是项目列表——每一个项目都是对某个问题的一次探索。
            点击卡片查看完整案例，包括思考过程、取舍决策和复盘反思。
          </p>
        </motion.div>

        {/* Exploration groups */}
        {explorations.map((exploration, i) => (
          <ExplorationGroup
            key={exploration.question}
            question={exploration.question}
            projects={exploration.projects}
            index={i}
          />
        ))}

        {/* Bottom hint */}
        <motion.p
          className="text-center text-sm text-text-tertiary mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          更多探索正在进行中 · 这个实验室持续更新
        </motion.p>
      </Container>
    </section>
  );
}
