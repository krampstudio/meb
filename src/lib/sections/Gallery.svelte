<script>
  import SectionTitle from "../components/SectionTitle.svelte";
  import { dict } from "../i18n.js";

  // Placeholder cells — replace with live / promo photos
  const cells = Array.from({ length: 6 }, (_, i) => i);
</script>

<section id="gallery" class="py-24 md:py-40 px-6">
  <div class="max-w-7xl mx-auto">
    <SectionTitle text={$dict.gallery.title} />
    <div class="mt-16 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
      {#each cells as i (i)}
        <div
          class="aspect-square bg-bg-alt border border-line overflow-hidden relative group"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-bg via-bg-alt to-accent-teal/10 group-hover:to-accent-cyan/20 transition-colors duration-500 flex items-center justify-center"
          >
            <span
              class="font-mono text-xs text-fg-dim uppercase tracking-widest"
            >
              #{String(i + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>