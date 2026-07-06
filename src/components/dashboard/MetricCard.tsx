"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MetricEvidence {
  label: string;
  href: string;
}

interface MetricCardProps {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  description: string;
  evidence: readonly MetricEvidence[];
  lastUpdated: string;
  clickable: boolean;
  index: number;
}

/**
 * A single metric card.
 * - Scroll-triggered count-up animation
 * - Hover: expands description
 * - Click: expands evidence trail (if clickable)
 */
export function MetricCard({
  label,
  value,
  suffix,
  icon,
  description,
  evidence,
  lastUpdated,
  clickable,
  index,
}: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [expanded, setExpanded] = useState(false);

  const handleClick = useCallback(() => {
    if (clickable && evidence.length > 0) {
      setExpanded((v) => !v);
    }
  }, [clickable, evidence.length]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-lg border border-border bg-bg-secondary p-6 md:p-8",
        "transition-colors duration-300 ease-out",
        clickable && "cursor-pointer hover:bg-bg-hover hover:border-border-hover",
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={clickable ? { y: -2, scale: 1.01 } : undefined}
      onClick={handleClick}
    >
      {/* Icon */}
      <span className="text-lg mb-3 block">{icon}</span>

      {/* Number with count-up */}
      <CountUp
        target={value}
        suffix={suffix}
        animate={inView}
        delay={0.3 + index * 0.1}
      />

      {/* Label */}
      <p className="text-sm text-text-secondary mt-1 mb-2">{label}</p>

      {/* Hover description — always visible, but fades in brighter on hover */}
      <p className="text-xs text-text-tertiary leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
        {description}
      </p>

      {/* Last updated */}
      <p className="text-[10px] text-text-tertiary/60 mt-3">
        最近更新 {lastUpdated}
      </p>

      {/* Click indicator */}
      {clickable && evidence.length > 0 && (
        <span
          className={cn(
            "absolute top-4 right-4 text-xs text-text-tertiary transition-all duration-300",
            expanded && "rotate-90",
          )}
        >
          →
        </span>
      )}

      {/* Evidence trail — expands on click */}
      <AnimatePresence>
        {expanded && evidence.length > 0 && (
          <motion.div
            className="mt-4 pt-4 border-t border-border overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <p className="text-[10px] uppercase tracking-wider text-text-tertiary mb-2">
              证据链
            </p>
            <ul className="space-y-1.5">
              {evidence.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-xs text-brand-light hover:text-brand-light/80 transition-colors flex items-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-text-tertiary">└</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Animated number counter.
 * Springs from 0 to target when `animate` becomes true.
 */
function CountUp({
  target,
  suffix,
  animate,
  delay,
}: {
  target: number;
  suffix: string;
  animate: boolean;
  delay: number;
}) {
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  if (animate && !hasAnimated.current) {
    hasAnimated.current = true;
    // Use requestAnimationFrame chain to animate
    const el = countRef.current;
    if (!el) return null;

    const duration = 800;
    const startTime = performance.now() + delay * 1000;

    const tick = (now: number) => {
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = String(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = String(target) + suffix;
      }
    };
    requestAnimationFrame(tick);
  }

  return (
    <span className="text-3xl md:text-4xl font-semibold text-text-primary font-mono tabular-nums">
      <span ref={countRef}>{animate ? "0" : String(target) + suffix}</span>
    </span>
  );
}
