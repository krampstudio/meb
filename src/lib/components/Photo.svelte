<script>
  /** @type {{ name: string, instrument: string, flipHint?: string, flipBack?: string, photo?: string }} */
  let { name, instrument, flipHint, flipBack, photo } = $props();

  const src = photo ?? `assets/photos/${name.toLowerCase()}-back.jpg`;
  const frontSrc = `assets/photos/${name.toLowerCase()}-front.jpg`;

  let flipped = $state(false);
</script>

<article
  class="crew-card group relative border border-line bg-bg-alt cursor-pointer select-none"
  onclick={() => (flipped = !flipped)}
  onkeydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flipped = !flipped;
    }
  }}
  role="button"
  tabindex="0"
  aria-pressed={flipped}
  aria-label="{name} — {instrument}"
>
  <div class="crew-card__inner" class:flipped>
    <!-- Front: photo -->
    <div class="crew-card__face crew-card__face--front">
      <div class="aspect-[3/4] overflow-hidden">
        <img
          {src}
          alt="{name} — {instrument}"
          loading="lazy"
          class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
      </div>
      <div
        class="absolute inset-x-0 bottom-0 bg-bg/90 border-t border-line p-3 backdrop-blur-sm"
      >
        <h3 class="font-display text-xl tracking-wider leading-none">
          {name}
        </h3>
        <p
          class="mt-1 font-mono text-[0.65rem] text-fg-dim uppercase tracking-widest"
        >
          {instrument}
        </p>
      </div>
      <span
        class="absolute top-2 right-2 font-mono text-[0.55rem] uppercase tracking-widest text-fg-dim/70 border border-line/60 bg-bg/40 px-1.5 py-0.5 backdrop-blur-sm pointer-events-none"
      >
        {flipHint ?? ""}
      </span>
    </div>

    <!-- Back: same photo, super distorted glitch -->
    <div class="crew-card__face crew-card__face--back">
      <div
        class="glitch-img"
        style="--glitch-src: url('{frontSrc}')"
      >
        <div class="glitch-img__base"></div>
        <div class="glitch-img__rgb glitch-img__r"></div>
        <div class="glitch-img__rgb glitch-img__g"></div>
        <div class="glitch-img__rgb glitch-img__b"></div>
        <div class="glitch-img__scan"></div>
      </div>
      <span
        class="absolute top-2 left-2 z-20 font-mono text-[0.55rem] uppercase tracking-widest text-accent-red bg-bg/60 px-1.5 py-0.5 pointer-events-none"
      >
        {flipBack ?? ""}
      </span>
    </div>
  </div>
</article>

<style>
  .crew-card {
    perspective: 1200px;
  }
  .crew-card__inner {
    position: relative;
    width: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .crew-card__inner.flipped {
    transform: rotateY(180deg);
  }
  .crew-card__face {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .crew-card__face--back {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: var(--color-bg);
    border: 1px solid var(--color-line);
  }

  /* --- Super-distorted glitch image (back face) --- */
  .glitch-img {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .glitch-img__base,
  .glitch-img__rgb {
    position: absolute;
    inset: -10px; /* bleed room for jitter */
    background-image: var(--glitch-src);
    background-size: cover;
    background-position: center;
  }
  .glitch-img__base {
    filter: contrast(2.2) saturate(2.6) brightness(0.8) hue-rotate(-12deg);
    animation: glitch-jitter 0.32s steps(2, end) infinite;
  }
  /* RGB-split ghosts — same image, screen-blended, hue-pushed, offset & jittered */
  .glitch-img__rgb {
    mix-blend-mode: screen;
    opacity: 0.9;
  }
  .glitch-img__r {
    filter: brightness(1.1) sepia(1) hue-rotate(-50deg) saturate(4);
    animation: glitch-r 0.28s steps(2, end) infinite;
  }
  .glitch-img__g {
    filter: brightness(1) sepia(1) hue-rotate(70deg) saturate(5);
    animation: glitch-g 0.34s steps(2, end) infinite;
  }
  .glitch-img__b {
    filter: brightness(1.15) sepia(1) hue-rotate(170deg) saturate(5);
    animation: glitch-b 0.26s steps(2, end) infinite;
  }

  /* drifting scanline overlay */
  .glitch-img__scan {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) 2px,
      rgba(0, 0, 0, 0.4) 3px,
      rgba(0, 0, 0, 0.4) 4px
    );
    mix-blend-mode: multiply;
    animation: scan-drift 1.6s linear infinite;
    pointer-events: none;
  }

  @keyframes glitch-jitter {
    0%, 100% { transform: translate(0, 0) skewX(0); }
    20%      { transform: translate(-3px, 2px) skewX(-3deg); }
    40%      { transform: translate(4px, -1px) scale(1.04); }
    60%      { transform: translate(-2px, 2px) skewX(2deg); }
    80%      { transform: translate(2px, -2px) scale(1.02); }
  }
  @keyframes glitch-r {
    0%, 100% { transform: translateX(-12px) skewX(-4deg); }
    50%      { transform: translateX(16px) skewX(3deg) scale(1.06); }
  }
  @keyframes glitch-g {
    0%, 100% { transform: translate(10px, 2px); }
    50%      { transform: translate(-14px, -3px) skewX(-2deg); }
  }
  @keyframes glitch-b {
    0%, 100% { transform: translate(14px, -2px) skewX(4deg); }
    50%      { transform: translate(-10px, 2px) scale(1.05); }
  }
  @keyframes scan-drift {
    from { background-position-y: 0; }
    to   { background-position-y: 10px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .glitch-img__r,
    .glitch-img__g,
    .glitch-img__b,
    .glitch-img__scan { animation: none; }
  }
</style>