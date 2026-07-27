import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ORBIT_LAYOUT } from '../constants/layout';

export const useFloatingAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = gsap.to(el, {
      y: ORBIT_LAYOUT.floatingDistance,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    return () => {
      anim.kill();
    };
  }, []);

  return ref;
};
export default useFloatingAnimation;
