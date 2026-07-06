"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";

interface CrossLink {
  label: string;
  slug: string;
}

interface ProjectCrossLinksProps {
  byCapability: CrossLink[];
  byPractice: CrossLink[];
}

/**
 * Bottom-of-page cross-linking between projects.
 * Two dimensions: by capability + by practice.
 */
export function ProjectCrossLinks({
  byCapability,
  byPractice,
}: ProjectCrossLinksProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.section
      ref={ref}
      className="py-16 md:py-20 border-t border-border"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Container>
        <p className="text-xs uppercase tracking-widest text-text-tertiary mb-6">
          继续探索 Product Lab
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* By capability */}
          {byCapability.length > 0 && (
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">
                按能力关联
              </p>
              <ul className="space-y-2">
                {byCapability.map((link) => (
                  <li key={link.slug}>
                    <a
                      href={`/project/${link.slug}`}
                      className="text-sm text-brand-light hover:text-brand-light/80 transition-colors flex items-center gap-2"
                    >
                      <span className="text-text-tertiary text-xs">→</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* By practice */}
          {byPractice.length > 0 && (
            <div>
              <p className="text-sm font-medium text-text-secondary mb-3">
                按实践关联
              </p>
              <ul className="space-y-2">
                {byPractice.map((link) => (
                  <li key={link.slug}>
                    <a
                      href={`/project/${link.slug}`}
                      className="text-sm text-brand-light hover:text-brand-light/80 transition-colors flex items-center gap-2"
                    >
                      <span className="text-text-tertiary text-xs">→</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Back to lab */}
        <div className="mt-8 pt-6 border-t border-border">
          <a
            href="/#lab"
            className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
          >
            &larr; 返回 Product Lab
          </a>
        </div>
      </Container>
    </motion.section>
  );
}
