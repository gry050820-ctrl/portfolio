"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProjectCard, type ProjectData } from "./ProjectCard";

interface ExplorationGroupProps {
  question: string;
  projects: readonly ProjectData[];
  index: number;
}

/**
 * An exploration question + its sub-projects.
 *
 * "AI 如何提升个人学习效率？"
 *   ├── AI U 盘
 *   └── [未来探索]
 */
export function ExplorationGroup({
  question,
  projects,
  index,
}: ExplorationGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      className="mb-16 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      {/* Question */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-lg font-mono text-brand-light shrink-0">
          Q{index + 1}
        </span>
        <h3 className="text-lg md:text-xl font-medium text-text-primary">
          {question}
        </h3>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, pi) => (
          <ProjectCard
            key={project.slug + (project.number ?? pi)}
            project={project}
            index={pi}
          />
        ))}
      </div>
    </motion.div>
  );
}
