// js/services/data-service.js — 載入並快取 data/ 底下的 JSON。
//
// data/articles.json 與 data/search-index.json 由 tools/build-data.mjs 產生，
// 請不要手動編輯。

import { loadJSON } from "../utils/utils.js";

const SITE_URL = "data/site.json";
const ARTICLES_URL = "data/articles.json";
const SEARCH_INDEX_URL = "data/search-index.json";
const PORTFOLIO_URL = "data/portfolio.json";

/** 每個網址只抓一次；失敗時把自己清掉，之後重試才有機會成功。 */
function cached() {
  const store = new Map();
  return (url, transform) => {
    if (!store.has(url)) {
      store.set(url, loadJSON(url)
        .then(transform)
        .catch((err) => { store.delete(url); throw err; }));
    }
    return store.get(url);
  };
}
const load = cached();

/** data/site.json 全部內容：個人資料、連結、類別與標籤。 */
export async function getSite() {
  return load(SITE_URL, (data) => data || {});
}

/** labels.js 需要的 { categories, tags }。 */
export async function getConfig() {
  const site = await getSite();
  return { categories: site.categories || {}, tags: site.tags || {} };
}

/** 文章清單，已依發佈日期由新到舊排好。 */
export async function getArticles() {
  return load(ARTICLES_URL, (data) => (Array.isArray(data) ? data : data.articles || []));
}

/**
 * 全文索引：Map<articleId, Array<{h, i, t}>>（標題 / 標題 id / 內文）。
 * 延後載入 —— 只有第一次搜尋要付這個成本。
 */
export async function getSearchIndex() {
  return load(SEARCH_INDEX_URL, (data) =>
    new Map((data.articles || []).map((doc) => [doc.id, doc.blocks || []])));
}

/** data/portfolio.json 的區塊清單。 */
export async function getPortfolio() {
  return load(PORTFOLIO_URL, (data) => (data.sections || []));
}

/** 用 id 找單篇文章。 */
export async function getArticleById(id) {
  const docs = await getArticles();
  return docs.find((doc) => doc.id === id) || null;
}

/**
 * 相鄰文章，給 viewer 的上／下一篇用。
 * 清單是由新到舊，所以「上一篇」是時間上更早的那一篇。
 */
export async function getNeighbours(id) {
  const docs = await getArticles();
  const i = docs.findIndex((doc) => doc.id === id);
  if (i === -1) return { prev: null, next: null };
  return { prev: docs[i + 1] || null, next: docs[i - 1] || null };
}
