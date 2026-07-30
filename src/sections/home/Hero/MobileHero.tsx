import React from 'react';
import { ArrowUpRight, Sparkles, Layers, Cpu, Cloud } from 'lucide-react';
import sculptureImg from '../../../assets/purple_glass_sculpture.jpg';
import DotField from '../../../components/ui/DotField';

export const MobileHero: React.FC = () => {
  const impactItems = [
    { title: 'Intelligent Systems', icon: Sparkles },
    { title: 'Digital Platforms', icon: Layers },
    { title: 'AI & Automation', icon: Cpu },
    { title: 'Cloud & DevOps', icon: Cloud }
  ];

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-[#F9F8FF] to-white flex flex-col pt-[110px] pb-12 px-6 overflow-hidden select-none">
      {/* Global Fixed DotField Canvas Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-60">
        <DotField
          dotRadius={2.8}
          dotSpacing={16}
          bulgeStrength={55}
          glowRadius={180}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(0, 0, 0, 0.28)"
          gradientTo="rgba(0, 0, 0, 0.12)"
          glowColor="rgba(0, 0, 0, 0.02)"
        />
      </div>
      
      {/* Decorative Sculpture at center-top layer */}
      <div className="relative w-full h-[220px] my-4 pointer-events-none select-none z-10 flex items-center justify-center">
        <div className="absolute w-[260px] h-[260px] rounded-full bg-brand-purple/10 blur-[60px]" />
        <img 
          src={sculptureImg} 
          alt="Unexpected Solutions abstract glass sculpture" 
          className="w-full h-full object-contain transform scale-110"
        />
      </div>

      <div className="flex flex-col gap-6 relative z-20 mt-4">
        {/* Top Tagline */}
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-neutral-400">
          Enterprise Software &nbsp;•&nbsp; AI &nbsp;•&nbsp; Transformation
        </span>

        {/* Headline */}
        <h1 className="text-[34px] font-semibold leading-[1.12] text-brand-text tracking-[-0.02em]">
          Solving today's <br />
          complexity. <br />
          <span className="text-brand-purple">Building tomorrow's <br />
          advantage.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-neutral-500 leading-relaxed">
          We partner with forward-thinking organizations to design, engineer and scale digital solutions that create measurable business impact.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col gap-3.5 mt-2">
          <button className="w-full bg-[#141414] hover:bg-[#242424] text-white text-sm font-semibold py-4 px-6 rounded-full shadow-brand-sm flex items-center justify-center gap-2.5">
            <span>Let's Build Together</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </button>

          <a 
            href="#case-studies"
            className="w-full py-3.5 border border-[rgba(0,0,0,0.06)] bg-white/60 text-brand-text text-sm font-semibold rounded-full flex items-center justify-center gap-2"
          >
            <span>Explore Our Work</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400" />
          </a>
        </div>

        {/* Impact List */}
        <div className="bg-white/50 border border-[rgba(0,0,0,0.06)] rounded-2xl p-5 shadow-brand-md mt-6">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-brand-purple block mb-4">
            We Create Impact
          </span>

          <div className="flex flex-col gap-1.5">
            {impactItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={`#solutions/${item.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/80 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-text shadow-brand-sm">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-brand-text">
                      {item.title}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default MobileHero;
