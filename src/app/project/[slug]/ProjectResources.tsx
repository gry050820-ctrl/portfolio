"use client";

interface Resource {
  label: string;
  href: string;
  type: "manual" | "download" | "link";
}

interface ProjectResourcesProps {
  resources: readonly Resource[];
}

/**
 * Downloadable resources section for project detail pages.
 * Client component — needed for onClick handlers on disabled buttons.
 */
export function ProjectResources({ resources }: ProjectResourcesProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1100px] px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-6 pb-3 border-b border-border">
            📦 相关资源
          </h2>
          <div className="flex flex-wrap gap-3">
            {resources.map((res) => {
              const isDisabled = res.type === "download" && res.href === "#";

              return (
                <a
                  key={res.label}
                  href={isDisabled ? undefined : res.href}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-md border text-sm font-medium transition-all ${
                    isDisabled
                      ? "border-dashed border-border/50 text-text-tertiary cursor-not-allowed"
                      : "border-border bg-bg-secondary text-text-secondary hover:text-text-primary hover:border-border-hover hover:bg-bg-hover"
                  }`}
                  onClick={isDisabled ? (e) => e.preventDefault() : undefined}
                  target={res.type === "manual" ? "_blank" : undefined}
                  rel={res.type === "manual" ? "noopener noreferrer" : undefined}
                >
                  {res.label}
                  {isDisabled && (
                    <span className="text-xs">(即将上线)</span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
