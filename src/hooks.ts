import { useEffect, useRef, useState, type RefObject } from 'react';

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

export function useModal<T extends HTMLElement>(active = true): RefObject<T | null> {
  const ref = useRef<T>(null);
  const [previous] = useState(() => document.activeElement as HTMLElement | null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    node.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, [previous]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !active) return;
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = [...node.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return e.preventDefault();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    node.addEventListener('keydown', trap);
    return () => node.removeEventListener('keydown', trap);
  }, [active]);

  return ref;
}

export function useOutsideClose(ref: RefObject<HTMLElement | null>, open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [ref, open, close]);
}
