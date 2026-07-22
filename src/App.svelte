<script>
  import Nav from "./lib/components/Nav.svelte";
  import Scanlines from "./lib/components/Scanlines.svelte";
  import Hero from "./lib/sections/Hero.svelte";
  import About from "./lib/sections/About.svelte";
  import Crew from "./lib/sections/Crew.svelte";
  import Music from "./lib/sections/Music.svelte";
  import Shows from "./lib/sections/Shows.svelte";
  import Gallery from "./lib/sections/Gallery.svelte";
  import Contact from "./lib/sections/Contact.svelte";
  import { dict } from "./lib/i18n.js";
</script>

<!-- Site-wide overlays -->
<Scanlines />

<!-- Sticky navigation -->
<Nav />

<main class="bg-bg text-fg">
  <Hero />
  <About />
  <Crew />
  <Music />
  <Shows />
  <Gallery />
  <Contact />

  <footer
    class="py-10 px-6 text-center font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim border-t border-line"
  >
    {$dict.footer}
  </footer>
</main>