"use client";

import { useCallback, useMemo, useReducer, useRef } from "react";
import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Database,
  Expand,
  FileClock,
  FileText,
  FolderInput,
  Network,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import { demoExamples, demoStages } from "@/data/context-os-demo";
import { cn, getPath } from "@/lib/utils";

type DemoState = {
  exampleIndex: number;
  stage: number;
  selectedNode: string | null;
};

type DemoAction =
  | { type: "select-example"; index: number }
  | { type: "next" }
  | { type: "previous" }
  | { type: "set-stage"; stage: number }
  | { type: "reset" }
  | { type: "select-node"; id: string | null };

type ContextNodeData = {
  label: string;
  meta: string;
  tone: "source" | "pending" | "knowledge" | "rule" | "output";
  icon: "conversation" | "inbox" | "raw" | "wiki" | "schema" | "query" | "digest";
  active: boolean;
};

const iconMap = {
  conversation: FileText,
  inbox: FolderInput,
  raw: Database,
  wiki: BookOpen,
  schema: ShieldCheck,
  query: Search,
  digest: Archive,
};

const toneClasses = {
  source: "border-sky-400/40 bg-sky-400/10 text-sky-100",
  pending: "border-amber-400/45 bg-amber-400/10 text-amber-100",
  knowledge: "border-emerald-400/45 bg-emerald-400/10 text-emerald-100",
  rule: "border-zinc-300/30 bg-white/[0.06] text-zinc-100",
  output: "border-cyan-300/45 bg-cyan-300/10 text-cyan-50",
};

function reducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "select-example":
      return { exampleIndex: action.index, stage: 0, selectedNode: "conversation" };
    case "next":
      return { ...state, stage: Math.min(state.stage + 1, demoStages.length - 1), selectedNode: null };
    case "previous":
      return { ...state, stage: Math.max(state.stage - 1, 0), selectedNode: null };
    case "set-stage":
      return { ...state, stage: Math.max(0, Math.min(action.stage, demoStages.length - 1)), selectedNode: null };
    case "reset":
      return { ...state, stage: 0, selectedNode: "conversation" };
    case "select-node":
      return { ...state, selectedNode: action.id };
  }
}

function ContextNode({ data, selected }: NodeProps<Node<ContextNodeData>>) {
  const Icon = iconMap[data.icon];
  return (
    <div
      className={cn(
        "w-[170px] rounded-md border px-3.5 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.24)] transition-all duration-500",
        toneClasses[data.tone],
        data.active ? "opacity-100 translate-y-0" : "opacity-20 translate-y-1 grayscale",
        selected && "ring-2 ring-white/70 ring-offset-2 ring-offset-[#090d10]",
      )}
    >
      <Handle type="target" position={Position.Left} className="!size-1.5 !border-0 !bg-white/50" />
      <div className="flex items-center gap-2">
        <Icon className="size-4 shrink-0" aria-hidden="true" />
        <span className="text-[11px] font-semibold leading-tight">{data.label}</span>
      </div>
      <p className="mt-2 text-[9px] leading-relaxed text-current opacity-65">{data.meta}</p>
      <Handle type="source" position={Position.Right} className="!size-1.5 !border-0 !bg-white/50" />
    </div>
  );
}

const nodeTypes = { context: ContextNode };

function buildNodes(stage: number, destination: string): Node<ContextNodeData>[] {
  return [
    {
      id: "conversation",
      type: "context",
      position: { x: 10, y: 150 },
      data: { label: "Conversation", meta: "原始对话与明确来源", tone: "source", icon: "conversation", active: true },
    },
    {
      id: "inbox",
      type: "context",
      position: { x: 230, y: 150 },
      data: { label: "00_Inbox", meta: "先暂存，不直接升级为事实", tone: "pending", icon: "inbox", active: stage >= 1 },
    },
    {
      id: "raw",
      type: "context",
      position: { x: 455, y: 25 },
      data: { label: "Raw Source", meta: "保留证据与原始上下文", tone: "source", icon: "raw", active: stage >= 2 },
    },
    {
      id: "wiki",
      type: "context",
      position: { x: 455, y: 150 },
      data: { label: destination, meta: "去重后合并到长期知识", tone: "knowledge", icon: "wiki", active: stage >= 2 },
    },
    {
      id: "schema",
      type: "context",
      position: { x: 455, y: 275 },
      data: { label: "Schema", meta: "约束证据、置信度与权限", tone: "rule", icon: "schema", active: stage >= 2 },
    },
    {
      id: "query",
      type: "context",
      position: { x: 690, y: 100 },
      data: { label: "Query-first", meta: "新任务先召回相关历史决策", tone: "output", icon: "query", active: stage >= 3 },
    },
    {
      id: "digest",
      type: "context",
      position: { x: 690, y: 225 },
      data: { label: "Project Digest", meta: "让项目经验回流到下一次任务", tone: "knowledge", icon: "digest", active: stage >= 4 },
    },
  ];
}

