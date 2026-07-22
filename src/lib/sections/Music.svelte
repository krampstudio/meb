<script>
  import SectionTitle from "../components/SectionTitle.svelte";
  import ReleaseCard from "../components/ReleaseCard.svelte";
  import { dict } from "../i18n.js";
</script>

<section id="music" class="py-24 md:py-40 px-6">
  <div class="max-w-7xl mx-auto">
    <SectionTitle text={$dict.music.title} />
    <div
      class="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      {#each $dict.music.items as item (item.title)}
        <ReleaseCard
          title={item.title}
          date={item.date}
          tracks={item.tracks}
          cta={$dict.music.cta}
        />
      {/each}
    </div>
  </div>
</section>