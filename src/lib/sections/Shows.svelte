<script>
  import SectionTitle from "../components/SectionTitle.svelte";
  import ShowRow from "../components/ShowRow.svelte";
  import { dict } from "../i18n.js";
</script>

<section id="shows" class="py-24 md:py-40 px-6 bg-bg-alt">
  <div class="max-w-5xl mx-auto">
    <SectionTitle text={$dict.shows.title} />

    <!-- Upcoming -->
    <div class="mt-16">
      <h3
        class="font-mono text-xs uppercase tracking-widest text-accent-cyan"
      >
        {$dict.shows.upcoming}
      </h3>
      <p
        class="mt-4 font-display text-lg md:text-2xl tracking-wide text-fg/90"
      >
        {$dict.shows.stayTuned}
      </p>
    </div>

    <!-- Past shows -->
    <div class="mt-16">
      <h3
        class="font-mono text-xs uppercase tracking-widest text-fg-dim"
      >
        {$dict.shows.past}
      </h3>
      <div class="mt-6">
        <div
          class="hidden md:grid grid-cols-3 gap-4 font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim border-b border-line pb-3"
        >
          <span>{$dict.shows.date}</span>
          <span>{$dict.shows.venue}</span>
          <span>{$dict.shows.city}</span>
        </div>
        <div>
          {#each $dict.shows.pastRows as row, i (i)}
            <ShowRow date={row.date} venue={row.venue} city={row.city} />
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>