function buildEdges(stage: number): Edge[] {
  const edge = (id: string, source: string, target: string, activeAt: number): Edge => ({
    id,
    source,
    target,
    animated: stage >= activeAt,
    style: { stroke: stage >= activeAt ? "rgba(103, 232, 249, .72)" : "rgba(255,255,255,.08)", strokeWidth: 1.4 },
  });
  return [
    edge("conversation-inbox", "conversation", "inbox", 1),
    edge("inbox-raw", "inbox", "raw", 2),
    edge("inbox-wiki", "inbox", "wiki", 2),
    edge("schema-wiki", "schema", "wiki", 2),
    edge("wiki-query", "wiki", "query", 3),
    edge("raw-query", "raw", "query", 3),
    edge("query-digest", "query", "digest", 4),
  ];
}

const nodeDescriptions: Record<string, { title: string; body: string }> = {
  conversation: { title: "原始对话", body: "所有长期结论都保留对话来源，不把摘要冒充原文。" },
  inbox: { title: "安全暂存区", body: "新内容先进入 Inbox，等待去重、分类和置信度判断。" },
  raw: { title: "Raw Source", body: "原始材料被单独保存，用于追溯结论来自哪里。" },
  wiki: { title: "长期知识", body: "只有经整理、有持续价值的内容才进入正式知识层。" },
  schema: { title: "系统规则", body: "Schema 决定 AI 可以写什么、何时必须人工复核。" },
  query: { title: "Query-first", body: "涉及用户或旧项目时，AI 先检索再回答，减少重复解释。" },
  digest: { title: "Project Digest", body: "项目结束后，决策、踩坑和方法被提炼为下一次任务的起点。" },
};

