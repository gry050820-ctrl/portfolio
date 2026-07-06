/**
 * Portfolio V1 · Project Detail Data
 *
 * Each project has a full detail page at /project/[slug].
 * This file contains the complete data for every project,
 * matching the 10-module architecture from the V1 spec.
 */

export interface TradeOffItem {
  decision: string;
  optionA: string;
  optionB: string;
  chosen: "A" | "B";
  reason: string;
}

export interface ProjectDetail {
  slug: string;
  number: number;
  name: string;
  tagline: string;
  status: "completed" | "iterating";
  statusLabel: string;

  /* Quick info */
  role: string;
  period: { start: string; end?: string };
  tools: string[];

  /* Module 1: Background & Problem */
  background: {
    context: string;
    userProblem: string;
    whyExistingSolutionsFail: string;
  };

  /* Module 2: Opportunity */
  opportunity: {
    whyWorthDoing: string;
    whyNow: string;
    myJudgment: string;
  };

  /* Module 3: Thinking Process */
  thinking: {
    directions: string[];
    chosenDirection: string;
    keyDecisions: Array<{ point: string; detail: string }>;
  };

  /* Module 4: Execution */
  execution: {
    mvp: string;
    aiAcceleration: string;
    milestones: string[];
  };

  /* Module 5: Trade-off */
  tradeoffs: TradeOffItem[];

  /* Module 6: AI Practice */
  aiPractice: {
    toolsUsed: Array<{ name: string; purpose: string }>;
    aiContribution: string;
    myContribution: string;
  };

  /* Module 7: Impact */
  impact: {
    quantitative: string[];
    userQuote?: { text: string; author: string; date: string };
    longTerm: string;
  };

  /* Module 8: Reflection */
  reflection: {
    didWell: string[];
    couldImprove: string[];
    biggestLesson: string;
  };

  /* Module 9: Next Iteration */
  nextIteration: {
    whatWouldChange: string;
    pitfallsToAvoid: string;
    nextExploration: string;
  };

  /* Resources */
  resources?: Array<{ label: string; href: string; type: "manual" | "download" | "link" }>;

  /* Takeaway */
  takeaway: string;

  /* Cross-linking */
  relatedByCapability: Array<{ label: string; slug: string }>;
  relatedByPractice: Array<{ label: string; slug: string }>;
}

