import { useEffect, useRef } from "react";

/**
 * Attaches IntersectionObserver to a container ref and adds
 * the "visible" class to all children with a `reveal` class.
 */
export function useScrollReveal(rootMargin = "-8% 0px -8% 0px") {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale, .timeline-line"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.08 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [rootMargin]);

  return containerRef;
}
