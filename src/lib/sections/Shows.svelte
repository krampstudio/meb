<script>
  import SectionTitle from "../components/SectionTitle.svelte";
  import ShowRow from "../components/ShowRow.svelte";
  import { dict } from "../i18n.js";
</script>

<section id="shows" class="py-24 md:py-40 px-6 bg-bg-alt">
  <div class="max-w-5xl mx-auto">
    <SectionTitle text={$dict.shows.title} />
    <div class="mt-16">
      <div
        class="hidden md:grid grid-cols-4 gap-4 font-mono text-[0.65rem] uppercase tracking-widest text-fg-dim border-b border-line pb-3"
      >
        <span>{$dict.shows.date}</span>
        <span>{$dict.shows.venue}</span>
        <span>{$dict.shows.city}</span>
        <span>{$dict.shows.tickets}</span>
      </div>
      <div>
        {#each $dict.shows.rows as row, i (i)}
          <ShowRow
            date={row.date}
            venue={row.venue}
            city={row.city}
            ticket={row.ticket}
            ticketLabel={$dict.shows.tickets}
          />
        {/each}
      </div>
    </div>
  </div>
</section>