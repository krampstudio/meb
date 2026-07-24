<script>
  import SectionTitle from "../components/SectionTitle.svelte";
  import Photo from "../components/Photo.svelte";
  import { dict } from "../i18n.js";
</script>

<section id="crew" class="py-24 md:py-40 px-6 bg-bg-alt">
  <div class="max-w-7xl mx-auto">
    <SectionTitle text={$dict.crew.title} />
    <div
      class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
    >
      {#each $dict.crew.members as member (member.name)}
        <Photo
          name={member.name}
          instrument={member.instrument}
        />
      {/each}
    </div>
  </div>
</section>