import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  className = '' 
}) => {
  const baseStyles = 'px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-1 sm:gap-1.5 transition-all duration-300';
  
  const variantStyles = {
    default: 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 hover:border-gray-300',
    accent: 'bg-gray-900 text-white border border-gray-900 hover:bg-gray-800 hover:border-gray-800'
  };

  return (
    <motion.span
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ 
        scale: 1.05,
        transition: { type: 'spring', stiffness: 400, damping: 17 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
