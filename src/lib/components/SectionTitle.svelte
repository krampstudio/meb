<script>
  /**
   * Glitch-styled section heading (Rubik Maps + chromatic aberration).
   * @typedef {{ text: string, strong?: boolean, size?: 'sm' | 'md' | 'lg' }} Props
   * @type {Props}
   */
  let { text, strong = false, size = "md" } = $props();

  const sizes = {
    sm: "text-3xl md:text-4xl",
    md: "text-4xl md:text-6xl",
    lg: "text-5xl md:text-7xl",
  };
</script>

<h2
  class="glitch font-display uppercase tracking-widest {sizes[size]} {strong ? 'glitch-strong' : ''}"
  data-text={text}
>
  {text}
</h2>