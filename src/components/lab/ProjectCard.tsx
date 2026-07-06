"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn, formatDateRange, getPath } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export interface ProjectData {
  slug: string;
  number: number | undefined;
  name: string;
  conflict: string;
  motivation: string;
  status: "completed" | "iterating" | "planned";
  statusLabel: string;
  role: string;
  tags: readonly string[];
  result: string;
  period: { start: string; end?: string };
  coverIcon: string;
  placeholder?: boolean;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const statusColors: Record<string, string> = {
  completed: "bg-emerald-500/20 text-emerald-400",
  iterating: "bg-amber-500/20 text-amber-400",
  planned: "bg-text-tertiary/20 text-text-tertiary",
};

/**
 * Problem-First project card.
 *
 * Top: Conflict ("很多学生不会真正用 AI 学习")
 * Middle: Motivation ("我做了一个工具来解决这个问题")
 * Bottom: Project name + status + role + tags + result
 *
 * If `placeholder` is true, renders as an empty slot ("Coming Soon").
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  // Placeholder card — empty exploration slot
  if (project.placeholder) {
    return (
      <motion.div
        ref={ref}
        className="rounded-lg border border-dashed border-border/50 bg-transparent p-6 md:p-8 flex flex-col items-center justify-center text-center min-h-[200px]"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: "easeOut" }}
      >
        <span className="text-2xl mb-3 opacity-40">{project.coverIcon}</span>
        <p className="text-sm text-text-tertiary">{project.name}</p>
        <Badge variant="outline" size="sm" className="mt-2">
          {project.statusLabel}
        </Badge>
      </motion.div>
    );
  }

  return (
    <div ref={ref}>
      <motion.a
        href={getPath(`/project/${project.slug}`)}
        className={cn(
          "group block rounded-lg border border-border bg-bg-secondary p-6 md:p-8",
          "transition-all duration-300 ease-out",
          "hover:bg-bg-hover hover:border-border-hover hover:-translate-y-1",
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: "easeOut" }}
      >
        {/* Status + Project number */}
        <div className="flex items-center justify-between mb-4">
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium",
            statusColors[project.status],
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              project.status === "completed" && "bg-emerald-400",
              project.status === "iterating" && "bg-amber-400 animate-pulse",
              project.status === "planned" && "bg-text-tertiary",
            )}
          />
          {project.statusLabel}
        </span>
        {project.number && (
          <span className="text-[11px] font-mono text-text-tertiary">
            #{String(project.number).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Icon */}
      <span className="text-2xl mb-3 block">{project.coverIcon}</span>

      {/* Conflict — the hook */}
      <p className="text-sm text-text-secondary leading-relaxed mb-2">
        <span className="text-text-primary font-medium">问题：</span>
        {project.conflict}
      </p>

      {/* Motivation */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        <span className="text-text-primary font-medium">我的回应：</span>
        {project.motivation}
      </p>

      {/* Project name */}
      <h3 className="text-base font-semibold text-text-primary mb-2 group-hover:text-brand-light transition-colors">
        {project.name}
        <span className="ml-2 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
      </h3>

      {/* Role */}
      <p className="text-xs text-text-tertiary mb-3">{project.role}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="brand" size="sm">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Period + Result */}
      <div className="pt-3 border-t border-border">
        <p className="text-xs text-text-tertiary mb-1">
          {formatDateRange(project.period.start, project.period.end)}
        </p>
        {project.result && (
          <p className="text-xs text-text-secondary font-medium">
            {project.result}
          </p>
        )}
      </div>
      </motion.a>
    </div>
  );
}
