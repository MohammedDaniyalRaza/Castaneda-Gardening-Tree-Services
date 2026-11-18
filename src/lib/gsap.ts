import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function refreshScrollTriggers() {
  try {
    ScrollTrigger.refresh();
  } catch {
    // Ignore safe refresh errors during rapid unmount
  }
}

export function killAllScrollTriggers() {
  try {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  } catch {
    // Safe fallback
  }
}

export { gsap, ScrollTrigger };
