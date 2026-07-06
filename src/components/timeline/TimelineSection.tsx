"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { Container } from "@/components/ui/Container";

/**
 * Growth Timeline Section.
 *
 * Narrative timeline — not a resume chronology.
 * Each milestone is a turning point, not just a date.
 *
 * Answers: "Why did you become who you are now?"
 */
export function TimelineSection() {
  const { timeline } = siteConfig;
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });

  return (
    <section id={siteConfig.sections.timeline} className="py-32 md:py-40">
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
            Growth
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-3">
            为什么会成为现在的我？
          </h2>
          <p className="text-sm text-text-tertiary max-w-lg">
            不是流水账。每一个时间点都代表了一次认知升级或方向转折。
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-2xl">
          {timeline.map((item, i) => (
            <TimelineItem
              key={item.date}
              date={item.date}
              title={item.title}
              description={item.description}
              highlight={item.highlight}
              index={i}
              isLast={i === timeline.length - 1}
            />
          ))}
        </div>

        {/* Closing */}
        <motion.p
          className="mt-16 text-center text-sm text-text-secondary max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          这个时间轴会继续延伸。下一个节点，也许就是在你的团队里。
        </motion.p>
      </Container>
    </section>
  );
}

/* ── Single timeline item ── */

function TimelineItem({
  date,
  title,
  description,
  highlight,
  index,
  isLast,
}: {
  date: string;
  title: string;
  description: string;
  highlight: string;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <div ref={ref} className="relative">
      {/* Connector line */}
      {!isLast && (
        <div
          className="absolute left-[11px] top-10 bottom-0 w-px bg-border"
          style={{ height: "calc(100% - 1.5rem)" }}
        />
      )}

      <motion.div
        className="relative pl-12 pb-12 last:pb-0"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      >
        {/* Dot */}
        <div className="absolute left-0 top-1.5 w-[6px] h-[6px] rounded-full bg-brand" />

        {/* Date */}
        <span className="text-xs font-mono text-brand-light mb-1.5 block">
          {date}
        </span>

        {/* Highlight badge */}
        <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-muted text-brand-light mb-2">
          {highlight}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold text-text-primary mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
