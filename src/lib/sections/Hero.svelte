<script>
  import { dict } from "../i18n.js";
</script>

<section
  id="hero"
  class="relative min-h-dvh w-full overflow-hidden flex items-center justify-center"
>
  <!-- Background photo -->
  <div class="absolute inset-0">
    <img
      src="assets/meb-visu.png"
      alt=""
      aria-hidden="true"
      class="w-full h-full object-cover object-center"
    />
    <!-- darken so the wordmark reads -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-bg"
    ></div>
  </div>

  <!-- Wordmark + tagline -->
  <div class="relative z-10 text-center px-6 -translate-y-8">
    <h1
      class="glitch glitch-strong font-display tracking-[0.15em] leading-none text-[clamp(5rem,18vw,16rem)]"
      data-text="M.e.B"
    >
      M.e.B
    </h1>
    <p
      class="mt-6 font-display text-lg md:text-2xl tracking-[0.3em] text-fg/90 uppercase"
    >
      {$dict.hero.tagline}
    </p>
  </div>

  <!-- Scroll indicator -->
  <button
    class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
    onclick={() => {
      const el = document.getElementById("about");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }}
    aria-label={$dict.hero.scroll}
  >
    <span
      class="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim"
    >
      {$dict.hero.scroll}
    </span>
    <svg
      class="animate-bounce"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
    >
      <path d="M10 4v12M5 11l5 5 5-5" />
    </svg>
  </button>
</section>