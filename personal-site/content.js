/* ============================================================
   网站内容配置文件
   ============================================================
   这是全站唯一需要修改的文件。
   改完保存，刷新网页即可生效。不需要改 HTML 或 CSS。

   规则：
   - 文字用引号包起来，比如 "你好"
   - 每条数据之间用逗号隔开
   - 最后一条可以不加逗号
   - // 后面是注释，不影响内容
   ============================================================ */

const SITE = {

  /* ---- Supabase 数据库配置（网页笔记后台用）----
     按《笔记后台-配置指南.md》注册 Supabase 后，把两个值粘贴进来。
     留空也能正常打开网站——笔记会显示下面的静态示例内容。 */
  supabase: {
    url: "https://nldnpsjolhjnwkszwxqr.supabase.co",       // Project URL，形如 https://xxxxxxxx.supabase.co
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZG5wc2pvbGhqbndrc3p3eHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3MjM1MTksImV4cCI6MjEwNTI5OTUxOX0.IuUpD6qLm2JmUQYF-w-R0PaaONyH2Mt50PI8QPDVZFA",   // anon public key，一长串以 eyJ 开头的字符
  },

  /* ---- 首页 Hero 区 ---- */
  hero: {
    name: "1peed",               // 你常用的名字
    intro: "Hello, I'm",         // 开场白（英文）
    role1: "explorer",           // 第一个身份标签
    role2: "maker",              // 第二个身份标签
    status: "正在探索 · 接受合作", // 状态标签
    desc: "网络工程出身，大专。学过VLAN、防火墙、Web安全，自己搭过网站。\n现在在做BHop训练工具、AI音乐、还有一个自动化的我。\n\n不急着找工作，在找方向。", // 一句话介绍（诚实版）
    location: "东莞 / 广东",      // 你的城市
  },

  /* ---- 关于我 ---- */
  about: {
    lead: "一个正在找自己方向的人。网络工程大专，不打算复制别人的路。",
    body1: "学的是网络工程：VLAN、NAT、ACL、防火墙、综合布线、Python、Web安全。不是自学天才，就是按部就班把学校的东西学完了。自己搭过1peed.top（PHP+MySQL+Nginx），写过Python学生管理系统，考过HCIA和1+X Web安全中级。",
    body2: "现在不在传统职场。靠灵活平台接活，同时在做BHop同步训练工具、AI音乐（Synthesizer V + FL Studio）、还有一个WorkBuddy上的自动化记忆系统。用八木仁平方法论在问自己：真正想做什么？\n\n答案是：还没完全想清楚。但这个过程本身，就是值得记录的。",
    // 技能标签 — 直接改文字或增删
    skills: [
      "网络工程基础",
      "VLAN / NAT / ACL / 防火墙",
      "Python 编程",
      "Web安全工具",
      "PHP + MySQL + Nginx",
      "AI 音乐制作",
      "工具开发",
    ],
    // 原则清单 — 直接改文字或增删
    principles: [
      "诚实面对自己的阶段",
      "工具应该服务于人",
      "不消耗自身能量的方式做事",
      "认真钻研原理，哪怕慢",
    ],
  },

  /* ---- 此刻 NOW ----
     你"当下正在做的事"，显示在首页关于和经历之间。
     改 items 里的内容就行，updated 是更新日期（如 2026.09）。 */
  now: {
    updated: "2026.10",
    items: [
      { label: "在学", text: "驾照，抽空练车" },
      { label: "在做", text: "音乐可视化壁纸持续迭代、BHop 训练工具、AI 音乐" },
      { label: "在想", text: "八木仁平的问题：我真正想做的事是什么" },
      { label: "在找", text: "东莞袁屋边附近的房子，600–1000/月" },
    ],
  },

  /* ---- 经历时间线 ---- */
  // 每条经历是一个 { } 块，复制一个块就能加一条经历
  experience: [
    {
      date: "2024 — 现在",
      title: "独立探索期",
      org: "灵活就业 + 个人项目",
      desc: "不在传统职场。通过番茄站等平台获取劳务收入维持生活。做出了第一个上架作品：Steam 创意工坊的音乐可视化壁纸。同时在做BHop同步训练工具、AI音乐制作、WorkBuddy自动化系统维护。用八木仁平方法论进行自我探索。",
      tags: ["自由职业", "工具开发", "AI音乐"],
    },
    {
      date: "2020 — 2023",
      title: "网络工程 · 大专",
      org: "广州城建职业学院",
      desc: "系统学习计算机网络：园区网络设计、网络系统运维、数据库设计、网络工程制图（AutoCAD）、Python程序设计、Windows/Linux服务器配置、入侵检测与防火墙、信息系统安全方案、网络攻防技术。",
      tags: ["VLAN", "NAT", "ACL", "Python", "Web安全"],
    },
    {
      date: "技能认证",
      title: "证书与工具实践",
      org: "自主学习",
      desc: "获得HCIA证书、1+X Web安全中级证书、计算机一级、英语B级。自主学习安全工具：nmap、burpsuite、dirb、whatweb。了解SQL注入、文件上传漏洞、风险评估与资产梳理。",
      tags: ["HCIA", "渗透测试", "安全工具"],
    },
  ],

  /* ---- 作品 / 项目 ---- */
  // 这些不是"筹备中"，而是真实在做或做过的东西
  projects: [
    {
      type: "已上架",
      year: "2026",
      title: "音乐可视化壁纸",
      desc: "Wallpaper Engine 网页壁纸，已上架 Steam 创意工坊。专辑封面模糊背景+随封面变色的环境光晕、64段实时频谱、同步滚动歌词（支持翻译/罗马音），没放歌时自动切待机大时钟。QQ音乐/网易云/酷狗/Spotify 通用。",
      tech: ["HTML/CSS/JS", "Wallpaper Engine", "Steam 工坊"],
      visual: 1,  // 1=深棕渐变  2=绿色渐变  3=橙色渐变
      icon: "♫",
      link: "https://steamcommunity.com/sharedfiles/filedetails/?id=3813900125",  // 外链，新标签页打开
    },
    {
      type: "个人网站",
      year: "2023",
      title: "1peed.top",
      desc: "最初用PHP+MySQL+Nginx搭建的个人网站，实现了用户管理、博文管理、评论点赞回复功能。原服务器过期后，重建为你现在看到的这个网站。",
      tech: ["PHP", "MySQL", "Nginx"],
      visual: 2,
      icon: "⟁",
    },
    {
      type: "开发中",
      year: "2024-",
      title: "BHop 同步训练工具",
      desc: "参考CSGO、Momentum Mod和SSJ脚本的设计思路，开发一个帮助玩家练习连跳节奏的训练工具。解决现有工具的同步问题。",
      tech: ["Python"],
      visual: 3,
      icon: "▲",
    },
    {
      type: "创作中",
      year: "2024-",
      title: "AI 音乐实验",
      desc: "使用Synthesizer V生成人声骨架，FL Studio做编曲微调。探索「AI生成骨架、人类微调」的极简工作流。不是让AI替代创作，而是让它成为加速器。",
      tech: ["Synthesizer V", "FL Studio"],
      visual: 1,
      icon: "⬡",
    },
  ],

  /* ---- 探索笔记 ---- */
  // 加新笔记：复制一个 { } 块，改里面的内容，放在数组最后（记得前面加逗号）
  notes: [
    {
      day: "16",
      month: "JUL",
      year: "2026",
      tag: "自我探索",
      title: "八木仁平方法论：如何找到「真正想做的事」",
      excerpt: "不是「能做什么」或「该做什么」，而是回到「想做什么」。八木仁平的五个问题框架，正在一步步验证中……",
    },
    {
      day: "12",
      month: "JUL",
      year: "2026",
      tag: "AI · 音乐",
      title: "AI 生成骨架，人类微调：极简音乐工作流实践",
      excerpt: "用 Synthesizer V 生成人声骨架，FL Studio 做编曲微调。不是让 AI 替代创作，而是让它成为加速器……",
    },
    {
      day: "08",
      month: "JUL",
      year: "2026",
      tag: "能量管理",
      title: "「早起、做操、出门」—— 12 天的能量实验",
      excerpt: "不追求效率，追求能量。三件小事，连续 12 天，身体和心态的变化比预期的大……",
    },
    {
      day: "03",
      month: "JUL",
      year: "2026",
      tag: "开发",
      title: "BHop 同步训练工具：从 CSGO 脚本到独立工具",
      excerpt: "参考 Momentum Mod 和 SSJ 脚本的设计思路，做一个帮助玩家练习连跳节奏的训练工具……",
    },
    {
      day: "28",
      month: "JUN",
      year: "6",
      tag: "存在主义",
      title: "活着本身就有意义——存在主义如何对抗虚无",
      excerpt: "虚无主义不是敌人，而是背景噪音。存在主义提供的不是答案，而是一种姿态……",
    },
    {
      day: "20",
      month: "JUN",
      year: "6",
      tag: "自动化",
      title: "自动化记忆追踪：让 AI 帮你记住该记住的",
      excerpt: "日志清理、身份检查、工作流优化——把重复的事交给自动化，把注意力留给创造……",
    },
  ],

  /* ---- 联系方式 ---- */
  contact: {
    email: "2361802209@qq.com",  // 你的邮箱
    // 社交链接 — href 改成你的链接，label 改成显示名称
    links: [
      { label: "GitHub", href: "https://github.com/lpeed" },
      { label: "微信", href: "#" },
      { label: "B站", href: "#" },
      { label: "Email", href: "mailto:2361802209@qq.com" },
    ],
  },

};
