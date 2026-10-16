# Silas Wang · 个人网站与作品集

王柏晰（Silas Wang）的 AI 产品经理个人网站，集中展示个人经历、项目作品、产品思考与联系方式。仓库同时保留静态网页和 Next.js 实现。

## 从哪里开始

| 内容 | 入口 | 用途 |
|---|---|---|
| 静态个人首页 | [index.html](./index.html) | 直接浏览个人介绍与作品 |
| Next.js 网站 | [site/](./site/) | 开发、调整内容和构建网站 |
| 网站内容数据 | [site/content/content.json](./site/content/content.json) | 维护页面结构与展示内容 |
| 产品需求 | [PRD.md](./PRD.md) | 查看网站定位与需求 |
| AI 产品课程网页 | [4月2日课程网页汇总/](./4月2日课程网页汇总/) | 浏览课程与 RAG 相关材料 |
| AI 玄学社交立项报告 | [幻灯片 HTML](./AI玄学社交_立项报告_幻灯片.html) | 浏览项目立项展示 |

## 本地预览

### 静态网页

在仓库根目录运行，然后访问 <http://127.0.0.1:8000>：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

### Next.js 网站

```bash
cd site
npm ci
npm run dev
```

访问 <http://localhost:3000>。构建与启动命令为 `npm run build`、`npm run start`；已有检查命令为 `npm run lint`。

## 技术与维护

Next.js 14、React 18、TypeScript、Tailwind CSS、Framer Motion 和 Lucide；依赖以 [site/package-lock.json](./site/package-lock.json) 为准。

静态首页和 Next.js 页面分别维护，修改其一后需检查另一入口的内容是否需要同步。通用静态资源位于 `site/public/`，作品图片也保留在根目录的素材文件夹中。

## 相关仓库

- [codex-skills](https://github.com/wbx125133/codex-skills)：产品、设计和内容工作的 Codex 技能。
- [claude-skills](https://github.com/wbx125133/claude-skills)：Claude Code 中文工作流技能。
- [starfield-flowcharts](https://github.com/wbx125133/starfield-flowcharts)：STARFIELD 产品业务流程图。
