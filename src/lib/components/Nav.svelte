<script>
  import { lang, dict, toggleLang } from "../i18n.js";

  let scrolled = $state(false);
  let mobileOpen = $state(false);
  let activeSection = $state("hero");

  const links = [
    { href: "#about", key: "about" },
    { href: "#crew", key: "crew" },
    { href: "#music", key: "music" },
    { href: "#shows", key: "shows" },
    { href: "#blackfriday", key: "blackfriday" },
    { href: "#contact", key: "contact" },
  ];

  // Track scroll position to toggle the scrolled state
  $effect(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 80;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  // Track active section using IntersectionObserver on the document
  $effect(() => {
    const ids = ["hero", ...links.map((l) => l.href.slice(1))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  });

  function handleClick(e, href) {
    e.preventDefault();
    mobileOpen = false;
    const el = document.querySelector(href);
    if (!el) return;
    const offset = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
    ? 'bg-bg/85 backdrop-blur-md border-b border-line py-3'
    : 'bg-transparent py-5'}"
>
  <div class="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
    <a
      href="#hero"
      onclick={(e) => handleClick(e, "#hero")}
      class="font-display text-2xl tracking-[0.2em] glitch"
      data-text="M.e.B"
      aria-label="M.e.B — home"
    >
      M.e.B
    </a>

    <ul class="hidden md:flex items-center gap-7 font-display tracking-wide">
      {#each links as link}
        <li>
          <a
            href={link.href}
            onclick={(e) => handleClick(e, link.href)}
            class="text-sm uppercase tracking-widest transition-colors {activeSection ===
            link.href.slice(1)
              ? 'text-accent-cyan'
              : 'text-fg-dim hover:text-fg'}"
          >
            {$dict.nav[link.key]}
          </a>
        </li>
      {/each}
      <li>
        <button
          onclick={toggleLang}
          aria-label="Toggle language"
          class="font-mono text-[0.65rem] uppercase tracking-widest border border-line px-2 py-1 hover:border-accent-cyan hover:text-accent-cyan transition-colors"
        >
          {$lang.toUpperCase()}
        </button>
      </li>
    </ul>

    <button
      class="md:hidden text-fg"
      onclick={() => (mobileOpen = !mobileOpen)}
      aria-label="Toggle menu"
      aria-expanded={mobileOpen}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        {#if mobileOpen}
          <path d="M6 6l12 12M6 18L18 6" />
        {:else}
          <path d="M4 6h16M4 12h16M4 18h16" />
        {/if}
      </svg>
    </button>
  </div>

  {#if mobileOpen}
    <ul
      class="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 font-display bg-bg/95 backdrop-blur-md border-t border-line"
    >
      {#each links as link}
        <li>
          <a
            href={link.href}
            onclick={(e) => handleClick(e, link.href)}
            class="block text-sm uppercase tracking-widest transition-colors {activeSection ===
            link.href.slice(1)
              ? 'text-accent-cyan'
              : 'text-fg-dim hover:text-fg'}"
          >
            {$dict.nav[link.key]}
          </a>
        </li>
      {/each}
      <li>
        <button
          onclick={toggleLang}
          class="font-mono text-[0.65rem] uppercase tracking-widest border border-line px-2 py-1 hover:border-accent-cyan hover:text-accent-cyan transition-colors"
        >
          {$lang.toUpperCase()}
        </button>
      </li>
    </ul>
  {/if}
</nav>