export function ContextOSDemo({ fullScreen = false }: { fullScreen?: boolean }) {
  const [state, dispatch] = useReducer(reducer, { exampleIndex: 0, stage: 0, selectedNode: "conversation" });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], ["-5%", "8%"]);
  const example = demoExamples[state.exampleIndex];
  const nodes = useMemo(() => buildNodes(state.stage, example.capture.destination), [state.stage, example.capture.destination]);
  const edges = useMemo(() => buildEdges(state.stage), [state.stage]);
  const selectedDescription = state.selectedNode ? nodeDescriptions[state.selectedNode] : null;

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    dispatch({ type: "select-node", id: node.id });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <section
      ref={sectionRef}
      className={cn(
        "relative isolate scroll-mt-24 overflow-hidden bg-[#090d10] text-zinc-100",
        fullScreen ? "min-h-[calc(100vh-64px)]" : "rounded-lg border border-white/10",
      )}
      aria-label="Personal Context OS 交互演示"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-[-12%] -z-10 opacity-45 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:38px_38px]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,.12),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(52,211,153,.10),transparent_30%)]" />

      <div className={cn("mx-auto w-full", fullScreen ? "max-w-[1500px] px-4 py-8 sm:px-6 lg:px-10" : "p-4 sm:p-6")}>
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-200/80">
              <Network className="size-3.5" aria-hidden="true" />
              Interactive system demo
            </div>
            <h2 className={cn("font-semibold tracking-normal text-white", fullScreen ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl")}>
              一段对话，如何成为下一次任务的上下文
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-zinc-400 sm:text-sm">
              使用脱敏演示数据。点击推进流程，也可以拖动、缩放并检查每一个知识节点。
            </p>
          </div>
          {!fullScreen && (
            <a
              href={getPath("/demos/personal-context-os")}
              className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-md border border-cyan-300/25 bg-cyan-300/10 px-4 text-xs font-medium text-cyan-100 transition-colors hover:bg-cyan-300/15 lg:self-auto"
            >
              <Expand className="size-3.5" aria-hidden="true" />
              进入全屏体验
            </a>
          )}
        </div>

        <div className="mb-5 grid grid-cols-5 gap-1" aria-label="演示进度">
          {demoStages.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => index <= state.stage && dispatch({ type: "set-stage", stage: index })}
              className={cn(
                "min-w-0 border-t px-1 pt-2 text-left transition-colors",
                index <= state.stage ? "border-cyan-300 text-cyan-100" : "border-white/10 text-zinc-600",
              )}
              aria-current={index === state.stage ? "step" : undefined}
            >
              <span className="block text-[9px] font-mono">0{index + 1}</span>
              <span className="block truncate text-[10px] sm:hidden">{item.short}</span>
              <span className="hidden truncate text-[10px] sm:block">{item.label}</span>
            </button>
          ))}
        </div>

        <div className={cn("grid gap-4", fullScreen ? "lg:grid-cols-[minmax(300px,0.72fr)_minmax(620px,1.55fr)]" : "xl:grid-cols-[minmax(280px,0.78fr)_minmax(560px,1.5fr)]")}>
          <div className="flex flex-col gap-3">
            <div className="rounded-md border border-white/10 bg-black/20 p-3.5">
              <div className="mb-3 flex flex-wrap gap-2" aria-label="选择演示场景">
                {demoExamples.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => dispatch({ type: "select-example", index })}
                    className={cn(
                      "rounded-sm border px-2.5 py-1.5 text-[10px] transition-colors",
                      state.exampleIndex === index
                        ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
                        : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm bg-sky-400/10 text-sky-200">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                </div>
                <p className="text-xs leading-relaxed text-zinc-300">{example.conversation}</p>
              </div>
            </div>

            <motion.div
              key={`${example.id}-${state.stage}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="min-h-[170px] rounded-md border border-white/10 bg-white/[0.035] p-4"
              aria-live="polite"
            >
              {state.stage === 0 && <StageIntro icon={FileClock} title="等待捕获" body="结束对话后，系统只筛选具有长期价值的事实、决策和方法。" />}
              {state.stage === 1 && (
                <div>
                  <StageIntro icon={FolderInput} title={example.capture.title} body={example.capture.reason} />
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
                    <Meta label="类型" value={example.capture.type} />
                    <Meta label="置信度" value={example.capture.confidence} />
                  </div>
                </div>
              )}
              {state.stage === 2 && <StageIntro icon={Database} title={`进入 ${example.capture.destination}`} body="保留 Raw Source，检索现有页面并合并；Schema 继续约束证据和权限边界。" />}
              {state.stage === 3 && (
                <div>
                  <StageIntro icon={Search} title="新任务触发 Query-first" body="AI 先读取与当前问题有关的历史决策，再开始回答。" />
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {example.recall.map((item) => <span key={item} className="rounded-sm border border-cyan-300/20 bg-cyan-300/[0.07] px-2 py-1 text-[9px] text-cyan-100">{item}</span>)}
                  </div>
                </div>
              )}
              {state.stage === 4 && <StageIntro icon={Archive} title="Project Digest 已生成" body={example.digest} />}
            </motion.div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => dispatch({ type: state.stage === 0 ? "reset" : "previous" })}
                disabled={state.stage === 0}
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/10 px-3 text-xs text-zinc-400 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                上一步
              </button>
              {state.stage < demoStages.length - 1 ? (
                <button
                  type="button"
                  onClick={() => dispatch({ type: "next" })}
                  className="inline-flex min-h-10 items-center gap-2 rounded-md bg-cyan-300 px-4 text-xs font-semibold text-[#061013] transition-colors hover:bg-cyan-200"
                >
                  {state.stage === 0 ? "结束对话并分析" : "推进流程"}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => dispatch({ type: "reset" })}
                  className="inline-flex min-h-10 items-center gap-2 rounded-md bg-cyan-300 px-4 text-xs font-semibold text-[#061013] transition-colors hover:bg-cyan-200"
                >
                  <RefreshCcw className="size-3.5" aria-hidden="true" />
                  重新体验
                </button>
              )}
            </div>
          </div>

          <div className={cn("relative overflow-hidden rounded-md border border-white/10 bg-black/25", fullScreen ? "min-h-[570px]" : "min-h-[450px]")}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.16 }}
              minZoom={0.3}
              maxZoom={1.65}
              nodesDraggable
              nodesConnectable={false}
              elementsSelectable
              onNodeClick={onNodeClick}
              onPaneClick={() => dispatch({ type: "select-node", id: null })}
              proOptions={{ hideAttribution: true }}
              aria-label="知识生命周期关系图"
            >
              <Background color="rgba(255,255,255,.08)" gap={24} size={1} />
              <Controls showInteractive={false} className="!border-white/10 !bg-[#11171a] !text-white [&_button]:!border-white/10 [&_button]:!bg-[#11171a] [&_button]:!fill-white" />
            </ReactFlow>
            <div className="pointer-events-none absolute left-3 top-3 rounded-sm border border-white/10 bg-[#090d10]/85 px-2.5 py-1.5 text-[9px] text-zinc-500 backdrop-blur-md">
              拖动节点 · 滚轮缩放 · 点击查看
            </div>
            {selectedDescription && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 left-3 right-3 rounded-md border border-white/10 bg-[#0d1316]/95 p-3 shadow-2xl backdrop-blur-md sm:left-auto sm:w-[285px]"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Check className="size-3.5 text-emerald-300" aria-hidden="true" />
                  {selectedDescription.title}
                </div>
                <p className="mt-1.5 text-[10px] leading-relaxed text-zinc-400">{selectedDescription.body}</p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[9px] text-zinc-600">
          <ShieldCheck className="size-3" aria-hidden="true" />
          演示数据经过脱敏，不连接或公开真实 Obsidian Vault。
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}

function StageIntro({ icon: Icon, title, body }: { icon: typeof FileText; title: string; body: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-white/[0.04] text-cyan-200">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-semibold text-white">{title}</p>
        <p className="mt-1 text-[10px] leading-relaxed text-zinc-400">{body}</p>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-white/10 bg-black/15 p-2">
      <span className="block text-[9px] text-zinc-600">{label}</span>
      <span className="mt-0.5 block truncate text-zinc-300">{value}</span>
    </div>
  );
}
