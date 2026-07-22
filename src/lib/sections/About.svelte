<script>
  import SectionTitle from "../components/SectionTitle.svelte";
  import { dict } from "../i18n.js";
</script>

<section id="about" class="py-24 md:py-40 px-6">
  <div class="max-w-3xl mx-auto">
    <SectionTitle text={$dict.about.title} />
    <p
      class="mt-12 text-lg md:text-xl leading-relaxed text-fg/90 font-light"
    >
      {$dict.about.body}
    </p>
  </div>
</section>