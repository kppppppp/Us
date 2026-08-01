import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

// Local image imports
import visionImg from '../../assets/about/vision.webp';
import philosophyImg from '../../assets/about/philosophy.webp';
import approachImg from '../../assets/about/approach.webp';
import designImg from '../../assets/about/design.webp';
import peopleImg from '../../assets/about/people.webp';
import partnersImg from '../../assets/about/partners.webp';
import toolkitImg from '../../assets/about/toolkit.webp';
import connectImg from '../../assets/about/connect.webp';

interface AccordionItemData {
  id: string;
  title: string;
  content: string;
  image: string;
  eyebrow: string;
  metric: string;
  metricLabel: string;
  tags: string[];
}

const items: AccordionItemData[] = [
  {
    id: "1",
    title: "Our Vision",
    content:
      "We envision a world where technology and design converge to create digital experiences that don't just meet expectations—they shatter them. Our mission is to partner with ambitious brands and transform their digital presence into a competitive advantage.",
    image: visionImg,
    eyebrow: "Strategy & Direction",
    metric: "98%",
    metricLabel: "Client Satisfaction",
    tags: ["Strategic Alignment", "Growth Architecture"],
  },
  {
    id: "2",
    title: "Our Philosophy",
    content:
      "We believe premium design isn't a luxury—it's a growth engine. Every pixel, every interaction, every line of code is a deliberate choice that compounds into extraordinary user experiences and measurable business outcomes.",
    image: philosophyImg,
    eyebrow: "Design Principles",
    metric: "100%",
    metricLabel: "Zero-Compromise Quality",
    tags: ["Craft-First", "Detail Obsessed"],
  },
  {
    id: "3",
    title: "Our Approach",
    content:
      "We don't follow templates. Each project begins with deep discovery—understanding your market, your users, and your goals. From there, we architect solutions that are as strategically sound as they are visually compelling.",
    image: approachImg,
    eyebrow: "Process & Method",
    metric: "4x",
    metricLabel: "Faster Than Average",
    tags: ["Discovery-Led", "User-Centered"],
  },
  {
    id: "4",
    title: "Design & Code",
    content:
      "We bridge the gap between design and engineering. Our team doesn't just hand off mockups—we build living, breathing digital products with modern frameworks, performant architectures, and pixel-perfect execution.",
    image: designImg,
    eyebrow: "Engineering Excellence",
    metric: "60fps",
    metricLabel: "Performance Standard",
    tags: ["Full-Stack", "Pixel-Perfect"],
  },
  {
    id: "5",
    title: "Our People",
    content:
      "Senior-first. No junior handoffs. You work directly with veteran product designers, software architects, and growth strategists who have shipped enterprise platforms and scaled digital ecosystems.",
    image: peopleImg,
    eyebrow: "Team & Culture",
    metric: "10+",
    metricLabel: "Years Avg. Experience",
    tags: ["Senior-First", "Direct Partnership"],
  },
  {
    id: "6",
    title: "Who We Partner With",
    content:
      "We collaborate with startups, scale-ups, and enterprises who value craft over shortcuts. If you're building something that matters—something that needs to stand out in a crowded market—we're your team.",
    image: partnersImg,
    eyebrow: "Partnerships",
    metric: "50+",
    metricLabel: "Projects Delivered",
    tags: ["Startups", "Enterprise"],
  },
  {
    id: "7",
    title: "Our Toolkit",
    content:
      "React, Next.js, TypeScript, GSAP, Three.js, Figma—these are instruments in our orchestra. But tools serve the vision, not the other way around. We choose the right stack for your specific challenge.",
    image: toolkitImg,
    eyebrow: "Technology",
    metric: "15+",
    metricLabel: "Modern Technologies",
    tags: ["React & Next.js", "Scalable Stack"],
  },
  {
    id: "8",
    title: "Let's Connect",
    content:
      "Ready to build something unexpected? Reach out through our contact page or drop us a line directly. We're always open to new projects, bold ideas, and meaningful collaborations.",
    image: connectImg,
    eyebrow: "Get In Touch",
    metric: "24h",
    metricLabel: "Response Time",
    tags: ["Open to Projects", "Let's Talk"],
  },
];

export function AboutAccordion() {
  const [activeId, setActiveId] = useState("1");
  const activeItem = items.find(item => item.id === activeId) || items[0];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12">

      {/* LEFT — Accordion (60%) */}
      <div className="w-full lg:w-[58%]">
        <Accordion
          type="single"
          defaultValue="1"
          collapsible
          className="w-full"
          onValueChange={(val) => { if (val) setActiveId(val); }}
        >
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <AccordionItem
                value={item.id}
                key={item.id}
                className="last:border-b border-neutral-200/80 group"
              >
                <AccordionTrigger
                  className="text-left pl-4 md:pl-8 pr-2 overflow-hidden duration-300 hover:no-underline cursor-pointer py-5 [&>svg]:hidden"
                >
                  <div className="flex flex-1 items-center gap-4 md:gap-5">
                    {/* Animated left accent bar */}
                    <div
                      className={`w-[3px] self-stretch rounded-full transition-all duration-400 ${
                        isActive
                          ? 'bg-brand-purple scale-y-100'
                          : 'bg-neutral-200 scale-y-75'
                      }`}
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${
                        isActive ? 'text-brand-purple' : 'text-neutral-300'
                      }`}>
                        {item.eyebrow}
                      </span>
                      <h3 className={`text-xl md:text-2xl lg:text-3xl font-serif font-bold tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-brand-text' : 'text-neutral-300'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pl-4 md:pl-8 pr-4 md:pr-6 pb-6">
                  <div className="pl-[19px] md:pl-[23px] border-l-[3px] border-brand-purple/10">
                    <p className="text-neutral-500 text-sm md:text-[15px] leading-relaxed font-light pl-4 md:pl-5">
                      {item.content}
                    </p>

                    {/* Tags shown inline on mobile, hidden on desktop (panel shows them) */}
                    <div className="flex flex-wrap gap-2 mt-4 pl-4 md:pl-5 lg:hidden">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full border border-brand-purple/15 text-brand-purple bg-brand-purple/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mobile/Tablet: Image panel below opened item */}
                  <div className="mt-5 lg:hidden">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-neutral-200/60">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                        <div>
                          <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">{item.eyebrow}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-white text-2xl font-bold font-serif">{item.metric}</span>
                          <span className="block text-white/70 text-[10px] font-medium">{item.metricLabel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* RIGHT — Sticky Visual Panel (40%), hidden on mobile/tablet */}
      <div className="hidden lg:block lg:w-[42%]">
        <div className="sticky top-32">
          {/* Image container */}
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-neutral-200/60 shadow-brand-sm">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent pointer-events-none" />

            {/* Bottom content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id + '-info'}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
                >
                  <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase block mb-2">
                    {activeItem.eyebrow}
                  </span>
                  <div className="flex items-end justify-between">
                    <div className="flex gap-2">
                      {activeItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full border border-white/20 text-white/80 bg-white/10 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Metric card beneath image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id + '-metric'}
              className="mt-4 flex items-center gap-5 px-5 py-4 rounded-xl border border-neutral-200/60 bg-white/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
            >
              <span className="text-3xl font-serif font-bold text-brand-purple leading-none">
                {activeItem.metric}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-brand-text">
                  {activeItem.metricLabel}
                </span>
                <span className="text-[11px] text-neutral-400 font-light">
                  Verified across all engagements
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default AboutAccordion;
