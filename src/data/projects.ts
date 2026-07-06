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
    tagline: "让 AI 编程，从 5 分钟开始",
    status: "completed",
    statusLabel: "已完成",

    role: "产品设计 · 用户调研 · 原型验证",
    period: { start: "2026-05" },
    tools: ["Claude", "Cursor", "Python", "Figma", "Notion"],

    background: {
      context:
        "AI 编程工具越来越强，但使用门槛没有降低。一个新手想用 AI 写代码，需要先装 Python、配虚拟环境、处理 CUDA 兼容性、解决各种依赖冲突——这套流程对有经验的人都头疼，对零基础用户更是劝退级灾难。",
      userProblem:
        "超过一半的 AI 编程初学者在环境配置阶段就放弃了。不是'学不会'，而是连'开始'都开始不了。他们照着教程做到第二步就卡住了——教程里的界面和实际情况不一样，报错信息也完全看不懂。",
      whyExistingSolutionsFail:
        "网上教程的作者预设读者有计算机基础，一键安装脚本是开发者写给开发者看的。没有人站在完全零基础用户的角度，去设计一个'不用思考就能成功'的体验。",
    },

    opportunity: {
      whyWorthDoing:
        "AI 编程不应该是计算机专业学生的特权。每多一个被环境配置劝退的人，就少了一个可能的 AI 产品创造者。降低 AI 工具的使用门槛，这个价值被严重低估了。",
      whyNow:
        "Claude、Cursor、Copilot 这些 AI 编程工具在 2025 年已经成熟到可以作为主力生产力工具，但'最后一公里'——环境配置——还没有人认真做。先解决这个的人，就抓住了 AI 普及的入口。",
      myJudgment:
        "不做 AI 工具本身（竞争太激烈），也不写教程（用户还是要自己折腾）。做 AI 工具的'入口'——让零基础用户跳过配置，直接开始编程。典型的'卖铲子'策略，但铲子确实比金子更好卖。",
    },

    thinking: {
      directions: [
        "方案 A：写一套面向零基础用户的 AI 编程教程，手把手截图教学",
        "方案 B：做一个一键部署的 AI 编程环境，用户插上 U 盘就能用，完全跳过配置环节",
      ],
      chosenDirection: "方案 B",
      keyDecisions: [
        {
          point: "为什么不写教程？",
          detail:
            "教程的问题是用户还是要自己动手配置，只是有了指引。但配置过程充满变量（系统版本、硬件差异、网络问题），一个步骤出错就全卡住。与其教用户怎么走迷宫，不如直接把他们送到终点。",
        },
        {
          point: "为什么用 U 盘做载体？",
          detail:
            "云端方案（在线 IDE）需要稳定网络且文件存储受限。本地安装需要用户自己折腾。U 盘方案兼具便携性和确定性——插上就能用，环境 100% 可控，不需要网络，用户心理上也有'拥有感'。",
        },
      ],
    },

    execution: {
      mvp: "一个 U 盘，插入 → 运行启动脚本 → AI 编程环境就绪。用户看到的只有 5 步，每步都有清晰的界面反馈和进度提示。不需要懂任何技术概念。",
      aiAcceleration:
        "用 Claude 辅助项目架构设计和脚本编写 → 用 AI 生成用户引导界面的文案和交互流程 → 用 AI 做多轮兼容性测试，覆盖不同 Windows 版本和硬件环境",
      milestones: [
        "Week 1-2: 调研零基础用户在环境配置中的具体卡点（10+ 人访谈）",
        "Week 3-4: 设计一键部署方案 + 制作 MVP 原型",
        "Week 5-8: 开发安装脚本 + 用户引导界面 + 多环境兼容性测试",
        "Week 9-12: 小范围用户测试 → 根据反馈迭代 → 编写产品说明书",
      ],
    },

    tradeoffs: [
      {
        decision: "产品形态",
        optionA: "在线 IDE（浏览器打开就能用，无需安装）",
        optionB: "本地 U 盘（一键部署到电脑，离线可用）",
        chosen: "B",
        reason: "在线 IDE 受网络限制且文件管理不便。U 盘的核心优势是'确定性'——环境 100% 可控，不依赖网络，用户拥有完整的本地环境，心理上也有'这个东西是我的'的踏实感。",
      },
      {
        decision: "技术深度",
        optionA: "深度集成多个 AI 编程工具（Claude + Cursor + Copilot 等）",
        optionB: "先聚焦一个核心工具链，保证开箱即用不出错",
        chosen: "B",
        reason: "MVP 的目标是验证'一键部署'这个核心价值。集成越多工具，兼容性问题就越多，反而背离了'零配置'的初衷。先做好一件事，再扩展。",
      },
    ],

    aiPractice: {
      toolsUsed: [
        { name: "Claude", purpose: "项目架构设计、安装脚本编写辅助、用户引导文案生成" },
        { name: "Cursor", purpose: "安装脚本和引导界面的代码开发" },
        { name: "Python", purpose: "自动化环境检测和部署脚本" },
        { name: "Figma", purpose: "产品说明书和用户引导界面的视觉设计" },
      ],
      aiContribution:
        "AI 负责：项目架构建议、安装脚本框架搭建、用户引导文案初稿、多环境兼容性测试脚本的生成",
      myContribution:
        "我负责：用户痛点调研和问题定义、产品方案设计、所有关键取舍决策（本地 vs 云端、功能范围）、AI 输出质量审核和修正",
    },

    impact: {
      quantitative: [
        "环境部署时间：从平均 3-6 小时降至 5 分钟（-95%+）",
        "首次使用成功率：90%+ 的用户一次部署即成功",
        "覆盖用户：200+",
      ],
      userQuote: {
        text: "之前照着教程装了三天没装好，用这个 U 盘真的 5 分钟就开始了。感觉之前浪费的时间好冤。",
        author: "用户，编程零基础学生",
        date: "2026.06",
      },
      longTerm:
        "这个项目让我真正理解了'用户价值'的含义——不是技术多强、功能多全，而是帮用户跨过了那道他们自己跨不过去的坎。降低门槛本身就是最大的价值创造。",
    },

    reflection: {
      didWell: [
        "从真实痛点出发，不是自己想做一个'很酷的技术产品'",
        "MVP 范围控制得当——先做一键部署，没有贪多求全",
        "用户引导做得比较用心——产品说明书用可视化方式呈现，降低理解成本",
      ],
      couldImprove: [
        "早期应该做更多硬件兼容性测试——不同电脑的 BIOS 设置、USB 接口差异带来了一些意外问题",
        "用户反馈收集不够系统化——早期只有聊天记录，没有结构化的问题追踪",
        "应该更早考虑版本更新机制——U 盘内容如何保持最新是个遗留问题",
      ],
      biggestLesson:
        "做面向小白的工具，最难的不是技术，而是换位思考。你习以为常的概念（'环境变量''终端''依赖'），对他们来说就是天书。产品的好坏不取决于功能多强，而取决于用户是否觉得'这个东西是专门为我设计的'。",
    },

    nextIteration: {
      whatWouldChange:
        "如果重新做，我会先做更小范围的实验——找 5 个零基础用户，让他们在我面前操作，观察他们在哪一步卡住，而不是先设计方案再测试。",
      pitfallsToAvoid:
        "不要在 MVP 阶段追求覆盖所有操作系统。Windows 一个平台的兼容性问题就已经够多了，同时做 Mac/Linux 会让测试矩阵爆炸。",
      nextExploration:
        "探索方向：在线更新机制，让 U 盘内容可以通过网络自动更新；根据用户的使用场景（数据分析 / Web 开发 / AI 应用）提供不同的预装工具包。",
    },

    resources: [
      { label: "📖 产品说明书", href: "/docs/ai-usb-guide.html", type: "manual" },
      { label: "⬇️ 下载安装包", href: "https://github.com/gry050820-ctrl/portfolio/releases/download/v1.0.0/claude.code.3.zip", type: "download" },
    ],

    takeaway:
      "对小白用户来说，最难的不是'学不会'，而是'连开始都开始不了'。降低门槛不是'做简单一点'，而是站在用户的角度，把每一步设计到他们不需要思考就能完成。这需要的不是技术能力，是同理心。",

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
