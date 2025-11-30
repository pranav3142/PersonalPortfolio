import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

/**
 * LoadingScreen component with JP monogram animation
 * Features:
 * - SVG JP monogram with stroke-dasharray animation
 * - Orbiting particles using circular motion paths
 * - Animated progress bar
 * - Fading grid backdrop with CSS gradients
 * - Auto-dismisses after 2-3s with fade-out exit animation
 */
export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Auto-dismiss after 2.5 seconds
    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 500); // Wait for exit animation
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(dismissTimer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
        >
          {/* Clean backdrop */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* JP Monogram */}
            <div className="relative w-48 h-48">
              {/* SVG JP Monogram */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* J letter */}
                <motion.path
                  d="M 60 40 L 60 120 Q 60 140 45 140 Q 30 140 30 125"
                  stroke="url(#gradient1)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: prefersReducedMotion ? 0.01 : 1.5, ease: 'easeInOut' },
                    opacity: { duration: prefersReducedMotion ? 0.01 : 0.3 },
                  }}
                />

                {/* P letter */}
                <motion.path
                  d="M 100 40 L 100 140 M 100 40 L 140 40 Q 160 40 160 65 Q 160 90 140 90 L 100 90"
                  stroke="url(#gradient2)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: prefersReducedMotion ? 0.01 : 1.5, ease: 'easeInOut', delay: prefersReducedMotion ? 0 : 0.3 },
                    opacity: { duration: prefersReducedMotion ? 0.01 : 0.3, delay: prefersReducedMotion ? 0 : 0.3 },
                  }}
                />

                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#111827" />
                    <stop offset="100%" stopColor="#374151" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#374151" />
                    <stop offset="100%" stopColor="#6b7280" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Glow effect behind monogram */}
              <div
                className="absolute inset-0 blur-3xl opacity-50"
                style={{
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* Progress bar */}
            <div className="w-64 h-0.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gray-900"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="text-gray-600 text-sm tracking-wider font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: prefersReducedMotion ? 0 : 0.5 }}
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
