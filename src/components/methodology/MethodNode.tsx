"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface EvidenceAnchor {
  label: string;
  slug: string;
}

interface MethodNodeProps {
  icon: string;
  title: string;
  summary: string;
  method: readonly string[];
  keyInsight: string;
  evidenceAnchors: readonly EvidenceAnchor[];
  index: number;
  isLast: boolean;
}

/**
 * A single decision node in the methodology walkthrough.
 *
 * Collapsed: icon + title + summary + connector line
 * Expanded: full method steps + key insight + evidence anchors
 */
export function MethodNode({
  icon,
  title,
  summary,
  method,
  keyInsight,
  evidenceAnchors,
  index,
  isLast,
}: MethodNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [expanded, setExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setExpanded((v) => !v);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Connector line to next node */}
      {!isLast && (
        <div
          className="absolute left-[19px] top-16 bottom-0 w-px bg-border"
          style={{ height: "calc(100% - 2rem)" }}
        />
      )}

      <motion.div
        className={cn(
          "relative pl-14 pb-12 last:pb-0 cursor-pointer group",
        )}
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        onClick={handleToggle}
      >
        {/* Node dot */}
        <motion.div
          className={cn(
            "absolute left-0 top-1 w-[10px] h-[10px] rounded-full border-2 border-brand bg-bg-primary z-10",
            "transition-all duration-300",
            expanded && "bg-brand scale-125",
          )}
          animate={expanded ? { scale: 1.25 } : { scale: 1 }}
        />

        {/* Header */}
        <div className="flex items-start gap-3 mb-2">
          <span className="text-xl shrink-0">{icon}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-light transition-colors">
                {title}
              </h3>
              <motion.span
                className="text-text-tertiary text-sm shrink-0"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                ▾
              </motion.span>
            </div>
            <p className="text-sm text-text-secondary mt-1">{summary}</p>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="mt-4 ml-0 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Method steps */}
              <div className="bg-bg-secondary border border-border rounded-lg p-5 mb-4">
                <p className="text-xs font-medium text-text-secondary mb-3">
                  我的方法
                </p>
                <ol className="space-y-2">
                  {method.map((step, i) => (
                    <li
                      key={i}
                      className="text-sm text-text-secondary flex items-start gap-2"
                    >
                      <span className="text-brand-light font-mono text-xs shrink-0 mt-0.5">
                        {i + 1}.
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Key insight */}
              <div className="border-l-2 border-brand pl-4 py-1 mb-4">
                <p className="text-xs font-medium text-brand-light mb-1">
                  💡 核心洞察
                </p>
                <p className="text-sm text-text-secondary">{keyInsight}</p>
              </div>

              {/* Evidence anchors */}
              <div>
                <p className="text-xs font-medium text-text-tertiary mb-2">
                  📎 在项目中看到实际应用：
                </p>
                <div className="flex flex-wrap gap-2">
                  {evidenceAnchors.map((anchor) => (
                    <a
                      key={anchor.slug}
                      href={`/project/${anchor.slug}`}
                      className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-border bg-bg-tertiary text-text-secondary hover:text-brand-light hover:border-border-hover transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {anchor.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
