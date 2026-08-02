import React from "react";
import { ArrowUpRight } from "lucide-react";

import sculptureImg from "../../../assets/purple_glass_sculpture.webp";
import TextType from "../../../components/ui/TextType";

const stats = [
  { value: "150+", label: "Projects" },
  { value: "40+", label: "Experts" },
  { value: "98%", label: "Success" },
];

export const MobileHero: React.FC = () => {
  return (
    <section className="relative bg-white pt-[90px] pb-16">
      {/* Image banner — the thesis of the page, full width, not decorative background */}
      <div className="relative mx-4 h-[52vh] min-h-[380px] overflow-hidden rounded-[28px]">
        <img
          src={sculptureImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />

        {/* Eyebrow badge, top-left on the image */}
        <span
          className="
            absolute
            top-5
            left-5
            rounded-full
            bg-white/90
            backdrop-blur-md
            px-3
            py-1.5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.24em]
            text-brand-purple
          "
        >
          Unexpected Solution
        </span>

        {/* Headline, set directly into the image at the bottom */}
        <h1
          className="
            absolute
            bottom-6
            left-6
            right-6
            text-[42px]
            leading-[0.95]
            tracking-[-0.04em]
            font-bold
            text-white
          "
        >
          We Build Digital Businesses.
        </h1>
      </div>

      {/* Content below the image — single column, generous rhythm */}
      <div className="px-7 mt-8">
        <div className="h-[36px]">
          <p className="text-[19px] font-semibold leading-tight text-brand-purple">
            <TextType
              text={[
                "Powered by AI.",
                "Built for Scale.",
                "Designed for Growth.",
              ]}
              typingSpeed={55}
              pauseDuration={1800}
              showCursor
              cursorCharacter="|"
            />
          </p>
        </div>

        <p className="mt-4 text-[15px] leading-7 text-neutral-600 max-w-[320px]">
          We help enterprises transform operations with AI, software
          engineering and scalable digital products designed for
          measurable business impact.
        </p>

        {/* Single primary action, plain text link as the secondary — no circular icon button */}
        <div className="mt-8 flex flex-col items-start gap-4">
          <button
            className="
              w-full
              rounded-full
              bg-black
              py-4
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              shadow-xl
            "
          >
            Let's Talk
            <ArrowUpRight size={18} />
          </button>

          <a
            href="#work"
            className="
              inline-flex
              items-center
              gap-1.5
              text-[14px]
              font-semibold
              text-brand-text
              underline
              underline-offset-4
              decoration-black/20
            "
          >
            See our work
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Stats as a single divided row — no cards, no grid */}
        <div className="mt-12 flex items-stretch divide-x divide-black/10 border-t border-black/10 pt-6">
          {stats.map((item) => (
            <div key={item.label} className="flex-1 px-4 first:pl-0 text-left">
              <div className="text-2xl font-bold text-brand-text">
                {item.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-neutral-500">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileHero;