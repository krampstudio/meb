import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import "./lib/i18n.js"; // sets document.documentElement.lang from browser

const app = mount(App, {
  target: document.getElementById("app"),
});

export default app;