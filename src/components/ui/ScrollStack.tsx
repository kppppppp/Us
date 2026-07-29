import React, { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;

  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,

  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  // Cache original top positions so we never re-read them mid-animation
  const cardOriginalTopsRef = useRef<number[]>([]);
  const endElementTopRef = useRef<number>(0);
  const lastTransformsRef = useRef<Map<number, { translateY: number; scale: number; rotation: number; blur: number }>>(new Map());

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (start >= end) return 0;
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  /**
   * Measure and cache all card positions.
   * Must be called when cards have NO transforms applied (or transforms reset).
   */
  const cachePositions = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    // Temporarily strip transforms so getBoundingClientRect gives original positions
    const savedTransforms: string[] = [];
    cards.forEach((card, i) => {
      savedTransforms[i] = card.style.transform;
      card.style.transform = 'none';
    });

    // Force a synchronous layout read
    if (useWindowScroll) {
      const tops: number[] = [];
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        tops.push(rect.top + window.scrollY);
      });
      cardOriginalTopsRef.current = tops;

      const endEl = document.querySelector('.scroll-stack-end') as HTMLElement;
      if (endEl) {
        const rect = endEl.getBoundingClientRect();
        endElementTopRef.current = rect.top + window.scrollY;
      }
    } else {
      const tops: number[] = [];
      cards.forEach((card) => {
        tops.push(card.offsetTop);
      });
      cardOriginalTopsRef.current = tops;

      const scroller = scrollerRef.current;
      const endEl = scroller?.querySelector('.scroll-stack-end') as HTMLElement;
      if (endEl) {
        endElementTopRef.current = endEl.offsetTop;
      }
    }

    // Restore transforms
    cards.forEach((card, i) => {
      card.style.transform = savedTransforms[i] || 'translateZ(0)';
    });
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    const originalTops = cardOriginalTopsRef.current;
    if (!cards.length || !originalTops.length) return;

    const scrollTop = useWindowScroll ? window.scrollY : (scrollerRef.current?.scrollTop ?? 0);
    const containerHeight = useWindowScroll ? window.innerHeight : (scrollerRef.current?.clientHeight ?? 0);

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endElementTopRef.current;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = originalTops[i];
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = originalTops[j];
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.05 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.0005 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.05 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.05;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
        lastTransformsRef.current.set(i, newTransform);
      }

      // Stack completion callback
      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  // ── Setup cards: measure margins, cache positions ──
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;

    // Reset transforms before measuring
    cards.forEach((card, i) => {
      card.style.transform = 'none';
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });

    // Cache original positions after layout settles
    requestAnimationFrame(() => {
      cachePositions();

      // Now set initial transforms
      cards.forEach((card) => {
        card.style.transform = 'translateZ(0)';
      });

      updateCardTransforms();
    });

    // Recache on resize
    const onResize = () => {
      lastTransformsRef.current.clear();
      cachePositions();
      updateCardTransforms();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardOriginalTopsRef.current = [];
      lastTransformsRef.current.clear();
    };
  }, [useWindowScroll, itemDistance, cachePositions, updateCardTransforms]);

  // ── Window scroll mode: rAF loop (no extra Lenis) ──
  useEffect(() => {
    if (!useWindowScroll) return;

    let rafId: number;
    const tick = () => {
      updateCardTransforms();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [useWindowScroll, updateCardTransforms]);

  // ── Contained scroll mode: own Lenis instance ──
  useLayoutEffect(() => {
    if (useWindowScroll) return;

    const scroller = scrollerRef.current;
    if (!scroller) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on('scroll', () => updateCardTransforms());

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [useWindowScroll, updateCardTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
