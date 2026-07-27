import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CASE_STUDIES } from '../../../constants/caseStudies';
import { ActiveProjectPanel } from './ActiveProjectPanel';
import { Statistics } from './Statistics';
import { BottomCTA } from './BottomCTA';
import { createCaseStudiesTimeline } from '../../../animations/caseStudiesTimeline';

export const MobileCaseStudies: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = CASE_STUDIES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CASE_STUDIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = createCaseStudiesTimeline(containerRef.current);
    return () => {
      tl.kill();
    };
  }, []);

  const dragX = useMotionValue(0);

  const handleDragEnd = () => {
    const x = dragX.get();
    if (x < -45) {
      handleNext();
    } else if (x > 45) {
      handlePrev();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="block lg:hidden w-full px-6 py-12"
    >
      <div data-reveal="label">
        <span className="text-[10px] font-bold text-brand-purple tracking-[0.3em] uppercase block mb-3">
          Case Studies
        </span>
      </div>

      <div data-reveal="heading">
        <h2 className="text-3xl font-serif text-neutral-900 font-bold leading-tight tracking-tight">
          Real partnerships.<br />
          Real outcomes.
        </h2>
      </div>

      <div data-reveal="body">
        <p className="mt-4 text-xs leading-relaxed text-neutral-500">
          We partner with ambitious organizations to solve complex challenges through engineering and design.
        </p>
      </div>

      {/* Touch-native swipeable card container */}
      <div 
        data-reveal="gallery"
        className="mt-8 relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-100 bg-[#FDFCFF] shadow-sm flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x: dragX }}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.95, x: 80 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -80 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="absolute w-full h-full p-4 flex items-center justify-center select-none"
          >
            <img 
              src={activeProject.image} 
              alt={activeProject.name} 
              className="w-full h-full object-contain pointer-events-none rounded-xl"
            />
          </motion.div>
        </AnimatePresence>

        {/* Swipe overlay targets / arrows */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full border border-neutral-100/80 bg-white/95 shadow-sm flex items-center justify-center hover:bg-neutral-50 transition-colors"
            aria-label="Previous Project"
          >
            <ArrowLeft className="w-4 h-4 text-neutral-700" />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full border border-neutral-100/80 bg-white/95 shadow-sm flex items-center justify-center hover:bg-neutral-50 transition-colors"
            aria-label="Next Project"
          >
            <ArrowRight className="w-4 h-4 text-neutral-700" />
          </button>
        </div>
      </div>

      {/* Active project panel */}
      <div data-reveal="panel" className="mt-6 border-t border-neutral-100 pt-6">
        <ActiveProjectPanel project={activeProject} />
      </div>

      <div data-reveal="stats">
        <Statistics />
      </div>

      {/* Bottom CTA Strip */}
      <div data-reveal="bottom-cta">
        <BottomCTA />
      </div>
    </div>
  );
};
export default MobileCaseStudies;
