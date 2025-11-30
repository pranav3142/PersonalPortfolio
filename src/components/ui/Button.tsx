import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface ButtonProps {
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'solid', children, onClick, href, className = '' }, ref) => {
    const baseStyles = 'px-6 py-3 sm:px-8 sm:py-4 font-light transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm sm:text-base uppercase tracking-wider';
    
    const variantStyles = {
      solid: 'bg-gray-900 hover:bg-gray-800 text-white',
      outline: 'border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    const motionProps = {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: { type: 'spring', stiffness: 400, damping: 17 }
    };

    if (href) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        className={combinedClassName}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
