import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, getAllProjectSlugs } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { formatDateRange, getPath } from "@/lib/utils";
import { ProjectDetailNav } from "./ProjectDetailNav";
import { ProjectCrossLinks } from "./ProjectCrossLinks";
import { ProjectResources } from "./ProjectResources";

/* ── Static generation ── */

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Metadata {
  const { slug } = params as unknown as { slug: string };
  const project = getProject(slug);
  if (!project) return { title: "项目未找到" };
  return {
    title: `${project.name} · 项目详情`,
    description: project.tagline,
  };
}

/* ── Page ── */

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      {/* Top nav */}
      <ProjectDetailNav />

      {/* Hero banner */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            {/* Status + Number */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  project.status === "completed"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.status === "completed"
                      ? "bg-emerald-400"
                      : "bg-amber-400 animate-pulse"
                  }`}
                />
                {project.statusLabel}
              </span>
              <span className="text-xs font-mono text-text-tertiary">
                PROJECT #{String(project.number).padStart(2, "0")}
              </span>
            </div>

            {/* Name + Tagline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mb-4">
              {project.name}
            </h1>
            <p className="text-lg text-text-secondary mb-6">{project.tagline}</p>

            {/* Quick info */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-tertiary">
              <span>角色：{project.role}</span>
              <span>时间：{formatDateRange(project.period.start, project.period.end)}</span>
              <span>工具：{project.tools.join(" · ")}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* ── Product Showcase Banner (说明书直达) ── */}
      {project.resources && project.resources.length > 0 && (
        <section className="py-10 md:py-12">
          <Container>
            <div className="max-w-3xl">
              <div className="rounded-lg border border-border-active bg-brand-muted/5 p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="shrink-0 text-2xl">📦</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary mb-1">
                    产品交付物
                  </p>
                  <p className="text-xs text-text-tertiary">
                    不只是案例描述——这里有我实际产出的产品说明书和可交付物。HR 可直接查看。
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  {project.resources.map((res) => {
                    const isDisabled = res.type === "download" && res.href === "#";
                    if (isDisabled) return null; // 跳过未就绪的下载链接
                    return (
                      <a
                        key={res.label}
                        href={getPath(res.href)}
                        target={res.type === "manual" ? "_blank" : undefined}
                        rel={res.type === "manual" ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand text-white text-sm font-medium hover:brightness-110 transition-all"
                      >
                        {res.label} →
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── Module 1: Background ── */}
      <ModuleSection title="📋 背景 & 问题定义">
        <p className="text-text-secondary leading-relaxed mb-4">
          {project.background.context}
        </p>
        <div className="bg-bg-secondary border border-border rounded-lg p-5 mb-4">
          <p className="text-sm font-medium text-text-primary mb-1">用户痛点</p>
          <p className="text-sm text-text-secondary">{project.background.userProblem}</p>
        </div>
        <p className="text-sm text-text-tertiary">
          <span className="font-medium text-text-secondary">为什么现有方案不行？</span>{" "}
          {project.background.whyExistingSolutionsFail}
        </p>
      </ModuleSection>

      {/* ── Module 2: Opportunity ── */}
      <ModuleSection title="💡 Opportunity · 为什么值得做？">
        <div className="space-y-4">
          <InfoBlock label="为什么值得投入？" text={project.opportunity.whyWorthDoing} />
          <InfoBlock label="为什么是现在？" text={project.opportunity.whyNow} />
          <InfoBlock label="我的判断" text={project.opportunity.myJudgment} />
        </div>
      </ModuleSection>

      {/* ── Module 3: Thinking Process ── */}
      <ModuleSection title="🧠 思考过程 & 决策">
        <p className="text-sm text-text-secondary mb-4">
          面对这个问题，我考虑了以下方向：
        </p>
        <ul className="space-y-2 mb-6">
          {project.thinking.directions.map((d, i) => (
            <li
              key={i}
              className={`text-sm px-4 py-3 rounded-md border ${
                i === 0
                  ? "border-border bg-bg-secondary text-text-secondary"
                  : "border-border-active bg-brand-muted/30 text-text-primary"
              }`}
            >
              {d}
              {i === 1 && (
                <span className="ml-2 text-xs text-brand-light font-medium">
                  ← 我的选择
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="space-y-3">
          {project.thinking.keyDecisions.map((kd, i) => (
            <div key={i} className="border border-border rounded-lg p-4 bg-bg-secondary">
              <p className="text-sm font-medium text-text-primary mb-1">{kd.point}</p>
              <p className="text-xs text-text-tertiary">{kd.detail}</p>
            </div>
          ))}
        </div>
      </ModuleSection>

      {/* ── Module 4: Execution ── */}
      <ModuleSection title="🔨 执行方案">
        <InfoBlock label="MVP 是什么？" text={project.execution.mvp} />
        <div className="mt-4">
          <InfoBlock label="AI 如何加速？" text={project.execution.aiAcceleration} />
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-text-secondary mb-2">关键节点</p>
          <ul className="space-y-1.5">
            {project.execution.milestones.map((m, i) => (
              <li key={i} className="text-sm text-text-tertiary flex items-start gap-2">
                <span className="text-brand-light shrink-0 mt-0.5">•</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      </ModuleSection>

      {/* ── Module 5: Trade-off ── */}
      <ModuleSection title="⚖️ Trade-off · 关键取舍">
        <p className="text-sm text-text-secondary mb-6">
          做产品每天都在做取舍。以下是我在这个项目中面对的关键决策：
        </p>
        <div className="space-y-4">
          {project.tradeoffs.map((t, i) => (
            <div key={i} className="border border-border rounded-lg p-5 bg-bg-secondary">
              <p className="text-sm font-semibold text-text-primary mb-3">{t.decision}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div
                  className={`rounded-md p-3 text-xs border ${
                    t.chosen === "A"
                      ? "border-border-active bg-brand-muted/30"
                      : "border-border bg-bg-tertiary/30 opacity-60"
                  }`}
                >
                  <p className="font-medium text-text-secondary mb-0.5">
                    方案 A{t.chosen === "A" ? " ← 我的选择" : ""}
                  </p>
                  <p className="text-text-tertiary">{t.optionA}</p>
                </div>
                <div
                  className={`rounded-md p-3 text-xs border ${
                    t.chosen === "B"
                      ? "border-border-active bg-brand-muted/30"
                      : "border-border bg-bg-tertiary/30 opacity-60"
                  }`}
                >
                  <p className="font-medium text-text-secondary mb-0.5">
                    方案 B{t.chosen === "B" ? " ← 我的选择" : ""}
                  </p>
                  <p className="text-text-tertiary">{t.optionB}</p>
                </div>
              </div>
              <p className="text-xs text-text-tertiary">
                <span className="font-medium text-text-secondary">选择理由：</span>
                {t.reason}
              </p>
            </div>
          ))}
        </div>
      </ModuleSection>

      {/* ── Module 6: AI Practice ── */}
      <ModuleSection title="🤖 AI 实践 & 工具链">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {project.aiPractice.toolsUsed.map((tool) => (
            <div key={tool.name} className="border border-border rounded-md p-3 bg-bg-secondary">
              <p className="text-sm font-medium text-text-primary">{tool.name}</p>
              <p className="text-xs text-text-tertiary mt-0.5">{tool.purpose}</p>
            </div>
          ))}
        </div>
        <div className="border border-border rounded-lg p-5 bg-bg-secondary space-y-3">
          <div>
            <p className="text-xs font-medium text-brand-light mb-1">🤖 AI 做了什么</p>
            <p className="text-sm text-text-secondary">{project.aiPractice.aiContribution}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-primary mb-1">🧑 我做了什么</p>
            <p className="text-sm text-text-secondary">{project.aiPractice.myContribution}</p>
          </div>
        </div>
      </ModuleSection>

      {/* ── Module 7: Impact ── */}
      <ModuleSection title="📊 Impact · 产生了什么影响？">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">量化结果</p>
            <ul className="space-y-1.5">
              {project.impact.quantitative.map((q, i) => (
                <li key={i} className="text-sm text-text-tertiary flex items-start gap-2">
                  <span className="text-brand-light shrink-0">•</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
          {project.impact.userQuote && (
            <div className="border-l-2 border-brand pl-4 py-1">
              <p className="text-sm text-text-secondary italic">
                &ldquo;{project.impact.userQuote.text}&rdquo;
              </p>
              <p className="text-xs text-text-tertiary mt-1">
                —— {project.impact.userQuote.author}，{project.impact.userQuote.date}
              </p>
            </div>
          )}
          <InfoBlock label="长期影响" text={project.impact.longTerm} />
        </div>
      </ModuleSection>

      {/* ── Module 8: Reflection ── */}
      <ModuleSection title="💭 复盘与反思">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-border rounded-lg p-5 bg-bg-secondary">
            <p className="text-sm font-medium text-emerald-400 mb-2">✅ 做对了什么</p>
            <ul className="space-y-1.5">
              {project.reflection.didWell.map((item, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-emerald-400/60 shrink-0">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-border rounded-lg p-5 bg-bg-secondary">
            <p className="text-sm font-medium text-amber-400 mb-2">⚠️ 可以做得更好</p>
            <ul className="space-y-1.5">
              {project.reflection.couldImprove.map((item, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-amber-400/60 shrink-0">∆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-5 border border-border rounded-lg p-5 bg-bg-secondary">
          <p className="text-sm font-medium text-text-primary mb-1">最大的收获</p>
          <p className="text-sm text-text-secondary">{project.reflection.biggestLesson}</p>
        </div>
      </ModuleSection>

      {/* ── Module 9: Next Iteration ── */}
      <ModuleSection title="🔮 如果重新做一次">
        <div className="space-y-4">
          <InfoBlock label="我会怎么改？" text={project.nextIteration.whatWouldChange} />
          <InfoBlock label="早期应该避免的坑" text={project.nextIteration.pitfallsToAvoid} />
          <InfoBlock label="下一步探索" text={project.nextIteration.nextExploration} />
        </div>
      </ModuleSection>

      {/* ── Resources (optional) ── */}
      {project.resources && <ProjectResources resources={project.resources} />}

      {/* ── Takeaway ── */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl border border-border-active rounded-lg p-6 bg-brand-muted/10">
            <p className="text-xs uppercase tracking-widest text-brand-light mb-2">
              Takeaway
            </p>
            <p className="text-lg text-text-primary font-medium">
              &ldquo;{project.takeaway}&rdquo;
            </p>
          </div>
        </Container>
      </section>

      {/* ── Cross-links ── */}
      <ProjectCrossLinks
        byCapability={project.relatedByCapability}
        byPractice={project.relatedByPractice}
      />
    </>
  );
}

/* ── Helpers ── */

function ModuleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-6 pb-3 border-b border-border">
            {title}
          </h2>
          {children}
        </div>
      </Container>
    </section>
  );
}

function InfoBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-text-secondary mb-1">{label}</p>
      <p className="text-sm text-text-tertiary leading-relaxed">{text}</p>
    </div>
  );
}
