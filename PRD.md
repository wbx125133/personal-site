# 王柏晰 个人站 · Vibe Coding PRD

> 给 Claude Code / Cursor 直接执行的项目规范。包含视觉资产 prompt 套件、文件结构、内容数据、组件骨架。

---

## 0. 快速上下文（Context）

- **项目名**：silas-personal-site
- **本质**：单页滚动式个人 Hub 站，不是博客 / 作品集，是「总入口」
- **用户画像**：HR（60s 决策）/ 同行（深度浏览）/ 合作方（联系动机）
- **目标气质**：cyberpunk × 东方水墨融合，暗色高级感，呼应「朝夕」项目的玄学科技调性
- **不做的事**：博客系统、明暗切换、多语言、留言板、移动端动效优化

---

## 1. 技术栈与目录结构（Scope）

### 1.1 技术选型

| 类别 | 选型 | 理由 |
|---|---|---|
| 框架 | Next.js 14（App Router） | Vercel 一键部署，SEO 友好 |
| 样式 | Tailwind CSS | vibe coding 改样式快 |
| 动效 | Framer Motion | 滚动触发动画 API 简洁 |
| 字体 | Inter（en）+ 思源黑体（zh） | 通过 next/font 加载 |
| 图标 | lucide-react | 轻量统一 |
| 托管 | Vercel | 免费够用 |

### 1.2 目录结构

```
silas-personal-site/
├── app/
│   ├── layout.tsx          # 全局字体、metadata
│   ├── page.tsx            # 单页主入口（按 Section 串联）
│   └── globals.css         # Tailwind + 全局变量
├── components/
│   ├── Hero.tsx            # Section 1
│   ├── About.tsx           # Section 2
│   ├── Work.tsx            # Section 3
│   ├── Thinking.tsx        # Section 4
│   ├── Capability.tsx      # Section 5
│   ├── Contact.tsx         # Section 6
│   ├── SideNav.tsx         # 左侧锚点导航
│   ├── ParticleBg.tsx      # Hero 粒子背景
│   └── ui/                 # 通用卡片、按钮
├── content/
│   └── content.json        # 所有文案集中管理
├── public/
│   ├── images/
│   │   ├── hero-main.png            # image2 生成
│   │   ├── avatar.jpg               # 个人照（已有）
│   │   ├── work-chao.png            # 潮新闻AI（已有）
│   │   ├── work-urbanic.png         # Urbanic（已有）
│   │   ├── work-tmall.png           # 天猫3D（已有）
│   │   ├── work-zhaoxi.png          # 朝夕（image2 生成）
│   │   ├── article-1~4.png          # 公众号截图（已有）
│   │   └── course-cover.png         # 课程封面缩略图
│   └── resume.pdf                   # 简历直链
├── tailwind.config.ts
└── package.json
```

---

## 2. 视觉规范（Specification）

