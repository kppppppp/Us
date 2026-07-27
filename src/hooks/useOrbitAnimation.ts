import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ORBIT_LAYOUT } from '../constants/layout';

export const useOrbitAnimation = (customDuration?: number) => {
  const ref = useRef<SVGSVGElement | HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = gsap.to(el, {
      rotate: 360,
      duration: customDuration || ORBIT_LAYOUT.rotationDuration,
      repeat: -1,
      ease: 'none'
    });

    return () => {
      anim.kill();
    };
  }, [customDuration]);

  return ref;
};
export default useOrbitAnimation;
