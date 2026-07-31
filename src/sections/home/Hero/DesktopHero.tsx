import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Activity, Building, ShoppingBag } from 'lucide-react';
import sculptureImg from '../../../assets/purple_glass_sculpture.webp';
import DotField from '../../../components/ui/DotField';
import TextType from '../../../components/ui/TextType';

export const DesktopHero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };



  const industryItems = [
    { name: 'Healthcare', icon: Heart },
    { name: 'Manufacturing', icon: Activity },
    { name: 'Financial Services', icon: Building },
    { name: 'Retail & Commerce', icon: ShoppingBag }
  ];

  return (
    <section id="solutions-hero" className="relative min-h-[750px] h-screen w-full bg-gradient-to-b from-[#F9F8FF] to-white flex items-center pt-[135px] pb-12 px-8 overflow-hidden select-none">
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
      
      {/* Background Flowing Sculpture */}
     <div
  className="
  absolute
  top-0
  right-[-4%]
  w-[68%]
  h-full
  pointer-events-none
  select-none
  z-10
  overflow-visible
  "
>
        <div className="relative w-full h-full flex items-center justify-end">
          {/* Subtle purple radial background glow */}
          <div className="absolute right-1/4 top-1/3 w-[500px] h-[500px] rounded-full bg-brand-purple/10 blur-[120px]" />
          
          <img 
            src={sculptureImg} 
            alt="Unexpected Solutions abstract glass sculpture" 
className="
absolute
top-[-60px]
right-0
w-full
h-[calc(100%+120px)]
object-contain
object-right
scale-[1.24]
"
          />
        </div>
      </div>

      <div className="max-w-[1500px] w-full mx-auto grid grid-cols-12 relative z-20">
        
        {/* Left Side: Premium Interactive Vertical Navigation Track */}
        <div className="col-span-1 hidden lg:flex flex-col items-center justify-center self-center pr-8 relative z-30">
          <div className="flex flex-col items-center gap-7 relative">
            {/* Sleek track line background */}
            <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[1px] bg-neutral-200/60 z-0" />
            
            {[
              { num: '01', label: 'INTRO', href: '#' },
              { num: '02', label: 'SERVICES', href: '#services-section' },
              { num: '03', label: 'WORK', href: '#case-studies' },
              { num: '04', label: 'VISION', href: '#about-us' }
            ].map((step, idx) => (
              <a
                key={idx}
                href={step.href}
                onClick={(e) => {
                  if (step.href === '#') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    e.preventDefault();
                    document.querySelector(step.href)?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group flex flex-col items-center gap-1 relative z-10 cursor-pointer select-none"
              >
                {/* Indicator dot wrapper with hover glow */}
                <div className="w-5 h-5 rounded-full bg-white/80 backdrop-blur-[2px] border border-neutral-200/80 flex items-center justify-center transition-all duration-300 group-hover:border-brand-purple group-hover:shadow-[0_0_12px_rgba(93,70,216,0.35)]">
                  <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-brand-purple' : 'bg-neutral-300 group-hover:bg-brand-purple'} transition-colors duration-300`} />
                </div>
                {/* Tooltip label or number on hover */}
                <span className="text-[9px] font-bold tracking-wider text-neutral-400 group-hover:text-brand-purple transition-colors duration-300">
                  {step.num}
                </span>
                <span className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-extrabold tracking-widest text-brand-purple bg-white/95 border border-brand-purple/20 px-2.5 py-1 rounded-md opacity-0 translate-x-[-10px] pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-brand-sm">
                  {step.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Center/Left Content Area */}
        <motion.div 
          className="col-span-11 lg:col-span-7 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Tagline */}
          <motion.span 
            variants={itemVariants}
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-neutral-400 mb-4"
          >
            Enterprise Software &nbsp;•&nbsp; AI &nbsp;•&nbsp; Digital Transformation
          </motion.span>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-[40px] sm:text-[50px] md:text-[58px] font-medium leading-[1.05] text-brand-text mb-4 tracking-[-0.03em] font-sans max-w-[680px]"
          >
            Solving today's <br />
            complexity. <br />
            <span className="text-brand-purple block min-h-[130px]">
              <TextType 
                text={[
                  "Building tomorrow's advantage.",
                  "Engineering unexpected scale.",
                  "Designing premium experiences."
                ]}
                typingSpeed={60}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="|"
                className="inline-block"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-xl mb-6"
          >
            We partner with forward-thinking organizations to design, engineer and scale digital solutions that create measurable business impact.
          </motion.p>

          {/* Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 mb-10"
          >
            {/* Primary Action */}
            <motion.button
              className="bg-[#141414] hover:bg-[#242424] text-white text-[15px] font-medium py-3.5 px-8 rounded-full shadow-brand-sm flex items-center gap-2.5 cursor-pointer select-none transition-colors duration-300"
              whileHover={{ 
                y: -2,
                boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.15)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Let's Build Together</span>
              <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2.2} />
            </motion.button>

            {/* Secondary Action */}
            <motion.a 
              href="/projects"
              className="relative py-2 font-medium text-[15px] text-brand-text hover:text-brand-purple flex items-center gap-1.5 transition-colors duration-300 group cursor-pointer"
              whileHover={{ x: 2 }}
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4" />
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-text group-hover:bg-brand-purple scale-x-100 origin-left transition-transform duration-300" />
            </motion.a>
          </motion.div>

          {/* Bottom Trusted Section */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col gap-5 border-t border-[rgba(0,0,0,0.06)] pt-8"
          >
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              Trusted by Organizations Across Industries
            </span>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
              {industryItems.map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <div key={i} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-purple transition-colors duration-300">
                    <Icon className="w-[16px] h-[16px] opacity-75" />
                    <span className="font-medium">{ind.name}</span>
                    {i < industryItems.length - 1 && (
                      <span className="ml-8 text-neutral-200 hidden sm:inline">|</span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Impact Card (Glassmorphism overlay) */}
        

      </div>
    </section>
  );
};
export default DesktopHero;
