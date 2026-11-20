import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type SecuenciaHandle = { dibujar: (p: number) => void };

type Props = {
  /** Ruta con {n} para el número de cuadro, ej: /fuego/f_{n}.webp (n con 3 dígitos). */
  patron: string;
  cuadros: number;
  className?: string;
  /** Cuadro que se muestra antes de que cargue el resto (y con "reducir movimiento"). */
  inicial?: number;
};

const ruta = (patron: string, i: number) => patron.replace("{n}", String(i + 1).padStart(3, "0"));

/**
 * Dibuja una secuencia de imágenes en un canvas que cubre su contenedor ("object-fit: cover").
 * El cuadro se elige desde afuera con ref.dibujar(p), p entre 0 y 1, típicamente atado al scroll.
 */
const SecuenciaCanvas = forwardRef<SecuenciaHandle, Props>(({ patron, cuadros, className, inicial = 0 }, ref) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const actual = useRef(-1);
  const progreso = useRef(inicial / Math.max(1, cuadros - 1));

  const pintar = (i: number, forzar = false) => {
    const c = canvas.current;
    if (!c) return;
    // si el cuadro pedido no cargó, usar el más cercano que sí
    let k = i;
    for (let d = 0; d < cuadros; d++) {
      const a = imgs.current[i - d];
      if (a?.complete && a.naturalWidth) { k = i - d; break; }
      const b = imgs.current[i + d];
      if (b?.complete && b.naturalWidth) { k = i + d; break; }
      if (d === cuadros - 1) return;
    }
    if (k === actual.current && !forzar) return;
    const img = imgs.current[k];
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const { width: w, height: h } = c;
    const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const iw = img.naturalWidth * s;
    const ih = img.naturalHeight * s;
    ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
    actual.current = k;
  };

  const dibujar = (p: number) => {
    progreso.current = p;
    pintar(Math.round(p * (cuadros - 1)));
  };

  useImperativeHandle(ref, () => ({ dibujar }));

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ajustar = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      pintar(Math.round(progreso.current * (cuadros - 1)), true);
    };
    const ro = new ResizeObserver(ajustar);
    ro.observe(c);

    // primero el cuadro inicial, después el resto en orden
    const lista: HTMLImageElement[] = new Array(cuadros);
    const cargar = (i: number) => {
      const img = new Image();
      img.decoding = "async";
      img.src = ruta(patron, i);
      img.onload = () => {
        if (Math.round(progreso.current * (cuadros - 1)) === i || actual.current === -1) pintar(i, true);
      };
      lista[i] = img;
    };
    imgs.current = lista;
    cargar(inicial);
    const resto = () => {
      for (let i = 0; i < cuadros; i++) if (i !== inicial) cargar(i);
    };
    const id = "requestIdleCallback" in window ? (window as any).requestIdleCallback(resto) : setTimeout(resto, 300);
    ajustar();
    return () => {
      ro.disconnect();
      if ("cancelIdleCallback" in window) (window as any).cancelIdleCallback(id);
      else clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patron, cuadros]);

  return <canvas ref={canvas} className={className} aria-hidden />;
});

SecuenciaCanvas.displayName = "SecuenciaCanvas";
export default SecuenciaCanvas;
