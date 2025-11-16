import { useRef, forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
}

/**
 * Parallax component that creates a scroll-based parallax effect
 * @param speed - The speed multiplier for the parallax effect (default: 0.5)
 * @param direction - The direction of the parallax effect (default: 'up')
 */
export const Parallax = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [50 * speed, -50 * speed] : [-50 * speed, 50 * speed]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

/**
 * Parallax image component for background images
 */
export const ParallaxImage = ({ 
  src, 
  alt, 
  speed = 0.5,
  className = '' 
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-20 * speed}%`, `${20 * speed}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, opacity }}
        className="w-full h-[120%] object-cover"
      />
    </div>
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

/**
 * Parallax section wrapper for entire sections
 */
export const ParallaxSection = forwardRef<HTMLElement, ParallaxSectionProps>(({ 
  children, 
  className = '',
  speed = 0.3 
}, forwardedRef) => {
  const internalRef = useRef<HTMLElement>(null);
  const ref = forwardedRef || internalRef;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30 * speed, -30 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.9]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.section>
  );
});

ParallaxSection.displayName = 'ParallaxSection';
