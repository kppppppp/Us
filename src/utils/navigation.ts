import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * Handles smooth scrolling to a section on the Services page.
 * Uses GSAP ScrollToPlugin for premium, custom easing.
 */
export const scrollToSection = (sectionId: string, duration = 1.2) => {
  const targetId = sectionId.startsWith('#') ? sectionId : `#${sectionId}`;
  const element = document.querySelector(targetId);
  if (!element) return false;

  // Dynamically measure navbar height + standard margin offset
  const navbar = document.querySelector('.fixed.top-0');
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
  const offset = navbarHeight + 24; // navbar height + margin/padding offset

  gsap.to(window, {
    duration,
    scrollTo: {
      y: element,
      offsetY: offset
    },
    ease: 'power3.inOut',
    overwrite: 'auto'
  });

  return true;
};

/**
 * Handles navigation to /services with a specific section hash.
 * If already on /services, it scrolls immediately.
 * If on another page, it navigates using React Router and then scrolls once loaded.
 */
export const navigateToServiceSection = (
  hash: string,
  pathname: string,
  navigate: (path: string) => void
) => {
  const cleanHash = hash.replace('/services', '');
  
  if (pathname === '/services') {
    if (cleanHash) {
      scrollToSection(cleanHash);
      history.replaceState(null, '', `/services${cleanHash}`);
    } else {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: 0 },
        ease: 'power3.inOut'
      });
      history.replaceState(null, '', '/services');
    }
  } else {
    navigate(`/services${cleanHash}`);
  }
};
