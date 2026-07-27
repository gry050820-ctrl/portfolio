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
    number: 2,
    name: "AI U 盘",
    tagline: "让 AI 编程，从 5 分钟开始",
    status: "completed",
    statusLabel: "已完成",

    role: "问题定义 · 用户调研 · 方案设计",
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
  {
    slug: "geo-analyst-workspace",
    number: 1,
    name: "GEO Analyst Workspace",
    tagline: "广州融兴纸品 GEO 实战：从基线诊断、内容分发到三平台复测的完整闭环。",
    status: "completed",
    statusLabel: "项目已完成",

    role: "GEO 项目运营 / 问题池设计 / 内容分发 / AI 复测分析",
    period: { start: "2026-07" },
    tools: ["DeepSeek", "豆包", "腾讯元宝", "Playwright", "Python", "HTML"],

    background: {
      context:
        "广州融兴纸品在传统企业资料页中已有一定信息基础，但在 AI 供应商推荐场景中缺少系统的可见度诊断、内容覆盖和可重复的复测证据。",
      userProblem:
        "项目需要在一周内跑通可审计的 GEO 闭环：冻结问题池、采集基线、生产并分发内容、用同类问题复测，最后区分真实召回信号与不能过度归因的结果。",
      whyExistingSolutionsFail:
        "只看单次 AI 回答容易把随机性当成成果；只看发文数量又无法证明 GEO 效果。因此必须保留问题、平台、重复次数、引用来源和回答原文。",
    },

    opportunity: {
      whyWorthDoing:
        "这个项目能证明我不是只会做页面或脚本，而是能围绕 AI 评估场景设计完整的业务闭环。",
      whyNow:
        "AI 搜索可见性正在变成真实业务问题，但很多团队还缺少一套把 AI 回答证据转成可审核动作、可复测结果和可交付报告的流程。",
      myJudgment:
        "我选择以“可复测性”作为项目核心：先做真实采集，再用内容分发和扩展问题池验证区域长尾召回，不用发文数量代替效果数据。",
    },

    thinking: {
      directions: [
        "只做内容发布，不采集 AI 复测数据。",
        "采用固定问题池和三平台独立会话，保留每条回答和引用来源。",
        "只做一次小样本测试，快速产出报告。",
      ],
      chosenDirection: "可审计的三平台 GEO 采集与复测",
      keyDecisions: [
        {
          point: "为什么每题要重复采样？",
          detail:
            "AI 回答存在随机性。本轮对 6 类区域问题在每个平台重复 10 次，用命中率和跨平台稳定性代替单次截图。",
        },
        {
          point: "为什么增加花都与炭步长尾问题？",
          detail:
            "融兴是区域性 B2B 供应商，宽泛全国词不是短期最合理的突破口。因此增加“花都”和“炭步镇”超本地词，检验区域实体信号。",
        },
      ],
    },

    execution: {
      mvp:
        "一套可重复的 GEO 项目闭环：20 条原问题池、5 篇母文、17 篇平台版内容、6 类区域长尾问题与 180 条三平台独立回答。",
      aiAcceleration:
        "AI 用于平台文章适配、问题批量采集辅助、回答结构化和报告生成；核心指标由采集原文、别名匹配和引用 URL 复核。",
      milestones: [
        "冻结 20 条原问题池，完成 DeepSeek、豆包、元宝基线采集。",
        "将 5 篇母文拆分为 17 篇平台版内容，建立主体信息和采购场景覆盖。",
        "扩展 6 类花都区域长尾问题，每题每平台独立采样 10 次。",
        "校验 180 条回答的唯一键、空值、品牌别名、来源 URL 和平台分布，输出成果报告。",
      ],
    },

    tradeoffs: [
      {
        decision: "结果口径",
        optionA: "用全部 180 条回答给出一个总提及率。",
        optionB: "同时拆分平台、问题和重复次数，暴露超本地问题的贡献。",
        chosen: "B",
        reason:
          "只看总体 23.9% 会高估宽泛品类能力。拆分后可见，最强信号是“炭步镇”问题的 28/30，而部分宽泛问题仍未命中。",
      },
      {
        decision: "成果归因",
        optionA: "把长尾命中全部归因于新发布内容。",
        optionB: "将“当前召回水平”和“新内容直接引用”分开表述。",
        chosen: "B",
        reason: "当前引用仍主要来自百科、工商和黄页等既有页面，不能把召回变化全部归因于新内容。",
      },
    ],

    aiPractice: {
      toolsUsed: [
        { name: "Codex", purpose: "问题池整理、内容适配、采集脚本和数据分析" },
        { name: "Playwright", purpose: "连接已登录的三个 AI 网页并保存独立回答" },
        { name: "Python / Node.js", purpose: "去重、别名命中、引用来源和平台矩阵统计" },
        { name: "HTML", purpose: "生成可交互的 GEO 项目成果报告" },
      ],
      aiContribution:
        "AI 加速了平台文章改写、浏览器采集和结构化统计，但每条回答、别名口径和结论边界仍需要人工确认。",
      myContribution:
        "我定义了实验问题、平台、重复采样和命中口径，完成内容排期、登录验证、异常处理、数据复核和面试报告叙事。",
    },

    impact: {
      quantitative: [
        "5 篇母文拆分为 17 篇平台适配内容。",
        "3 个 AI 平台、6 类区域问题、每组 10 次独立采样，得到 180/180 条有效回答。",
        "区域长尾提及率 43/180（23.9%）；炭步镇精确问题 28/30（93.3%）。",
      ],
      longTerm:
        "项目证明了从 GEO 诊断、内容生产、平台分发到 AI 复测的完整执行能力，同时保留了未命中问题和归因限制。",
    },

    reflection: {
      didWell: [
        "将问题池、独立会话、重复次数和来源覆盖固定为可审计口径。",
        "遇到豆包人机验证时保留断点，没有重复或删除已完成数据。",
        "将总体成果与超本地问题贡献拆开，避免只报一个有利总数。",
      ],
      couldImprove: [
        "补齐 17 个最终公开 URL 的统一登记，做精确引用匹配。",
        "在第 14 天和第 30 天使用同一问题池继续复测，区分短期波动和稳定召回。",
      ],
      biggestLesson:
        "GEO 成果不是发了多少篇文章，而是在固定口径下，品牌是否被稳定提及、引用和放入合理的候选位置。",
    },

    nextIteration: {
      whatWouldChange:
        "我会在第 14 天和第 30 天增加同口径时间序列，让报告从一次项目复盘升级为持续监测。",
      pitfallsToAvoid:
        "不要把新增问题池的当前提及率直接当成同口径前后增长，也不要在没有直接引用证据时归因新文章。",
      nextExploration:
        "将区域词继续扩展到花都其他镇街与采购场景，检验“炭步镇”之外是否能形成稳定召回。",
    },

    resources: [
      { label: "查看 GEO 项目成果报告", href: "/reports/rongxing-geo-project-report.html", type: "manual" },
    ],
    takeaway: "一个可信的 GEO 项目，既要展示可重复的增长信号，也要主动说明未命中场景和归因边界。",
    relatedByCapability: [
      { label: "AI 实践 / Claude Code 自动化", slug: "claude-code" },
      { label: "执行落地 / AI 产品运营", slug: "internship" },
    ],
    relatedByPractice: [
      { label: "自动化工作流 / 视频流水线", slug: "video-pipeline" },
      { label: "产品包装 / AI U 盘", slug: "ai-usb" },
    ],
  },
  {
    slug: "video-pipeline",
    number: 2,
    name: "AI 视频工厂",
    tagline: "把一次性的视频处理，重构成可审核、可恢复、可复用的内容生产系统",
    status: "iterating",
    statusLabel: "持续迭代",
    role: "工作流设计 · Agent 编排 · 媒体管线搭建",
    period: { start: "2026-06" },
    tools: ["Claude Code", "Python", "FFmpeg", "Edge-TTS", "剪映"],
    background: {
      context: "短视频制作并不只是把素材拼成 MP4。脚本、画面、旁白、字幕、时长和人工判断彼此牵连，任何一个环节漂移，最终交付就会失真。",
      userProblem: "内容生产者需要反复处理分镜、配音、字幕、格式转换和剪辑导出，时间花在重复操作上，却很难稳定复用一套可靠流程。",
      whyExistingSolutionsFail: "单个脚本只能解决一个局部动作；纯自动化又容易掩盖事实错误、时长漂移和素材缺失。真正需要的是带审核点的生产系统。",
    },
    opportunity: {
      whyWorthDoing: "把内容生产从‘靠记忆和手工操作’变成可追踪的项目流程，才能在保持内容判断的同时，降低重复劳动。",
      whyNow: "生成式 AI、TTS 和桌面剪辑工具已经足够成熟，瓶颈从‘能不能生成’转向‘如何把生成结果组织成可信交付’。",
      myJudgment: "不把剪映或 FFmpeg 当成产品本身，而是先建立稳定的内容模型、唯一时间线和人工审核机制，再接入不同导出后端。",
    },
    thinking: {
      directions: ["方案 A：继续堆叠脚本，让每个阶段分别调用一个工具", "方案 B：建立结构化项目和唯一时间线，再把媒体工具做成可替换适配器"],
      chosenDirection: "方案 B",
      keyDecisions: [
        { point: "为什么不让剪映定义系统？", detail: "剪映适合作为人工精修和交付后端，但核心项目数据必须独立存在，否则版本、审核和恢复都会被桌面软件格式绑住。" },
        { point: "为什么把真实音频时长放到时间线之前？", detail: "旁白的实际时长决定镜头和字幕边界，先估算再修正会产生画面、字幕和声音的漂移。" },
      ],
    },
    execution: {
      mvp: "输入一个主题，生成结构化脚本、镜头素材、真实 TTS、唯一时间线和可预览成片；用户在脚本、素材和成片三个节点确认后再交付。",
      aiAcceleration: "Claude Code 辅助工作流和代码搭建，Edge-TTS 生成旁白，FFmpeg 负责可重复渲染，剪映适配器负责可选的人工编辑交付。",
      milestones: ["建立脚本、素材、旁白、时间线和审核状态的中间表示", "用真实音频时长驱动字幕、镜头和最终渲染", "同时保留 FFmpeg 成片和剪映草稿两种交付方式", "将失败、降级和重试记录为可追溯的项目状态"],
    },
    tradeoffs: [
      { decision: "核心架构", optionA: "围绕 FFmpeg 命令串联脚本", optionB: "围绕内容项目和时间线编排工具", chosen: "B", reason: "前者启动快，但难以支持版本、审核和多后端；后者更适合长期复用。" },
      { decision: "交付方式", optionA: "只输出最终 MP4", optionB: "同时输出 MP4、字幕和可编辑剪辑草稿", chosen: "B", reason: "成片适合发布，草稿适合人工精修，两者服务不同的交付场景。" },
    ],
    aiPractice: {
      toolsUsed: [
        { name: "Claude Code", purpose: "工作流建模、脚本搭建和自动化排错" },
        { name: "Python", purpose: "阶段编排、状态管理和媒体元数据处理" },
        { name: "FFmpeg", purpose: "可重复的视频合成、字幕和格式输出" },
        { name: "Edge-TTS", purpose: "按镜头生成可测量时长的中文旁白" },
        { name: "剪映", purpose: "作为可选的人工精修和草稿交付后端" },
      ],
      aiContribution: "AI 负责生成脚本初稿、视觉提示词、配音和部分工程代码，加速重复性生产工作。",
      myContribution: "我负责定义受众和内容边界、选择工作流结构、审核生成结果，并决定哪些环节必须保留人工判断。",
    },
    impact: {
      quantitative: ["已完成一条约 45 秒的 AI 工具教学短视频交付", "产出脚本、镜头素材、6 段旁白、时间线、字幕、MP4 和剪映草稿", "同一项目支持 FFmpeg 成片和剪映可编辑草稿两种交付路径"],
      longTerm: "项目验证了‘内容模型 + 人工审核 + 可替换媒体后端’比单纯堆叠生成工具更适合长期内容生产。",
    },
    reflection: {
      didWell: ["把脚本、素材、配音、时间线和导出拆成可检查的阶段", "保留了可恢复的状态记录和剪映降级路径", "用真实产物验证了从主题到可播放视频的完整链路"],
      couldImprove: ["当前实现仍有硬编码路径和工具版本，跨环境复用成本较高", "时间线修正应该前置到真实音频生成之后", "还需要把阶段布尔状态升级为绑定版本和产物的审核记录"],
      biggestLesson: "自动化视频系统的核心不是‘生成更多素材’，而是让内容判断、时间线和交付状态始终可见、可复核、可恢复。",
    },
    nextIteration: {
      whatWouldChange: "将项目重构为结构化内容项目：统一管理脚本、镜头、素材、时间线、审核版本和交付物。",
      pitfallsToAvoid: "避免让剪映格式、估算时长或静默降级定义系统行为；所有失败和降级都必须显式记录。",
      nextExploration: "把同一套编排器扩展到批量视频、不同 TTS 引擎和更多导出后端。",
    },
    resources: [{ label: "观看项目成片", href: "/projects/ai-video/final.mp4", type: "video" }],
    takeaway: "把 AI 生成能力变成真正可交付的内容系统，关键不在于少写几个命令，而在于建立可信的时间线、审核点和产物链。",
    relatedByCapability: [{ label: "AI 实践 · Agent 编排", slug: "claude-code" }, { label: "执行落地 · 完整交付", slug: "ai-usb" }],
    relatedByPractice: [{ label: "AI U 盘 · 一键部署", slug: "ai-usb" }, { label: "Claude Code · 自动化实践", slug: "claude-code" }],
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
