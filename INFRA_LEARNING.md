# 從 shoalter-ecommerce-frontend 偷學前端 Infra

> 把公司 monorepo 的 infra 模式搬到 fe-time-tracker 練習用的 roadmap。

## 現況盤點

fe-time-tracker 目前是**單一 Next.js 16 app**（沒有 workspace、沒有 turbo、沒有 CI、沒測試），結構是：

```
app/ (protected-route, login)  components/Navigator  features/timer
hooks/  ui/ (Button/Input/Modal/Select)  utils/(cn, httpRequest)
providers/QueryProvider  types/  proxy.ts
.env.dev / .env.local / .env.prod
```

跟 shoalter 比起來缺的東西：monorepo、turbo、commitlint/husky、vitest、CI、Storybook、release 流程。

---

## 🟢 立刻能做、CP 值最高（不用變 monorepo）

### 1. Commit + Hook 規範
shoalter 用 `commitlint` + `husky` + conventional commits + `standard-version`。
- 裝這套就能：commit 強制格式 → `pnpm release:patch` 自動產 CHANGELOG + bump version + tag。
- 抄 `commitlint.config.js`、root `package.json` 的 `release:*` scripts、`.husky/` 設定。
- side project 練起來最有感，因為 `git log` 立刻變漂亮。

### 2. ESLint / Prettier / tsconfig 集中化
- 模仿 shoalter `packages/eslint-config-custom/index.js` 的 plugin 組合：airbnb + next + import + jsx-a11y + unused-imports。
- Prettier 加 `prettier-plugin-tailwindcss`（已裝但沒設定）。

### 3. Vitest + Testing Library
- shoalter 用 `vitest.workspace.ts` 跨 package 測試，你先做單一 `vitest.config.ts`。
- 從 `ui/Button.tsx` 開始寫第一個 test，學 `@testing-library/react` + `jsdom`。

### 4. Sentry / 環境變數策略
- 你現在 `.env.dev/.env.prod` 不是 Next.js 慣例（Next 用 `.env.development` / `.env.production`）。
- 學 shoalter `turbo.json` 那份 env 清單的精神：把「會影響 build 的環境變數」**顯式宣告**，並區分 `NEXT_PUBLIC_*`（client-side）vs server-only。

---

## 🟡 中等投資、學最多 infra（建議練 ⭐）

### 5. 把 time-tracker 改造成 monorepo
直接重組成：
```
fe-time-tracker/
  pnpm-workspace.yaml
  turbo.json
  apps/web/                 ← 現在的 Next.js app 搬進來
  packages/
    ui/                     ← Button/Input/Modal/Select 抽出來
    utils/                  ← cn, httpRequest 抽出來
    tsconfig/               ← 共用 tsconfig
    eslint-config/          ← 共用 ESLint
```
學到的東西：
- `workspace:*` protocol
- `peerDependencies` 怎麼擺 `react`
- `transpilePackages` 怎麼設定
- turbo `dependsOn: ["^build"]` 為什麼存在

雖然「殺雞用牛刀」，**但這就是練習的目的**——之後在 shoalter 看到 monorepo 就有手感。

### 6. Turborepo pipeline 與 cache
做完上面就順便練 turbo：
- `turbo.json` 裡的 `outputs`、`env`、`dependsOn`
- 跑兩次 build，第二次 cache hit 觀察時間差
- `--filter=web...` 學 filter 語法

### 7. Storybook for `ui/` package
shoalter `turbo.json` outputs 列了 `storybook-static/**`，代表他們有 Storybook。你 4 個 UI 元件正好適合練：
- 一個 component 一個 stories
- 練 a11y addon、interaction tests

---

## 🔴 高投入、暫時不建議（除非要練 DevOps）

- **GitLab CI**：side project 用 GitHub Actions 比較實際，但**精神可以抄**——shoalter `gitlab-ci/*.yml` 的 stage 切法（pre-build → build → test → deploy）轉成 GitHub Actions 的 jobs。
- **ArgoCD / K8s manifests**：side project 通常 deploy Vercel，用不到。
- **Lighthouse CI**（`scripts/parse-lighthouse.js`）：值得抄，PR 自動跑 Lighthouse 把分數貼回 PR comment。

---

## 建議學習路線

| 週次 | 任務 | 預期收穫 |
|------|------|---------|
| 第 1 週 | husky + commitlint + standard-version + 完整 ESLint/Prettier | 兩小時做完，馬上感受到「專業 repo」差異 |
| 第 2 週 | 把 `ui/` 抽成 monorepo package（先一個） | 體驗 `workspace:*`、`transpilePackages`、turbo cache |
| 第 3 週 | Vitest + 一個 GitHub Actions（lint + typecheck + test） | 完成最小 CI 閉環 |
| 第 4 週+ | Storybook、Lighthouse CI、Sentry | 進階 infra 工具鏈 |

---

## 參考檔案速查（在 shoalter repo 內）

- `pnpm-workspace.yaml`、`turbo.json`、`package.json`（root）— monorepo 三件套
- `commitlint.config.js`、`prettier.config.js`、`vitest.workspace.ts` — 工具鏈設定
- `packages/eslint-config-custom/` — 共享 ESLint
- `packages/tsconfig/` — 共享 tsconfig
- `packages/tailwind-config/` — 共享 Tailwind
- `packages/ui/package.json` — peerDependencies + sideEffects 範例
- `gitlab-ci/*.yml` — CI stage 切法
- `scripts/parse-lighthouse.js` + `add-comment.js` — Lighthouse + PR comment
