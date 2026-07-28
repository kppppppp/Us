/**
 * ScrollExpandMedia — Adapted from React Bits for Vite + React (no Next.js)
 * Converts next/image → <img>, removes 'use client', adds Lenis stop/start support.
 *
 * LENIS COMPATIBILITY:
 * This component intercepts wheel/touch events with preventDefault() while the
 * media is expanding. It dispatches custom events ('lenisStop' / 'lenisStart')
 * that LenisProvider listens for to pause/resume smooth scroll during expansion.
 */

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollExpandMediaProps {
  mediaType?: 'image';
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  subtitle?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaSrc,
  bgImageSrc,
  title,
  subtitle,
  scrollToExpand = 'Scroll to explore',
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const expandedRef = useRef(false);

  // Keep refs in sync for event handlers that capture stale closures
  useEffect(() => { progressRef.current = scrollProgress; }, [scrollProgress]);
  useEffect(() => { expandedRef.current = mediaFullyExpanded; }, [mediaFullyExpanded]);

  // Notify Lenis to stop / resume
  const stopLenis = useCallback(() => {
    window.dispatchEvent(new CustomEvent('lenisStop'));
  }, []);

  const startLenis = useCallback(() => {
    window.dispatchEvent(new CustomEvent('lenisStart'));
  }, []);

  // Stop Lenis immediately on mount so we own the first scroll
  useEffect(() => {
    stopLenis();
    return () => {
      // Ensure Lenis is always re-enabled on unmount
      startLenis();
    };
  }, [stopLenis, startLenis]);

  useEffect(() => {
    const handleWheel = (e: Event) => {
      const we = e as unknown as WheelEvent;

      if (expandedRef.current && we.deltaY < 0 && window.scrollY <= 5) {
        // User scrolling back up — collapse
        setMediaFullyExpanded(false);
        setShowContent(false);
        stopLenis();
        e.preventDefault();
        return;
      }

      if (!expandedRef.current) {
        e.preventDefault();
        const delta = we.deltaY * 0.0009;
        const next = Math.min(Math.max(progressRef.current + delta, 0), 1);
        setScrollProgress(next);

        if (next >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          startLenis(); // Hand control back to Lenis once fully expanded
        } else if (next < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: Event) => {
      const te = e as unknown as TouchEvent;
      setTouchStartY(te.touches[0].clientY);
    };

    const handleTouchMove = (e: Event) => {
      const te = e as unknown as TouchEvent;
      if (!touchStartY) return;
      const deltaY = touchStartY - te.touches[0].clientY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        setShowContent(false);
        stopLenis();
        e.preventDefault();
        return;
      }

      if (!expandedRef.current) {
        e.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        const next = Math.min(Math.max(progressRef.current + deltaY * factor, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true); startLenis(); }
        else if (next < 0.75) { setShowContent(false); }
        setTouchStartY(te.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);

    const handleScroll = () => {
      if (!expandedRef.current) window.scrollTo(0, 0);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStartY, stopLenis, startLenis]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Refresh GSAP ScrollTrigger positions when child height renders in document flow
    ScrollTrigger.refresh();
  }, [showContent]);

  const mediaWidth  = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobile ? 200 : 400);
  const textShift   = scrollProgress * (isMobile ? 180 : 150);

  const titleWords = (title ?? '').split(' ');
  const firstWord  = titleWords[0] ?? '';
  const restWords  = titleWords.slice(1).join(' ');

  return (
    <div ref={sectionRef} className="w-full overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh] w-full overflow-hidden">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* ── Background image fades out as media expands ── */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-screen h-screen object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          <div className="w-full max-w-[1600px] mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* ── Expanding media card ── */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 60px rgba(93,70,216,0.35)',
                  transition: 'none',
                }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={mediaSrc}
                    alt={title ?? 'Service showcase'}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/50 rounded-xl"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.7 - scrollProgress * 0.35 }}
                    transition={{ duration: 0.2 }}
                  />
                  {/* Purple glow overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, rgba(93,70,216,${0.15 + scrollProgress * 0.1}) 0%, transparent 70%)`,
                    }}
                  />
                </div>

                {/* Scroll hint text beneath the card */}
                <div className="absolute -bottom-12 left-0 right-0 flex flex-col items-center text-center">
                  {scrollToExpand && (
                    <motion.p
                      className="text-white/50 text-[11px] tracking-[0.3em] uppercase font-sans"
                      animate={{ opacity: 1 - scrollProgress * 2 }}
                    >
                      {scrollToExpand}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* ── Title text — splits left / right as card expands ── */}
              <div className="flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col mix-blend-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
                <motion.h1
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white uppercase font-sans tracking-tight leading-none"
                  style={{ transform: `translateX(-${textShift}vw)`, transition: 'none' }}
                >
                  {firstWord}
                </motion.h1>
                <motion.p
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal italic text-white/95 font-serif leading-none"
                  style={{ transform: `translateX(${textShift}vw)`, transition: 'none' }}
                >
                  {restWords || subtitle}
                </motion.p>
              </div>

            </div>

            {/* ── Revealed content after full expansion ── */}
            {showContent && (
              <motion.section
                className="flex flex-col w-full px-6 md:px-12 xl:pl-32"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {children}
              </motion.section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
