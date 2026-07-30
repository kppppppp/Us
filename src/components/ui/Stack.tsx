import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import './Stack.css';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: any, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: React.ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  onCardChange?: (currentIndex: number) => void;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  onCardChange
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const isPausedRef = useRef(false);
  const cardsLengthRef = useRef(cards.length);

  useEffect(() => {
    cardsLengthRef.current = cards.length;
  }, [cards.length]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  // Initialize stack once from cards count — content is rendered via index lookup
  const [stack, setStack] = useState<number[]>(() =>
    cards.map((_, index) => index)
  );

  // Only reset stack when cards count changes
  useEffect(() => {
    setStack(cards.map((_, index) => index));
  }, [cards.length]);

  const sendToBack = useCallback((cardIndex: number) => {
    setStack(prev => {
      const newStack = [...prev];
      const pos = newStack.indexOf(cardIndex);
      if (pos === -1) return prev;
      newStack.splice(pos, 1);
      newStack.unshift(cardIndex);

      // Fire onCardChange with the new top card's original index
      if (onCardChange && newStack.length > 0) {
        const topCardIndex = newStack[newStack.length - 1];
        onCardChange(topCardIndex);
      }

      return newStack;
    });
  }, [onCardChange]);

  // Autoplay with ref-based pause check to avoid re-creating interval
  useEffect(() => {
    if (!autoplay || cards.length <= 1) return;

    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      setStack(prev => {
        const topCardIndex = prev[prev.length - 1];
        const newStack = [...prev];
        const pos = newStack.indexOf(topCardIndex);
        newStack.splice(pos, 1);
        newStack.unshift(topCardIndex);

        if (onCardChange && newStack.length > 0) {
          const newTop = newStack[newStack.length - 1];
          onCardChange(newTop);
        }

        return newStack;
      });
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, cards.length, onCardChange]);

  // Generate stable random rotations once
  const [rotations] = useState(() =>
    cards.map(() => (randomRotation ? Math.random() * 10 - 5 : 0))
  );

  return (
    <div
      className="stack-container"
      onMouseEnter={() => {
        if (pauseOnHover) isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) isPausedRef.current = false;
      }}
    >
      {stack.map((cardIndex, stackPosition) => {
        const distFromTop = stack.length - 1 - stackPosition;
        return (
          <CardRotate
            key={cardIndex}
            onSendToBack={() => sendToBack(cardIndex)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="card"
              onClick={() => shouldEnableClick && sendToBack(cardIndex)}
              animate={{
                rotateZ: distFromTop * 4 + rotations[cardIndex],
                scale: 1 - distFromTop * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
              style={{
                zIndex: stackPosition
              }}
            >
              {cards[cardIndex]}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
