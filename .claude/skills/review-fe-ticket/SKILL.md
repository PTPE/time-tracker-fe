---
name: review-fe-ticket
description: 對照 Jira ticket 的 Acceptance Criteria，review 目前 branch 的前端業務邏輯是否符合需求。當使用者說「review 前端」、「幫我看前端有沒有符合票」、「check FE」時使用此 skill。只檢查業務邏輯，不檢查 code 品質。
---

# Review FE — 前端業務邏輯 Review

對照 Jira ticket 的 AC，檢查目前 branch 的前端 code 有沒有實作到每一條需求。

**重要：這是 review 任務，不是實作任務。拿到 ticket 內容後不要詢問使用者是否要實作，直接繼續執行所有步驟，最後輸出 review 結果。**

## 流程（全部自動執行，不中途詢問）

### Step 1：取得 Ticket 號碼

```bash
git branch --show-current
```

從 branch 名稱解析 ticket 號碼，格式為 `feature/TT-XX-xxx`，取出 `TT-XX`。

若 branch 名稱無法解析，請使用者手動提供 ticket 號碼。

### Step 2：從 Jira 拉 AC

使用 Atlassian MCP 工具拉取 ticket 內容：

```
getJiraIssue(issueIdOrKey: "TT-XX")
```

從 description 中取出 **Acceptance Criteria** 區塊，列出所有 `[ ]` 項目。

若 ticket 沒有 AC，告知使用者並停止。有 AC 則**立即繼續 Step 3，不詢問任何問題**。

### Step 3：取得 Git Diff

```bash
git diff main...HEAD
```

這會拿到這張票相對於 main 的所有前端變更。若 diff 太大，先列出變更的檔案清單讓使用者確認範圍。

### Step 4：逐條判斷 AC

針對每一條 AC，判斷 git diff 的 code 是否有對應的業務邏輯實作。

**前端業務邏輯檢查重點：**

- 這條 AC 描述的 UI 行為，在 code 裡有沒有對應的實作
- API 呼叫時機是否正確（例如：頁面載入時有沒有呼叫 GET，送出後有沒有呼叫 POST）
- 呼叫的是正確的 API endpoint（對照 AC 裡寫的 endpoint）
- 按鈕 disabled 狀態是否依照 AC 的條件控制
- 表單驗證邏輯是否符合需求（例如：結束時間不能早於開始時間）
- 條件渲染是否正確（例如：時薪未設定時顯示 `—`）

**不檢查的項目（交給其他 review skill）：**

- TypeScript type 定義
- loading / error state 的 UI 呈現
- code 風格、命名
- 401 處理、token 管理

### Step 5：輸出結果

格式如下：

```
## TT-XX Review 結果（前端）

✅ [AC 內容] — 說明在哪裡實作到
❌ [AC 內容] — 說明為什麼沒有做到
⚠️  [AC 內容] — 說明部分實作，缺少什麼

---
總結：X / Y 條 AC 通過
待補：[列出 ❌ 和 ⚠️ 的項目]
```

只說明問題在哪，不幫使用者修改 code。
