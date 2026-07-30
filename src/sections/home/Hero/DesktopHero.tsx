import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Activity, Building, ShoppingBag } from 'lucide-react';
import sculptureImg from '../../../assets/purple_glass_sculpture.jpg';
import DotField from '../../../components/ui/DotField';

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
    <section className="relative h-[850px] w-full bg-gradient-to-b from-[#F9F8FF] to-white flex items-center pt-[140px] pb-16 px-8 overflow-hidden select-none">
      {/* Global Fixed DotField Canvas Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-95">
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
  right-[-8%]
  w-[68%]
  h-[calc(100%+140px)]
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
top-[-70px]
right-0
w-full
h-full
object-contain
object-right
scale-[1.22]
"
          />
        </div>
      </div>

      <div className="max-w-[1500px] w-full mx-auto grid grid-cols-12 relative z-20">
        
        {/* Left Side: Vertical Indicator (01 / 04) */}
        <div className="col-span-1 hidden lg:flex flex-col items-center justify-between h-[360px] self-center pr-8">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[11px] font-bold text-brand-purple tracking-wider">01</span>
            <div className="w-[1.5px] h-20 bg-gradient-to-b from-brand-purple via-neutral-200 to-neutral-200 relative">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-purple" />
            </div>
            <span className="text-[11px] font-bold text-neutral-300 tracking-wider">04</span>
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
            className="text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] text-neutral-400 mb-6"
          >
            Enterprise Software &nbsp;•&nbsp; AI &nbsp;•&nbsp; Digital Transformation
          </motion.span>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-[30px] sm:text-[54px] md:text-[76px] font-medium leading-[1.08] text-brand-text mb-6 tracking-[-0.03em] font-sans"
          >
            Solving today's <br />
            complexity. <br />
            <span className="text-brand-purple">Building tomorrow's <br />
            advantage.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-neutral-500 leading-relaxed max-w-xl mb-10"
          >
            We partner with forward-thinking organizations to design, engineer and scale digital solutions that create measurable business impact.
          </motion.p>

          {/* Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 mb-16"
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
              href="#case-studies"
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
