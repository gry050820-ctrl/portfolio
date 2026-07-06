"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Evidence {
  label: string;
  slug: string;
}

interface CapabilityLevel {
  level: number;
  label: string;
  description: string;
  evidence: Evidence | null;
}

interface CapabilityCardProps {
  icon: string;
  name: string;
  definition: string;
  currentLevel: number;
  maxLevel: number;
  growth: string;
  levels: readonly CapabilityLevel[];
  relatedProjects: readonly string[];
  index: number;
}

/**
 * Single capability card with expandable evidence chain.
 *
 * Default: icon + name + definition + depth bar + growth hint
 * Expanded: full evidence chain with project links
 */
export function CapabilityCard({
  icon,
  name,
  definition,
  currentLevel,
  maxLevel,
  growth,
  levels,
  index,
}: CapabilityCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [expanded, setExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setExpanded((v) => !v);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-bg-secondary p-5 md:p-6",
        "transition-all duration-300 ease-out cursor-pointer",
        "hover:bg-bg-hover hover:border-border-hover",
        expanded && "border-border-active bg-bg-hover",
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: "easeOut" }}
      whileHover={{ y: expanded ? 0 : -2 }}
      onClick={handleToggle}
    >
      {/* ── Header: icon + name + expand indicator ── */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <div>
            <h3 className="text-base font-semibold text-text-primary">{name}</h3>
            <p className="text-xs text-text-tertiary mt-0.5">{definition}</p>
          </div>
        </div>
        <motion.span
          className="text-text-tertiary text-sm shrink-0 mt-1"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          ▾
        </motion.span>
      </div>

      {/* ── Depth bar ── */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-text-tertiary mb-1.5">
          <span>深度</span>
          <span>
            Level {currentLevel}/{maxLevel}
          </span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: maxLevel }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full",
                i < currentLevel
                  ? "bg-brand"
                  : "bg-bg-tertiary",
              )}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: 0.3 + index * 0.08 + i * 0.06,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "left" }}
            />
          ))}
        </div>
      </div>

      {/* ── Growth hint ── */}
      <p className="text-[11px] text-text-tertiary/70">{growth}</p>

      {/* ── Expanded evidence chain ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="mt-4 pt-4 border-t border-border overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p className="text-[10px] uppercase tracking-wider text-text-tertiary mb-3">
              能力证据链
            </p>
            <div className="space-y-2">
              {levels.map((lvl) => (
                <div
                  key={lvl.level}
                  className={cn(
                    "flex items-start gap-3 rounded-md p-2.5 transition-colors",
                    lvl.level <= currentLevel
                      ? "bg-bg-tertiary/50"
                      : "opacity-40",
                  )}
                >
                  {/* Level indicator */}
                  <span
                    className={cn(
                      "shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-semibold",
                      lvl.level <= currentLevel
                        ? "bg-brand text-white"
                        : "bg-bg-tertiary text-text-tertiary",
                    )}
                  >
                    {lvl.level}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-xs font-medium",
                        lvl.level <= currentLevel
                          ? "text-text-primary"
                          : "text-text-tertiary",
                      )}
                    >
                      {lvl.label} — {lvl.description}
                    </p>
                    {lvl.evidence && lvl.level <= currentLevel && (
                      <a
                        href={`/project/${lvl.evidence.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] text-brand-light hover:text-brand-light/80 mt-1 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>└</span>
                        {lvl.evidence.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Current level note */}
            <p className="text-[11px] text-text-tertiary mt-3 text-center">
              当前到达 Level {currentLevel} ·{" "}
              {currentLevel < maxLevel
                ? `距下一级还有 ${
                    maxLevel - currentLevel
                  } 级——正在成长中`
                : "已达到最高级——持续精进中"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
