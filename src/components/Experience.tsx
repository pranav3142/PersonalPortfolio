import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useReducedMotion } from '../hooks';
import Accordion, { AccordionItem } from './ui/Accordion';

/**
 * Experience section component
 * Features:
 * - Accordion component for work experience
 * - Animated briefcase icon with rotation on expand
 * - Bullet points with responsibilities
 * - Hover depth effect using transform
 */
export function Experience() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.6 },
      };

  const experienceItems: AccordionItem[] = [
    {
      title: 'Coding & Robotics Tutor',
      subtitle: 'Empire Code • May–Aug 2024',
      icon: <Briefcase size={24} />,
      content: (
        <motion.ul
          className="space-y-3 text-gray-700"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.li
            className="flex items-start gap-3"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Taught Python, JavaScript, Blender, and block-based coding to students
              of various age groups and skill levels
            </span>
          </motion.li>
          <motion.li
            className="flex items-start gap-3"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Achieved MOE (Ministry of Education) instructor status, demonstrating
              commitment to educational excellence
            </span>
          </motion.li>
          <motion.li
            className="flex items-start gap-3"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Coached students for Coding Olympics SG, fostering competitive
              programming skills and problem-solving abilities
            </span>
          </motion.li>
        </motion.ul>
      ),
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <motion.div className="mb-16" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Experience
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-2xl">
            My professional journey and work history in technology and education.
          </p>
        </motion.div>

        {/* Experience accordion */}
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
          <Accordion items={experienceItems} />
        </motion.div>
      </div>
    </section>
  );
}
