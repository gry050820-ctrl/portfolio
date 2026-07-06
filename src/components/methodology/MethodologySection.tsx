"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { getPath } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { MethodNode } from "./MethodNode";

/**
 * Product Methodology Section.
 *
 * A 6-node walkthrough using a real case (AI U 盘) to demonstrate
 * the complete thinking process: 发现 → 思考 → 取舍 → AI加速 → 验证 → 迭代
 *
 * Answers: "How do you think?"
 */
export function MethodologySection() {
  const { methodology } = siteConfig;
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });

  return (
    <section id={siteConfig.sections.methodology} className="py-32 md:py-40">
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
            How I Work
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-3">
            从问题到产品的思考方式
          </h2>
          <p className="text-sm text-text-tertiary max-w-lg">
            以{" "}
            <a
              href={getPath(`/project/${methodology.caseSlug}`)}
              className="text-brand-light hover:text-brand-light/80 transition-colors"
            >
              {methodology.caseProject}
            </a>{" "}
            为真实案例，展示我是如何一步步发现问题、
            验证假设、做出取舍、持续迭代的。每个节点都可以展开查看具体方法，
            以及对应项目中的实际应用。
          </p>
        </motion.div>

        {/* Node timeline — max-width for readability */}
        <div className="max-w-2xl">
          {methodology.nodes.map((node, i) => (
            <MethodNode
              key={node.id}
              icon={node.icon}
              title={node.title}
              summary={node.summary}
              method={node.method}
              keyInsight={node.keyInsight}
              evidenceAnchors={node.evidenceAnchors}
              index={i}
              isLast={i === methodology.nodes.length - 1}
            />
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          className="mt-16 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-text-tertiary">
            这套方法论不是一次性总结——它在每个新项目中持续进化和完善。
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
