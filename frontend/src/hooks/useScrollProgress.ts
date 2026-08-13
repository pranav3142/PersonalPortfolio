import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll progress as a percentage (0-100)
 * Uses throttling to optimize performance
 * @returns number representing scroll progress percentage
 */
export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate progress as percentage
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      rafId = requestAnimationFrame(calculateScrollProgress);
    };

    // Set initial value
    calculateScrollProgress();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return scrollProgress;
}
