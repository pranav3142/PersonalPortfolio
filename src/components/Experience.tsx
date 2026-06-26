import { motion } from 'framer-motion';
import { Briefcase, Cpu, LineChart, Shield } from 'lucide-react';
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

  const bulletAnimation = (delay: number) => ({
    className: 'flex items-start gap-3',
    initial: prefersReducedMotion ? {} : { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    transition: { delay },
  });

  const experienceItems: AccordionItem[] = [
    {
      title: 'Machine Learning Engineering Intern — Privacy-Preserving ML (FHE)',
      subtitle: 'Implicant Pte. Ltd. (NTU Deep-Tech Spin-off) • May 2026 – Present',
      icon: <Cpu size={24} />,
      content: (
        <motion.ul
          className="space-y-3 text-gray-700"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.li {...bulletAnimation(0.1)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Trained and validated TT-Sparse classification models on public
              financial datasets (credit risk, transaction fraud, churn prediction),
              benchmarking accuracy against XGBoost, LightGBM, and TabPFN baselines.
            </span>
          </motion.li>
          <motion.li {...bulletAnimation(0.2)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Engineered the tabular feature-encoding pipeline converting raw
              dataframes into binary truth-table inputs, implementing thermometer,
              one-hot, and supervised target encoding while preserving ordinal
              structure and model interpretability.
            </span>
          </motion.li>
          <motion.li {...bulletAnimation(0.3)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Designed an information-theoretic bit-allocation scheme using Adjusted
              Mutual Information (AMI) to set per-feature encoding resolution,
              concentrating model capacity on predictive signals to minimise
              inference cost under encryption.
            </span>
          </motion.li>
          <motion.li {...bulletAnimation(0.4)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Optimised performance on severely imbalanced fraud datasets (~1%
              positive class) through AUPRC-driven evaluation, class weighting, and
              decision-threshold tuning to strengthen precision–recall trade-offs.
            </span>
          </motion.li>
          <motion.li {...bulletAnimation(0.5)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Implemented a feature-manifest layer mapping each binary input back to
              a human-readable threshold predicate, enabling exact, regulation-ready
              rule extraction from trained models.
            </span>
          </motion.li>
        </motion.ul>
      ),
    },
    {
      title: 'Research Consultant',
      subtitle: 'WorldQuant BRAIN • Jul 2025 – Jan 2026',
      icon: <LineChart size={24} />,
      content: (
        <motion.ul
          className="space-y-3 text-gray-700"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.li {...bulletAnimation(0.1)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Optimised alpha signals through iterative testing of decay,
              neutralisation and risk constraints to enhance Sharpe ratio.
            </span>
          </motion.li>
          <motion.li {...bulletAnimation(0.2)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Placed Top 20% globally (Gold Achiever) in the International
              Quant Championship 2025 Stage 1.
            </span>
          </motion.li>
        </motion.ul>
      ),
    },
    {
      title: 'Coding & Robotics Tutor',
      subtitle: 'Empire Code • May – Aug 2024',
      icon: <Briefcase size={24} />,
      content: (
        <motion.ul
          className="space-y-3 text-gray-700"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.li {...bulletAnimation(0.1)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Taught Python, JavaScript, Blender, and block-based coding to students
              of various age groups and skill levels.
            </span>
          </motion.li>
          <motion.li {...bulletAnimation(0.2)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Achieved MOE (Ministry of Education) instructor status, demonstrating
              commitment to educational excellence.
            </span>
          </motion.li>
          <motion.li {...bulletAnimation(0.3)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Coached students for Coding Olympics SG, fostering competitive
              programming skills and problem-solving abilities.
            </span>
          </motion.li>
        </motion.ul>
      ),
    },
    {
      title: 'Info-comms Specialist, SGT(1)',
      subtitle: 'Singapore Civil Defence Force (SCDF) • Jan 2022 – Dec 2023',
      icon: <Shield size={24} />,
      content: (
        <motion.ul
          className="space-y-3 text-gray-700"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.li {...bulletAnimation(0.1)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Completed two years of National Service as an Info-comms
              Specialist, maintaining critical communications infrastructure.
            </span>
          </motion.li>
          <motion.li {...bulletAnimation(0.2)}>
            <span className="text-gray-900 mt-1.5">•</span>
            <span>
              Led and coordinated teams under high-pressure operational
              conditions, strengthening leadership and discipline.
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