export const projects: ProjectDetail[] = [
  {
    slug: "ai-usb",
    number: 1,
    name: "AI U 盘",
    tagline: "让知识管理回归直觉",
    status: "completed",
    statusLabel: "已完成",

    role: "产品设计 · 用户调研 · 原型验证",
    period: { start: "2026-05" },
    tools: ["Claude", "Figma", "Notion", "Python", "Coze"],

    background: {
      context:
        "大学生在多门课程之间切换时，每门课使用不同的平台（超星、慕课、微信群、百度网盘……），学习资料高度分散。",
      userProblem:
        "用户说'想要更好的搜索'，但实际痛点不是搜索——而是需要整理的东西太多了。他们每天在不同平台间切换 5-8 次来查找资料。",
      whyExistingSolutionsFail:
        "Notion 太复杂（学习成本高），微信文件传输太零散（没有结构化），传统网盘没有 AI 能力。存在一个'刚好够用'的机会窗口。",
    },

    opportunity: {
      whyWorthDoing:
        "每个大学生都是'知识工作者'，但他们在知识管理上几乎没有任何工具支持。这是一个真实、高频、未被满足的需求。",
      whyNow:
        "AI 语义搜索和自动分类能力在 2024 年已经成熟到可以产品化。过去做不了的原因：NLP 能力不够 → 现在大模型可以理解学习材料的语义结构。",
      myJudgment:
        "不是做搜索引擎（市场已有），不是做笔记软件（Notion 太强）。核心切入点是'自动整理 + 智能检索'——让 AI 帮用户整理，用户只需搜索。",
    },

    thinking: {
      directions: [
        "方案 A：做一个通用的 AI 知识库（类似 NotebookLM）",
        "方案 B：做一个轻量级的学习资料整理工具，聚焦'导入 → 自动整理 → 检索'三个核心动作",
      ],
      chosenDirection: "方案 B",
      keyDecisions: [
        {
          point: "为什么不做通用知识库？",
          detail:
            "通用知识库需要用户主动整理，学习成本高。学生需要的是'扔进去就能自动整理'。",
        },
        {
          point: "为什么不用现成的 RAG 方案？",
          detail:
            "现有 RAG 方案面向开发者，学生的资料格式多样（PDF、PPT、图片笔记），需要做一层预处理和格式统一。",
        },
      ],
    },

    execution: {
      mvp: "上传文件 → AI 自动分类和打标签 → 语义搜索。三个功能，没有更多。",
      aiAcceleration:
        "用 Claude 生成 PRD 初稿 → 迭代 3 轮定稿 → 用 AI 快速生成前端原型 → 用 Python + AI 做后端数据处理原型",
      milestones: [
        "Week 1-2: 用户访谈（8 人），确认痛点",
        "Week 3-4: PRD + 原型，用 AI 加速",
        "Week 5-8: MVP 开发 + 内部测试",
        "Week 9-12: 小范围用户测试（30 人）→ 迭代 → 扩大至 200+ 用户",
      ],
    },

    tradeoffs: [
      {
        decision: "技术方案",
        optionA: "用现成 CMS + 插件",
        optionB: "自建 Agent + 定制流程",
        chosen: "B",
        reason: "现成 CMS 改造成本 > 自建成本。且长期迭代需要灵活性，自建方案更容易调整。",
      },
      {
        decision: "产品范围",
        optionA: "全功能 MVP（搜索 + 整理 + 笔记 + 协作）",
        optionB: "单功能深挖（只做整理 + 检索）",
        chosen: "B",
        reason: "MVP 的目标是验证'自动整理'这个核心假设。功能越多，噪音越大，越难判断用户到底为什么留下来。主动放弃了笔记编辑和协作功能。",
      },
    ],

    aiPractice: {
      toolsUsed: [
        { name: "Claude", purpose: "PRD 撰写、用户反馈分类、代码生成辅助" },
        { name: "Figma", purpose: "原型设计（AI 插件辅助生成初稿）" },
        { name: "Python + AI", purpose: "后端数据处理和语义搜索原型" },
        { name: "Notion", purpose: "项目管理和文档沉淀" },
      ],
      aiContribution:
        "AI 负责：PRD 初稿生成、用户反馈自动分类、代码框架搭建、语义搜索的 embedding 计算",
      myContribution:
        "我负责：问题定义和产品方向、所有关键取舍决策、AI 输出质量判断和修正、用户访谈和需求验证",
    },

    impact: {
      quantitative: [
        "覆盖用户：200+",
        "资料检索时间：平均从 5 分钟降至 2 分钟（-60%）",
        "用户留存：使用 3 次以上的占 45%",
      ],
      userQuote: {
        text: "之前找资料要翻 3 个平台，现在一个入口就够了。而且 AI 帮我自动整理，省了至少一半时间。",
        author: "用户 A，大三学生",
        date: "2025.03",
      },
      longTerm:
        "这个项目让我深刻理解了'用户说的 ≠ 用户需要的'。用户说想要更好的搜索，实际需要更少的东西要搜。这个洞察影响了后续所有项目的问题定义方式。",
    },

    reflection: {
      didWell: [
        "用户访谈阶段花了足够时间，没有直接跳到方案设计",
        "MVP 的范围控制得很克制，三个功能就上线验证",
        "用 AI 加速了 PRD 和原型的迭代速度，3 天出了 3 版原型",
      ],
      couldImprove: [
        "早期过度关注功能实现，忽略了用户引导——很多用户不知道 AI 能自动整理，以为要手动分类",
        "应该更早做量化数据埋点，早期只有定性反馈，缺少数据支撑迭代方向",
        "技术选型时低估了文件格式兼容的复杂度（PDF 扫描件、图片笔记的处理）",
      ],
      biggestLesson:
        "产品真正解决的不是用户说出来的问题，而是他们每天重复经历的麻烦。'整理'比'搜索'更刚需——这个洞察不是用户告诉我的，是我观察他们行为后发现的。",
    },

    nextIteration: {
      whatWouldChange:
        "如果重新做一次，我会先做一个更小的实验——只做'自动整理'一个功能，不做搜索。用整理效果来验证核心假设，而不是同时验证两个功能。",
      pitfallsToAvoid:
        "不要在 MVP 阶段引入文件协作。协作会让产品复杂度翻倍，但 MVP 阶段用户根本没有协作需求——他们只是想整理自己的资料。",
      nextExploration:
        "探索方向：AI 如何理解不同学科的知识结构（理工科的公式、文科的论述逻辑），从而提供更精准的整理和检索。",
    },

    resources: [
      { label: "📖 产品说明书", href: "/docs/ai-usb-guide.html", type: "manual" },
      { label: "⬇️ 下载安装包", href: "#", type: "download" },
    ],

    takeaway:
      "用户说想要更好的搜索，但实际需要更少的东西要搜。产品经理的价值不是听懂用户的话，而是听懂话背后的麻烦。",

    relatedByCapability: [
      { label: "需求洞察 · 实习项目", slug: "internship" },
      { label: "需求洞察 · 毕业设计", slug: "thesis" },
    ],
    relatedByPractice: [
      { label: "AI Agent · 视频流水线", slug: "video-pipeline" },
      { label: "自动化 · Claude Code 实践", slug: "claude-code" },
    ],
  },
];

/**
 * Get a project by slug. Returns undefined if not found.
 */
export function getProject(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * All valid project slugs for static generation.
 */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
