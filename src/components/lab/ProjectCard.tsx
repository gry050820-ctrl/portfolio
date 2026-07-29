"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, MousePointerClick } from "lucide-react";
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
  resources?: readonly { label: string; href: string; type: "manual" | "download" | "link" }[];
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
      <motion.article
        className={cn(
          "group relative block cursor-pointer overflow-hidden rounded-lg border border-border bg-bg-secondary p-6 md:p-8",
          "transition-all duration-300 ease-out",
          "hover:bg-bg-hover hover:border-border-active hover:-translate-y-1 hover:shadow-glow",
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: "easeOut" }}
      >
        <a
          href={getPath(`/project/${project.slug}`)}
          aria-label={`查看 ${project.name} 完整案例`}
          className="absolute inset-0 z-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        >
          <span className="sr-only">查看 {project.name} 完整案例</span>
        </a>

        <div className="relative z-10 pointer-events-none">
          {/* Status + Project number */}
          <div className="flex items-center justify-between mb-5">
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

          {/* Icon + Project name — prominent identity */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl shrink-0">{project.coverIcon}</span>
            <h3 className="text-xl md:text-2xl font-semibold text-text-primary group-hover:text-brand-light transition-colors leading-tight">
              {project.name}
              <span
                className="ml-2 text-text-tertiary opacity-60 group-hover:opacity-100 transition-opacity text-lg"
                aria-hidden="true"
              >
                →
              </span>
            </h3>
          </div>

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
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="project-card-cta relative inline-flex min-h-10 items-center gap-2 overflow-hidden rounded-md border border-brand/40 bg-brand-muted px-3 py-2 text-xs font-semibold text-white shadow-[0_0_18px_rgba(108,92,231,0.12)] transition-all duration-300 group-hover:border-brand-light group-hover:bg-brand/25 group-hover:shadow-[0_0_24px_rgba(108,92,231,0.28)]">
                <MousePointerClick
                  className="relative z-10 size-4 shrink-0 text-brand-light"
                  aria-hidden="true"
                />
                <span className="relative z-10">点击卡片 · 查看完整案例</span>
                <ArrowUpRight
                  className="project-card-cta-icon relative z-10 size-4 shrink-0 text-brand-light"
                  aria-hidden="true"
                />
              </span>
              <div className="relative z-20 flex flex-wrap gap-2 pointer-events-auto">
                {project.resources?.map((resource) => (
                  <a
                    key={resource.href}
                    href={getPath(resource.href)}
                    target={resource.type === "manual" ? "_blank" : undefined}
                    rel={resource.type === "manual" ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-white transition hover:brightness-110"
                  >
                    {resource.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
