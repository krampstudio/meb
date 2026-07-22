<script>
  /** @type {{ date: string, venue: string, city: string, ticket: string, ticketLabel: string }} */
  let { date, venue, city, ticket, ticketLabel } = $props();

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en", { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  const formatted = `${day} ${month} ${year}`;
</script>

<div
  class="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 border-b border-line hover:bg-bg/40 transition-colors group"
>
  <span
    class="font-mono text-xs md:text-sm uppercase tracking-widest text-fg"
  >
    {formatted}
  </span>
  <span
    class="font-display text-lg md:text-xl tracking-wider text-fg group-hover:text-accent-cyan transition-colors"
  >
    {venue}
  </span>
  <span class="text-fg-dim md:text-fg">
    {city}
  </span>
  <a
    href={ticket}
    class="font-mono text-xs uppercase tracking-widest text-accent-cyan hover:text-fg md:text-left col-span-2 md:col-span-1"
  >
    {ticketLabel} →
  </a>
</div>