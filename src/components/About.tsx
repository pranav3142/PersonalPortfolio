import { motion } from 'framer-motion';
import { Code2, Rocket, Users, Lightbulb } from 'lucide-react';
import { useReducedMotion } from '../hooks';
import Card from './ui/Card';

/**
 * About section component
 * Features:
 * - Biographical information
 * - Focus areas in glassmorphism cards
 * - Subtle hover lift effects
 * - Icon integration from lucide-react
 */
export function About() {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.6 },
      };

  const staggerDelay = (index: number) =>
    prefersReducedMotion ? {} : { transition: { delay: index * 0.1 } };

  const focusAreas = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description:
        'Building scalable web applications with modern frameworks and best practices.',
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description:
        'Creating solutions that push boundaries and solve real-world problems.',
    },
    {
      icon: Users,
      title: 'Education',
      description:
        'Passionate about teaching coding and robotics to inspire the next generation.',
    },
    {
      icon: Lightbulb,
      title: 'Problem Solving',
      description:
        'Tackling complex challenges with creative thinking and technical expertise.',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div className="mb-16" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-2xl">
            Understanding my journey, values, and approach to creating meaningful digital experiences.
          </p>
        </motion.div>

        {/* Bio card */}
        <motion.div className="mb-12" {...fadeInUp} {...staggerDelay(0)}>
          <Card glassEffect>
            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-light">
              I'm a Computer Science student at the National University of Singapore,
              passionate about creating innovative solutions through technology. With
              experience in full-stack development and a love for teaching, I strive to
              build applications that make a meaningful impact. My journey in tech has
              been driven by curiosity, creativity, and a commitment to continuous
              learning.
            </p>
          </Card>
        </motion.div>

        {/* Focus areas grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                {...fadeInUp}
                {...staggerDelay(index + 1)}
              >
                <Card glassEffect hoverEffect>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-light mb-2 text-gray-900">
                        {area.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">{area.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
