import React, { useEffect, useRef, useState } from 'react';

interface LazyMountProps {
  children: React.ReactNode;
  minHeight?: string;
  className?: string;
}

export const LazyMount: React.FC<LazyMountProps> = ({ 
  children, 
  minHeight = '400px', 
  className = '' 
}) => {
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasBeenInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenInView(true);
        }
      },
      {
        rootMargin: '300px', // Load before it comes into the viewport
        threshold: 0.01,
      }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasBeenInView]);

  return (
    <div 
      ref={containerRef} 
      style={{ minHeight: hasBeenInView ? undefined : minHeight }} 
      className={className}
    >
      {hasBeenInView ? children : null}
    </div>
  );
};

export default LazyMount;
