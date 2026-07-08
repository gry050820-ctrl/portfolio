/**
 * Portfolio V1 · Site Configuration
 *
 * Centralized content management. All copy, nav links, metadata
 * and section configuration lives here. Components read from
 * this file — no hardcoded strings in JSX.
 */

export const siteConfig = {
  /* ── Base Path (empty on Vercel, "/portfolio" on GitHub Pages) ── */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  /* ── Metadata ── */
  name: "柚子",
  title: "AI 实践者 · 作品集",
  description:
    "AI 实践者个人作品集 —— 产品思维 × 自动化 × 内容系统。用 AI 把问题变成可运行的解决方案。",
  url: "https://gry050820-ctrl.github.io/portfolio",
  ogImage: "/portfolio/og-image.png",

  /* ── Hero ── */
  hero: {
    greeting: "你好，我是 柚子",
    title: "把 AI 做成产品的人",
    subtitle: "擅长发现问题 · 快速验证 · AI 工作流搭建 · 把想法跑通",
    cta: {
      primary: { label: "进入作品展厅", href: "#lab" },
      secondary: { label: "下载简历 PDF", href: "/resume.pdf" },
    },
  },

  /* ── Navigation ── */
  nav: {
    links: [
      { label: "Product Lab", href: "#lab" },
      { label: "能力", href: "#capability" },
      { label: "方法论", href: "#methodology" },
      { label: "关于", href: "#timeline" },
    ],
    resume: { label: "简历", href: "/resume.pdf" },
  },

  /* ── Section IDs (for scroll targeting) ── */
  sections: {
    dashboard: "dashboard",
    lab: "lab",
    capability: "capability",
    methodology: "methodology",
    timeline: "timeline",
    contact: "contact",
  },

  /* ── Dashboard ── */
  dashboard: {
    metrics: [
      {
        label: "AI 实践项目",
        value: 5,
        suffix: "+",
        icon: "🚀",
        description:
          "从 0 到 1 独立完成的 AI 产品，覆盖内容创作、自动化、数据分析",
        evidence: [
          { label: "AI U 盘 · 一键部署工具", href: "/project/ai-usb" },
          { label: "AI 自动视频流水线", href: "/project/video-pipeline" },
          { label: "Claude Code 自动化实践", href: "/project/claude-code" },
          { label: "实习项目 · AI 产品运营", href: "/project/internship" },
          { label: "毕业设计 · 产品思维实践", href: "/project/thesis" },
        ],
        lastUpdated: "2026.07",
        clickable: true,
      },
      {
        label: "Agent 自动化工作流",
        value: 3,
        suffix: "+",
        icon: "🤖",
        description:
          "基于 Claude Code 搭建的自动化流水线，含视频处理、文档生成、数据清洗",
        evidence: [
          { label: "AI 自动视频流水线 · Agent 编排", href: "/project/video-pipeline" },
          { label: "文档自动化生成工作流", href: "/project/claude-code" },
          { label: "数据分析自动化 Agent", href: "/project/internship" },
        ],
        lastUpdated: "2026.07",
        clickable: true,
      },
      {
        label: "端到端实践案例",
        value: 3,
        suffix: "",
        icon: "📐",
        description:
          "从需求调研到上线迭代的完整闭环，含 PRD、用户验证、数据复盘",
        evidence: [
          { label: "AI U 盘 · 完整产品周期", href: "/project/ai-usb" },
          { label: "实习项目 · 企业级产品实践", href: "/project/internship" },
          { label: "毕业设计 · 从问题到方案", href: "/project/thesis" },
        ],
        lastUpdated: "2026.07",
        clickable: true,
      },
      {
        label: "AI 工具链深度使用",
        value: 10,
        suffix: "+",
        icon: "🔧",
        description:
          "Claude · GPT · Midjourney · ComfyUI · Cursor · Figma · Notion 等工具的深度整合实践",
        evidence: [],
        lastUpdated: "2026.07",
        clickable: false,
      },
    ],
    status: {
      nowBuilding: "AI 自动化视频流水线 v2",
      lastUpdated: "2026.07",
      currentExploration: "AI Agent 如何降低内容生产门槛",
    },
  },

  /* ── Product Lab ── */
  lab: {
    explorations: [
      {
        question: "AI 如何提升个人学习效率？",
        projects: [
          {
            slug: "ai-usb",
            number: 1,
            name: "AI U 盘",
            conflict: "新手想用 AI 编程，第一步就卡在环境配置——装 Python、配 CUDA、处理依赖冲突，动辄折腾几小时，很多人直接放弃。",
            motivation: "我做了一个一键部署的 AI 编程环境。插上 U 盘，5 分钟就能开始写代码——不用配环境、不看报错、不需要任何计算机基础。",
            status: "completed" as const,
            statusLabel: "已完成",
            role: "问题定义 · 用户调研 · 方案设计",
            tags: ["AI", "方案设计", "用户研究"],
            result: "覆盖 200+ 用户，资料检索时间平均从 5 分钟降至 2 分钟",
            period: { start: "2026-05" },
            coverIcon: "📚",
          },
        ],
      },
      {
        question: "AI 如何自动化内容生产？",
        projects: [
          {
            slug: "video-pipeline",
            number: 2,
            name: "AI 自动视频流水线",
            conflict: "内容创作者每周花 8-12 小时在重复性的视频处理上——剪辑、字幕、格式转换。这些工作机械但不可或缺。",
            motivation: "我搭建了一套 AI Agent 工作流，把视频处理从手工操作变成自动化流水线。",
            status: "iterating" as const,
            statusLabel: "持续迭代",
            role: "流程设计 · Agent 编排 · 工具链搭建",
            tags: ["AI Agent", "自动化", "Claude Code"],
            result: "视频处理时间从 3-5 小时压缩至分钟级，正在迭代 v2",
            period: { start: "2026-05" },
            coverIcon: "🎬",
          },
          {
            slug: "video-pipeline",
            number: undefined,
            name: "内容生产 Agent · 下一阶段",
            conflict: "",
            motivation: "",
            status: "planned" as const,
            statusLabel: "即将探索",
            role: "",
            tags: ["探索中"],
            result: "",
            period: { start: "", end: undefined },
            coverIcon: "🧪",
            placeholder: true,
          },
        ],
      },
      {
        question: "AI 如何降低重复劳动？",
        projects: [
          {
            slug: "claude-code",
            number: 3,
            name: "Claude Code 自动化实践",
            conflict: "产品工作中存在大量重复性任务——PRD 初稿、竞品信息整理、用户反馈分类。这些任务不复杂，但积累起来消耗大量精力。",
            motivation: "我用 Claude Code 搭建了多个自动化工作流，把重复劳动交给 Agent，把判断留给自己。",
            status: "iterating" as const,
            statusLabel: "持续迭代",
            role: "工作流设计 · Prompt 工程 · 工具评估",
            tags: ["Claude Code", "Agent", "自动化"],
            result: "搭建 3+ 条自动化工作流，覆盖文档生成、反馈分类、数据处理",
            period: { start: "2026-03" },
            coverIcon: "⚡",
          },
          {
            slug: "internship",
            number: 4,
            name: "实习项目 · AI 产品运营",
            conflict: "企业内部 AI 产品面临用户激活率低的问题——用户注册后不知道 AI 能帮他们解决什么具体问题。",
            motivation: "我主导了用户激活链路的重设计，从'展示功能'改为'展示 AI 能帮你完成的具体任务'。",
            status: "completed" as const,
            statusLabel: "已完成",
            role: "用户分析 · 运营策略 · 数据验证",
            tags: ["产品运营", "用户增长", "数据分析"],
            result: "长短期班招生 2,500+ 人，季度 GMV 目标达成",
            period: { start: "2025-05", end: "2025-08" },
            coverIcon: "💼",
          },
        ],
      },
    ],
  },

  /* ── Capability Map ── */
  capabilities: [
    {
      id: "insight",
      icon: "🎯",
      name: "需求洞察",
      definition: "发现问题、定义问题、判断问题值不值得解决",
      currentLevel: 4,
      maxLevel: 5,
      growth: "从'听懂需求'到'预判需求'",
      levels: [
        {
          level: 1,
          label: "识别",
          description: "能识别用户表达的表面需求",
          evidence: null,
        },
        {
          level: 2,
          label: "理解",
          description: "能通过访谈发现用户未表达的深层需求",
          evidence: { label: "AI U 盘 · 用户调研环节", slug: "ai-usb" },
        },
        {
          level: 3,
          label: "判断",
          description: "能评估需求的价值和优先级，判断值不值得做",
          evidence: { label: "实习项目 · Opportunity 判断过程", slug: "internship" },
        },
        {
          level: 4,
          label: "洞察",
          description: "能在模糊情境下定义出清晰的问题，发现用户自己都没意识到的需求",
          evidence: { label: "AI U 盘 · Trade-off 中主动放弃的功能方向", slug: "ai-usb" },
        },
        {
          level: 5,
          label: "预见",
          description: "能基于行业趋势和技术演进，预判未来的需求方向",
          evidence: null,
        },
      ],
      relatedProjects: ["ai-usb", "internship", "thesis"],
    },
    {
      id: "design",
      icon: "✏️",
      name: "方案设计",
      definition: "从需求到方案、信息架构、交互逻辑、原型设计",
      currentLevel: 3,
      maxLevel: 5,
      growth: "从'画原型'到'设计系统性的产品体验'",
      levels: [
        {
          level: 1,
          label: "执行",
          description: "能根据需求描述画出原型",
          evidence: null,
        },
        {
          level: 2,
          label: "架构",
          description: "能设计信息架构和用户流程",
          evidence: { label: "AI U 盘 · 信息架构设计", slug: "ai-usb" },
        },
        {
          level: 3,
          label: "体验",
          description: "能考虑用户体验的全链路，从首次接触到持续使用",
          evidence: { label: "毕业设计 · 用户体验设计", slug: "thesis" },
        },
        {
          level: 4,
          label: "系统",
          description: "能设计可扩展的产品系统，不只是单点功能",
          evidence: null,
        },
        {
          level: 5,
          label: "引领",
          description: "能定义新的产品交互范式",
          evidence: null,
        },
      ],
      relatedProjects: ["ai-usb", "thesis"],
    },
    {
      id: "ai-practice",
      icon: "🤖",
      name: "AI 实践",
      definition: "AI 工具深度使用、Agent 搭建、自动化工作流设计",
      currentLevel: 4,
      maxLevel: 5,
      growth: "从'会用 AI 工具'到'能设计 AI 驱动的产品方案'",
      levels: [
        {
          level: 1,
          label: "使用",
          description: "能使用主流 AI 工具完成单项任务",
          evidence: null,
        },
        {
          level: 2,
          label: "整合",
          description: "能将多个 AI 工具串联，形成工作流",
          evidence: { label: "实习项目 · AI 工具在运营中的应用", slug: "internship" },
        },
        {
          level: 3,
          label: "编排",
          description: "能设计 Agent 协作流程，自动化复杂任务",
          evidence: { label: "Claude Code 实践 · Agent 工作流设计", slug: "claude-code" },
        },
        {
          level: 4,
          label: "产品化",
          description: "能将 AI 能力产品化，不只停留在个人工作流",
          evidence: { label: "AI 自动视频流水线 · 从个人工具到可复用的产品", slug: "video-pipeline" },
        },
        {
          level: 5,
          label: "创新",
          description: "能基于 AI 能力定义全新的产品形态",
          evidence: null,
        },
      ],
      relatedProjects: ["video-pipeline", "claude-code", "internship", "ai-usb"],
    },
    {
      id: "execution",
      icon: "🚀",
      name: "执行落地",
      definition: "项目管理、版本迭代、从 MVP 到交付的完整闭环",
      currentLevel: 3,
      maxLevel: 5,
      growth: "从'完成分配的任务'到'主导项目从 0 到 1'",
      levels: [
        {
          level: 1,
          label: "完成",
          description: "能在给定时间内完成任务",
          evidence: null,
        },
        {
          level: 2,
          label: "规划",
          description: "能拆解项目为可执行的里程碑",
          evidence: { label: "AI U 盘 · 执行方案中的时间线拆解", slug: "ai-usb" },
        },
        {
          level: 3,
          label: "交付",
          description: "能从 MVP 到完整交付，有节奏地迭代",
          evidence: { label: "实习项目 · 从策略到落地到数据验证", slug: "internship" },
        },
        {
          level: 4,
          label: "推动",
          description: "能在不确定性中推动项目前进，管理多方预期",
          evidence: null,
        },
        {
          level: 5,
          label: "领导",
          description: "能带领团队交付复杂产品，定义项目节奏和质量标准",
          evidence: null,
        },
      ],
      relatedProjects: ["ai-usb", "video-pipeline", "internship"],
    },
    {
      id: "communication",
      icon: "📝",
      name: "表达输出",
      definition: "PRD、文档、复盘、对外沟通、叙事能力",
      currentLevel: 4,
      maxLevel: 5,
      growth: "从'写清楚'到'用叙事影响决策'",
      levels: [
        {
          level: 1,
          label: "记录",
          description: "能写清楚自己做了什么",
          evidence: null,
        },
        {
          level: 2,
          label: "说明",
          description: "能写出别人能理解的 PRD 和文档",
          evidence: { label: "AI U 盘 · PRD 文档", slug: "ai-usb" },
        },
        {
          level: 3,
          label: "说服",
          description: "能用数据和逻辑支撑方案，影响他人决策",
          evidence: { label: "实习项目 · 数据驱动的运营方案", slug: "internship" },
        },
        {
          level: 4,
          label: "叙事",
          description: "能把复杂的思考过程讲成清晰的产品故事",
          evidence: { label: "AI U 盘 · 完整项目复盘文档", slug: "ai-usb" },
        },
        {
          level: 5,
          label: "影响",
          description: "能通过写作和表达建立行业影响力",
          evidence: null,
        },
      ],
      relatedProjects: ["ai-usb", "internship", "thesis"],
    },
  ],

  /* ── Product Methodology ── */
  methodology: {
    caseProject: "AI U 盘",
    caseSlug: "ai-usb",
    nodes: [
      {
        id: "discover",
        icon: "🔍",
        title: "发现问题",
        summary: "不是从'我想做 AI U 盘'开始，而是从'为什么那么多人想学 AI 编程却半途而废'开始",
        method: [
          "观察用户行为——不是问他们想要什么，而是看他们在哪一步放弃",
          "找到重复出现的挫折点——环境配置是所有初学者的第一道坎，大多数人在这里就放弃了",
          "定义问题而非定义解决方案——用户说想要'更好的教程'，实际需要一个'不用配置就能用的环境'",
        ],
        keyInsight: "用户说的 ≠ 用户需要的。他们说要教程，实际需要的是跳过教程直接开始。做出好产品的人，不是记录需求，而是翻译需求背后的真实困境。",
        evidenceAnchors: [
          { label: "AI U 盘 · 背景 & 问题定义", slug: "ai-usb" },
          { label: "AI U 盘 · Opportunity", slug: "ai-usb" },
        ],
      },
      {
        id: "think",
        icon: "🧠",
        title: "思考方案",
        summary: "不是'想一个功能就做一个功能'，而是'先理解用户在哪卡住，再看怎么让他们跨过去'",
        method: [
          "画出新手配置环境的完整旅程——从搜索教程到放弃，找到最高摩擦点",
          "定义 MVP 范围——只做能验证'一键部署'这个核心假设的最小功能集",
          "用 AI 快速生成原型——Claude 辅助脚本编写，AI 生成引导界面，快速迭代",
        ],
        keyInsight: "MVP 的目标不是'做出来'，而是'用最小的成本验证最核心的假设'。对于 AI U 盘，核心假设就是：用户愿意用 5 分钟换 3 小时的折腾。",
        evidenceAnchors: [
          { label: "AI U 盘 · 思考过程 & 决策", slug: "ai-usb" },
          { label: "AI U 盘 · 执行方案", slug: "ai-usb" },
        ],
      },
      {
        id: "tradeoff",
        icon: "⚖️",
        title: "取舍决策",
        summary: "不是'能做就做'，而是'主动放弃，聚焦核心价值'",
        method: [
          "列出所有可能方案（2-3 个）——在线 IDE、本地 U 盘、纯教程方案",
          "评估每个方案的代价和风险——网络依赖、兼容性成本、用户学习成本",
          "选择能最快验证假设的方案——U 盘一键部署，确定性最高、用户心理负担最低",
          "明确记录放弃了什么、为什么——放弃了在线方案的便利性，换来了离线可用和环境 100% 可控",
        ],
        keyInsight: "做决策最大的能力不是选择，而是放弃。说'不'比说'好'更需要判断力。放弃了多个 AI 工具的深度集成，才换来真正的'开箱即用'。",
        evidenceAnchors: [
          { label: "AI U 盘 · Trade-off", slug: "ai-usb" },
        ],
      },
      {
        id: "ai-accelerate",
        icon: "🤖",
        title: "AI 加速",
        summary: "不是'用 AI 做了一切'，而是'AI 负责重复劳动，我负责判断和决策'",
        method: [
          "AI 负责：项目架构建议、安装脚本框架搭建、用户引导文案初稿、多环境兼容性测试脚本",
          "我负责：用户痛点调研和问题定义、产品方案设计、所有关键取舍决策、AI 输出质量审核和修正",
          "关键原则：AI 是杠杆，不是替代品。它把开发效率提升了 3 倍以上，但产品方向和关键决策永远是我的判断。",
        ],
        keyInsight: "AI 提高效率之前，先要重新定义流程。把 AI 塞进旧流程是浪费——我让 AI 并行生成多套方案，我只需要做选择题而不是填空题。",
        evidenceAnchors: [
          { label: "AI U 盘 · AI 实践 & 工具链", slug: "ai-usb" },
          { label: "Claude Code 实践", slug: "claude-code" },
        ],
      },
      {
        id: "validate",
        icon: "📊",
        title: "验证结果",
        summary: "不是'做完了就完了'，而是'定义成功标准，然后验证'",
        method: [
          "定义北极星指标——不是虚荣指标（下载量），而是行为指标（首次部署成功率、部署耗时）",
          "收集真实用户反馈——不是想象中的用户，而是真正零基础、第一次用 AI 编程的人",
          "对比假设 vs 实际结果——假设'一键部署是核心价值'→ 90%+ 首次成功率验证了这个假设",
          "区分'做得对'和'运气好'——用户留存好不一定是因为一键部署，也可能是引导界面写得好，要拆解因果",
        ],
        keyInsight: "没有数据支撑的产品决策，和猜硬币没有区别。数据不是用来证明自己对了，而是用来发现自己错了。",
        evidenceAnchors: [
          { label: "AI U 盘 · Impact", slug: "ai-usb" },
        ],
      },
      {
        id: "iterate",
        icon: "🔄",
        title: "迭代复盘",
        summary: "不是'下次做得更好'这种空话，而是'如果重新做一次，我会这样改'",
        method: [
          "列出做对了什么——不只记成功，还要理解成功的因果链",
          "列出做错了什么——不只记失败，还要分析根因",
          "如果重新做一次，具体怎么改——不是抽象的'做得更好'，而是具体的动作",
          "沉淀为可复用的方法论——每个项目的复盘，都成为下一个项目的起点",
        ],
        keyInsight: "初级选手做完就结束了，高级选手总是在复盘。复盘不是为了自责，而是为了让下一次的起点更高。",
        evidenceAnchors: [
          { label: "AI U 盘 · 复盘与反思", slug: "ai-usb" },
          { label: "AI U 盘 · 如果重新做一次", slug: "ai-usb" },
          { label: "AI U 盘 · Long-term Impact", slug: "ai-usb" },
        ],
      },
    ],
  },

  /* ── Growth Timeline ── */
  timeline: [
    {
      date: "2024 初",
      title: "第一次真正用 AI",
      description:
        "开始系统性地使用 AI 工具辅助学习和项目。不是浅尝辄止的'试一下'，而是把 AI 融入日常工作和思考流程。这个阶段建立了对 AI 能力边界的基本认知。",
      highlight: "从好奇到认真",
    },
    {
      date: "2024 中",
      title: "第一个完整的 AI 实践项目",
      description:
        "完成了 AI U 盘的从 0 到 1——发现小白用户被环境配置劝退的痛点，做了一个一键部署的 AI 编程环境。第一次完整经历了一个产品从想法到落地的全过程，也是第一次深刻理解'用户说的 ≠ 用户需要的'——他们说想要更好的教程，实际需要一个不用配置就能用的环境。",
      highlight: "从学习者到实践者",
    },
    {
      date: "2024 末 — 2025 初",
      title: "企业级产品实战",
      description:
        "通过实习进入真实业务场景，面对真实用户、真实数据和真实约束。主导了用户激活链路的重设计，用数据驱动的方式验证假设。理解了在组织里做产品和独立做产品的区别。",
      highlight: "从个人项目到企业实践",
    },
    {
      date: "2025 中",
      title: "Agent & 自动化方向深耕",
      description:
        "开始深入探索 Claude Code 和 AI Agent 方向。搭建了多条自动化工作流，从个人效率工具到可复用的产品方案。AI 自动视频流水线是这个阶段的代表作。开始形成自己的 AI 产品方法论。",
      highlight: "从工具使用者到方案设计者",
    },
    {
      date: "现在",
      title: "AI 实践者 · 持续成长",
      description:
        "聚焦 AI 产品方向，持续探索 AI 如何改变产品的构建方式、用户体验和商业模式。这个作品集本身就是一个持续更新的 Product Lab——它记录了我的思考、实践和成长。",
      highlight: "一直在路上",
    },
  ],

  /* ── Contact ── */
  contact: {
    email: "3057758042@qq.com",
    github: "https://github.com/gry050820-ctrl",
    wechat: null, // Set to QR code path when ready
  },
} as const;

export type SiteConfig = typeof siteConfig;
