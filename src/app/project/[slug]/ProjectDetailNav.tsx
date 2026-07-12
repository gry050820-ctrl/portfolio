"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { getPath } from "@/lib/utils";

/**
 * Inline back link for project detail pages.
 */
export function ProjectDetailNav() {
  return (
    <motion.section
      className="pt-20 md:pt-24"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Container>
        <a
          href={getPath("/#lab")}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm text-text-secondary transition-colors hover:border-border-hover hover:bg-bg-hover hover:text-text-primary"
        >
          <span className="text-brand-light">&larr;</span>
          返回 Product Lab
        </a>
      </Container>
    </motion.section>
  );
}
