import React from 'react';
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Cpu,
  Cloud,
} from 'lucide-react';

import sculptureImg from '../../../assets/purple_glass_sculpture.webp';
import DotField from '../../../components/ui/DotField';
import TextType from '../../../components/ui/TextType';

export const MobileHero: React.FC = () => {
  const impactItems = [
    { title: 'Intelligent Systems', icon: Sparkles },
    { title: 'Digital Platforms', icon: Layers },
    { title: 'AI & Automation', icon: Cpu },
    { title: 'Cloud & DevOps', icon: Cloud },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FBFAFF] via-[#F8F5FF] to-white pt-[110px] pb-12 px-6 select-none">

      {/* ================= Dot Background ================= */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <DotField
          dotRadius={2.8}
          dotSpacing={16}
          bulgeStrength={55}
          glowRadius={180}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(0,0,0,0.28)"
          gradientTo="rgba(0,0,0,0.12)"
          glowColor="rgba(0,0,0,0.02)"
        />
      </div>

      {/* ================= Full Screen Sculpture Background ================= */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">

        {/* Purple sculpture */}
        <img
          src={sculptureImg}
          alt=""
          className="
            absolute
            left-1/2
            top-[44%]
            -translate-x-1/2
            -translate-y-1/2
            w-[145%]
            max-w-none
            object-contain
            opacity-[0.88]
            scale-[1.45]
            blur-[1px]
          "
        />

        {/* Soft white overlay */}
        <div className="absolute inset-0 bg-white/35" />

        {/* Extra radial glow */}
        <div
          className="
            absolute
            left-1/2
            top-[44%]
            -translate-x-1/2
            -translate-y-1/2
            w-[320px]
            h-[320px]
            rounded-full
            bg-brand-purple/10
            blur-[90px]
          "
        />
      </div>

      {/* ================= Content ================= */}
      <div className="relative z-20 flex flex-col justify-center">

        {/* Tagline */}
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-neutral-500 text-center">
          Enterprise Software &nbsp; • &nbsp; AI &nbsp; • &nbsp; Transformation
        </span>

        {/* Hero Heading */}
        <div className="mt-20">
          <h1 className="text-[38px] leading-[1.08] tracking-[-0.03em] font-semibold text-center text-brand-text">

            Solving today's
            <br />
            complexity.
            <br />

            <span className="block text-brand-purple min-h-[95px] mt-2">
              <TextType
                text={[
                  "Building tomorrow's advantage.",
                  'Engineering unexpected scale.',
                  'Designing premium experiences.',
                ]}
                typingSpeed={60}
                pauseDuration={2000}
                showCursor
                cursorCharacter="|"
              />
            </span>

          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-[15px] leading-7 text-neutral-600 text-center max-w-sm mx-auto">
          We partner with forward-thinking organizations to design, engineer
          and scale digital solutions that create measurable business impact.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 mt-10">

          <button className="w-full rounded-full bg-[#141414] py-4 text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-xl hover:bg-[#222] transition-all">
            Let's Build Together
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href="#case-studies"
            className="w-full rounded-full border border-black/10 bg-white/65 backdrop-blur-md py-4 text-sm font-semibold text-brand-text flex items-center justify-center gap-2"
          >
            Explore Our Work
            <ArrowUpRight className="w-4 h-4 text-neutral-400" />
          </a>

        </div>

        {/* Impact Card */}
        <div className="mt-10 rounded-3xl border border-white/40 bg-white/55 backdrop-blur-xl shadow-2xl p-5">

          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-purple">
            WE CREATE IMPACT
          </span>

          <div className="mt-5 flex flex-col gap-2">

            {impactItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={index}
                  href={`#${item.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="flex items-center justify-between rounded-2xl p-3 hover:bg-white/70 transition-all"
                >
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md">
                      <Icon className="w-4 h-4 text-brand-text" />
                    </div>

                    <span className="text-sm font-semibold text-brand-text">
                      {item.title}
                    </span>

                  </div>

                  <ArrowUpRight className="w-4 h-4 text-neutral-400" />
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