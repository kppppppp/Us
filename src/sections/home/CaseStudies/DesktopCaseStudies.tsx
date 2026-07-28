import React, { useRef, useEffect } from 'react';
import { CASE_STUDIES } from '../../../constants/caseStudies';
import { CaseStudiesGallery } from './CaseStudiesGallery';
import { ActiveProjectPanel } from './ActiveProjectPanel';
import { Statistics } from './Statistics';
import { BottomCTA } from './BottomCTA';
import { ArrowRight } from 'lucide-react';
import { createCaseStudiesTimeline } from '../../../animations/caseStudiesTimeline';

interface DesktopCaseStudiesProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const DesktopCaseStudies: React.FC<DesktopCaseStudiesProps> = ({
  activeIndex,
  setActiveIndex
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeProject = CASE_STUDIES[activeIndex];

  const galleryItems = CASE_STUDIES.map(project => ({
    image: project.image,
    text: project.name
  }));

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = createCaseStudiesTimeline(containerRef.current);
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="hidden lg:block w-full max-w-[1500px] mx-auto px-12"
    >
      <div className="grid grid-cols-12 gap-12 items-center min-h-[750px]">
        {/* Left Column: Editorial & Info (approx 40% width) */}
        <div className="col-span-5 flex flex-col justify-center pr-8">
          <div data-reveal="label">
            <span className="text-[11px] font-bold text-brand-purple tracking-[0.35em] uppercase block mb-4">
              Case Studies
            </span>
          </div>

          <div data-reveal="heading">
            <h2 className="text-5xl font-serif text-neutral-900 font-bold leading-tight tracking-tight">
              Real partnerships.<br />
              Real outcomes.
            </h2>
          </div>

          <div data-reveal="body">
            <p className="mt-6 text-xs lg:text-sm leading-relaxed text-neutral-500 max-w-md">
              We partner with ambitious organizations to solve complex business challenges and create measurable digital growth through thoughtful engineering, design and execution.
            </p>
          </div>

          <div data-reveal="cta" className="mt-8">
            <a 
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-xs font-bold text-neutral-800 tracking-wider uppercase"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          <div data-reveal="stats">
            <Statistics />
          </div>

          {/* Active project panel (cross-fading details) */}
          <div data-reveal="panel" className="mt-6 border-t border-neutral-100 pt-6">
            <ActiveProjectPanel project={activeProject} />
          </div>
        </div>

        {/* Right Column: WebGL Gallery (approx 60% width) */}
        <div 
          data-reveal="gallery"
          className="col-span-7 h-[650px] relative rounded-3xl border border-neutral-100/50 bg-gradient-to-tr from-brand-purple/[0.01] to-[#FF9FFC]/[0.01] shadow-inner"
        >
          <CaseStudiesGallery 
            items={galleryItems}
            bend={1.5}
            textColor="#5d46d8"
            borderRadius={0.08}
            scrollSpeed={2}
            scrollEase={0.05}
            font="600 24px Outfit"
            onActiveIndexChange={setActiveIndex}
          />
        </div>
      </div>

      {/* Bottom CTA Strip */}
      <div data-reveal="bottom-cta">
        <BottomCTA />
      </div>
    </div>
  );
};
export default DesktopCaseStudies;
