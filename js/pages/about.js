// js/pages/about.js — 關於我：個人資料、content/about.md 的內文，以及外部連結。

import { $, el, icon, escapeHtml, loadText } from "../utils/utils.js";
import { getSite } from "../services/data-service.js";
import {
  loadMarkdownLibs, renderMarkdown, enhanceMarkdown, stripFrontmatterComments,
} from "../utils/markdown.js";
import { enableLightbox } from "../ui/lightbox.js";

const ABOUT_MD = "content/about.md";

export async function mountPage() {
  const profileHost = $("#about-profile");
  const bodyHost = $("#about-body");
  const linkHost = $("#about-links");
  const teardown = [];

  try {
    const site = await getSite();
    if (profileHost) profileHost.replaceChildren(profileCard(site));
    if (linkHost) renderLinks(linkHost, site);
  } catch (err) {
    console.error(err);
    if (profileHost) profileHost.innerHTML =
      `<div class="banner banner-danger" role="alert">個人資料載入失敗：${escapeHtml(err.message)}。</div>`;
  }

  // 內文獨立處理：就算 Markdown 函式庫掛了，上面的資料仍然看得到。
  if (bodyHost) {
    try {
      const [libs, md] = await Promise.all([
        loadMarkdownLibs().then(() => true, (err) => { console.warn(err); return false; }),
        loadText(ABOUT_MD),
      ]);
      const source = stripFrontmatterComments(md);
      const content = el("div", { class: "doc-content" });
      if (libs) {
        content.innerHTML = renderMarkdown(source);
        await enhanceMarkdown(content);
        teardown.push(enableLightbox(content));
      } else {
        content.innerHTML = `<pre class="code-block"><code>${escapeHtml(source)}</code></pre>`;
      }
      bodyHost.replaceChildren(content);
    } catch (err) {
      console.error(err);
      bodyHost.innerHTML =
        `<div class="banner banner-warning" role="alert">自我介紹內容載入失敗：${escapeHtml(err.message)}。</div>`;
    }
  }

  return () => { for (const fn of teardown) fn?.(); };
}

function profileCard(site) {
  const p = site.profile || {};
  return el("div", { class: "card profile-card" },
    p.avatar ? el("img", { class: "profile-avatar", src: p.avatar, alt: `${p.name || ""} 的頭像` }) : null,
    el("div", { class: "profile-body" },
      el("p", { class: "profile-eyebrow" }, "About"),
      el("h1", { class: "profile-name" }, p.name || site.title || "alanwu-9582"),
      p.intro ? el("p", { class: "profile-intro" }, p.intro) : null,
      (p.badges || []).length
        ? el("div", { class: "profile-badges" },
          p.badges.map((b) => el("span", { class: "badge" },
            b.icon ? el("span", { class: "badge-emoji" }, b.icon) : null,
            b.text)))
        : null,
    ),
  );
}

function renderLinks(host, site) {
  const links = site.links || [];
  host.replaceChildren();
  if (!links.length) return;
  for (const link of links) {
    const isMail = link.url.startsWith("mailto:");
    const card = el("a", {
      class: "link-card",
      href: link.url,
      target: isMail ? null : "_blank",
      rel: isMail ? null : "noopener noreferrer",
    },
      el("div", { class: "link-card-top" },
        link.logo
          ? el("img", { class: "link-logo", src: link.logo, alt: "", loading: "lazy" })
          : el("span", { class: "link-logo", html: icon("link", { size: "22px" }) }),
        el("span", { class: "link-open" }, isMail ? "寄信" : "開啟連結"),
      ),
      el("h3", { class: "link-name" }, link.label),
      link.desc ? el("p", { class: "link-desc" }, link.desc) : null,
      link.hint ? el("div", { class: "link-hint" }, link.hint) : null,
    );
    if (link.color) card.style.setProperty("--chip-color", link.color);
    host.appendChild(card);
  }
}
