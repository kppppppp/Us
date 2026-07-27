import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const createServicesTimeline = (container: HTMLElement) => {
  const label = container.querySelector('[data-reveal="label"]');
  const heading = container.querySelector('[data-reveal="heading"]');
  const body = container.querySelector('[data-reveal="body"]');
  const cta = container.querySelector('[data-reveal="cta"]');
  const orbit = container.querySelector('[data-reveal="orbit"]');
  const nodes = container.querySelectorAll('[data-reveal="node"]');
  const promise = container.querySelector('[data-reveal="promise"]');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  // Staggered reveal sequence
  if (label) tl.fromTo(label, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 });
  
  if (heading) {
    // Split text effect: reveal line by line
    tl.fromTo(heading, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }

  if (body) tl.fromTo(body, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5');
  if (cta) tl.fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4');
  
  if (orbit) {
    tl.fromTo(orbit, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.6');
  }

  if (nodes.length > 0) {
    tl.fromTo(nodes, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, '-=0.4');
  }

  if (promise) {
    tl.fromTo(promise, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');
  }

  return tl;
};
export default createServicesTimeline;
