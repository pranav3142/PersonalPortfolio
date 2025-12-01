
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import Button from './ui/Button';

/**
 * Hero component with particle text effect and typewriter animation
 * Features:
 * - Particle text effect for name
 * - Typewriter animation for subtitle
 * - CTA buttons (Download CV, Contact Me)
 * - Animated background blobs
 * - Floating particles
 * - Scroll indicator
 */
export function Hero() {



  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 px-4"
      aria-label="Hero section"
    >
      {/* Main content */}
      <div className="max-w-4xl mx-auto w-full">
        {/* Professional introduction */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-gray-600 mb-4 font-light">Hello, I'm</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
            Jamunarani Prabhu Pranav
          </h1>
        </motion.div>

        {/* Professional tagline */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-xl sm:text-2xl text-gray-700 font-light leading-relaxed max-w-3xl">
            with a passion for creating innovative sustainable solutions through full-stack development, AI & ML and hardware integration.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-start gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button variant="solid" href="/cv.pdf">
            View My Work
          </Button>
          <Button variant="outline" onClick={handleContactClick}>
            Get In Touch
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex items-center gap-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          role="presentation"
          aria-hidden="true"
        >
          <span className="text-sm font-light">Scroll to explore</span>
          <motion.div
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown size={20} className="text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
