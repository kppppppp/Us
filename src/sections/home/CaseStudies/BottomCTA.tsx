import React from 'react';
import { ArrowRight } from 'lucide-react';

export const BottomCTA: React.FC = () => {
  return (
    <div className="w-full mt-20">
      <div className="relative w-full rounded-2xl border border-neutral-100 bg-[#FDFCFF] p-8 md:p-10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        {/* Decorative background glows */}
        <div className="absolute right-[-100px] top-[-50px] w-64 h-64 rounded-full bg-brand-purple/5 blur-[50px] pointer-events-none" />
        <div className="absolute left-[-100px] bottom-[-50px] w-64 h-64 rounded-full bg-[#FF9FFC]/5 blur-[50px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2 text-center md:text-left">
          <span className="text-[10px] font-bold text-brand-purple tracking-widest uppercase">
            Work With Us
          </span>
          <h4 className="text-xl md:text-2xl font-serif font-bold text-neutral-900">
            Your challenge could be our next success story.
          </h4>
        </div>

        <div className="relative z-10">
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 bg-brand-purple text-white font-semibold text-xs lg:text-sm rounded-full py-4.5 px-8.5 shadow-lg shadow-brand-purple/10 hover:shadow-brand-purple/20 hover:bg-[#4a35bc] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default BottomCTA;
