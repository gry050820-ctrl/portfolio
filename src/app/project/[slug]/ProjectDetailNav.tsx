"use client";

import { motion } from "framer-motion";
import { getPath } from "@/lib/utils";

/**
 * Fixed top bar for project detail pages.
 * Shows back-to-lab link and the project context.
 */
export function ProjectDetailNav() {
  return (
    <motion.div
      className="fixed right-4 top-4 z-[60] md:right-6"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <a
        href={getPath("/#lab")}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-primary/85 px-4 py-2 text-sm text-text-secondary shadow-card backdrop-blur-xl transition-colors hover:border-border-hover hover:bg-bg-hover hover:text-text-primary"
      >
        <span className="text-brand-light">&larr;</span>
        返回 Product Lab
      </a>
    </motion.div>
  );
}
