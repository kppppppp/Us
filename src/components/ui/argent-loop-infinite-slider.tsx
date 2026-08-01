import * as React from "react";
import "./argent-loop-infinite-slider.css";

interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
}

const PROJECT_DATA: ProjectData[] = [
  {
    title: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    category: "Clinics & Care Systems",
    year: "2026",
    description: "Digital experiences that build patient trust."
  },
  {
    title: "E-commerce",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    category: "Storefronts & Checkouts",
    year: "2026",
    description: "Immersive retail platforms that scale conversions."
  },
  {
    title: "Real Estate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    category: "Skyscrapers & Portals",
    year: "2026",
    description: "Premium showcases for elite architecture."
  },
  {
    title: "Finance & FinTech",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop",
    category: "Capital & Analytics",
    year: "2026",
    description: "Secure applications for modern capital."
  },
  {
    title: "Education & EdTech",
    category: "LMS & Student Portals",
    year: "2026",
    description: "Workspaces shaping future minds.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Fitness & Wellness",
    category: "Membership & Apps",
    year: "2026",
    description: "Logic for active lifestyles.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Hospitality",
    category: "Booking & Luxury Dining",
    year: "2026",
    description: "Reservations for curated journeys.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Manufacturing & Industrial",
    category: "Supply Chains & ERP",
    year: "2026",
    description: "Connected ecosystems driving production.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop"
  }
];

const CONFIG = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.05,
  BUFFER_SIZE: 5,
  MAX_VELOCITY: 150,
  SNAP_DURATION: 500,
};

// Utility functions
const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

