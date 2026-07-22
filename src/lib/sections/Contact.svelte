<script>
  import SectionTitle from "../components/SectionTitle.svelte";
  import SocialButton from "../components/SocialButton.svelte";
  import { dict } from "../i18n.js";

  const socials = [
    { label: "Instagram", href: "#" },
    { label: "Bandcamp", href: "#" },
    { label: "Spotify", href: "#" },
    { label: "YouTube", href: "#" },
  ];
</script>

<section id="contact" class="py-24 md:py-40 px-6 bg-bg-alt">
  <div class="max-w-3xl mx-auto text-center">
    <SectionTitle text={$dict.contact.title} size="md" />

    <p
      class="mt-10 font-display text-lg md:text-xl tracking-[0.25em] text-fg-dim uppercase"
    >
      {$dict.contact.follow}
    </p>
    <div
      class="mt-6 flex flex-wrap items-center justify-center gap-3"
    >
      {#each socials as s (s.label)}
        <SocialButton href={s.href} label={s.label} />
      {/each}
    </div>

    <p
      class="mt-16 font-display text-lg md:text-xl tracking-[0.25em] text-fg-dim uppercase"
    >
      {$dict.contact.booking}
    </p>
    <a
      href="mailto:booking@example.com"
      class="mt-4 inline-block font-mono text-sm tracking-widest text-accent-cyan hover:text-fg border-b border-accent-cyan hover:border-fg pb-1 transition-colors"
    >
      booking@example.com
    </a>
  </div>
</section>