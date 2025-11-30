import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useReducedMotion } from '../hooks';
import Card from './ui/Card';

/**
 * Education section component
 * Features:
 * - Card layout for educational background
 * - Date range, institution info, and degree details
 * - Institution icon from lucide-react
 * - Glassmorphism styling with hover effects
 */
export function Education() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.6 },
      };

  return (
    <section id="education" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <motion.div className="mb-16" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Education
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-2xl">
            My academic background and qualifications in computer science.
          </p>
        </motion.div>

        {/* Education card */}
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
          <Card glassEffect hoverEffect>
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              {/* Institution icon */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gray-100 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-gray-600" />
                </div>
              </div>

              {/* Education details */}
              <div className="flex-1 w-full">
                <div className="flex flex-col gap-2 mb-3">
                  <h3 className="text-xl sm:text-2xl font-light text-gray-900">
                    Bachelor of Computing in Computer Science
                  </h3>
                  <span className="text-gray-600 font-light text-sm sm:text-base">
                    Aug 2023 – May 2027
                  </span>
                </div>
                <p className="text-base sm:text-lg text-gray-700 mb-2 font-light">
                  NUS School of Computing
                </p>
                <p className="text-sm sm:text-base text-gray-600 font-light">
                  National University of Singapore
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
