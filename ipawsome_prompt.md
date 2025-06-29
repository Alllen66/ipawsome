### 角色
你是一名全栈前端工程师，熟练使用 Astro 4、Tailwind CSS、TypeScript 与 React Islands 架构。请严格遵守下面的技术规格与页面需求，为 “iPawsome” 宠物工具站搭建首批功能。

---

## 0. 项目初始化
1. 使用 **Astro 4 + Tailwind** 模板 (`pnpm create astro@latest`)  
2. 语言 **TypeScript**，包管理 **pnpm**  
3. 目录约定  

src/
pages/
index.astro                       # 首页
tools/
dog-age-calculator/
index.astro                   # 工具页容器
components/
Hero.astro
FeaturedTools.astro
GuideCards.astro
BlogCards.astro
Footer.astro
AgeCalculatorIsland.tsx
data/
tools.json                        # 用于首页 Featured Tools 卡片
ageCurve.json                     # Age 计算数据 (体型分段)
public/
assets/icons/*.svg

---

## 1. 首页（/index.astro）

### 布局
1. **Hero 区**  
- 渐变背景 `bg-gradient-to-r from-blue-700 to-blue-500`  
- `<h1>`：“Free Online Tools for Pawesome Pet Parents”  
- CTA1 主按钮 → `/tools/dog-age-calculator/`  
- CTA2 次按钮 → `/tools/`  

2. **Featured Tools 区**  
- 读取 `data/tools.json`（字段：slug, title, desc, icon）  
- 4 列卡片（小屏 2 列），卡片 hover 有 `shadow-lg translate-y-[-2px]`  

3. **Featured Guides 区**  
- 占位 3 张卡，使用静态数组  
- 显示标签 “GUIDE”、发布日期、读时长  

4. **Latest Blog + Newsletter**  
- 两张 Blog 卡 + 右侧订阅表单（仅收集 email）  

5. **Trust Bar**  
- 3 个媒体徽标（占位）+ “Reviewed by Dr. Jane Smith, DVM” 头像  

6. **Footer**  
- 导航链接：Tools / Guides / Blog / About / Privacy  
- `© 2025 iPawsome`  

### 技术
- 页面默认静态渲染；Tailwind CDN 或 PostCSS 构建  
- 使用 `<picture>` + `webp` LCP 图  
- 加入 `Organization`、`Website` JSON-LD (Astro内联)  

---

## 2. Dog Age Calculator（/tools/dog-age-calculator/）

### 2.1 页面容器 (Astro)
- `<BreadcrumbList>`：Home > Tools > Dog Age Calculator  
- 顶部 `h1`、简短用途描述  
- `<AgeCalculatorIsland />` React 岛挂载点  
- FAQ (3 问答) + `FAQPage` Schema 注入  

### 2.2 React Island (AgeCalculatorIsland.tsx)
```ts
interface Factors { first:number; second:number; k:number }
const map:Record<string,Factors> = {
small:{first:15,second:24,k:4},
medium:{first:15,second:24,k:4},
large:{first:15,second:24,k:5},
giant:{first:12,second:22,k:7},
};
function toHuman(age:number,size:string){
if(age<=1)   return map[size].first*age;
if(age<=2)   return map[size].first+9*(age-1);
return map[size].second+map[size].k*(age-2);
}
export default function AgeCalculatorIsland(){
/* 生日和体型 form，实时输出 犬龄+人龄 */
}

	•	输入：<input type="date"> + <select> 体型
	•	输出：Dog Age: x.y years、≈ Human Age: n years、Zodiac: Capricorn
	•	本地状态 useState；不引入外部库

2.3 样式
	•	表单组件用 shadcn/ui 或 Tailwind 自定
	•	响应式：max-w-md mx-auto

⸻

3. 性能 & 质量门槛
	•	LCP ≤ 1.5 s，CLS < 0.1（Hero 图预留高）
	•	Lighthouse Performance & SEO ≥ 95
	•	ESLint + Prettier 配置
	•	pnpm run build 通过，无 SSR 警告

⸻

4. 交付
	•	提供完整项目结构与代码
	•	在 README 备注安装 (pnpm i) 与本地预览 (pnpm dev) 步骤
	•	所有静态资源 < 200 KB，总 JS 首屏 < 35 KB

开始编码吧！

---

### 使用说明
1. **复制**上方 prompt 整段文字，粘贴到 Cursor (ChatGPT panel)。  
2. 如果要分步骤生成，可在「### 交付」下再补一句 “一步步输出文件”。  
3. AI 生成代码后，`pnpm dev` 本地查看；不满意随时在 Cursor 继续对话增改。  
