import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useReducedMotion } from '../hooks';

/**
 * Footer component
 * Features:
 * - Simple dark footer with closing message
 * - Copyright information
 * - Styled with dark background and subtle border
 */

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  const currentYear = new Date().getFullYear();

  const heartAnimation = prefersReducedMotion
    ? {}
    : {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    };

  return (
    <footer className="relative border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {/* Closing message */}
          <motion.p
            className="text-gray-600 text-sm md:text-base flex items-center gap-2 font-light"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Built with{' '}
            <motion.span animate={heartAnimation} className="inline-block">
              <Heart className="w-4 h-4 text-gray-700 fill-gray-700" />
            </motion.span>{' '}
            by Pranav
          </motion.p>

          {/* Copyright */}
          <motion.p
            className="text-gray-500 text-xs md:text-sm font-light"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            © {currentYear} All rights reserved
          </motion.p>

          {/* Additional links */}
          <motion.div
            className="flex items-center gap-4 text-gray-500 text-xs font-light"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="#about"
              className="hover:text-gray-700 transition-colors duration-300 uppercase tracking-wider"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="#projects"
              className="hover:text-gray-700 transition-colors duration-300 uppercase tracking-wider"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Projects
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="#contact"
              className="hover:text-gray-700 transition-colors duration-300 uppercase tracking-wider"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </a>
          </motion.div>

          {/* Credits */}
          <motion.div
            className="text-gray-400 text-[10px] font-light mt-4"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>
              <a
                href="https://sketchfab.com/3d-models/snowy-mountain-76619a9fb77d465b863b1e69ce03f947"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors"
              >
                Snowy-mountain
              </a>{' '}
              by{' '}
              <a
                href="https://sketchfab.com/hirnlaich"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors"
              >
                hirnlaich
              </a>{' '}
              on{' '}
              <a
                href="https://sketchfab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors"
              >
                Sketchfab
              </a>{' '}
              licensed under{' '}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors"
              >
                CC BY 4.0
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
