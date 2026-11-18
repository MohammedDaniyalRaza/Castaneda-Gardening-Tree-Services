import React, { useEffect, useRef, useState } from 'react';
import { BUSINESS } from '../../data/business';
import { gsap, refreshScrollTriggers } from '../../lib/gsap';
import { useAppReady } from '../../app/AppReadyContext';
import { useLenis } from '../../hooks/useLenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Preloader: React.FC = () => {
  const { isReady, markReady } = useAppReady();
  const [mounted, setMounted] = useState<boolean>(() => !isReady);
  const [exiting, setExiting] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const grassRef = useRef<SVGSVGElement>(null);
  const doneRef = useRef<boolean>(false);

  const { stopScroll, startScroll } = useLenis();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReady) {
      setMounted(false);
      startScroll();
      return;
    }

    stopScroll();
    let hardTimeoutId: number | undefined;
    let fontTimeoutId: number | undefined;
    let exitTl: gsap.core.Timeline | null = null;

    const finishAndUnmount = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      try {
        startScroll();
        markReady();
        setMounted(false);
        requestAnimationFrame(() => {
          refreshScrollTriggers();
        });
      } catch {
        setMounted(false);
      }
    };

    const runExitAnimation = () => {
      if (doneRef.current || !rootRef.current) {
        finishAndUnmount();
        return;
      }
      setExiting(true);

      try {
        if (reducedMotion) {
          gsap.to(rootRef.current, {
            opacity: 0,
            duration: 0.25,
            ease: 'power1.out',
            onComplete: finishAndUnmount,
          });
          return;
        }

        exitTl = gsap.timeline({
          onComplete: finishAndUnmount,
        });

        if (barRef.current) {
          exitTl.to(barRef.current, {
            scaleX: 1,
            duration: 0.35,
            ease: 'power2.out',
          });
        }
        if (logoRef.current) {
          exitTl.to(
            logoRef.current,
            {
              y: -16,
              opacity: 0,
              duration: 0.3,
              ease: 'power2.in',
            },
            '+=0.08'
          );
        }
        exitTl.to(
          rootRef.current,
          {
            yPercent: -100,
            duration: 0.55,
            ease: 'power3.inOut',
          },
          '-=0.12'
        );
      } catch {
        finishAndUnmount();
      }
    };

    try {
      if (!reducedMotion) {
        if (barRef.current) {
          gsap.fromTo(
            barRef.current,
            { scaleX: 0.08 },
            { scaleX: 0.72, duration: 1.0, ease: 'power2.out' }
          );
        }
        if (grassRef.current) {
          gsap.fromTo(
            grassRef.current,
            { scaleY: 0.2, opacity: 0 },
            {
              scaleY: 1,
              opacity: 1,
              duration: 0.75,
              ease: 'power2.out',
              transformOrigin: 'bottom center',
            }
          );
        }
      }

      const fontReadyPromise =
        typeof document !== 'undefined' && document.fonts?.ready
          ? document.fonts.ready.catch(() => undefined)
          : Promise.resolve();

      const minDisplayPromise = new Promise<void>((resolve) => {
        window.setTimeout(resolve, reducedMotion ? 220 : 880);
      });

      const maxGatePromise = new Promise<void>((resolve) => {
        fontTimeoutId = window.setTimeout(resolve, 1200);
      });

      Promise.all([
        minDisplayPromise,
        Promise.race([fontReadyPromise, maxGatePromise]),
      ])
        .then(runExitAnimation)
        .catch(finishAndUnmount);

      // Hard failsafe at 3s no matter what
      hardTimeoutId = window.setTimeout(() => {
        try {
          exitTl?.kill();
        } catch {
          // ignore
        }
        finishAndUnmount();
      }, 3000);
    } catch {
      finishAndUnmount();
    }

    return () => {
      if (hardTimeoutId) window.clearTimeout(hardTimeoutId);
      if (fontTimeoutId) window.clearTimeout(fontTimeoutId);
      try {
        exitTl?.kill();
      } catch {
        // ignore
      }
      startScroll();
    };
  }, [isReady, markReady, reducedMotion, startScroll, stopScroll]);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-preloader)' as unknown as number,
        backgroundColor: 'var(--black)',
        color: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      <div
        ref={logoRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '22px',
          width: 'min(320px, 78vw)',
        }}
      >
        <img
          src={BUSINESS.logoPath}
          alt={BUSINESS.name}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
        <div
          style={{
            width: '100%',
            height: '3px',
            backgroundColor: 'rgba(255,255,255,0.14)',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={barRef}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--yellow)',
              transformOrigin: 'left center',
            }}
          />
        </div>
      </div>

      {/* Grass blades growing along bottom edge */}
      <svg
        ref={grassRef}
        viewBox="0 0 1440 44"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '36px',
          pointerEvents: 'none',
        }}
      >
        <path
          d="M0 44V26L28 10L54 29L82 7L110 29L138 14L168 28L198 8L228 29L256 15L286 28L318 9L348 29L378 14L410 28L442 8L474 29L506 14L538 28L570 9L602 29L634 14L666 28L698 8L730 29L762 15L794 28L826 9L858 29L890 14L922 28L954 8L986 29L1018 14L1050 28L1082 9L1114 29L1146 14L1178 28L1210 8L1242 29L1274 15L1306 28L1338 9L1370 29L1402 14L1440 24V44H0Z"
          fill="var(--forest)"
        />
      </svg>
    </div>
  );
};