const getProjectData = (index: number) => {
  const i =
    ((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) %
    PROJECT_DATA.length;
  return PROJECT_DATA[i];
};

const getProjectNumber = (index: number) => {
  return (
    ((Math.abs(index) % PROJECT_DATA.length) + PROJECT_DATA.length) %
      PROJECT_DATA.length +
    1
  )
    .toString()
    .padStart(2, "0");
};

export function Component() {
  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
  const bufferSize = isMobileDevice ? 2 : CONFIG.BUFFER_SIZE;

  const [visibleRange, setVisibleRange] = React.useState({
    min: -bufferSize,
    max: bufferSize,
  });

  // Refs for state that changes frequently (animation loop)
  const state = React.useRef({
    currentY: 0,
    targetY: 0,
    isDragging: false,
    isSnapping: false,
    snapStart: { time: 0, y: 0, target: 0 },
    lastScrollTime: Date.now(),
    dragStart: { y: 0, scrollY: 0 },
    projectHeight: 0, // Will be set on mount
    minimapHeight: 320, // Matches the height in CSS exactly
  });

  // Refs to store DOM elements
  const projectsRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const minimapRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const infoRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const requestRef = React.useRef<number | undefined>(undefined);

  // Helper to update parallax for a single item
  const updateParallax = (
    img: HTMLImageElement | null,
    scroll: number,
    index: number,
    height: number
  ) => {
    if (!img) return;
    
    if (!img.dataset.parallaxCurrent) {
      img.dataset.parallaxCurrent = "0";
    }
    
    let current = parseFloat(img.dataset.parallaxCurrent);
    const target = (-scroll - index * height) * 0.2;
    current = lerp(current, target, 0.1);
    
    // Optimization: only update if changed significantly
    if (Math.abs(current - target) > 0.01) {
        // GPU acceleration using translate3d
        img.style.transform = `translate3d(0, ${current}px, 0) scale(1.5)`;
        img.dataset.parallaxCurrent = current.toString();
    }
  };

  const updateSnap = () => {
    const s = state.current;
    const progress = Math.min(
      (Date.now() - s.snapStart.time) / CONFIG.SNAP_DURATION,
      1
    );
    const eased = 1 - Math.pow(1 - progress, 3);
    s.targetY =
      s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
    if (progress >= 1) s.isSnapping = false;
  };

  const snapToProject = () => {
    const s = state.current;
    const current = Math.round(-s.targetY / s.projectHeight);
    const target = -current * s.projectHeight;
    s.isSnapping = true;
    s.snapStart = {
      time: Date.now(),
      y: s.targetY,
      target: target,
    };
  };

  const updatePositions = () => {
    const s = state.current;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const minimapY = (s.currentY * s.minimapHeight) / s.projectHeight;

    // Update Projects
    projectsRef.current.forEach((el, index) => {
      const y = index * s.projectHeight + s.currentY;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      const img = el.querySelector("img");
      updateParallax(img, s.currentY, index, s.projectHeight);
    });

    // Update Minimap Images (Always translate Y to avoid overlapping on mobile)
    minimapRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      if (isDesktop) {
        const img = el.querySelector("img");
        if (img) {
            // Minimap parallax uses minimapHeight
            updateParallax(img, minimapY, index, s.minimapHeight);
        }
      }
    });

    // Update Info (Always translate Y to avoid overlapping on mobile)
    infoRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    });
  };

  const animate = () => {
    const s = state.current;
    const now = Date.now();

    if (!s.isSnapping && !s.isDragging && now - s.lastScrollTime > 100) {
      const snapPoint =
        -Math.round(-s.targetY / s.projectHeight) * s.projectHeight;
      if (Math.abs(s.targetY - snapPoint) > 1) snapToProject();
    }

    if (s.isSnapping) updateSnap();
    if (!s.isDragging) {
      s.currentY += (s.targetY - s.currentY) * CONFIG.LERP_FACTOR;
    }

    updatePositions();
  };
  
  // We need the animation loop to be able to trigger a state update.
  const renderedRange = React.useRef({ min: -bufferSize, max: bufferSize });

  const animationLoop = () => {
     animate();
     
     const s = state.current;
     const currentIndex = Math.round(-s.targetY / s.projectHeight);
     const min = currentIndex - bufferSize;
     const max = currentIndex + bufferSize;

     if (min !== renderedRange.current.min || max !== renderedRange.current.max) {
         renderedRange.current = { min, max };
         setVisibleRange({ min, max });
     }

     requestRef.current = requestAnimationFrame(animationLoop);
  };

  React.useEffect(() => {
    // Pause Lenis smooth scroll while on this full-screen slider page
    window.dispatchEvent(new CustomEvent("lenisStop"));

    state.current.projectHeight = window.innerHeight;
    
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = state.current;
      s.isSnapping = false;
      s.lastScrollTime = Date.now();
      const delta = Math.max(
        Math.min(e.deltaY * CONFIG.SCROLL_SPEED, CONFIG.MAX_VELOCITY),
        -CONFIG.MAX_VELOCITY
      );
      s.targetY -= delta;
    };

    const onTouchStart = (e: TouchEvent) => {
        const s = state.current;
        s.isDragging = true;
        s.isSnapping = false;
        s.dragStart = { y: e.touches[0].clientY, scrollY: s.targetY };
        s.lastScrollTime = Date.now();
    }

    const onTouchMove = (e: TouchEvent) => {
        const s = state.current;
        if (!s.isDragging) return;
        e.preventDefault(); // Stop default browser refresh and background scroll bounce
        s.targetY =
            s.dragStart.scrollY +
            (e.touches[0].clientY - s.dragStart.y) * 1.5;
        s.lastScrollTime = Date.now();
    }

    const onTouchEnd = () => {
        state.current.isDragging = false;
    }

    const onResize = () => {
        state.current.projectHeight = window.innerHeight;
        state.current.minimapHeight = window.innerWidth < 768 ? 380 : 320;
        // Sync container height to match JS logic exactly
        const container = document.querySelector('.parallax-container') as HTMLElement;
        if (container) {
            container.style.height = `${window.innerHeight}px`;
        }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);
    
    // Initial size sync
    state.current.minimapHeight = window.innerWidth < 768 ? 380 : 320;
    onResize();

    // Start Loop
    requestRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      // Restart Lenis scroll on unmount
      window.dispatchEvent(new CustomEvent("lenisStart"));
    };
  }, []);

  // Generate range of indices
  const indices = [];
  for (let i = visibleRange.min; i <= visibleRange.max; i++) {
    indices.push(i);
  }

  return (
    <div className="parallax-container select-none">
      <ul className="project-list">
        {indices.map((i) => {
          const data = getProjectData(i);
          return (
            <div
              key={i}
              className="project"
              ref={(el) => {
                if (el) projectsRef.current.set(i, el);
                else projectsRef.current.delete(i);
              }}
            >
              <img src={data.image} alt={data.title} className="pointer-events-none" />
            </div>
          );
        })}
      </ul>

      <div className="minimap">
        <div className="minimap-wrapper">
          <div className="minimap-img-preview">
            {indices.map((i) => {
              const data = getProjectData(i);
              return (
                <div
                  key={i}
                  className="minimap-img-item"
                  ref={(el) => {
                    if (el) minimapRef.current.set(i, el);
                    else minimapRef.current.delete(i);
                  }}
                >
                  <img src={data.image} alt={data.title} className="pointer-events-none" />
                </div>
              );
            })}
          </div>
          <div className="minimap-info-list">
            {indices.map((i) => {
              const data = getProjectData(i);
              const num = getProjectNumber(i);
              return (
                <div
                  key={i}
                  className="minimap-item-info"
                  ref={(el) => {
                    if (el) infoRef.current.set(i, el);
                    else infoRef.current.delete(i);
                  }}
                >
                  <div className="minimap-item-info-row">
                    <p>{num}</p>
                    <p>{data.title}</p>
                  </div>
                  <div className="minimap-item-info-row">
                    <p>{data.category}</p>
                    <p>{data.year}</p>
                  </div>
                  <div className="minimap-item-info-row">
                    <p>{data.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
