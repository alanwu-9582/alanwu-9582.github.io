# alanwu-9582.github.io

個人網站：純靜態、沒有後端，直接部署在 GitHub Pages（repo 根目錄就是站台根目錄）。
文章用 Markdown 寫，前端用 hash 路由（`#/home`、`#/articles`、`#/article?id=…`）在瀏覽器端渲染。

## 本機預覽

必須用 HTTP 伺服器開，直接用 `file://` 會因為瀏覽器限制而載入失敗。

```bash
npx --yes http-server . -p 8788 -c-1
```

## 新增一篇文章

### 1. 寫檔案

在 `content/articles/` 下建立 `.md`，檔名用小寫英文加底線或連字號，例如 `pwnagotchi.md`。
可以放進子資料夾（例如 `content/articles/study/`）分類，網址不受影響。

### 2. 填檔頭

檔案最上方用註解寫下文章資訊，**列表、搜尋、RSS 全都是從這裡自動產生的**：

```md
<!-- title: Pwnagotchi -->
<!-- description: Pwnagotchi 簡易配置教學 -->
<!-- category: Hacking -->
<!-- tags: programming -->
<!-- published time: 2024/10/18 -->
<!-- cover: pwnagotchi_cover.gif -->
```

| 欄位 | 必填 | 說明 |
| --- | --- | --- |
| `title` | 是 | 顯示的標題。 |
| `description` | 建議 | 一句話說明，會出現在列表與首頁卡片。 |
| `category` | 是 | 定義在 `data/site.json` 的 `categories`。 |
| `tags` | 建議 | 逗號分隔，可多個；定義在 `data/site.json` 的 `tags`。 |
| `published time` | 是 | 發佈日期，格式 `年/月/日`。 |
| `cover` | 否 | 封面圖。只寫檔名時會去 `assets/images/covers/` 找。 |

「最後更新」不用自己填，會從 git 紀錄自動抓。

### 3. 放圖片

圖片放在 `assets/images/articles/`，建議每篇文章一個資料夾：

```text
assets/images/articles/pwnagotchi/wiring.png
```

文章裡用相對路徑就好（會自動補上 `assets/images/articles/`）：

```md
![接線方式](pwnagotchi/wiring.png)
```

方括號裡填簡短說明，滑鼠移到圖片上會顯示，點圖片可以放大。

### 4. 更新資料

```bash
node tools/build-data.mjs
```

會重新產生三個檔案：

- `data/articles.json` — 文章清單
- `data/search-index.json` — 全文搜尋索引（內文與程式碼都會被搜到）
- `feed.xml` — RSS

**這三個檔案是自動產生的，不要手動編輯。** 出現 `⚠` 開頭的訊息就照著修。
想確認有沒有忘記更新：

```bash
node tools/build-data.mjs --check
```

## 改站台內容

| 想改什麼 | 改哪裡 |
| --- | --- |
| 名字、簡介、頭像、badge | `data/site.json` 的 `profile` |
| 社群連結卡片 | `data/site.json` 的 `links` |
| 類別與標籤（名稱、顏色） | `data/site.json` 的 `categories` / `tags` |
| 自我介紹內文 | `content/about.md` |
| 作品集的專案與影片 | `data/portfolio.json` |
| 顏色、字體、圓角、間距 | `css/theme.css`（全站唯一的來源） |

## 專案結構

```text
content/articles/   文章原始檔（.md）
content/about.md    About 頁的自我介紹內文
assets/images/      頭像、封面、文章插圖、連結 logo
assets/files/       文章內嵌的 PDF 等檔案
data/               設定與自動產生的資料
  site.json           個人資料、連結、類別與標籤（手動維護）
  portfolio.json      作品集（手動維護）
  articles.json       自動產生，勿手動編輯
  search-index.json   自動產生，勿手動編輯
tools/build-data.mjs  產生上面兩個 JSON 與 feed.xml
js/                 前端程式（core 路由 / pages 各頁 / ui 元件 / utils 工具）
css/                樣式（theme 變數 / layout / components / articles / viewer / pages）
pages/              各頁面的 HTML 片段
sw.js               離線快取
feed.xml            自動產生的 RSS
```

## 離線支援

網站有註冊 Service Worker（`sw.js`）：有網路時一律讀最新版本，沒網路時用先前載入過的內容。
改動 `sw.js` 的 `SHELL` 清單時，記得把 `CACHE_VERSION` 往上加一版。
