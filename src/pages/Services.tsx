import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from '../components/ui/ScrollFloat';
import ScrollExpandMedia from '../components/ui/ScrollExpandMedia';

import heroImg from '../assets/image3.png';
import heroBgImg from '../assets/image2.png';
import metaImg from '../assets/services_meta.jpg';
import ecomImg from '../assets/services_ecom.jpg';
import webImg from '../assets/services_web.jpg';
import appImg from '../assets/services_app.jpg';
import socialImg from '../assets/services_social.jpg';
import strategyImg from '../assets/services_strategy.jpg';
import influencerImg from '../assets/services_influencer.jpg';
import seoImg from '../assets/services_seo.jpg';
import photoshootImg from '../assets/services_photoshoot.jpg';
import ctaImg from '../assets/services_cta.jpg';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   Types & Constants
   ═══════════════════════════════════════════ */

type LayoutFamily = 'hero' | 'editorial' | 'centerpiece';
type Tier = 'hero' | 'core' | 'supporting';

interface ServiceItem {
  id: string;
  num: string;
  titleLine1: string;
  titleLine2: string;
  desc: string;
  features: string[];
  image: string;
  layout: LayoutFamily;
  tier: Tier;
  ctaText: string;
  glowColor: string;
  imgRotate: number;
  textSide: 'left' | 'right';
  spacing: string;
}

const TIER_STYLES = {
  hero: {
    titleClass: 'text-[clamp(56px,6.5vw,84px)]',
    subtitleClass: 'text-[clamp(48px,5.5vw,72px)]',
    descClass: 'text-base md:text-lg',
    glowSize: 'w-[900px] h-[900px]',
    glowBlur: 'blur-[200px]',
  },
  core: {
    titleClass: 'text-[clamp(48px,5.5vw,72px)]',
    subtitleClass: 'text-[clamp(40px,4.5vw,60px)]',
    descClass: 'text-sm md:text-base',
    glowSize: 'w-[700px] h-[700px]',
    glowBlur: 'blur-[160px]',
  },
  supporting: {
    titleClass: 'text-[clamp(40px,5vw,64px)]',
    subtitleClass: 'text-[clamp(34px,4vw,52px)]',
    descClass: 'text-sm',
    glowSize: 'w-[600px] h-[600px]',
    glowBlur: 'blur-[140px]',
  },
} as const;

/* ═══════════════════════════════════════════
   Magnetic Interaction Wrapper
   ═══════════════════════════════════════════ */

