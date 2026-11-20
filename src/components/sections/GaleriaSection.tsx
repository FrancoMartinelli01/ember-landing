import { useCallback, useEffect, useRef, useState } from "react";
import { Shuffle } from "lucide-react";
import { galeria } from "@/data/galeria";
import { useEnVista, useMenosMovimiento } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

// posiciones "desordenadas" pero fijas para cada lugar de la pila
const desorden = (i: number) => ({
  x: ((i * 37) % 9) * 7 - 28,
  y: ((i * 53) % 7) * 6 - 18,
  r: ((i * 71) % 13) - 6,
});

/**
 * Galería como pila de fotos que se agarran y se tiran (inspirada en SIDE B de thepromptsfactory).
 * La de arriba se arrastra con el mouse o el dedo; si la soltás con impulso sale volando y vuelve al fondo.
 */
const GaleriaSection = () => {
  const menos = useMenosMovimiento();
  const [refSeccion, visto] = useEnVista<HTMLDivElement>(0.3);
  const [orden, setOrden] = useState(() => galeria.map((_, i) => i));
  const [volando, setVolando] = useState<number | null>(null);
  const cartas = useRef<(HTMLDivElement | null)[]>([]);
  const arrastre = useRef<{ id: number; x0: number; y0: number; dx: number; dy: number; t: number; vx: number; vy: number } | null>(null);

  const arriba = orden[orden.length - 1];

  const mandarAlFondo = useCallback(
    (id: number, vx: number, vy: number) => {
      const el = cartas.current[id];
      if (!el) return;
      const ang = Math.atan2(vy, vx);
      const dist = Math.max(window.innerWidth, 900);
      setVolando(id);
      el.style.transition = "transform 0.45s cubic-bezier(0.2, 0.7, 0.3, 1)";
      el.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist * 0.6}px) rotate(${vx > 0 ? 40 : -40}deg)`;
      window.setTimeout(() => {
        setOrden((o) => [id, ...o.filter((x) => x !== id)]);
        setVolando(null);
        el.style.transition = "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";
        el.style.transform = "";
      }, 420);
    },
    []
  );

  const tirarSiguiente = () => mandarAlFondo(arriba, Math.random() > 0.5 ? 1 : -1, -0.3);
  const mezclar = () => setOrden((o) => [...o].sort(() => Math.random() - 0.5));

  useEffect(() => {
    const mover = (e: PointerEvent) => {
      const a = arrastre.current;
      if (!a) return;
      const now = performance.now();
      const dx = e.clientX - a.x0;
      const dy = e.clientY - a.y0;
      const dt = Math.max(1, now - a.t);
      a.vx = (dx - a.dx) / dt;
      a.vy = (dy - a.dy) / dt;
      a.dx = dx;
      a.dy = dy;
      a.t = now;
      const el = cartas.current[a.id];
      if (el) el.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 18}deg) scale(1.04)`;
    };
    const soltar = () => {
      const a = arrastre.current;
      if (!a) return;
      arrastre.current = null;
      const el = cartas.current[a.id];
      const rapido = Math.hypot(a.vx, a.vy) > 0.6 || Math.hypot(a.dx, a.dy) > 160;
      if (rapido) mandarAlFondo(a.id, a.vx || a.dx, a.vy || a.dy);
      else if (el) {
        el.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";
        el.style.transform = "";
      }
    };
    window.addEventListener("pointermove", mover);
    window.addEventListener("pointerup", soltar);
    window.addEventListener("pointercancel", soltar);
    return () => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", soltar);
      window.removeEventListener("pointercancel", soltar);
    };
  }, [mandarAlFondo]);

  const agarrar = (id: number) => (e: React.PointerEvent) => {
    if (id !== arriba || volando !== null) return;
    e.preventDefault();
    const el = cartas.current[id];
    if (el) el.style.transition = "none";
    arrastre.current = { id, x0: e.clientX, y0: e.clientY, dx: 0, dy: 0, t: performance.now(), vx: 0, vy: 0 };
  };

  return (
    <section id="galeria" className="relative z-10 overflow-hidden bg-bg-secondary py-24 md:py-32">
      <div className="container">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div className="text-center md:text-left">
            <p className="mb-3 font-display italic text-ember-warm">Así se vive</p>
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">El fuego, de cerca</h2>
            <p className="mx-auto mt-5 max-w-md font-body text-text-muted md:mx-0">
              Agarrá la foto de arriba y tirala para ver la siguiente. Brasas, cortes y sobremesas largas: lo que vamos a
              llevar a tu evento.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <button
                type="button"
                onClick={tirarSiguiente}
                disabled={volando !== null}
                className="rounded-full border border-border-subtle px-5 py-2.5 font-body text-sm text-foreground transition-colors hover:border-ember-warm/60"
              >
                Siguiente foto →
              </button>
              <button
                type="button"
                onClick={mezclar}
                className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-5 py-2.5 font-body text-sm text-text-muted transition-colors hover:border-ember-warm/60 hover:text-foreground"
              >
                <Shuffle className="h-4 w-4" /> Mezclar
              </button>
            </div>
            <p className="mt-8 font-body text-xs italic text-text-muted/70">
              Imágenes ilustrativas. Muy pronto, las de nuestros eventos.
            </p>
          </div>

          <div ref={refSeccion} className={cn("pila relative mx-auto h-[440px] w-full max-w-[400px] md:h-[520px]", visto && "vista")}>
            {galeria.map((foto, id) => {
              const lugar = orden.indexOf(id);
              const d = desorden(lugar);
              const esArriba = id === arriba;
              return (
                <div
                  key={foto.src}
                  className="pila-lugar absolute left-1/2 top-1/2"
                  style={{
                    zIndex: lugar + (volando === id ? 100 : 0),
                    transform: `translate(-50%, -50%) translate(${d.x}px, ${d.y}px) rotate(${d.r}deg)`,
                    ["--i" as string]: lugar,
                  }}
                >
                  <div
                    ref={(el) => (cartas.current[id] = el)}
                    onPointerDown={agarrar(id)}
                    className={cn(
                      "polaroid w-[250px] touch-none select-none bg-[#f3ead9] p-3 pb-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] md:w-[300px]",
                      esArriba && !menos ? "cursor-grab active:cursor-grabbing" : ""
                    )}
                  >
                    <img
                      src={foto.src}
                      alt={foto.alt}
                      draggable={false}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover"
                    />
                    <p className="absolute inset-x-3 bottom-3 truncate text-center font-display text-lg italic text-[#2a1a12]">
                      {foto.texto}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GaleriaSection;
