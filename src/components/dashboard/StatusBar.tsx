"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatusBarProps {
  nowBuilding: string;
  lastUpdated: string;
  currentExploration: string;
}

/**
 * A single-row status indicator below the metric cards.
 * Shows current activity — signals "this is a living lab, not a static resume."
 */
export function StatusBar({
  nowBuilding,
  lastUpdated,
  currentExploration,
}: StatusBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      className="mt-8 rounded-lg border border-border bg-bg-secondary px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs md:text-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
    >
      {/* Now Building */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="text-text-tertiary shrink-0">Now Building:</span>
        <span className="text-text-primary truncate">{nowBuilding}</span>
      </div>

      {/* Divider */}
      <span className="hidden sm:block text-border" aria-hidden>
        |
      </span>

      {/* Last Updated */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-text-tertiary">📅</span>
        <span className="text-text-tertiary">Last Updated:</span>
        <span className="text-text-secondary">{lastUpdated}</span>
      </div>

      {/* Divider */}
      <span className="hidden sm:block text-border" aria-hidden>
        |
      </span>

      {/* Current Exploration */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-text-tertiary shrink-0">📍</span>
        <span className="text-text-secondary truncate">
          {currentExploration}
        </span>
      </div>
    </motion.div>
  );
}
