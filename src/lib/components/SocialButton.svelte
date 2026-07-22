<script>
  /** @type {{ href: string, label: string }} */
  let { href, label } = $props();

  const enabled = href && href.length > 0;
</script>

{#if enabled}
  <a
    {href}
    target="_blank"
    rel="noopener noreferrer"
    class="font-mono text-xs uppercase tracking-widest border border-line px-4 py-2 hover:border-accent-cyan hover:text-accent-cyan transition-colors"
  >
    {label}
  </a>
{:else}
  <span
    aria-disabled="true"
    class="font-mono text-xs uppercase tracking-widest border border-line/50 px-4 py-2 text-fg-dim/40 cursor-not-allowed select-none"
    title="Soon"
  >
    {label}
  </span>
{/if}