// js/pages/home.js — 首頁：自我介紹、最新文章、精選專案、外部連結。

import { $, el, icon, escapeHtml, formatDate, readingLabel } from "../utils/utils.js";
import { getSite, getArticles, getPortfolio, getConfig } from "../services/data-service.js";
import { categoryTag } from "../ui/labels.js";

const LATEST_COUNT = 4;
const FEATURED_PROJECTS = 3;

export async function mountPage({ routeTo }) {
  const host = $("#home");
  if (!host) return null;

  try {
    const [site, articles, sections, config] = await Promise.all([
      getSite(), getArticles(), getPortfolio(), getConfig(),
    ]);

    host.replaceChildren(
      profileCard(site),
      statsRow(site, articles, sections),
      ...latestSection(articles, config, routeTo),
      ...projectsSection(sections),
      ...linksSection(site),
    );
  } catch (err) {
    console.error(err);
    host.innerHTML =
      `<div class="banner banner-danger" role="alert">首頁資料載入失敗：${escapeHtml(err.message)}。請確認網路連線，並以 HTTP 伺服器開啟（不要用 file://）後重新整理。</div>`;
  }
  return null;
}

/* ---------------- 自我介紹 ---------------- */

function profileCard(site) {
  const p = site.profile || {};
  return el("section", { class: "card profile-card" },
    p.avatar ? el("img", { class: "profile-avatar", src: p.avatar, alt: `${p.name || ""} 的頭像` }) : null,
    el("div", { class: "profile-body" },
      el("p", { class: "profile-eyebrow" }, site.tagline || "Personal site"),
      el("h1", { class: "profile-name" }, p.name || site.title || "alanwu-9582"),
      p.intro ? el("p", { class: "profile-intro" }, p.intro) : null,
      (p.badges || []).length
        ? el("div", { class: "profile-badges" },
          p.badges.map((b) => el("span", { class: "badge" },
            b.icon ? el("span", { class: "badge-emoji" }, b.icon) : null,
            b.text)))
        : null,
      el("div", { class: "profile-actions" },
        el("a", { class: "btn btn-primary", href: "#/articles" },
          el("span", { class: "btn-ico", html: icon("book", { size: "15px" }) }), "看文章"),
        el("a", { class: "btn btn-ghost", href: "#/portfolio" },
          el("span", { class: "btn-ico", html: icon("briefcase", { size: "15px" }) }), "Portfolio"),
        el("a", { class: "btn btn-ghost", href: "#/about" },
          el("span", { class: "btn-ico", html: icon("user", { size: "15px" }) }), "About"),
      ),
    ),
  );
}

function statsRow(site, articles, sections) {
  const projects = sections
    .filter((s) => s.type === "projects")
    .reduce((n, s) => n + (s.items || []).length, 0);
  const latest = articles[0]?.updatedDate || articles[0]?.publishedDate;

  const stats = [
    { value: String(articles.length), label: "篇文章" },
    { value: String(Object.keys(site.tags || {}).length), label: "個標籤" },
    { value: String(projects), label: "個專案" },
    { value: latest ? formatDate(latest) : "—", label: "最後更新" },
  ];
  return el("div", { class: "home-stats" },
    stats.map((s) => el("div", { class: "stat-card" },
      el("div", { class: "stat-value" }, s.value),
      el("div", { class: "stat-label" }, s.label),
    )));
}

/* ---------------- 最新文章 ---------------- */

function latestSection(articles, config, routeTo) {
  const head = el("div", { class: "section-head" },
    el("div", {},
      el("h2", { class: "section-title" }, "最新文章"),
      el("p", { class: "section-desc" }, "筆記、教學，還有一些做到一半的東西。"),
    ),
    el("a", { class: "section-more", href: "#/articles" }, "全部文章 →"),
  );

  if (!articles.length) {
    return [head, el("div", { class: "state-block" },
      el("span", { class: "ico", html: icon("book", { size: "34px" }) }),
      el("div", { class: "st-title" }, "還沒有文章"),
      el("div", { class: "st-msg" }, "把 .md 放進 content/articles/ 之後執行 node tools/build-data.mjs。"),
    )];
  }

  const grid = el("div", { class: "post-grid" },
    articles.slice(0, LATEST_COUNT).map((doc) => postCard(doc, config, routeTo)));
  return [head, grid];
}

function postCard(doc, config, routeTo) {
  return el("a", {
    class: "post-card",
    href: `#/article?id=${encodeURIComponent(doc.id)}`,
    onclick: (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      routeTo("article", { id: doc.id });
    },
  },
    el("div", { class: "post-card-top" },
      categoryTag(doc.category, config),
      el("time", { class: "post-card-date", datetime: doc.publishedDate }, formatDate(doc.publishedDate)),
    ),
    el("h3", { class: "post-card-title" }, doc.title),
    doc.description ? el("p", { class: "post-card-desc" }, doc.description) : null,
    el("div", { class: "post-card-foot" },
      el("span", { class: "post-card-time" }, readingLabel(doc.readingMinutes)),
    ),
  );
}

/* ---------------- 精選專案 ---------------- */

function projectsSection(sections) {
  const projects = sections
    .filter((s) => s.type === "projects")
    .flatMap((s) => s.items || [])
    .slice(0, FEATURED_PROJECTS);
  if (!projects.length) return [];

  const head = el("div", { class: "section-head" },
    el("div", {},
      el("h2", { class: "section-title" }, "專案"),
      el("p", { class: "section-desc" }, "一些 vibe coding"),
    ),
    el("a", { class: "section-more", href: "#/portfolio" }, "全部作品 →"),
  );
  const grid = el("div", { class: "project-grid" }, projects.map(projectCard));
  return [head, grid];
}

function projectCard(item) {
  return el("a", {
    class: "project-card",
    href: item.link,
    target: "_blank",
    rel: "noopener noreferrer",
  },
    item.cover ? el("img", { class: "project-cover", src: item.cover, alt: "", loading: "lazy" }) : null,
    el("div", { class: "project-body" },
      el("h3", { class: "project-name" }, item.name),
      item.desc ? el("p", { class: "project-desc" }, item.desc) : null,
      el("div", { class: "project-foot" },
        (item.tech || []).map((t) => el("span", { class: "badge" }, t)),
        el("span", { class: "project-hint" }, "開啟連結 ↗"),
      ),
    ),
  );
}

/* ---------------- 連結 ---------------- */

function linksSection(site) {
  const links = site.links || [];
  if (!links.length) return [];
  const head = el("div", { class: "section-head" },
    el("div", {}, el("h2", { class: "section-title" }, "一些連結")),
  );
  const row = el("div", { class: "link-row" }, links.map((link) => {
    const pill = el("a", {
      class: "link-pill",
      href: link.url,
      target: link.url.startsWith("mailto:") ? null : "_blank",
      rel: "noopener noreferrer",
    },
      link.logo ? el("img", { src: link.logo, alt: "", loading: "lazy" }) : null,
      link.label,
    );
    if (link.color) pill.style.setProperty("--chip-color", link.color);
    return pill;
  }));
  return [head, row];
}
