你是一个资深前端开发专家，请用 React + TypeScript + ECharts 创建一个组件：`DogBmiGauge.tsx`，实现以下功能：

---

## 输入参数
```ts
{
  breed: string // 狗狗品种，如 "Beagle"
  sex: "male" | "female"
  weight: number // 体重（kg）
  length: number // 身长（m）
}


⸻

功能逻辑
	1.	使用公式：bmi = weight / (length * length)
	2.	根据 breed + sex 从内置数据表中查找该犬种的推荐体重区间和平均身长，计算推荐 BMI 区间：

idealBmiMin = minWeight / avgLength²
idealBmiMax = maxWeight / avgLength²


	3.	将 BMI 偏离标准值的程度映射为三段仪表盘区间：
	•	偏低（≤ idealBmiMin * 0.9）：蓝色
	•	正常（idealBmiMin ~ idealBmiMax）：绿色
	•	偏高（≥ idealBmiMax * 1.1）：红色

⸻

图表要求
	•	使用 ECharts 实现一个仪表盘（Gauge）图表，显示狗狗当前 BMI 值
	•	用不同颜色区块表示“偏瘦 / 正常 / 肥胖”区间
	•	在图中央显示实际 BMI 数值（保留一位小数）
	•	样式使用 Tailwind CSS，移动端响应式，视觉简洁

⸻

错误处理
	•	如果输入 breed 不在数据中，显示一条提示信息：“该犬种尚不支持”

⸻

数据建议（内置 20 个常见犬种，含体重和身长参考）

const breedData = {
  Beagle: {
    male: { minWeight: 10, maxWeight: 11.5, avgLength: 0.65 },
    female: { minWeight: 9, maxWeight: 10.5, avgLength: 0.62 }
  },
  Labrador: {
    male: { minWeight: 29, maxWeight: 36, avgLength: 1.0 },
    female: { minWeight: 25, maxWeight: 32, avgLength: 0.95 }
  },
  GoldenRetriever: {
    male: { minWeight: 29, maxWeight: 34, avgLength: 1.02 },
    female: { minWeight: 25, maxWeight: 29, avgLength: 0.97 }
  },
  Poodle: {
    male: { minWeight: 20, maxWeight: 32, avgLength: 0.85 },
    female: { minWeight: 18, maxWeight: 27, avgLength: 0.82 }
  },
  Chihuahua: {
    male: { minWeight: 1.5, maxWeight: 3.0, avgLength: 0.3 },
    female: { minWeight: 1.5, maxWeight: 2.7, avgLength: 0.28 }
  },
  Pug: {
    male: { minWeight: 6.3, maxWeight: 8.1, avgLength: 0.55 },
    female: { minWeight: 6.3, maxWeight: 8.1, avgLength: 0.52 }
  },
  Bulldog: {
    male: { minWeight: 23, maxWeight: 25, avgLength: 0.75 },
    female: { minWeight: 18, maxWeight: 23, avgLength: 0.7 }
  },
  Dachshund: {
    male: { minWeight: 7, maxWeight: 14, avgLength: 0.65 },
    female: { minWeight: 6, maxWeight: 13, avgLength: 0.62 }
  },
  ShihTzu: {
    male: { minWeight: 4, maxWeight: 7.2, avgLength: 0.5 },
    female: { minWeight: 4, maxWeight: 6.5, avgLength: 0.48 }
  },
  GermanShepherd: {
    male: { minWeight: 30, maxWeight: 40, avgLength: 1.1 },
    female: { minWeight: 22, maxWeight: 32, avgLength: 1.0 }
  },
  BorderCollie: {
    male: { minWeight: 14, maxWeight: 20, avgLength: 0.85 },
    female: { minWeight: 12, maxWeight: 19, avgLength: 0.82 }
  },
  SiberianHusky: {
    male: { minWeight: 20, maxWeight: 27, avgLength: 1.0 },
    female: { minWeight: 16, maxWeight: 23, avgLength: 0.95 }
  },
  PembrokeWelshCorgi: {
    male: { minWeight: 10, maxWeight: 13.5, avgLength: 0.65 },
    female: { minWeight: 9, maxWeight: 11.5, avgLength: 0.62 }
  },
  Maltese: {
    male: { minWeight: 3, maxWeight: 4, avgLength: 0.4 },
    female: { minWeight: 2.5, maxWeight: 3.5, avgLength: 0.38 }
  },
  YorkshireTerrier: {
    male: { minWeight: 2, maxWeight: 3.5, avgLength: 0.35 },
    female: { minWeight: 2, maxWeight: 3.2, avgLength: 0.33 }
  },
  Rottweiler: {
    male: { minWeight: 45, maxWeight: 60, avgLength: 1.1 },
    female: { minWeight: 35, maxWeight: 48, avgLength: 1.0 }
  },
  FrenchBulldog: {
    male: { minWeight: 9, maxWeight: 14, avgLength: 0.6 },
    female: { minWeight: 8, maxWeight: 13, avgLength: 0.58 }
  },
  BichonFrise: {
    male: { minWeight: 5, maxWeight: 10, avgLength: 0.5 },
    female: { minWeight: 4.5, maxWeight: 9, avgLength: 0.48 }
  },
  Samoyed: {
    male: { minWeight: 20, maxWeight: 30, avgLength: 1.05 },
    female: { minWeight: 16, maxWeight: 24, avgLength: 1.0 }
  },
  ShetlandSheepdog: {
    male: { minWeight: 7, maxWeight: 11, avgLength: 0.7 },
    female: { minWeight: 6, maxWeight: 10, avgLength: 0.67 }
  }
}


⸻

文件输出要求
	•	文件名：DogBmiGauge.tsx
	•	默认导出 React 组件
	•	使用 React Hook 编写（函数式组件）

