import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, suffix, label }) => {
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          setCount(Math.floor(obj.val));
        }
      });
    }, elementRef);

    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={elementRef} className="flex flex-col gap-1">
      <span className="text-4xl lg:text-5xl font-bold font-serif text-brand-purple tracking-tight">
        {count}
        {suffix}
      </span>
      <span className="text-[10px] lg:text-[11px] font-bold text-neutral-400 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
};

export const Statistics: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-6 lg:gap-12 mt-12 border-t border-neutral-100 pt-8">
      <StatItem value={50} suffix="+" label="Projects Delivered" />
      <StatItem value={30} suffix="+" label="Industries Served" />
      <StatItem value={98} suffix="%" label="Client Retention" />
    </div>
  );
};
export default Statistics;
