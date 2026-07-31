import React from 'react';
import { ChevronRight, Infinity as InfinityIcon, ShoppingCart, Code, Smartphone, ThumbsUp, Target, User, TrendingUp, Camera } from 'lucide-react';
import { SERVICES_DATA } from '../../../constants/layout';
import { PROMISE_DATA } from '../../../constants/promise';
import sculptureImg from '../../../assets/purple_glass_sculpture.webp';
import DotField from '../../../components/ui/DotField';
import { UnderlineLink } from '../../../components/ui/UnderlineLink';
import { ArrowCircleButton } from '../../../components/ui/ArrowCircleButton';

const iconMap: Record<string, React.ComponentType<any>> = {
  Infinity: InfinityIcon,
  ShoppingCart,
  Code,
  Smartphone,
  ThumbsUp,
  Target,
  User,
  TrendingUp,
  Camera
};

export const MobileServices: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F7F5FC] py-16 px-6 overflow-hidden flex flex-col gap-12" id="services-mobile">
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
      
      {/* Top Heading Section */}
      <div className="flex flex-col gap-5 select-none">
        <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-brand-purple">
          What We Do
        </span>
        <h2 className="font-serif text-[42px] font-semibold leading-[1.1] text-brand-text">
          Services <br />
          designed to <br />
          <span className="bg-gradient-to-r from-brand-purple to-brand-deep bg-clip-text text-transparent">
            drive real impact.
          </span>
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">
          End-to-end digital solutions crafted to elevate your brand, scale your business and create measurable growth.
        </p>
        <div className="flex items-center gap-5 mt-2">
          <UnderlineLink href="#services" label="View All Services" showArrow={false} />
          <ArrowCircleButton />
        </div>
      </div>

      {/* Floating Center Glass Sculpture */}
      <div className="relative w-full h-[220px] pointer-events-none select-none z-10 flex items-center justify-center">
        <div className="absolute w-[200px] h-[200px] rounded-full bg-brand-purple/10 blur-[50px] pointer-events-none" />
        <img 
          src={sculptureImg} 
          alt="Translucent Ribbon Sculpture" 
          loading="lazy"
          className="w-full h-full object-contain rounded-full bg-white/20 border border-white/20 backdrop-blur-[2px] shadow-brand-md animate-float"
        />
      </div>

      {/* Horizontal Swipeable Services List */}
      <div className="flex flex-col gap-4 select-none">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-neutral-400 pl-1">
          Our Offerings
        </span>
        
        {/* Swipeable container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory -mx-6 px-6">
          {SERVICES_DATA.map((service) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <a
                key={service.id}
                href={`#services/${service.slug}`}
                className="snap-center shrink-0 w-[240px] bg-white/50 border border-[rgba(0,0,0,0.06)] rounded-[24px] p-6 shadow-brand-sm backdrop-blur-md flex flex-col justify-between gap-6 hover:border-brand-purple transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full border border-[rgba(0,0,0,0.06)] bg-white flex items-center justify-center text-brand-text group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-brand-text group-hover:text-brand-purple transition-colors">
                    {service.title}
                  </span>
                  <p className="text-[11px] text-neutral-400 leading-normal">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400 group-hover:text-brand-purple transition-colors">
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Vertically Stacked Promise Cards */}
      <div className="flex flex-col gap-4 mt-4 select-none">
        <div className="flex items-center gap-2.5 pb-2">
          <span className="w-2 h-2 rounded-full bg-brand-purple" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-purple">
            Our Promise
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {PROMISE_DATA.map((promise) => (
            <div 
              key={promise.id}
              className="bg-white border border-[rgba(0,0,0,0.04)] rounded-2xl p-5 shadow-brand-sm flex items-start gap-4"
            >
              <span className="text-xs font-bold text-brand-purple pt-0.5">{promise.num}</span>
              <div className="flex flex-col text-xs font-medium leading-relaxed text-brand-text">
                <span className="font-semibold">{promise.title},</span>
                <span className="text-neutral-500">{promise.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
export default MobileServices;
