import { useEffect, useRef, useState } from "react";

export const useMenosMovimiento = () => {
  const [menos, setMenos] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setMenos(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return menos;
};

/** true la primera vez que el elemento entra en pantalla (y queda así). */
export const useEnVista = <T extends Element>(umbral = 0.25) => {
  const ref = useRef<T>(null);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visto) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisto(true);
          io.disconnect();
        }
      },
      { threshold: umbral }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [umbral, visto]);
  return [ref, visto] as const;
};

/**
 * Progreso 0→1 de una sección alta con contenido "sticky":
 * 0 cuando su borde superior toca el de la pantalla, 1 cuando su borde inferior toca el de abajo.
 * Escribe el valor en la variable CSS --p del elemento (sin re-render) y lo devuelve por callback.
 */
export const useProgresoSticky = <T extends HTMLElement>(onProgreso?: (p: number) => void) => {
  const ref = useRef<T>(null);
  const cb = useRef(onProgreso);
  cb.current = onProgreso;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const medir = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / total));
      el.style.setProperty("--p", p.toFixed(4));
      cb.current?.(p);
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
};

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Mapea p del rango [a,b] a [0,1]. */
export const tramo = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
