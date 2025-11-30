import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks';
import Badge from './ui/Badge';
import { useEffect, useRef, useState } from 'react';

/**
 * Skills section component
 * Features:
 * - Grouped badge layout (Languages, Frameworks, Tools)
 * - Responsive grid layout
 * - Stagger animation on scroll into view using Intersection Observer
 */

interface SkillGroup {
  category: string;
  skills: string[];
}

export function Skills() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillGroups: SkillGroup[] = [
    { 
      category: 'Languages', 
      skills: ['Python', 'Java', 'C/C++', 'JS'] 
    },
    { 
      category: 'Frameworks', 
      skills: ['React', 'Node', 'FastAPI', 'JavaFX'] 
    },
    { 
      category: 'Tools', 
      skills: ['VS Code', 'Git', 'R', 'Firebase'] 
    },
  ];

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const fadeInUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.6 },
      };

  return (
    <section id="skills" className="py-20 px-4 relative" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div className="mb-16" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Skills
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-2xl">
            Technologies and tools I work with to create meaningful digital experiences.
          </p>
        </motion.div>

        {/* Skills groups */}
        <div className="space-y-12">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0 }
                  : prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: 0.5,
                      delay: groupIndex * 0.15,
                    }
              }
            >
              {/* Category title */}
              <h3 className="text-2xl font-light mb-6 text-gray-900">
                {group.category}
              </h3>

              {/* Skills grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {group.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                    animate={
                      isVisible
                        ? { opacity: 1, scale: 1 }
                        : prefersReducedMotion
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={
                      prefersReducedMotion
                        ? {}
                        : {
                            duration: 0.4,
                            delay: groupIndex * 0.15 + skillIndex * 0.08,
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                          }
                    }
                  >
                    <Badge variant="default" className="w-full justify-center">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
