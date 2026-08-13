
import { motion } from 'framer-motion';
import { Download, Mail, Cpu, Award, GraduationCap, LineChart } from 'lucide-react';
import Button from './ui/Button';

// Skimmable credibility chips — the concrete proof a recruiter sees in the
// first few seconds, drawn straight from the resume's strongest facts.
const credentials = [
  { icon: Cpu, label: 'Privacy-Preserving ML (FHE) Research' },
  { icon: Award, label: '2× Hackathon Winner' },
  { icon: GraduationCap, label: 'NUS CS (Honours) · GPA 4.41/5.0' },
  { icon: LineChart, label: 'Top 20% Intl Quant Championship' },
];

/**
 * Hero component — above-the-fold introduction.
 * Features:
 * - Name + sharpened value proposition
 * - Credential chips (concrete proof for a 15-second skim)
 * - CTA buttons (Download Resume, Contact Me)
 */
export function Hero() {

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
            Jamunarani Prabhu PRANAV
          </h1>
        </motion.div>

        {/* Professional tagline */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-xl sm:text-2xl text-gray-700 font-light leading-relaxed max-w-3xl">
            Computer Science student at NUS with a passion for creating innovative, sustainable solutions through full-stack development, AI &amp; ML, and hardware integration.
          </p>
        </motion.div>

        {/* Credential chips — concrete proof, above the fold */}
        <motion.ul
          className="flex flex-wrap gap-2.5 mb-12 list-none p-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          {credentials.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 backdrop-blur px-3.5 py-1.5 text-sm text-gray-700"
            >
              <Icon size={15} className="text-gray-500 flex-shrink-0" aria-hidden="true" />
              {label}
            </li>
          ))}
        </motion.ul>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-start gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            href="/Pranav_Resume.txt"
            variant="solid"
            target="_blank"
            download
          >
            <Download size={18} />
            Download Resume
          </Button>
          <Button
            href="#contact"
            variant="outline"
          >
            <Mail size={18} />
            Contact Me
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
