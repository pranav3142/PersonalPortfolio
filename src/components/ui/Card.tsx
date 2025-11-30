import { motion } from 'framer-motion';
import { forwardRef, useState } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
  hoverEffect?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', glassEffect = true, hoverEffect = false }, ref) => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const baseStyles = 'rounded-lg p-6 sm:p-8 relative';
    
    // Clean professional styling
    const glassStyles = glassEffect
      ? 'bg-white border border-gray-200 shadow-sm'
      : '';

    const combinedClassName = `${baseStyles} ${glassStyles} ${className}`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hoverEffect) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      setTilt({ x: y * 10, y: -x * 10 });
    };

    const handleMouseLeave = () => {
      if (!hoverEffect) return;
      setTilt({ x: 0, y: 0 });
    };

    const motionProps = hoverEffect
      ? {
          whileHover: { scale: 1.02, z: 50 },
          animate: {
            rotateX: tilt.x,
            rotateY: tilt.y,
          },
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
          style: {
            transformStyle: 'preserve-3d' as const,
          },
        }
      : {};

    return (
      <motion.div
        ref={ref}
        className={combinedClassName}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...motionProps}
      >
        {/* Clean border effect */}
        {glassEffect && (
          <div className="absolute inset-0 rounded-lg pointer-events-none" />
        )}
        
        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
