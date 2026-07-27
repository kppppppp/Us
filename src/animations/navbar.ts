// GSAP and motion configuration for Navbar entry and scroll transitions
export const navbarAnimations = {
  entry: {
    y: [-25, 0],
    opacity: [0, 1],
    duration: 0.8,
    ease: 'power3.out'
  },
  scroll: {
    duration: 0.35,
    ease: 'easeInOut'
  }
};
