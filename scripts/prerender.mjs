/**
 * Build-time prerender: renders the Svelte app to static HTML and injects it
 * into dist/index.html so crawlers / agents see real content.
 * On the client, main.js `mount(App)` replaces the prerendered markup.
 *
 * Run after `vite build`.
 */
import { createServer } from "vite";
import { render } from "svelte/server";
import { readFileSync, writeFileSync } from "node:fs";

const vite = await createServer({
  root: process.cwd(),
  logLevel: "error",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.svelte");
  const i18n = await vite.ssrLoadModule("/src/lib/i18n.js");

  // Static HTML is French-first (matches <html lang="fr"> and og:locale).
  // The client still detects the browser language and re-renders on mount.
  i18n.lang.set("fr");

  const { html } = render(App);

  const distIndex = "dist/index.html";
  const file = readFileSync(distIndex, "utf8");
  const marker = '<div id="app"></div>';
  if (!file.includes(marker)) {
    throw new Error(`Marker ${marker} not found in ${distIndex}`);
  }
  writeFileSync(distIndex, file.replace(marker, `<div id="app">${html}</div>`));
  console.log(`Prerendered ${html.length} bytes into ${distIndex}`);
} finally {
  await vite.close();
}
