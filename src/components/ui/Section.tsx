"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Disable scroll-triggered fade-in animation */
  noAnimation?: boolean;
}

export function Section({
  id,
  children,
  className,
  noAnimation = false,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn("py-32 md:py-40", className)}
      initial={noAnimation ? undefined : { opacity: 0, y: 24 }}
      animate={noAnimation ? undefined : { opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
