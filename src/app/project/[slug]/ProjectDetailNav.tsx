"use client";

import { motion } from "framer-motion";
import { getPath } from "@/lib/utils";

/**
 * Back link positioned beside the global brand mark.
 */
export function ProjectDetailNav() {
  return (
    <motion.div
      className="fixed left-[72px] top-2.5 z-[55] sm:left-20 md:top-3 lg:left-[max(7rem,calc((100vw-1100px)/2+90px))]"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <a
        href={getPath("/#lab")}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-primary/80 px-3 py-1.5 text-xs text-text-secondary shadow-card backdrop-blur-xl transition-colors hover:border-border-hover hover:bg-bg-hover hover:text-text-primary md:px-3.5 md:py-2 md:text-sm"
      >
        <span className="text-brand-light">&larr;</span>
        返回 Product Lab
      </a>
    </motion.div>
  );
}
