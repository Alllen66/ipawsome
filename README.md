# iPawsome - 宠物工具站

一个基于 Astro 4 + Tailwind CSS + React Islands 构建的宠物工具网站，为宠物主人提供免费的在线工具和资源。

## 🐾 项目特色

- **🐕 狗年龄计算器**：准确计算狗狗的人类年龄
- **🔬 科学计算**：基于兽医学研究的现代化公式
- **📱 响应式设计**：完美适配移动端和桌面端
- **⚡ 高性能**：Astro 静态生成 + React Islands 架构
- **🎨 现代设计**：Tailwind CSS 打造的美观界面
- **🔍 SEO优化**：完整的结构化数据和元标签

## 🚀 技术栈

- **前端框架**：Astro 4
- **样式**：Tailwind CSS
- **交互组件**：React Islands
- **语言**：TypeScript
- **包管理**：pnpm
- **构建工具**：Vite (内置于 Astro)

## 📦 安装和使用

### 1. 安装依赖

```bash
pnpm install
```

### 2. 本地开发

```bash
pnpm dev
```

项目将在 `http://localhost:4321` 上运行。

### 3. 构建生产版本

```bash
pnpm build
```

### 4. 预览生产版本

```bash
pnpm preview
```

## 📁 项目结构

```
src/
├── components/           # Astro 组件
│   ├── Hero.astro
│   ├── FeaturedTools.astro
│   ├── GuideCards.astro
│   ├── BlogCards.astro
│   ├── Footer.astro
│   └── AgeCalculatorIsland.tsx  # React 岛组件
├── data/                # 数据文件
│   ├── tools.json
│   └── ageCurve.json
├── pages/               # 页面路由
│   ├── index.astro      # 首页
│   └── tools/
│       └── dog-age-calculator/
│           └── index.astro
├── styles/
│   └── global.css       # Tailwind CSS
public/
├── assets/icons/        # 图标资源
└── favicon.ico
```

## 🎯 功能特点

### 首页
- Hero 区域带渐变背景
- 精选工具卡片展示
- 指南文章预览
- 博客文章和订阅表单
- 信任标识和专家认证

### 狗年龄计算器
- 基于生日和体型的精确计算
- 实时结果显示
- 星座信息展示
- FAQ 问答部分
- 结构化数据支持

## 🔧 配置

项目使用以下配置文件：

- `astro.config.mjs` - Astro 配置
- `tailwind.config.mjs` - Tailwind CSS 配置
- `tsconfig.json` - TypeScript 配置
- `package.json` - 依赖和脚本

## 📱 性能目标

- LCP (Largest Contentful Paint) ≤ 1.5s
- CLS (Cumulative Layout Shift) < 0.1
- Lighthouse Performance Score ≥ 95
- 首屏 JavaScript < 35KB

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目！

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

---

Made with ❤️ for pet parents everywhere.

```sh
pnpm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
