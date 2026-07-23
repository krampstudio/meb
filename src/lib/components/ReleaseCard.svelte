<script>
  /** @type {{ title: string, date?: string, tracks?: number, cta?: string, comingSoon?: boolean, soonLabel?: string, tag?: string }} */
  let { title, date, tracks, cta, comingSoon, soonLabel, tag } = $props();
</script>

<article class="group border border-line bg-bg-alt flex flex-col">
  <div
    class="aspect-square relative overflow-hidden flex items-center justify-center"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-accent-cyan/30 via-bg to-accent-red/30 group-hover:from-accent-cyan/50 group-hover:to-accent-red/50 transition-all duration-500"
    ></div>
    <span
      class="relative font-display text-3xl md:text-4xl tracking-widest glitch"
      data-text={title}
    >
      {title}
    </span>
  </div>
  <div
    class="p-4 flex items-center justify-between gap-4 border-t border-line"
  >
    <div>
      <h3 class="font-display text-lg tracking-wider leading-none">{title}</h3>
      <p
        class="mt-1 font-mono text-[0.65rem] text-fg-dim uppercase tracking-widest"
      >
        {#if comingSoon}
          {tag ?? soonLabel}
        {:else}
          {date} · {tracks} tracks
        {/if}
      </p>
    </div>
    {#if comingSoon}
      <span
        class="font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim border border-line px-3 py-1 cursor-not-allowed select-none"
        aria-disabled="true"
        title={soonLabel}
      >
        {soonLabel}
      </span>
    {:else}
      <a
        href="#"
        class="font-mono text-[0.65rem] uppercase tracking-widest text-accent-cyan hover:text-fg border border-accent-cyan hover:border-fg px-3 py-1 transition-colors"
      >
        {cta} →
      </a>
    {/if}
  </div>
</article>