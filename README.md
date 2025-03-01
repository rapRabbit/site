# 外贸独立站

## 技术栈

- Nuxt 3
- Vue 3
- TypeScript
- Tailwind CSS
- Pinia
- Nuxt UI
- Nuxt Image
- Nuxt Icon

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## TypeScript 类型问题解决方案

在 Nuxt 3 项目中，由于自动导入功能，TypeScript 可能会报告找不到某些函数或变量的错误。这些错误通常不会影响项目的实际运行，但会影响开发体验。

我们采用了以下方法解决这些问题：

1. **全局类型声明**：在 `types/global.d.ts` 文件中声明了常用的 Vue 和 Nuxt 函数。

2. **配置 tsconfig.json**：添加了必要的类型库和配置选项。

3. **配置 app.config.ts**：用于应用主题配置。

4. **配置 nuxt.config.ts 的 imports 选项**：明确指定了需要自动导入的函数和目录。

5. **创建 plugins/types.ts**：用于增强 TypeScript 类型支持。

如果您在开发过程中遇到类型错误，可以尝试以下方法：

- 检查 `types/global.d.ts` 文件，确保缺失的函数或变量已在其中声明。
- 在 `nuxt.config.ts` 的 `imports.imports` 数组中添加需要自动导入的函数。
- 如果是特定模块的类型问题，可以在 `tsconfig.json` 的 `types` 数组中添加相应的类型库。

## 项目结构

```
├── app.config.ts          # 应用配置
├── app.vue                # 应用入口
├── components/            # 组件目录
├── composables/           # 组合式函数
├── layouts/               # 布局组件
├── pages/                 # 页面组件
├── plugins/               # 插件
├── public/                # 静态资源
├── server/                # 服务器端代码
├── stores/                # Pinia 状态管理
└── types/                 # 类型声明
```
