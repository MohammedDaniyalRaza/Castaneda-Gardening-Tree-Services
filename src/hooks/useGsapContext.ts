import { useEffect, type RefObject } from 'react';
import { gsap } from '../lib/gsap';

export function useGsapContext(
  scopeRef: RefObject<Element | null>,
  callback: (ctx: gsap.Context) => void,
  deps: unknown[] = []
) {
  useEffect(() => {
    if (!scopeRef.current) return;
    const ctx = gsap.context((self) => {
      callback(self);
    }, scopeRef);
    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
