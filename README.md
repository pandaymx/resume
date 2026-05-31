# 📄 个人简历与 AI 智能体记忆库系统 (Modern Resume & AI Memory Agent Context)

这是一个基于 **React 19 + TypeScript + Vite 7 + Tailwind CSS v4** 构建的现代化、极客风格响应式个人简历展示与 **AI 智能体记忆库 (AI Memory Context)** 协同系统。项目完全采用 **Bun** 作为包管理器与运行时，并支持 Docker 容器化一键部署。

---

## 🚀 项目三大亮点 (Core Highlights)

### 1. 🖨️ 极致的 A4 像素级打印优化 (Pixel-Perfect A4 Printing)

- **防折断排版设计**：利用 CSS 打印媒体查询与页面破坏属性（`print:break-inside-avoid`），智能控制边栏、工作经历和项目经验的版面分布，防止内容跨页时从文字中间被腰斩。
- **双模式无缝导出**：
  - **简历模式**：支持一键导出包含高保真色彩的 A4 纸张 PDF；
  - **AI 记忆模式**：通过客户端**声明式内联 `<style>` 打印样式注入器**，摒弃了传统的计时器竞争切换机制，实现 100% 缓存免疫，完美将 Markdown 深度内容跨多页清爽输出。

### 2. 🧠 AI 智能体记忆库弹窗 (AI Memory Agent Modal)

- **面试官与 AI 代理专用上下文**：在简历主体之外，为面试官或大模型 Agent 预留了一个深度的技术画像弹窗（展示个人偏好、活跃项目及备考计划等）。
- **轻量高性能 Markdown 解析器**：项目包含一个手写的、零外部依赖的高性能行级 Markdown 解析引擎，支持：
  - 行内粗体 `**bold**`、行内单行代码 \`code\`；
  - 带间距与前导空格层级的无序列表（`-`）；
  - **列表计数器重置技术**：通过 `<li value={num}>` 属性动态重置浏览器内置 CSS 计数器，完美避开多级混合列表在非包裹环境下的序号漂移（不再发生 `17. 毕业论文系统` 的计数错误）。
  - 标题分级与分割线。

### 3. 🔒 敏感数据隔离与本地化 (Git-Ignored Private DB)

- **本地与模板双轨制**：通过 `vite.config.ts` 在编译期进行静态注入。
  - 简历数据库优先读取本地的 `resume.local.json`，若不存在则回退至公开模版 `resume.json`。
  - AI 记忆库优先读取本地的 `resume.local.md`，若不存在则回退至公开模板 `src/data/ai-memory.md`。
- **完全防泄露安全线**：`resume.local.json`、`resume.local.md` 及所有的 `.env` 环境配置文件已被永久列入 `.gitignore`，防止开发者的敏感联系方式及私密数据被误推至公共仓库。

---

## 🛠️ 项目技术栈 (Tech Stack)

- **核心框架**：React 19.x & TypeScript
- **构建引擎**：Vite 7.x (支持高效本地 HMR 与多宿主开发访问)
- **样式系统**：Tailwind CSS v4 (原生打印支持与微动效)
- **图标库**：Lucide React
- **运行时 & 包管理器**：**Bun** (1.x+)
- **容器化标准**：Docker / Docker Compose (oven/bun:1-alpine)

---

## 📂 目录结构分析 (Directory Structure)

```text
├── Dockerfile                  # 基于 Bun-Alpine 构建的高性能轻量化容器镜像
├── docker-compose.yml          # 本地容器化开发环境编排（映射主机 5174 端口）
├── bun.lock                    # Bun 包管理器锁文件
├── package.json                # 项目依赖及运行指令
├── vite.config.ts              # Vite 配置文件（支持动态本地数据加载与 HMR 实时热重载）
├── resume.json                 # 公开简历模板数据
├── resume.local.json           # [Git-Ignored] 本地个人私密简历数据
├── resume.local.md             # [Git-Ignored] 本地个人 AI 智能体记忆库 (Markdown)
├── src/
│   ├── App.tsx                 # 应用入口主组件 (包含弹窗控制、打印样式注入、Markdown解析引擎)
│   ├── index.css               # 全局样式文件 (Tailwind 引入及基础打印彩色配置)
│   ├── vite-env.d.ts           # Vite 全局注入变量声明
│   ├── components/             # 原子化拆分组件
│   │   ├── Header.tsx          # 简历头部组件 (姓名、基本求职意向及联系方式)
│   │   ├── Sidebar.tsx         # 简历侧边栏组件 (技术栈、教育背景、自我评价)
│   │   └── MainContent.tsx     # 简历主干内容组件 (工作经历、项目背景)
│   └── data/
│       ├── resume.ts           # 简历数据映射与 Lucide 图标动态路由解析
│       └── ai-memory.md        # AI 记忆库公开备用模板
```

---

## 🚀 运行与维护指南 (How to Run & Maintain)

### 方案 A：本地物理环境运行 (推荐开发调试)

确保您本地已安装 [Bun](https://bun.sh/)。

1. **安装依赖**：

   ```bash
   bun install
   ```

2. **本地启动开发服务器**：
   ```bash
   bun run dev
   ```
   启动后可访问：`http://localhost:5173`。

---

### 方案 B：本地 Docker 容器化开发 (推荐容器隔离环境)

项目包含了开箱即用的 Docker 容器化配置：

1. **一键构建并启动容器**：
   ```bash
   docker compose up -d --build
   ```

   - 容器将在后台启动并监听本地 `5174` 端口。
   - 挂载了本地卷以支持实时 HMR 热更新，修改代码后页面即可自动刷新。
   - 本地访问地址：`http://localhost:5174`。

---

## ✍️ 简历内容与 AI 记忆更新步骤 (Updating Data)

### 1. 更新个人简历

直接在项目根目录下修改或创建 **`resume.local.json`**：

- 简历会自动载入，并动态匹配 `src/data/resume.ts` 中的 Lucide 图标映射（如 `Phone`, `Mail`, `MapPin`, `GithubIcon`, `Globe` 等）。
- 字段格式可完全参考公开的 `resume.json` 模板。

### 2. 更新 AI 智能体记忆库

直接在项目根目录下修改或创建 **`resume.local.md`**：

- 支持使用标准的 Markdown 语法。
- 有序列表请遵循 `1. ` 格式，系统会自动识别并确保序号精度。
- 编写完成后，点击简历右下方的 **AI 记忆库** 浮标按钮即可开箱即用。

---

## 🌟 打印操作最佳实践 (Print Best Practices)

- **主简历打印**：
  - 点击页面右下角蓝色的 **“下载 / 打印 PDF”** 按钮（或在非弹窗状态下使用 `Cmd+P` / `Ctrl+P`）。
  - 建议选择：纸张大小 `A4`，方向 `纵向`，页边距 `无` 或 `默认`，并勾选 **“背景图形 (Background graphics)”** 以完美渲染高饱和度背景色块与渐变！
- **AI 记忆库打印**：
  - 点击右下角 **“AI 记忆库”** 打开弹窗，然后点击弹窗左下角的灰色 **“打印此内容”** 按钮。
  - 系统会自动屏蔽外部简历背景，并将弹窗自动展开为清爽的无网格白纸黑字格式，完美打印所有溢出的文字深度内容！
