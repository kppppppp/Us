import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const createCaseStudiesTimeline = (container: HTMLElement) => {
  const label = container.querySelector('[data-reveal="label"]');
  const heading = container.querySelector('[data-reveal="heading"]');
  const body = container.querySelector('[data-reveal="body"]');
  const cta = container.querySelector('[data-reveal="cta"]');
  const stats = container.querySelector('[data-reveal="stats"]');
  const gallery = container.querySelector('[data-reveal="gallery"]');
  const panel = container.querySelector('[data-reveal="panel"]');
  const bottomCta = container.querySelector('[data-reveal="bottom-cta"]');

  // Set initial hidden states immediately so elements don't flash on mount
  const allElements = [label, heading, body, cta, stats, gallery, panel, bottomCta].filter(Boolean);
  gsap.set(allElements, { opacity: 0, y: 20 });
  if (gallery) gsap.set(gallery, { opacity: 0, scale: 0.98, x: 30, y: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  // Staggered reveal sequence matching homepage design language
  if (label) tl.to(label, { opacity: 1, y: 0, duration: 0.6 });

  if (heading) {
    tl.to(heading, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.45');
  }

  if (body) tl.to(body, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5');
  if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.5 }, '-=0.45');
  if (stats) tl.to(stats, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');

  if (gallery) {
    tl.to(gallery, { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6');
  }

  if (panel) {
    tl.to(panel, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
  }

  if (bottomCta) {
    tl.to(bottomCta, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');
  }

  return tl;
};
export default createCaseStudiesTimeline;
