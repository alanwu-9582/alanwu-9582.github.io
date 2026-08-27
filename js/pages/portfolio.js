// js/pages/portfolio.js — 作品集：專案卡與遊戲影片，內容來自 data/portfolio.json。

import { $, el, icon, escapeHtml } from "../utils/utils.js";
import { getPortfolio } from "../services/data-service.js";

export async function mountPage() {
  const host = $("#portfolio");
  if (!host) return null;

  try {
    const sections = await getPortfolio();
    host.replaceChildren();
    if (!sections.length) {
      host.appendChild(el("div", { class: "state-block" },
        el("span", { class: "ico", html: icon("briefcase", { size: "34px" }) }),
        el("div", { class: "st-title" }, "還沒有作品"),
        el("div", { class: "st-msg" }, "在 data/portfolio.json 的 sections 加一筆就會出現在這裡。"),
      ));
      return null;
    }
    for (const section of sections) host.append(...renderSection(section));
  } catch (err) {
    console.error(err);
    host.innerHTML =
      `<div class="banner banner-danger" role="alert">作品集載入失敗：${escapeHtml(err.message)}。請確認網路連線後重新整理頁面。</div>`;
  }
  return null;
}

function renderSection(section) {
  const head = el("div", { class: "section-head", id: section.id || null },
    el("div", {},
      el("h2", { class: "section-title" }, section.title || "未命名區塊"),
      section.desc ? el("p", { class: "section-desc" }, section.desc) : null,
    ),
  );

  if (section.type === "videos") {
    return [head, ...(section.groups || []).map(videoGroup)];
  }
  return [head, el("div", { class: "project-grid" }, (section.items || []).map(projectCard))];
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

function videoGroup(group) {
  return el("div", { class: "video-group" },
    group.name ? el("h3", { class: "video-group-title" }, group.name) : null,
    el("div", { class: "video-grid" }, (group.items || []).map((item) => el("div", { class: "video-card" },
      el("div", { class: "video-frame" },
        // 只有真的捲到這裡才載入 embed，首屏不會被一堆 iframe 拖慢。
        el("iframe", {
          src: item.embed,
          title: item.name || "影片",
          loading: "lazy",
          allow: "accelerometer; clipboard-write; encrypted-media; picture-in-picture; web-share",
          referrerpolicy: "strict-origin-when-cross-origin",
          allowfullscreen: "",
        }),
      ),
      item.name ? el("p", { class: "video-name" }, item.name) : null,
    ))),
  );
}
