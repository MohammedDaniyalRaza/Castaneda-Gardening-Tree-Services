import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { getFull, getThumb } from '../../data/images';
import { useLenis } from '../../hooks/useLenis';
import { TreeGlyph } from '../svg/BrandGlyphs';

export interface LightboxItem {
  id: string;
  url: string;
  alt: string;
  title: string;
  caption?: string;
  city?: string;
}

interface LightboxContextValue {
  open: (items: LightboxItem[], startIndex?: number) => void;
  close: () => void;
}

const LightboxContext = createContext<LightboxContextValue>({
  open: () => {},
  close: () => {},
});

export function useLightbox() {
  return useContext(LightboxContext);
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const [imgError, setImgError] = useState<boolean>(false);

  const openerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const panDragRef = useRef<{ active: boolean; startX: number; startY: number }>({
    active: false,
    startX: 0,
    startY: 0,
  });

  const { stopScroll, startScroll } = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

  const close = useCallback(() => {
    setIsOpen(false);
    setZoomed(false);
    setPan({ x: 0, y: 0 });
    startScroll();
    const opener = openerRef.current;
    if (opener && typeof opener.focus === 'function') {
      requestAnimationFrame(() => opener.focus());
    }
  }, [startScroll]);

  const open = useCallback(
    (nextItems: LightboxItem[], startIndex = 0) => {
      if (!nextItems.length) return;
      openerRef.current = document.activeElement as HTMLElement | null;
      setItems(nextItems);
      setIndex(Math.max(0, Math.min(startIndex, nextItems.length - 1)));
      setZoomed(false);
      setPan({ x: 0, y: 0 });
      setImgLoading(true);
      setImgError(false);
      setIsOpen(true);
      stopScroll();
    },
    [stopScroll]
  );

  const goPrev = useCallback(() => {
    if (items.length <= 1) return;
    setZoomed(false);
    setPan({ x: 0, y: 0 });
    setImgLoading(true);
    setImgError(false);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goNext = useCallback(() => {
    if (items.length <= 1) return;
    setZoomed(false);
    setPan({ x: 0, y: 0 });
    setImgLoading(true);
    setImgError(false);
    setIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // Close on route change and guarantee scroll lock restoration
  useEffect(() => {
    if (isOpen) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      startScroll();
    };
  }, [startScroll]);

  // Focus close button on open + keyboard navigation + focus trap
  useEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'Tab' && overlayRef.current) {
        const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, close, goPrev, goNext]);

  // Preload neighbor full images
  useEffect(() => {
    if (!isOpen || items.length <= 1) return;
    const prevIdx = (index - 1 + items.length) % items.length;
    const nextIdx = (index + 1) % items.length;
    [prevIdx, nextIdx].forEach((idx) => {
      const preload = new Image();
      preload.src = getFull(items[idx].url);
    });
  }, [isOpen, index, items]);

  const current = items[index];

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomed || e.touches.length !== 1) return;
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (zoomed || !touchStartRef.current || e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) goPrev();
      else goNext();
    }
  };

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      {isOpen &&
        current &&
        createPortal(
          <div
            ref={overlayRef}
            className="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${current.title}`}
            data-lenis-prevent
            onClick={(e) => {
              if (e.target === overlayRef.current) close();
            }}
          >
            {/* Screen-reader counter announcement */}
            <div className="sr-only" aria-live="polite">
              Image {index + 1} of {items.length}: {current.title}
            </div>

            {/* Top bar */}
            <div className="lightbox-topbar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <span
                  className="font-mono-label tabular-nums"
                  style={{
                    backgroundColor: 'var(--deep-forest)',
                    color: 'var(--yellow)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--yellow)',
                    flexShrink: 0,
                  }}
                >
                  {index + 1} / {items.length}
                </span>
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: '0.96rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {current.title}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => {
                    setZoomed((z) => !z);
                    setPan({ x: 0, y: 0 });
                  }}
                  aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.25)',
                    backgroundColor: 'var(--soot)',
                    color: 'var(--white)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {zoomed ? <ZoomOut size={19} /> : <ZoomIn size={19} />}
                </button>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  aria-label="Close image viewer"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1px solid var(--yellow)',
                    backgroundColor: 'var(--yellow)',
                    color: 'var(--black)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Stage */}
            <div
              className="lightbox-stage"
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onPointerDown={(e) => {
                if (!zoomed) return;
                panDragRef.current = {
                  active: true,
                  startX: e.clientX - pan.x,
                  startY: e.clientY - pan.y,
                };
              }}
              onPointerMove={(e) => {
                if (!zoomed || !panDragRef.current.active) return;
                setPan({
                  x: e.clientX - panDragRef.current.startX,
                  y: e.clientY - panDragRef.current.startY,
                });
              }}
              onPointerUp={() => {
                panDragRef.current.active = false;
              }}
            >
              {items.length > 1 && (
                <button
                  type="button"
                  className="lightbox-arrow lightbox-arrow--prev"
                  onClick={goPrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              {imgLoading && !imgError && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    width: 'min(480px, 75vw)',
                    height: 'min(320px, 45vh)',
                    borderRadius: '12px',
                    background:
                      'linear-gradient(110deg, #121512 20%, #1d2b1e 50%, #121512 80%)',
                  }}
                />
              )}

              {imgError ? (
                <div
                  style={{
                    padding: '32px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--soot)',
                    border: '1px solid var(--border-dark-strong)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'center',
                  }}
                >
                  <TreeGlyph size={48} />
                  <p style={{ margin: 0, fontWeight: 700 }}>{current.title}</p>
                  <p style={{ margin: 0, color: 'var(--gray)', fontSize: '0.9rem' }}>
                    Preview image could not be loaded.
                  </p>
                </div>
              ) : (
                <img
                  key={current.url}
                  src={getFull(current.url)}
                  alt={current.alt}
                  referrerPolicy="no-referrer"
                  className="lightbox-stage__img"
                  onLoad={() => setImgLoading(false)}
                  onError={() => {
                    setImgLoading(false);
                    setImgError(true);
                  }}
                  onClick={() => {
                    if (!zoomed) setZoomed(true);
                  }}
                  style={{
                    opacity: imgLoading ? 0 : 1,
                    cursor: zoomed ? 'grab' : 'zoom-in',
                    transform: zoomed
                      ? `translate3d(${pan.x}px, ${pan.y}px, 0) scale(1.75)`
                      : 'none',
                  }}
                />
              )}

              {items.length > 1 && (
                <button
                  type="button"
                  className="lightbox-arrow lightbox-arrow--next"
                  onClick={goNext}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              )}
            </div>

            {/* Bottom bar */}
            <div className="lightbox-bottombar">
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ minWidth: 0, flex: '1 1 260px' }}>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'rgba(255,255,255,0.86)' }}>
                    {current.caption || current.alt}
                  </p>
                  {current.city && (
                    <p
                      className="font-mono-label"
                      style={{ margin: '4px 0 0', color: 'var(--light-leaf)' }}
                    >
                      {current.city}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {items.length > 1 && (
                    <div className="lightbox-mobile-arrows">
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous image"
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.3)',
                          backgroundColor: 'var(--soot)',
                          color: 'var(--white)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next image"
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.3)',
                          backgroundColor: 'var(--soot)',
                          color: 'var(--white)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    className="c-btn c-btn--primary c-btn--sm"
                    onClick={() => {
                      close();
                      navigate('/contact');
                    }}
                  >
                    Get a Free Estimate
                  </button>
                </div>
              </div>

              {items.length > 1 && (
                <div
                  className="lightbox-thumbs"
                  style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingTop: '4px',
                  }}
                >
                  {items.map((item, idx) => {
                    const active = idx === index;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`View image ${idx + 1}: ${item.title}`}
                        onClick={() => {
                          setIndex(idx);
                          setZoomed(false);
                          setPan({ x: 0, y: 0 });
                          setImgLoading(true);
                          setImgError(false);
                        }}
                        style={{
                          width: '62px',
                          height: '46px',
                          padding: 0,
                          borderRadius: '8px',
                          overflow: 'hidden',
                          flexShrink: 0,
                          cursor: 'pointer',
                          border: active
                            ? '2px solid var(--yellow)'
                            : '1px solid rgba(255,255,255,0.2)',
                          opacity: active ? 1 : 0.62,
                        }}
                      >
                        <img
                          src={getThumb(item.url)}
                          alt=""
                          referrerPolicy="no-referrer"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </LightboxContext.Provider>
  );
}
