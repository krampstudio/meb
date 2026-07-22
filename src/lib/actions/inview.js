/**
 * Svelte action using IntersectionObserver.
 * Calls onEnter(id) when the node enters the viewport.
 *
 * @param {HTMLElement} node
 * @param {{ onEnter?: (id: string) => void, threshold?: number, rootMargin?: string }} options
 */
export function inview(node, options = {}) {
  const { onEnter, threshold = 0, rootMargin = "-30% 0px -60% 0px" } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.target.id) {
          onEnter?.(entry.target.id);
        }
      }
    },
    { threshold, rootMargin }
  );

  observer.observe(node);

  return {
    update(newOptions = {}) {
      Object.assign(options, newOptions);
    },
    destroy() {
      observer.disconnect();
    },
  };
}