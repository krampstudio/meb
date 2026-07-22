<script>
  import SectionTitle from "../components/SectionTitle.svelte";
  import { dict } from "../i18n.js";

  /**
   * Black Friday = the day after the US Thanksgiving (4th Thursday of November).
   * Compute the date for a given year.
   */
  function blackFridayForYear(year) {
    const nov1 = new Date(year, 10, 1);
    const dow = nov1.getDay(); // 0 = Sun … 4 = Thu
    const firstThursday = 1 + ((4 - dow + 7) % 7);
    const fourthThursday = firstThursday + 21; // +3 weeks
    return new Date(year, 10, fourthThursday + 1); // Friday after Thanksgiving
  }

  function nextBlackFriday(from = new Date()) {
    const thisYear = blackFridayForYear(from.getFullYear());
    // From Black Friday 00:00 onwards of this year → look ahead to next year
    const y = from.getFullYear();
    if (from.getTime() >= thisYear.getTime()) {
      return blackFridayForYear(y + 1);
    }
    return thisYear;
  }

  const target = nextBlackFriday();

  const parts = $state({ d: 0, h: 0, m: 0, s: 0 });
  let playing = $state(false);
  let audio = $state(null);

  $effect(() => {
    let raf;
    let alive = true;

    const tick = () => {
      if (!alive) return;
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());
      const s = Math.floor(diff / 1000);
      parts.d = Math.floor(s / 86400);
      parts.h = Math.floor((s % 86400) / 3600);
      parts.m = Math.floor((s % 3600) / 60);
      parts.s = s % 60;
      raf = setTimeout(tick, 1000);
    };
    tick();

    return () => {
      alive = false;
      clearTimeout(raf);
    };
  });

  const pad = (n) => String(n).padStart(2, "0");

  function togglePlay() {
    // Sample wiring placeholder — the actual audio src will be added later.
    // When an <audio> element with the sample exists, this will toggle play/pause.
    if (!audio) {
      playing = !playing; // visual placeholder toggle
      return;
    }
    if (audio.paused) {
      audio.play();
      playing = true;
    } else {
      audio.pause();
      playing = false;
    }
  }
</script>

<section id="blackfriday" class="py-24 md:py-40 px-6">
  <div class="max-w-4xl mx-auto text-center">
    <SectionTitle text={$dict.blackfriday.title} />

    <p
      class="mt-8 font-mono text-xs md:text-sm uppercase tracking-widest text-fg-dim"
    >
      {$dict.blackfriday.tagline}
    </p>

    <!-- Countdown -->
    {#if parts.d > 0 || parts.h > 0 || parts.m > 0 || parts.s > 0}
      <p
        class="mt-12 font-mono text-[0.7rem] md:text-xs uppercase tracking-[0.3em] text-accent-cyan"
      >
        {$dict.blackfriday.dropsIn}
      </p>
      <div
        class="mt-5 flex items-end justify-center gap-3 md:gap-6 font-display select-none"
      >
        <div class="flex flex-col items-center">
          <span
            class="text-5xl md:text-7xl leading-none tabular-nums glitch"
            data-text={pad(parts.d)}
          >
            {pad(parts.d)}
          </span>
          <span
            class="mt-2 font-mono text-[0.55rem] md:text-xs uppercase tracking-widest text-fg-dim"
          >
            {$dict.blackfriday.days}
          </span>
        </div>
        <span class="text-3xl md:text-5xl text-fg-dim/40 pb-1">:</span>
        <div class="flex flex-col items-center">
          <span
            class="text-3xl md:text-5xl leading-none tabular-nums text-fg/90"
          >
            {pad(parts.h)}
          </span>
          <span
            class="mt-2 font-mono text-[0.55rem] md:text-xs uppercase tracking-widest text-fg-dim"
          >
            {$dict.blackfriday.hrs}
          </span>
        </div>
        <span class="text-3xl md:text-5xl text-fg-dim/40 pb-1">:</span>
        <div class="flex flex-col items-center">
          <span
            class="text-3xl md:text-5xl leading-none tabular-nums text-fg/90"
          >
            {pad(parts.m)}
          </span>
          <span
            class="mt-2 font-mono text-[0.55rem] md:text-xs uppercase tracking-widest text-fg-dim"
          >
            {$dict.blackfriday.min}
          </span>
        </div>
        <span class="text-3xl md:text-5xl text-fg-dim/40 pb-1">:</span>
        <div class="flex flex-col items-center">
          <span
            class="text-3xl md:text-5xl leading-none tabular-nums text-fg/90"
          >
            {pad(parts.s)}
          </span>
          <span
            class="mt-2 font-mono text-[0.55rem] md:text-xs uppercase tracking-widest text-fg-dim"
          >
            {$dict.blackfriday.sec}
          </span>
        </div>
      </div>
    {:else}
      <p class="mt-12 font-display text-2xl md:text-3xl text-accent-cyan">
        {$dict.blackfriday.itsToday}
      </p>
    {/if}

    <!-- Play-sample placeholder (audio src to be wired in later) -->
    <button
      onclick={togglePlay}
      class="mt-14 inline-flex items-center gap-3 border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-bg transition-colors px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-widest"
    >
      {#if playing}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <rect x="2" y="1" width="3" height="12" />
          <rect x="9" y="1" width="3" height="12" />
        </svg>
        <span>{$dict.blackfriday.pause}</span>
      {:else}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <path d="M2 1l11 6-11 6V1z" />
        </svg>
        <span>{$dict.blackfriday.play}</span>
      {/if}
    </button>
    <p class="mt-3 font-mono text-[0.55rem] uppercase tracking-widest text-fg-dim/60">
      {$dict.blackfriday.sampleSoon}
    </p>

    <!-- TODO: wire the real sample here and remove the placeholder toggle above.
         <audio bind:this={audio} src="...black-friday-sample.mp3" preload="none"></audio>
    -->
  </div>
</section>