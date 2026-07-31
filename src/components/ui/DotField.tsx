import React, { useEffect, useRef, memo } from 'react';
import './DotField.css';

// Pre-computed constant — avoids recalculation
const TWO_PI = Math.PI * 2;

interface Dot {
  ax: number;   // anchor X (home position)
  ay: number;   // anchor Y (home position)
  sx: number;   // smoothed/rendered X
  sy: number;   // smoothed/rendered Y
  vx: number;   // velocity X (non-bulge mode)
  vy: number;   // velocity Y (non-bulge mode)
  x: number;    // target X (non-bulge mode)
  y: number;    // target Y (non-bulge mode)
}

interface DotFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
}

const DotField: React.FC<DotFieldProps> = memo(({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(0, 0, 0, 0.15)',
  gradientTo = 'rgba(0, 0, 0, 0.05)',
  glowColor = 'rgba(0, 0, 0, 0.015)',
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const propsRef = useRef<any>({});
  
  propsRef.current = { 
    dotRadius, 
    dotSpacing, 
    cursorRadius, 
    cursorForce, 
    bulgeOnly, 
    bulgeStrength, 
    sparkle, 
    waveAmplitude, 
    gradientFrom, 
    gradientTo 
  };
  
  const rebuildRef = useRef<(() => void) | null>(null);
  const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true }) as CanvasRenderingContext2D;
    if (!ctx) return;
    
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let resizeTimer: any;

    // ============================================================
    // OPTIMIZATION 1: Cached gradient — never recreated per frame.
    // Rebuilt only on resize or when props change.
    // ============================================================
    let cachedGradient: CanvasGradient | null = null;

    function rebuildGradient(w: number, h: number) {
      const p = propsRef.current;
      cachedGradient = ctx.createLinearGradient(0, 0, w, h);
      cachedGradient.addColorStop(0, p.gradientFrom);
      cachedGradient.addColorStop(1, p.gradientTo);
    }

    // ============================================================
    // OPTIMIZATION 2: Spatial grid metadata — used to determine
    // which rows/cols of the uniform dot grid fall within the
    // cursor radius, so we skip interaction physics for distant dots.
    // ============================================================
    let gridCols = 0;
    let gridStep = 0;

    function buildSpatialGrid(w: number, _h: number) {
      const p = propsRef.current;
      gridStep = p.dotRadius + p.dotSpacing;
      gridCols = Math.floor(w / gridStep);
    }

    // ============================================================
    // OPTIMIZATION 3: Visibility-based pause via IntersectionObserver.
    // If the DotField scrolls out of the viewport, the entire rAF
    // loop is halted. No GPU, no CPU. Resumes when visible again.
    // ============================================================
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        // If just became visible and loop is paused, restart
        if (isVisible && !wasVisible && !isLoopRunning) {
          isLoopRunning = true;
          lastMouseMoveTime = performance.now();
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { rootMargin: '100px', threshold: 0.01 }
    );

    if (canvas.parentElement) {
      visibilityObserver.observe(canvas.parentElement);
    }

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    function doResize() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = {
        w,
        h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      };

      buildDots(w, h);
      rebuildGradient(w, h);
      buildSpatialGrid(w, h);
    }

    function buildDots(w: number, h: number) {
      const p = propsRef.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots = new Array<Dot>(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
    }

    let isLoopRunning = true;
    // OPTIMIZATION 4: Use performance.now() instead of Date.now() for
    // higher precision timing and consistency with rAF timestamps.
    let lastMouseMoveTime = performance.now();

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      lastMouseMoveTime = performance.now();
      
      if (!isLoopRunning && isVisible) {
        isLoopRunning = true;
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (!canvas || !e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
      lastMouseMoveTime = performance.now();
      
      if (!isLoopRunning && isVisible) {
        isLoopRunning = true;
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    // ============================================================
    // OPTIMIZATION 5: Removed setInterval(updateMouseSpeed, 20).
    // Mouse speed is now computed inline within the tick() function,
    // eliminating one extra timer and redundant calculations.
    // ============================================================

    let frameCount = 0;

    function tick() {
      // OPTIMIZATION 3 continued: Don't render if not visible
      if (!canvas || !isVisible) {
        isLoopRunning = false;
        rafRef.current = null;
        return;
      }

      frameCount++;
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const p = propsRef.current;
      const len = dots.length;
      const t = frameCount * 0.02;

      // OPTIMIZATION 5 continued: Inline mouse speed calculation.
      // Previously ran on a separate 50Hz setInterval timer.
      const mdx = m.prevX - m.x;
      const mdy = m.prevY - m.y;
      // OPTIMIZATION 6: Use distSq instead of sqrt for speed calc.
      // We only need relative magnitude, not exact distance.
      const mDistSq = mdx * mdx + mdy * mdy;
      const mDist = mDistSq > 0.001 ? Math.sqrt(mDistSq) : 0;
      m.speed += (mDist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;

      const targetEngagement = Math.min(m.speed / 5, 1);
      engagement.current += (targetEngagement - engagement.current) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;
      const eng = engagement.current;

      glowOpacity.current += (eng - glowOpacity.current) * 0.08;

      if (glowEl) {
        glowEl.setAttribute('cx', m.x.toString());
        glowEl.setAttribute('cy', m.y.toString());
        glowEl.style.opacity = glowOpacity.current.toString();
      }

      ctx.clearRect(0, 0, w, h);

      // OPTIMIZATION 1 continued: Use cached gradient
      if (cachedGradient) {
        ctx.fillStyle = cachedGradient;
      }

      const cr = p.cursorRadius;
      const crSq = cr * cr;
      const rad = p.dotRadius / 2;
      const isBulge = p.bulgeOnly;
      const hasWave = p.waveAmplitude > 0;
      const doSparkle = p.sparkle;

      ctx.beginPath();

      let anyDotMoved = false;

      // ============================================================
      // OPTIMIZATION 7: Spatial locality — only process dots within
      // the cursor's rectangular bounding box for interaction physics.
      // All other dots only get their return-to-home spring applied
      // if they are displaced, and are drawn with minimal work.
      // ============================================================

      // Determine which grid rows/cols could possibly be within cursorRadius
      const hasEngagement = eng > 0.01;
      const interactMinCol = hasEngagement ? Math.max(0, Math.floor((m.x - cr) / gridStep) - 1) : gridCols;
      const interactMaxCol = hasEngagement ? Math.min(gridCols - 1, Math.ceil((m.x + cr) / gridStep) + 1) : -1;
      const interactMinRow = hasEngagement ? Math.max(0, Math.floor((m.y - cr) / gridStep) - 1) : gridCols;
      const interactMaxRow = hasEngagement ? Math.min(Math.ceil(h / gridStep) - 1, Math.ceil((m.y + cr) / gridStep) + 1) : -1;

      for (let i = 0; i < len; i++) {
        const d = dots[i];

        // Determine if this dot's grid cell is within the interaction zone
        const col = i % gridCols;
        const row = (i - col) / gridCols;
        const inInteractZone = col >= interactMinCol && col <= interactMaxCol
                            && row >= interactMinRow && row <= interactMaxRow;

        if (inInteractZone) {
          // Full interaction physics for dots near cursor
          const dx = m.x - d.ax;
          const dy = m.y - d.ay;
          const distSq = dx * dx + dy * dy;

          if (distSq < crSq) {
            // OPTIMIZATION 8: Replaced Math.atan2 + Math.cos/sin
            // with inverse-distance normalization using dx/dy directly.
            // atan2(dy,dx) gives angle, cos(angle) = dx/dist, sin(angle) = dy/dist.
            // So we compute 1/dist and multiply by dx,dy instead.
            const dist = Math.sqrt(distSq);
            const invDist = 1 / (dist + 0.0001); // avoid division by zero

            if (isBulge) {
              const ratio = 1 - dist / cr;
              const push = ratio * ratio * p.bulgeStrength * eng;
              // dx * invDist = cos(angle), dy * invDist = sin(angle)
              d.sx += (d.ax - (dx * invDist) * push - d.sx) * 0.15;
              d.sy += (d.ay - (dy * invDist) * push - d.sy) * 0.15;
            } else {
              const move = (500 * invDist) * (m.speed * p.cursorForce);
              d.vx += (dx * invDist) * -move;
              d.vy += (dy * invDist) * -move;
            }
            anyDotMoved = true;
          } else {
            // Dot is within the bounding box but outside the circle radius —
            // apply return-to-home spring
            if (isBulge) {
              const diffX = d.ax - d.sx;
              const diffY = d.ay - d.sy;
              // OPTIMIZATION 10: Use squared comparison instead of abs()
              if (diffX * diffX + diffY * diffY > 0.0025) {
                d.sx += diffX * 0.1;
                d.sy += diffY * 0.1;
                anyDotMoved = true;
              } else {
                d.sx = d.ax;
                d.sy = d.ay;
              }
            } else {
              d.vx *= 0.9;
              d.vy *= 0.9;
              d.x = d.ax + d.vx;
              d.y = d.ay + d.vy;
              const diffX = d.x - d.sx;
              const diffY = d.y - d.sy;
              if (diffX * diffX + diffY * diffY > 0.0025) {
                d.sx += diffX * 0.1;
                d.sy += diffY * 0.1;
                anyDotMoved = true;
              } else {
                d.sx = d.x;
                d.sy = d.y;
              }
            }
          }
        } else {
          // ============================================================
          // OPTIMIZATION 9: Dots outside interaction zone — only apply
          // return-to-home spring IF the dot is displaced. Skip entirely
          // if dot is already at anchor (majority of dots most frames).
          // ============================================================
          if (isBulge) {
            const diffX = d.ax - d.sx;
            const diffY = d.ay - d.sy;
            if (diffX * diffX + diffY * diffY > 0.0025) {
              d.sx += diffX * 0.1;
              d.sy += diffY * 0.1;
              anyDotMoved = true;
            }
            // If at rest, skip — no assignment needed since sx===ax already
          } else {
            // Check if velocity is negligible
            if (d.vx * d.vx + d.vy * d.vy > 0.0001) {
              d.vx *= 0.9;
              d.vy *= 0.9;
              d.x = d.ax + d.vx;
              d.y = d.ay + d.vy;
              const diffX = d.x - d.sx;
              const diffY = d.y - d.sy;
              if (diffX * diffX + diffY * diffY > 0.0025) {
                d.sx += diffX * 0.1;
                d.sy += diffY * 0.1;
                anyDotMoved = true;
              } else {
                d.sx = d.x;
                d.sy = d.y;
              }
            }
            // Else: dot is at rest with zero velocity, skip entirely
          }
        }

        // ============================================================
        // OPTIMIZATION 11: Draw phase — only compute wave offsets when
        // waveAmplitude > 0, and only compute sparkle when enabled.
        // Branches are hoisted outside the hot path with pre-checked bools.
        // ============================================================
        let drawX = d.sx;
        let drawY = d.sy;
        if (hasWave) {
          drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
        }

        if (doSparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
          if ((hash % 100) < 3) {
            ctx.moveTo(drawX + rad * 1.8, drawY);
            ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
          } else {
            ctx.moveTo(drawX + rad, drawY);
            ctx.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        } else {
          ctx.moveTo(drawX + rad, drawY);
          ctx.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }

      ctx.fill();

      // ============================================================
      // OPTIMIZATION 12: Automatic loop suspension — if nothing is
      // moving, no wave, no engagement, and mouse has been idle for
      // 1.5s, stop the rAF loop entirely. Zero CPU/GPU at rest.
      // Restarted by mousemove/touchmove or visibility change.
      // ============================================================
      const timeSinceMouseMove = performance.now() - lastMouseMoveTime;
      if (!hasWave && eng === 0 && !anyDotMoved && timeSinceMouseMove > 1500) {
        isLoopRunning = false;
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    doResize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) {
        buildDots(w, h);
        rebuildGradient(w, h);
        buildSpatialGrid(w, h);
        if (!isLoopRunning && isVisible) {
          isLoopRunning = true;
          rafRef.current = requestAnimationFrame(tick);
        }
      }
    };

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      visibilityObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div className="dot-field-container" {...rest}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowIdRef.current})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  );
});

DotField.displayName = 'DotField';

export default DotField;