> **设计参考**：[rokumaruichi.tokyo](https://www.rokumaruichi.tokyo/) —— 借鉴其编辑级极简、楼层倒数导航、视频优先 hero、克制的电影感节奏。融合你原有的「水墨×赛博」气质：保留金色作为唯一情绪色，主体克制到近乎黑白。



### 2.1 设计 Token

```css
/* globals.css */
:root {
  --bg-primary: #0A0E1A;       /* 主背景 深蓝近黑 */
  --bg-elevated: #131829;      /* 卡片背景 */
  --accent-gold: #D4A574;      /* 暖金 重点强调 */
  --accent-blue: #4A90E2;      /* 数据蓝 链接/动效 */
  --text-primary: #E8ECF4;     /* 主文字 */
  --text-secondary: #8B95A7;   /* 次级文字 */
  --border-subtle: rgba(212, 165, 116, 0.15);
}
```

### 2.2 排版

- **大标题**（Hero 主标）：Inter Bold 72px / 思源黑 Bold 64px
- **Section 标题**：48px，配小字英文 label（如「WORK / 业务介绍」）
- **正文**：16px，行高 1.7
- **字间距**：英文 -0.02em，中文默认

### 2.3 动效规则（核心动效表）

| 元素 | 触发 | 动效 |
|---|---|---|
| 进站 Loading | 首次加载 | 黑屏 → 金色数字「06 / 05 / 04 / 03 / 02 / 01」倒数 1.6s → 大字 logo 从下浮入 |
| Hero 粒子 | 加载 + 鼠标移动 | 跟随鼠标 200ms 缓动，鼠标静止时缓慢回流 |
| 自定义光标 | 全局 | 14px 金色圆点 + 24px 描边圆环延迟跟随，hover 链接时圆环放大到 56px 并显示标签文字 |
| Section 进入视口 | scroll | fade-up 40px，duration 0.8s，cubic-bezier(0.16, 1, 0.3, 1)（慢起快收） |
| Section 切换 | scroll 越过中线 | 顶部楼层指示器数字翻牌切换（06 → 05），翻牌动画 400ms |
| 标题文字 | 进入视口 | split text 逐字 mask reveal，每字 stagger 30ms |
| 作品卡 hover | mouse | 封面图 scale 1.04 + 灰度滤镜消失 + 金色细线下划线从左向右延展（500ms） |
| 作品卡封面（默认态） | 静态 | 默认 grayscale(80%) + 轻微暖金 tint，hover 才恢复彩色 |
| 锚点切换 | click | smooth scroll，800ms，cubic-bezier ease-in-out |
| 图片视差 | scroll | 作品图相对容器以 0.85 倍速移动（轻微视差） |
| 文字链接 hover | mouse | 文字向上推出 + 同位置出现金色版本（双层文字滑动效果） |
| 邮箱复制 | click | 文字「1349940796@qq.com」翻转替换为「COPIED ✓」，1.5s 后还原 |
| 主题切换（可选） | click | 不做明暗切换，但保留「DAY / NIGHT」假按钮做装饰，hover 提示「Always Night」 |
| 滚动条 | 全局 | 隐藏默认滚动条，右侧自绘 1px 金色 progress bar 跟随滚动进度 |

### 2.4 节奏哲学

参考 rokumaruichi，整站节奏遵循「**慢起 · 留白 · 不打断**」三原则：
- **慢起**：所有动效起始 200ms 缓冲，避免一触即发的廉价感
- **留白**：每个 Section 上下 padding 至少 160px，文字与图之间留呼吸空间
- **不打断**：不用弹窗、不用 modal、不用 toast，所有反馈在元素本地完成

---

## 3. 内容数据（content.json）

```json
{
  "hero": {
    "name_zh": "王柏晰",
    "name_en": "Silas Wang",
    "title": "AI Product Manager",
    "tagline": "让 AI 真正落地的人",
    "cta": [
      { "label": "下载简历", "href": "/resume.pdf" },
      { "label": "公众号文章", "href": "https://www.woshipm.com/u/xxx" },
      { "label": "联系我", "href": "#contact" }
    ]
  },
  "about": [
    {
      "tab": "职业身份",
      "highlights": [
        "9 年大厂经验 · 百度 4 年 + 阿里 1 年",
        "AI 产品负责人 @ 浙江日报传播大脑",
        "纵跨媒体融合 · 跨境电商 · 智能车载"
      ]
    },
    {
      "tab": "专业能力",
      "highlights": [
        "AI 产品 0→1 全链路操盘",
        "AIGC 评测体系搭建（架构层+业务层双层）",
        "Multi-Agent 架构与编排",
        "Vibe Coding 端到端独立交付"
      ]
    },
    {
      "tab": "个人侧写",
      "highlights": [
        "1995 · 杭州/上海",
        "艺术科班出身的产品人（西北民族大学艺术本科）",
        "在做：AI 玄学心理疗愈 Side Project「朝夕」",
        "在想：AI Native 内容服务的下一种形态"
      ]
    }
  ],
  "work": [
    {
      "title": "潮新闻 AI 助手矩阵",
      "role": "AI 产品负责人",
      "period": "2024.12 – 至今",
      "hook": "把传统媒体推进 AI Native 时代",
      "metrics": ["AI 生成可用率 51% → 92%", "新助手上线周期压缩 47%"],
      "cover": "/images/work-chao.png",
      "href": "#"
    },
    {
      "title": "Urbanic AIGC 0→1",
      "role": "AI 产品经理",
      "period": "2022.08 – 2024.12",
      "hook": "印度快时尚的端到端 AI 生产引擎",
      "metrics": ["售卖单品数量 +50%", "年度成本降低约 350 万"],
      "cover": "/images/work-urbanic.png",
      "href": "#"
    },
    {
      "title": "天猫 3D 商品力 · 心智频道",
      "role": "高级 UX 设计师",
      "period": "2021.03 – 2022.05",
      "hook": "天猫互动玩法 × 心智频道方法论",
      "metrics": ["会员产品策略", "商业转化路径优化"],
      "cover": "/images/work-tmall.png",
      "href": "#"
    },
    {
      "title": "朝夕 · AI 玄学心理疗愈站",
      "role": "Side Project · 独立全链路",
      "period": "2026.02 – 2026.04",
      "hook": "一个人跑完 PM/IDE 0→1 全链路",
      "metrics": ["6 Subagent 架构", "四节律计算 ≤100ms", "11 条 AI 红线"],
      "cover": "/images/work-zhaoxi.png",
      "href": "/AI玄学社交_立项报告_幻灯片.html"
    }
  ],
  "thinking": {
    "articles": {
      "title": "人人都是产品经理 · 首推长文",
      "items": [
        { "thumb": "/images/article-1.png", "href": "#" },
        { "thumb": "/images/article-2.png", "href": "#" },
        { "thumb": "/images/article-3.png", "href": "#" },
        { "thumb": "/images/article-4.png", "href": "#" }
      ]
    },
    "talks": {
      "title": "受邀分享与课程",
      "items": [
        { "name": "功夫 UX · AI 产品专题分享", "href": "#" },
        { "name": "AI 产品方法论课程（含 RAG / Agent / Prompt 工程）", "href": "/4月2日课程网页汇总/index.html" }
      ]
    }
  },
  "capability": {
    "axes": [
      { "label": "AI 产品策略", "value": 95, "note": "潮新闻四层架构 · Urbanic 三能力矩阵" },
      { "label": "AIGC 评测", "value": 92, "note": "双层评测框架 · 8 维标准 · 部门 SOP" },
      { "label": "Agent 架构", "value": 88, "note": "6 Subagent 编排 · ReAct + Function Calling" },
      { "label": "Vibe Coding", "value": 85, "note": "Claude Code / Cursor / Codex / Windsurf 实战" },
      { "label": "UX × PM 跨职能", "value": 90, "note": "9 年大厂双轨复合背景" }
    ]
  },
  "contact": {
    "email": "1349940796@qq.com",
    "phone": "186-5880-9788",
    "status": "离职 · 立即到岗 · 杭州/上海",
    "slogan": "Think AI Native, Ship AI Native."
  }
}
```

---

## 4. Section 组件骨架（Behavior）

### 4.0 全局组件

**FloorIndicator · 右上角楼层指示器**（参考 rokumaruichi 6→1 倒数）
- 固定右上角，超大数字（96px Inter Light）显示当前 Section 编号「06 / 05 / 04 / 03 / 02 / 01」
- 倒序：Hero = 06，Contact = 01
- 切换时数字以翻牌式动画切换（上半翻下，下半翻上）
- 下方小字 6px label 显示 Section 英文名（HERO / ABOUT / WORK ...）

**CustomCursor · 自定义光标**
- 默认：14px 金色实心圆点 + 外圈 24px 描边圆环（圆环延迟跟随，给「拖尾感」）
- hover 可点击元素：圆环放大到 56px，圆点缩小到 6px，圆环中显示动作标签（「VIEW / OPEN / COPY」）
- 在文字上：变为 2px×24px 金色 I 型光标
- 鼠标离开窗口：fade out 300ms

**GrainOverlay · 颗粒滤镜（关键氛围层）**
- 全屏固定 z-index 9998 的 SVG 噪点纹理，opacity 0.04
- 用 `feTurbulence` + `feColorMatrix` 实现胶片颗粒感
- 不影响交互（pointer-events: none）
- 这是参考 rokumaruichi 电影感的核心要素

**SideNav · 左侧锚点**
- 固定左侧 vertical bar，6 个细线 + 圆点对应 Section
- 当前 Section 圆点变金色 + 横线延展显示文字 label
- 使用 IntersectionObserver 监听 active

### 4.2 Hero（重写 · 视频优先）

- 全屏（h-screen），**单栏全屏视频/动图背景** + 文字叠加（参考 rokumaruichi 视频 hero）
- 背景：image2 生成的循环动图（或 video loop），grayscale + 暖金 overlay
- 文字布局：
  - 左下角：name_zh「王柏晰」竖排大字 120px Light，字间距宽松
  - 右下角：name_en「Silas Wang」+ title「AI Product Manager」+ tagline 一行小字
  - 顶部中央：横排细线 + 「2017 — 2026 · A 9-YEAR JOURNEY」标语
- 视频控制：左下角小字「PAUSE · MUTE」可点击（致敬 rokumaruichi）
- 进入动画：Loading 倒数结束后，视频从中心圆形 mask 扩散显现（800ms），文字依次 mask reveal
- 滚动指示：右下角竖排小字「SCROLL ↓」+ 1px 金线下沉动画

### 4.3 About

- Tab 切换式（3 个 Tab：职业 / 能力 / 个人）
- 切换时内容卡 fade + slide 切换
- 左侧个人照（处理成黑白 + 暖金叠色滤镜），右侧 Tab 内容

### 4.4 Work（重写 · 画廊式陈列）

- 不用网格，改用**纵向画廊式**：每个项目占一个子屏（约 80vh），上下滑动浏览
- 左右交错布局：奇数项目图在左文在右，偶数反过来（编辑杂志感）
- 每个项目左上角超大编号「01 / 02 / 03 / 04」（120px Light，灰色 30% opacity）
- 项目卡：
  - 封面图默认 grayscale + 暖金 tint，hover 才恢复彩色
  - 标题大字 64px，role/period 小字灰色
  - hook 一句话用 italic 衬线字体强调（与全站 sans 形成对比）
  - metrics 横排小标签，1px 金色边框
  - 「VIEW PROJECT →」金色箭头按钮，hover 时箭头向右滑出
- 滚动到对应项目时，右上角 FloorIndicator 数字会闪烁一下提示「03 · WORK / 02」子编号

### 4.5 Thinking

- 二栏 grid（左文章，右分享）
- 左侧：4 张公众号截图瀑布流，hover 显示「在人人都是产品经理查看」
- 右侧：列表式，每项一行 + 箭头图标

### 4.6 Capability

- 居中雷达图（5 轴），使用 SVG 自绘或 recharts
- 雷达外侧 5 个标签 + 小字 note
- 进入视口时雷达从中心放射动画展开

### 4.7 Contact

- 居中布局，slogan 超大字（96px）金色 Light 字重
- 邮箱以**可点击复制**形式呈现，hover 时光标圆环显示「COPY」，点击后文字翻转为「COPIED ✓」
- 求职状态用 pill badge 形式，金色边 + 呼吸光晕（2s 周期 opacity 0.6 ↔ 1.0）
- 页脚极简：左下「© 2026 SILAS WANG」/ 右下「TOKYO · INSPIRED」+ 一行版本号「v1.0 · BUILT WITH CLAUDE CODE」

---

## 5. image2 视觉资产 Prompt 套件（rokumaruichi 风格融合版）

> **统一风格基因（每个 prompt 通用前缀）**：
> `editorial cinematic minimalism inspired by Tokyo film studio aesthetic, mostly monochrome with single warm gold accent (#D4A574), heavy negative space, 35mm film grain texture, slow-paced cinematic mood, no UI elements, no text overlays, shot on Arri Alexa look, slight motion blur on edges`

### 5.0 主视觉风格定调（核心 mood board）

```
A cinematic still frame in editorial minimalism style,
deep void black background dominating 70% of composition,
single subject placed in lower right third following rule of thirds,
muted monochrome palette with one accent of warm gold light,
heavy 35mm film grain overlay, subtle scan lines,
slow shutter motion blur, atmospheric haze,
inspired by Wong Kar-wai cinematography meets Japanese minimalist web design,
mood: contemplative, refined, slightly mysterious,
16:9, ultra high quality, no text, no logos
```

### 5.1 Hero 主视觉（hero-main.png / 推荐生成 video loop）

```
A slow cinematic loop of abstract ink wash dissolving in water,
shot in extreme close-up like a Wong Kar-wai film,
black ink blooming into pure void darkness,
single thread of warm gold light passing through the ink cloud,
heavy 35mm film grain, anamorphic lens flare,
shallow depth of field, dust particles floating in golden light beam,
mood: meditative, cinematic, refined,
inspired by Tokyo film studio website aesthetic (rokumaruichi.tokyo),
mostly black with 5% gold accent only,
16:9, ultra slow motion feel, no text, no faces, no recognizable objects,
just pure atmospheric texture
```

> **建议**：用 image2 出静帧，再用 Runway/Sora 转 3-5s loop 视频做 hero 背景。

### 5.2 朝夕项目封面（work-zhaoxi.png）

```
A cinematic still of a full moon partially obscured by drifting clouds,
shot through a vintage film camera with heavy grain,
warm gold moonlight as the only light source,
faint chinese bagua diagram etched into the moon surface like an ancient artifact,
deep void black sky, atmospheric haze,
inspired by Japanese cinematic minimalism meets oriental mysticism,
mood: serene, mysterious, contemplative,
no text, no UI, pure cinematic atmosphere,
16:10, editorial photography quality
```

### 5.3 About 个人照处理（基于已有个人照做风格化）

```
Editorial portrait of an asian male in early 30s,
shot like a cover photo for a film magazine,
half-shadow rembrandt lighting, deep void black background,
single warm gold rim light grazing the right side of face,
heavy 35mm film grain, slight color desaturation,
expression: calm, contemplative, slight introversion,
shot on 85mm lens with shallow depth of field,
inspired by Japanese editorial photography,
mood: refined, cinematic, professional yet artistic,
3:4 portrait orientation, no text
```

> **使用方式**：把已有 `个人照.jpg` 作为 image2 参考图（i2i），让模型在保留五官的前提下做风格化重绘。

### 5.4 Capability Section 装饰背景

```
Abstract minimal radar chart sketched in single warm gold line strokes,
on pure black background with heavy film grain,
hand-drawn pentagon shape with subtle imperfections,
faint dust particles floating around the diagram,
inspired by Japanese architectural blueprint aesthetic,
mood: technical yet poetic,
no text, no labels, just pure geometric beauty,
16:9, editorial minimalism
```

### 5.5 Contact 二维码风格化（qr-stylized.png）

```
A stylized QR code,
warm gold modules on pure black background,
subtle film grain overlay,
center reserved for a small lunar phase icon,
clean editorial style, high contrast for scannability,
square format
```

> **注意**：风格化二维码生成后必须实测可扫，必要时回退使用普通二维码 + 金色边框装饰。

### 5.6 各 Section 背景纹理（可选 · 增强电影感）

```
A subtle texture loop for web background,
extremely dark void with faint vertical scan lines,
occasional dust particles drifting slowly,
35mm film grain at 8% opacity,
inspired by film projection at end of reel,
mood: atmospheric, almost imperceptible,
seamlessly tileable, 1920x1080, no recognizable subjects
```

### 5.7 交互态光标视觉参考（不用于网页，仅供开发参考）

```
A minimalist custom cursor design reference sheet,
shows: small gold dot (default) + larger outlined circle (trailing),
expanded state with "VIEW" label inside circle,
text I-beam variant,
clean technical illustration on white background,
inspired by editorial web design from Tokyo studios
```

> 这一张不直接用于网站，作为开发自定义光标时的视觉参照。

---

## 6. 验收清单（Acceptance）

### 必须满足

- [ ] 首屏 Lighthouse Performance ≥ 85（桌面）
- [ ] 6 个 Section 锚点导航可点击 + 平滑滚动
- [ ] 简历 PDF 可下载、外链跳转正常
- [ ] 所有 image2 资产已替换占位图
- [ ] 在 1440px / 1920px 宽度下视觉无破损

### 应当满足

- [ ] Hero 粒子效果鼠标跟随流畅（60fps）
- [ ] 雷达图进入动画完整播放
- [ ] 作品卡 hover 状态完整
- [ ] 移动端可读不报错（不强求等效炫酷）

### 不强求

- [ ] 移动端动效完整复刻
- [ ] IE / 旧 Safari 兼容
- [ ] 暗色 / 明亮模式切换

---

## 7. 护栏（Guardrails）

### 禁止事项

- ❌ 不引入 CMS、数据库、后端 API（纯静态）
- ❌ 不引入 UI 库（如 antd / mui），避免风格污染
- ❌ 不写博客文章正文页（只放外链）
- ❌ 不做评论 / 留言系统
- ❌ 不接入分析统计前先问我（避免隐私问题）

### 决策时机表

| 决策点 | 谁决定 | 何时 |
|---|---|---|
| image2 出图风格定稿 | 王柏晰 | 主视觉出图后先看一版 |
| 域名选择 | 王柏晰 | 部署前 |
| 公众号文章具体链接 | 王柏晰 | content.json 填充时 |
| 移动端是否做适配 | 王柏晰 | MVP 上线后再评估 |
| 加分析统计（如 Vercel Analytics） | 王柏晰 | 上线后决定 |

---

## 8. 交付节奏建议

| 阶段 | 产出 | 预计时长 |
|---|---|---|
| Phase 1 · 骨架 | Next.js 项目初始化 + 6 Section 布局 + content.json 接入 | 1 晚 |
| Phase 2 · 视觉 | image2 出图 + 视觉调优 + 动效接入 | 1 晚 |
| Phase 3 · 打磨 | 雷达图 + 粒子 + 微动效 + 部署上线 | 半晚 |

总计 ~2.5 个晚上，单人 vibe coding 节奏。

---

**END**
