import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, className = '' }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const isExpanded = expandedIndex === index;
        
        return (
          <motion.div
            key={index}
            className="glass rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-shadow duration-300"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full p-4 sm:p-6 flex items-center justify-between text-left hover:bg-slate-800/30 transition-colors duration-200"
              aria-expanded={isExpanded}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                {item.icon && (
                  <motion.div
                    animate={{ rotate: isExpanded ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-purple-400 flex-shrink-0"
                  >
                    {item.icon}
                  </motion.div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-100">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-slate-400 flex-shrink-0 ml-2"
              >
                <ChevronDown size={20} className="sm:w-6 sm:h-6" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: 'auto', 
                    opacity: 1,
                    transition: {
                      height: { duration: 0.3 },
                      opacity: { duration: 0.2, delay: 0.1 }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3 },
                      opacity: { duration: 0.2 }
                    }
                  }}
                  className="overflow-hidden"
                  role="region"
                  id={`accordion-content-${index}`}
                  aria-labelledby={`accordion-header-${index}`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-slate-800/50">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Accordion;
