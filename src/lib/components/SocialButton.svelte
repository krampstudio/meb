<script>
  /** @type {{ href: string, label: string }} */
  let { href, label } = $props();
</script>

<a
  {href}
  class="font-mono text-xs uppercase tracking-widest border border-line px-4 py-2 hover:border-accent-cyan hover:text-accent-cyan transition-colors"
>
  {label}
</a>