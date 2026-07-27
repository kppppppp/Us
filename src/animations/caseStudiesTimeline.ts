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

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  // Staggered reveal sequence matching homepage design language
  if (label) tl.fromTo(label, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 });
  
  if (heading) {
    tl.fromTo(heading, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.45');
  }

  if (body) tl.fromTo(body, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5');
  if (cta) tl.fromTo(cta, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.45');
  if (stats) tl.fromTo(stats, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
  
  if (gallery) {
    tl.fromTo(gallery, { opacity: 0, scale: 0.98, x: 30 }, { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6');
  }

  if (panel) {
    tl.fromTo(panel, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
  }

  if (bottomCta) {
    tl.fromTo(bottomCta, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');
  }

  return tl;
};
export default createCaseStudiesTimeline;
