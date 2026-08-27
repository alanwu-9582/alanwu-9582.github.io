// js/pages/not-found.js — 不存在的路由。

import { $, icon, escapeHtml } from "../utils/utils.js";

export async function mountPage() {
  const ico = $("#not-found-ico");
  if (ico) ico.innerHTML = icon("alert", { size: "34px" });

  const msg = $("#not-found-msg");
  const raw = location.hash.replace(/^#\/?/, "").split("?")[0];
  if (msg && raw) {
    msg.innerHTML = `找不到 <code>#/${escapeHtml(raw)}</code>。網址可能打錯了，或這個頁面已經移除。`;
  }
  return null;
}
