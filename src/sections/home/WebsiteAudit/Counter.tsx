import { useState, useEffect } from 'react';

export function Counter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let current = 0;
    const stepsCount = duration / 16;
    const step = Math.ceil(target / stepsCount);
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{val}</>;
}
