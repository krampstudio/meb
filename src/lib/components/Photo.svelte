<script>
  /** @type {{ name: string, instrument: string, bio?: string, flipHint?: string, flipBack?: string, photo?: string }} */
  let { name, instrument, bio, flipHint, flipBack, photo } = $props();

  const src = photo ?? `assets/photos/${name.toLowerCase()}-back.jpg`;

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

    <!-- Back: bio -->
    <div class="crew-card__face crew-card__face--back">
      <div class="aspect-[3/4] flex flex-col justify-between p-4">
        <div>
          <h3
            class="font-display text-2xl tracking-wider leading-none text-accent-cyan glitch"
            data-text={name}
          >
            {name}
          </h3>
          <p
            class="mt-1 font-mono text-[0.6rem] text-fg-dim uppercase tracking-widest"
          >
            {instrument}
          </p>
        </div>
        <p class="text-sm md:text-base leading-relaxed text-fg/85 font-light">
          {bio}
        </p>
        <span
          class="font-mono text-[0.55rem] uppercase tracking-widest text-fg-dim/70 self-end border border-line/60 px-1.5 py-0.5"
        >
          {flipBack ?? ""}
        </span>
      </div>
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
    transform: rotateY(180deg);
    background: var(--color-bg);
    border: 1px solid var(--color-line);
    overflow: hidden;
  }
</style>