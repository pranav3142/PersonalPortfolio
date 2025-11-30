import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useReducedMotion } from '../hooks';


/**
 * Contact section component
 * Features:
 * - Holographic tilt card with contact information
 * - Email, LinkedIn, and GitHub links with icons
 * - Tilt effect based on mouse position
 * - Animated background blob with gradient
 */

interface ContactLink {
  type: 'email' | 'linkedin' | 'github';
  label: string;
  url: string;
  icon: typeof Mail;
}

export function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const contactLinks: ContactLink[] = [
    {
      type: 'email',
      label: 'e1384377@u.nus.edu',
      url: 'mailto:e1384377@u.nus.edu',
      icon: Mail,
    },
    {
      type: 'linkedin',
      label: 'linkedin.com/in/jppranav07',
      url: 'https://linkedin.com/in/jppranav07',
      icon: Linkedin,
    },
    {
      type: 'github',
      label: 'github.com/pranav3142',
      url: 'https://github.com/pranav3142',
      icon: Github,
    },
  ];

  const fadeInUp = prefersReducedMotion
    ? {}
    : {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-100px' },
      transition: { duration: 0.6 },
    };



  return (
    <section id="contact" className="py-20 px-4 relative min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section heading */}
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-lg font-light">
            Let's connect and create something amazing together
          </p>
        </motion.div>

        {/* Contact card with holographic tilt effect */}
        <motion.div
          className="relative"
          {...fadeInUp}
          style={{ perspective: 1000 }}
        >
          {/* Contact card */}
          <div
            className="relative bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm"
          >

            {/* Shine effect disabled for performance */}

            {/* Content */}
            <div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8">
              {contactLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.type}
                    href={link.url}
                    target={link.type !== 'email' ? '_blank' : undefined}
                    rel={link.type !== 'email' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 active:border-gray-300 transition-all duration-300 group"
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                    whileInView={
                      prefersReducedMotion
                        ? {}
                        : { opacity: 1, x: 0 }
                    }
                    viewport={{ once: true }}
                    transition={
                      prefersReducedMotion
                        ? {}
                        : { duration: 0.5, delay: index * 0.1 }
                    }
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : { scale: 1.02, x: 10 }
                    }
                    whileTap={
                      prefersReducedMotion
                        ? {}
                        : { scale: 0.98 }
                    }
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-all duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-gray-700 transition-colors duration-300" />
                    </div>

                    {/* Label */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-light truncate">
                        {link.label}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      className="flex-shrink-0 text-gray-500 group-hover:text-gray-700 transition-colors duration-300"
                      animate={
                        prefersReducedMotion
                          ? {}
                          : { x: [0, 5, 0] }
                      }
                      transition={
                        prefersReducedMotion
                          ? {}
                          : {
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'loop',
                          }
                      }
                    >
                      →
                    </motion.div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