const Magnetic: React.FC<{ children: React.ReactNode; className?: string; range?: number }> = ({
  children, className = '', range = 30,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { damping: 15, stiffness: 150 };
  const dx = useSpring(x, springCfg);
  const dy = useSpring(y, springCfg);

  return (
    <motion.div
      style={{ x: dx, y: dy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * (range / r.width));
        y.set((e.clientY - r.top - r.height / 2) * (range / r.height));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   Per-Service Unique Motion Configs
   ═══════════════════════════════════════════ */

const getServiceMotion = (id: string) => {
  const base = { ease: 'easeInOut' as const, repeat: Infinity };
  switch (id) {
    case 'meta-ads-management': // Slow infinity rotation
      return {
        animate: { y: [0, -14, 0], rotateY: [0, 5, 0, -5, 0] },
        transition: { y: { duration: 10, ...base }, rotateY: { duration: 16, ...base } },
      };
    case 'ecommerce-sites': // Gentle float with subtle scale
      return {
        animate: { y: [0, -10, 0], scale: [1, 1.02, 1] },
        transition: { y: { duration: 7, ...base }, scale: { duration: 9, ...base } },
      };
    case 'web-development': // Code shimmer - subtle rotateZ
      return {
        animate: { y: [0, -8, 0], rotateZ: [0, 0.5, 0, -0.5, 0] },
        transition: { y: { duration: 6, ...base }, rotateZ: { duration: 10, ...base } },
      };
    case 'app-development': // Phone tilt
      return {
        animate: { y: [0, -12, 0], rotateZ: [-2, 2, -2] },
        transition: { y: { duration: 5, ...base }, rotateZ: { duration: 8, ...base } },
      };
    case 'social-media-marketing': // Upward drift
      return {
        animate: { y: [0, -16, 0], x: [0, 4, 0] },
        transition: { y: { duration: 7, ...base }, x: { duration: 9, ...base } },
      };
    case 'digital-marketing-strategy': // Slow pulse
      return {
        animate: { y: [0, -10, 0], scale: [1, 1.03, 1] },
        transition: { y: { duration: 9, ...base }, scale: { duration: 12, ...base } },
      };
    case 'influencer-marketing': // Horizontal sway
      return {
        animate: { y: [0, -8, 0], x: [-5, 5, -5] },
        transition: { y: { duration: 6, ...base }, x: { duration: 8, ...base } },
      };
    case 'seo-growth': // Orbital rotation
      return {
        animate: { y: [0, -12, 0], rotateY: [0, 8, 0] },
        transition: { y: { duration: 8, ...base }, rotateY: { duration: 12, ...base } },
      };
    case 'photoshoot-services': // Light sweep
      return {
        animate: { y: [0, -6, 0], rotateZ: [0, 1, 0] },
        transition: { y: { duration: 7, ...base }, rotateZ: { duration: 14, ...base } },
      };
    default:
      return {
        animate: { y: [0, -10, 0] },
        transition: { y: { duration: 7, ...base } },
      };
  }
};

/* ═══════════════════════════════════════════
   Service Data — 9 Services, 3 Layout Families, 3 Tiers
   ═══════════════════════════════════════════ */

const services: ServiceItem[] = [
  {
    id: 'meta-ads-management',
    num: '01',
    titleLine1: 'META ADS',
    titleLine2: 'Management',
    desc: 'Data-driven social advertising scaled to drive conversions. We build campaigns that turn attention into measurable revenue.',
    features: ['Audience Research & Targeting', 'High-Converting Ad Creatives', 'Campaign Management', 'Performance Analytics', 'ROI Optimization'],
    image: metaImg,
    layout: 'hero',
    tier: 'hero',
    ctaText: 'Launch Campaigns',
    glowColor: 'rgba(93, 70, 216, 0.10)',
    imgRotate: 1,
    textSide: 'left',
    spacing: 'pt-12 pb-36 lg:pt-16 lg:pb-48',
  },
  {
    id: 'ecommerce-sites',
    num: '02',
    titleLine1: 'ECOMMERCE',
    titleLine2: 'Sites & Platforms',
    desc: 'High-performance ecommerce stores optimized for ultimate checkout conversion and seamless user experiences.',
    features: ['Custom Store Development', 'Conversion Focused UI/UX', 'Payment Gateway Integration', 'Speed Optimization', 'Growth & Retention Tools'],
    image: ecomImg,
    layout: 'editorial',
    tier: 'hero',
    ctaText: 'Build Your Store',
    glowColor: 'rgba(93, 70, 216, 0.08)',
    imgRotate: -2,
    textSide: 'right',
    spacing: 'pt-32 pb-36 lg:pt-48 lg:pb-48',
  },
  {
    id: 'web-development',
    num: '03',
    titleLine1: 'WEB',
    titleLine2: 'Development',
    desc: 'Premium enterprise web architecture built using modern technologies for speed, security, and scalability.',
    features: ['React & Next.js', 'Headless CMS Integration', 'API & Backend Systems', 'Enterprise Security', 'Technical SEO'],
    image: webImg,
    layout: 'editorial',
    tier: 'core',
    ctaText: 'Build Your Website',
    glowColor: 'rgba(70, 100, 216, 0.08)',
    imgRotate: 2,
    textSide: 'left',
    spacing: 'pt-32 pb-36 lg:pt-48 lg:pb-48',
  },
  {
    id: 'app-development',
    num: '04',
    titleLine1: 'APP',
    titleLine2: 'Architecture',
    desc: 'Beautiful native and hybrid mobile applications designed for scale, performance, and cross-platform reliability.',
    features: ['iOS & Android Native', 'Flutter & React Native', 'Custom UI/UX Design', 'App Store Deployment', 'Post-Launch Maintenance'],
    image: appImg,
    layout: 'centerpiece',
    tier: 'core',
    ctaText: 'Create Your App',
    glowColor: 'rgba(93, 70, 216, 0.08)',
    imgRotate: 4,
    textSide: 'left',
    spacing: 'pt-32 pb-36 lg:pt-48 lg:pb-48',
  },
  {
    id: 'social-media-marketing',
    num: '05',
    titleLine1: 'SOCIAL MEDIA',
    titleLine2: 'Marketing',
    desc: 'Organic branding strategies that create active communities around your business and amplify your unique voice.',
    features: ['Content Strategy & Planning', 'Visual Assets & Calendar', 'Cohesive Brand Identity', 'Organic Reach Growth', 'Community Management'],
    image: socialImg,
    layout: 'editorial',
    tier: 'supporting',
    ctaText: 'Grow Your Audience',
    glowColor: 'rgba(120, 70, 216, 0.06)',
    imgRotate: -1,
    textSide: 'right',
    spacing: 'pt-32 pb-36 lg:pt-48 lg:pb-48',
  },
  {
    id: 'digital-marketing-strategy',
    num: '06',
    titleLine1: 'DIGITAL',
    titleLine2: 'Marketing Strategy',
    desc: 'Complete digital growth systems built around measurable business goals and long-term market dominance.',
    features: ['Funnel Architecture', 'Growth Roadmaps', 'Conversion Optimization', 'Analytics Integration', 'Scaling Systems'],
    image: strategyImg,
    layout: 'hero',
    tier: 'core',
    ctaText: 'Plan Your Growth',
    glowColor: 'rgba(80, 50, 180, 0.10)',
    imgRotate: 2,
    textSide: 'right',
    spacing: 'pt-32 pb-36 lg:pt-48 lg:pb-48',
  },
  {
    id: 'influencer-marketing',
    num: '07',
    titleLine1: 'INFLUENCER',
    titleLine2: 'Campaigns',
    desc: 'Connect your brand with trusted creators that drive authentic engagement and targeted reach in your niche.',
    features: ['Creator Discovery', 'Campaign Planning', 'Brand Partnerships', 'Performance Tracking', 'UGC Strategy'],
    image: influencerImg,
    layout: 'centerpiece',
    tier: 'supporting',
    ctaText: 'Start a Campaign',
    glowColor: 'rgba(100, 70, 200, 0.06)',
    imgRotate: -3,
    textSide: 'left',
    spacing: 'pt-32 pb-36 lg:pt-48 lg:pb-48',
  },
  {
    id: 'seo-growth',
    num: '08',
    titleLine1: 'SEO',
    titleLine2: 'Growth & Content',
    desc: 'Organic growth strategies built around search intent, technical excellence, and high-authority link building.',
    features: ['Technical SEO Auditing', 'Content Strategy', 'Keyword Optimization', 'Premium Link Building', 'Performance Monitoring'],
    image: seoImg,
    layout: 'hero',
    tier: 'hero',
    ctaText: 'Increase Rankings',
    glowColor: 'rgba(60, 40, 140, 0.10)',
    imgRotate: 1,
    textSide: 'left',
    spacing: 'pt-32 pb-36 lg:pt-52 lg:pb-52',
  },
  {
    id: 'photoshoot-services',
    num: '09',
    titleLine1: 'PHOTOSHOOT',
    titleLine2: 'Services',
    desc: 'Premium photography crafted for brands, products and campaigns that demand high-end visual storytelling.',
    features: ['Product Photography', 'Corporate Shoots', 'Lifestyle Photography', 'Editing & Retouching', 'Marketing Assets'],
    image: photoshootImg,
    layout: 'centerpiece',
    tier: 'supporting',
    ctaText: 'Book a Shoot',
    glowColor: 'rgba(160, 140, 200, 0.06)',
    imgRotate: -2,
    textSide: 'left',
    spacing: 'pt-32 pb-36 lg:pt-48 lg:pb-48',
  },
];

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */

export const Services: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState(-1);

  const heroRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX - window.innerWidth / 2) / 40;
    const y = (e.clientY - window.innerHeight / 2) / 40;
    setMousePosition({ x, y });
  };

  /* ─── Helper: Editorial Text Block ─── */
  const renderTextBlock = (service: ServiceItem, alignment: 'left' | 'center') => {
    const styles = TIER_STYLES[service.tier];
    const isCenter = alignment === 'center';

    return (
      <div className={`flex flex-col ${isCenter ? 'items-center text-center' : ''}`}>
        {/* Service Number — subtle, not dominant */}
        <span
          data-reveal="num"
          className="text-[11px] font-semibold text-brand-purple/50 tracking-[0.3em] mb-8 block font-sans"
        >
          {service.num}
        </span>

        {/* Title — intentional line breaks, hierarchy between sans and serif */}
        <div data-reveal="title" className={`flex flex-col ${isCenter ? 'items-center' : ''}`}>
          <h2 className={`${styles.titleClass} font-extrabold uppercase font-sans leading-[0.95] text-neutral-900 whitespace-nowrap`}>
            {service.titleLine1}
          </h2>
          <h3 className={`${styles.subtitleClass} font-normal italic font-serif leading-[1.1] text-neutral-800 mt-1`}>
            {service.titleLine2}
          </h3>
        </div>

        {/* Description */}
        <p
          data-reveal="desc"
          className={`${styles.descClass} text-neutral-500 leading-relaxed max-w-[460px] mt-8 ${isCenter ? 'mx-auto' : ''}`}
        >
          {service.desc}
        </p>

        {/* Divider */}
        <div
          data-reveal="divider"
          className={`h-px bg-neutral-200 w-full max-w-[460px] my-10 origin-left ${isCenter ? 'mx-auto' : ''}`}
        />

        {/* Features — presented as premium capabilities */}
        <div className={`flex flex-col gap-4 ${isCenter ? 'items-center' : 'pl-5 border-l-2 border-brand-purple/15'}`}>
          {service.features.map((f, i) => (
            <span
              key={i}
              data-reveal="feature"
              className={`text-sm text-neutral-600 font-medium tracking-wide font-sans ${isCenter ? '' : ''}`}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Contextual CTA */}
        <div data-reveal="cta" className="mt-12">
          <Magnetic range={20}>
            <a href="/contact" className="group relative inline-flex items-center gap-3 py-3">
              <span className="text-sm font-semibold tracking-[0.12em] uppercase text-neutral-900 group-hover:text-brand-purple transition-colors duration-500 font-sans">
                {service.ctaText}
              </span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-purple/5 group-hover:bg-brand-purple/15 transition-all duration-500">
                <ArrowRight className="w-4 h-4 text-brand-purple group-hover:translate-x-0.5 transition-transform duration-500" />
              </span>
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-purple scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </a>
          </Magnetic>
        </div>
      </div>
    );
  };

  /* ─── Helper: Floating Sculpture ─── */
  const renderSculpture = (service: ServiceItem) => {
    const styles = TIER_STYLES[service.tier];
    const motionProps = getServiceMotion(service.id);

    return (
      <div className="relative w-full">
        {/* Ambient glow behind sculpture */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${styles.glowSize} ${styles.glowBlur} pointer-events-none -z-10 transition-opacity duration-1000`}
          style={{ backgroundColor: service.glowColor }}
        />

        {/* Outer: Service-specific unique motion */}
        <motion.div
          animate={motionProps.animate}
          transition={motionProps.transition}
        >
          {/* Inner: Mouse parallax tilt */}
          <motion.div
            animate={{
              rotateX: mousePosition.y * 0.06,
              rotateY: mousePosition.x * 0.06,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            style={{ perspective: 1000 }}
          >
            <img
              src={service.image}
              alt={`${service.titleLine1} ${service.titleLine2}`}
              className="w-full object-cover rounded-2xl"
              style={{
                filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.06))',
                WebkitBoxReflect: 'below 20px linear-gradient(transparent 60%, rgba(255,255,255,0.20))',
                transform: `rotate(${service.imgRotate}deg)`,
              }}
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>
    );
  };

  /* ─── GSAP Progressive Reveal & Navigation Tracking ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero fade on scroll
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          opacity: 0,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '80% top',
            scrub: true,
          },
        });
      }

      // Per-section progressive reveals
      sectionRefs.current.forEach((section, idx) => {
        if (!section) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        });

        const num = section.querySelector('[data-reveal="num"]');
        const title = section.querySelector('[data-reveal="title"]');
        const desc = section.querySelector('[data-reveal="desc"]');
        const divider = section.querySelector('[data-reveal="divider"]');
        const features = section.querySelectorAll('[data-reveal="feature"]');
        const cta = section.querySelector('[data-reveal="cta"]');

        if (num) tl.from(num, { autoAlpha: 0, y: 20, duration: 0.6, ease: 'power3.out' });
        if (title) tl.from(title, { autoAlpha: 0, y: 40, duration: 0.9, ease: 'power3.out' }, '-=0.3');
        if (desc) tl.from(desc, { autoAlpha: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.5');
        if (divider) tl.from(divider, { scaleX: 0, duration: 0.7, ease: 'power3.inOut' }, '-=0.3');
        if (features.length) tl.from(features, { autoAlpha: 0, y: 15, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.3');
        if (cta) tl.from(cta, { autoAlpha: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.2');

        // Active service tracking for sticky nav
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveService(idx);
            } else if (idx === 0 && self.progress === 0) {
              setActiveService(-1);
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  /* ═══════════════════════════════════════════
     Render
     ═══════════════════════════════════════════ */

  return (
    <div
      className="w-full bg-[#FCFBFF] select-none overflow-x-hidden relative font-sans"
      onMouseMove={handleMouseMove}
    >
      {/* ─── Background Depth Layers ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.025] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')]" />
        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.012] bg-[linear-gradient(to_right,#5d46d8_1px,transparent_1px),linear-gradient(to_bottom,#5d46d8_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* ─── Sticky Service Navigation (Desktop Only) ─── */}
      <motion.nav
        animate={{
          opacity: activeService >= 0 ? 1 : 0,
          x: activeService >= 0 ? 0 : -20,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5 ${
          activeService >= 0 ? '' : 'pointer-events-none'
        }`}
        aria-label="Service navigation"
      >
        {services.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                i === activeService
                  ? 'w-2.5 h-2.5 bg-brand-purple'
                  : 'w-1.5 h-1.5 bg-neutral-300 group-hover:bg-neutral-400'
              }`}
            />
            <span
              className={`text-[9px] tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 whitespace-nowrap ${
                i === activeService
                  ? 'opacity-100 text-brand-purple'
                  : 'opacity-0 group-hover:opacity-70 text-neutral-400'
              }`}
            >
              {s.titleLine1}
            </span>
          </a>
        ))}
      </motion.nav>

      {/* ═══════════════════════════════════════════
          HERO SECTION (ScrollExpandMedia)
         ═══════════════════════════════════════════ */}
      <ScrollExpandMedia
        mediaSrc={heroImg}
        bgImageSrc={heroBgImg}
        title="Every interaction."
        subtitle="Every conversion. Engineered."
        scrollToExpand="Scroll to expand"
      >
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center w-full min-h-[40vh] pt-12 pb-20">
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-brand-purple tracking-[0.45em] uppercase mb-6 block font-sans">
              OUR MISSION
            </span>
            <div className="flex flex-col">
              <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold uppercase font-sans leading-[1.0] text-neutral-900">
                Ideas become
              </h2>
              <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold uppercase font-sans leading-[1.0] text-neutral-900 mt-1">
                Systems.
              </h2>
              <h3 className="text-[clamp(26px,3.2vw,40px)] font-normal italic font-serif leading-[1.2] text-neutral-800 mt-3">
                Systems become growth.
              </h3>
            </div>
            <p className="mt-8 text-neutral-500 text-base md:text-lg leading-relaxed max-w-[480px]">
              From acquisition to automation, we engineer digital experiences
              that create measurable, compounding growth.
            </p>
          </div>
          <div className="col-span-1 lg:col-span-6">
            <div className="p-8 border border-neutral-100 rounded-2xl bg-white/50 backdrop-blur-md">
              <span className="text-xs font-bold text-neutral-400 tracking-[0.2em] uppercase mb-4 block">
                Unexpected Approach
              </span>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We believe that premium design is not a luxury, but a strategic imperative.
                Every line of code and visual reflection is engineered intentionally to scale your operations and brand authority.
              </p>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* ═══════════════════════════════════════════
          EDITORIAL INTRO
         ═══════════════════════════════════════════ */}
      <section className="relative pt-16 pb-6 px-6 md:px-12 xl:pl-32 z-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="max-w-[900px]">
            <ScrollFloat
              animationDuration={0.9}
              ease="power3.out"
              scrollStart="top bottom-=10%"
              scrollEnd="bottom center"
              stagger={0.02}
              textClassName="!text-left !leading-[1.0] font-sans font-extrabold uppercase text-[clamp(56px,7vw,96px)] text-neutral-900"
            >
              Our Services
            </ScrollFloat>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICE SECTIONS
         ═══════════════════════════════════════════ */}
      <div className="w-full relative z-20">
        {services.map((service, idx) => {

          /* ── Layout A: Hero ── */
          if (service.layout === 'hero') {
            const isTextLeft = service.textSide === 'left';
            return (
              <section
                key={service.id}
                id={service.id}
                ref={(el) => { sectionRefs.current[idx] = el; }}
                className={`relative w-full px-6 md:px-12 xl:pl-32 ${service.spacing} overflow-visible`}
              >
                {/* Ambient section glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
                  <div
                    className={`absolute top-1/2 rounded-full ${TIER_STYLES[service.tier].glowSize} ${TIER_STYLES[service.tier].glowBlur}`}
                    style={{
                      backgroundColor: service.glowColor,
                      left: isTextLeft ? '65%' : '35%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>

                <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8 lg:gap-6 items-start">
                  {/* Text */}
                  <div className={`col-span-12 lg:col-span-5 py-8 ${isTextLeft ? 'lg:order-1' : 'lg:order-2 lg:col-start-8'}`}>
                    {renderTextBlock(service, 'left')}
                  </div>
                  {/* Sculpture — sticky so it lingers as text scrolls */}
                  <div className={`col-span-12 lg:col-span-7 lg:sticky lg:top-32 flex justify-center ${isTextLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="w-full max-w-[620px]">
                      {renderSculpture(service)}
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          /* ── Layout B: Editorial ── */
          if (service.layout === 'editorial') {
            const isTextRight = service.textSide === 'right';
            return (
              <section
                key={service.id}
                id={service.id}
                ref={(el) => { sectionRefs.current[idx] = el; }}
                className={`relative w-full px-6 md:px-12 xl:pl-32 ${service.spacing} overflow-visible`}
              >
                {/* Ambient section glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
                  <div
                    className={`absolute top-1/2 rounded-full ${TIER_STYLES[service.tier].glowSize} ${TIER_STYLES[service.tier].glowBlur}`}
                    style={{
                      backgroundColor: service.glowColor,
                      left: isTextRight ? '35%' : '65%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>

                <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8 lg:gap-6 items-center">
                  {/* Image — dominant column (7 cols) */}
                  <div className={`col-span-12 lg:col-span-7 ${isTextRight ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="w-full max-w-[680px] mx-auto lg:mx-0">
                      {renderSculpture(service)}
                    </div>
                  </div>
                  {/* Text — supporting column (5 cols) */}
                  <div className={`col-span-12 lg:col-span-5 ${isTextRight ? 'lg:order-2' : 'lg:order-1'}`}>
                    {renderTextBlock(service, 'left')}
                  </div>
                </div>
              </section>
            );
          }

          /* ── Layout C: Centerpiece ── */
          return (
            <section
              key={service.id}
              id={service.id}
              ref={(el) => { sectionRefs.current[idx] = el; }}
              className={`relative w-full px-6 md:px-12 xl:pl-32 ${service.spacing} overflow-visible`}
            >
              {/* Ambient section glow */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${TIER_STYLES[service.tier].glowSize} ${TIER_STYLES[service.tier].glowBlur}`}
                  style={{ backgroundColor: service.glowColor }}
                />
              </div>

              <div className="max-w-[1000px] mx-auto flex flex-col items-center">
                {/* Text block — centered */}
                {renderTextBlock(service, 'center')}

                {/* Sculpture — centered hero */}
                <div className="w-full max-w-[520px] mt-20">
                  {renderSculpture(service)}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════
          MASSIVE FINAL CTA
         ═══════════════════════════════════════════ */}
      <section className="relative w-full py-44 lg:py-56 bg-[#0B080E] overflow-hidden">
        {/* Sculpture backdrop */}
        <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
          <img
            src={ctaImg}
            alt=""
            className="w-full h-full object-cover scale-110 blur-[2px]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B080E] via-[#0B080E]/85 to-transparent" />
        </div>

        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')]" />

        <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-12 text-center z-20">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="mb-12">
              <ScrollFloat
                animationDuration={0.9}
                ease="power3.out"
                scrollStart="top bottom-=15%"
                scrollEnd="bottom center+=10%"
                stagger={0.02}
                textClassName="!text-center !leading-[1.15] font-serif font-normal italic text-[clamp(40px,5.5vw,76px)] text-white"
              >
                Ready to build something unexpected?
              </ScrollFloat>
            </div>

            <p className="text-neutral-400 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg mb-16">
              Whether you're launching a new product or scaling an existing
              business — we engineer your next competitive advantage.
            </p>

            <Magnetic range={20}>
              <button
                className="bg-brand-purple hover:bg-brand-purple/90 text-white font-medium text-sm md:text-base px-12 py-5 rounded-full flex items-center gap-4 cursor-pointer shadow-[0_10px_40px_rgba(93,70,216,0.4)] hover:shadow-[0_10px_60px_rgba(93,70,216,0.6)] transition-all duration-500 group"
                onClick={() => { window.location.href = '/contact'; }}
              >
                <span className="tracking-wide">Schedule Discovery Call</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </button>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
