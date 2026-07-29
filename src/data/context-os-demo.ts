export type DemoExample = {
  id: string;
  label: string;
  conversation: string;
  capture: {
    title: string;
    type: string;
    confidence: "confirmed" | "high_confidence";
    destination: string;
    reason: string;
  };
  recall: string[];
  digest: string;
};

export const demoExamples: DemoExample[] = [
  {
    id: "portfolio",
    label: "作品集决策",
    conversation:
      "把 GEO 项目放到作品集第一位。公开展示必须使用真实成果，不要把 mock 当作案例。",
    capture: {
      title: "作品集项目排序与证据边界",
      type: "项目决策",
      confidence: "confirmed",
      destination: "06_Decisions",
      reason: "包含明确、可长期复用的展示优先级和证据要求。",
    },
    recall: ["GEO 项目优先级", "真实成果优先", "不使用 mock 叙事"],
    digest: "作品集从演示型案例转向以真实项目证据为核心的叙事。",
  },
  {
    id: "workflow",
    label: "协作偏好",
    conversation:
      "复杂任务先检索历史上下文，保持客观，不要为了迎合我而忽略风险和证据不足。",
    capture: {
      title: "长期 AI 协作偏好",
      type: "用户明确表述",
      confidence: "confirmed",
      destination: "02_User_Profile",
      reason: "这是用户直接确认、会持续影响后续任务执行的协作规则。",
    },
    recall: ["Query-first", "客观分析", "风险优先", "证据边界"],
    digest: "后续复杂任务先检索项目历史，再区分事实、推理和未知内容。",
  },
  {
    id: "inference",
    label: "低置信推测",
    conversation:
      "最近几个项目都在做 AI，我猜自己以后应该只做 AI 产品。",
    capture: {
      title: "职业方向推测",
      type: "AI 推测 / needs_review",
      confidence: "high_confidence",
      destination: "00_Inbox",
      reason: "单次表达不足以形成稳定画像，只能暂存并等待更多证据。",
    },
    recall: ["暂不写入正式画像", "保留来源", "等待重复证据"],
    digest: "职业方向尚未确认，不应由 AI 自动固化为长期身份判断。",
  },
];

export const demoStages = [
  { id: "conversation", label: "对话输入", short: "输入" },
  { id: "capture", label: "Memory Capture", short: "捕获" },
  { id: "govern", label: "分层治理", short: "治理" },
  { id: "recall", label: "Query-first", short: "召回" },
  { id: "digest", label: "Project Digest", short: "回流" },
] as const;
