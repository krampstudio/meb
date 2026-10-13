import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import "./lib/i18n.js"; // sets document.documentElement.lang from browser

// Clear the build-time prerendered static HTML (Svelte's mount() appends
// rather than replaces, so the container must be emptied first).
const target = document.getElementById("app");
target.replaceChildren();

const app = mount(App, {
  target,
});

export default app;