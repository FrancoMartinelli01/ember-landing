import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import SumarBoton from "@/components/evento/SumarBoton";
import { crearCampo, pathCierre, soportaPath, type CampoCierre } from "@/lib/disolucion";
import type { HistoriaPlato as Historia } from "@/data/historias";

/*
 * "Expanding aperture" (TABLE, thepromptsfactory): un botón con dos líneas de 1px.
 * Al activarlo las líneas se juntan en su centro (450ms), desde esa franja se abre la historia
 * del plato a pantalla completa (1050ms, cubic-bezier(.625,.05,0,1)) y al cerrar se disuelve
 * desde arriba con una máscara orgánica calculada (850ms, cubic in-out).
 */

const REGLAS_MS = 450;
const APERTURA_MS = 1050;
const ABRIR_FIN_MS = 1150; // el botón de cerrar termina de aparecer en 550 + 600
const CIERRE_MS = 850;
const CONTORNO_MS = 1000 / 30;

const bezier = (x1: number, y1: number, x2: number, y2: number) => {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dsx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(t) - x;
      const d = dsx(t);
      if (Math.abs(e) < 1e-6 || Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    let lo = 0, hi = 1;
    for (let i = 0; i < 20 && Math.abs(sx(t) - x) > 1e-5; i++) {
      if (sx(t) < x) lo = t; else hi = t;
      t = (lo + hi) / 2;
    }
    return sy(t);
  };
};
const easeApertura = bezier(0.625, 0.05, 0, 1);
const easeReglas = bezier(0.65, 0, 0.35, 1);
const cubicInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const tramo = (v: number, desde: number, dur: number) => Math.min(1, Math.max(0, (v - desde) / dur));

type Fase = "quieto" | "abriendo" | "abierto" | "cerrando";
type Rect = { top: number; left: number; right: number; bottom: number };

const menosMovimiento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HistoriaPlato = ({ historia }: { historia: Historia }) => {
  const [fase, setFase] = useState<Fase>("quieto");
  const faseRef = useRef<Fase>("quieto");
  const boton = useRef<HTMLButtonElement>(null);
  const reglaA = useRef<HTMLSpanElement>(null);
  const reglaB = useRef<HTMLSpanElement>(null);
  const capa = useRef<HTMLDivElement>(null);
  const linea1 = useRef<HTMLDivElement>(null);
  const linea2 = useRef<HTMLDivElement>(null);
  const escenario = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const placa = useRef<HTMLDivElement>(null);
  const contenido = useRef<HTMLDivElement>(null);
  const cerrarBtn = useRef<HTMLButtonElement>(null);

  const reloj = useRef({ t: 0, ultimo: 0, raf: 0 });
  const rects = useRef<{ a: DOMRect; b: DOMRect } | null>(null);
  const campo = useRef<CampoCierre | null>(null);
  const ultimoContorno = useRef(-1);
  const imgLista = useRef<Promise<void> | null>(null);

  const precargar = useCallback(() => {
    if (!imgLista.current) {
      const img = new Image();
      img.src = historia.imagen;
      imgLista.current = img.decode().catch(() => undefined);
    }
    return imgLista.current;
  }, [historia.imagen]);

  // precarga cuando la carta se acerca a la pantalla
  useEffect(() => {
    const el = boton.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        precargar();
        io.disconnect();
      }
    }, { rootMargin: "600px" });
    io.observe(el);
    return () => io.disconnect();
  }, [precargar]);

  const medir = () => {
    if (reglaA.current && reglaB.current)
      rects.current = { a: reglaA.current.getBoundingClientRect(), b: reglaB.current.getBoundingClientRect() };
  };

  const union = (): Rect => {
    const r = rects.current!;
    return {
      top: r.a.top,
      bottom: r.b.bottom,
      left: Math.min(r.a.left, r.b.left),
      right: Math.max(r.a.right, r.b.right),
    };
  };

  // ---- dibujo de cada estado ----
  const pintarAbierto = () => {
    if (escenario.current) {
      escenario.current.style.visibility = "visible";
      escenario.current.style.clipPath = "none";
    }
    if (linea1.current) linea1.current.style.display = "none";
    if (linea2.current) linea2.current.style.display = "none";
    if (media.current) {
      media.current.style.transform = "scale(1)";
      media.current.style.opacity = "1";
    }
    if (placa.current) placa.current.style.opacity = "0";
    if (contenido.current) contenido.current.style.opacity = "1";
    if (cerrarBtn.current) cerrarBtn.current.style.opacity = "1";
  };

  const pintarApertura = (t: number) => {
    const W = window.innerWidth;
    const Hh = window.innerHeight;
    const u = union();
    const r = rects.current!;
    if (t < REGLAS_MS) {
      // las líneas crecen hacia el medio del botón, cada una desde su borde exterior
      const p = easeReglas(t / REGLAS_MS);
      const medio = (u.top + u.bottom) / 2;
      const l1 = linea1.current!, l2 = linea2.current!;
      l1.style.display = l2.style.display = "block";
      l1.style.left = `${r.a.left}px`;
      l1.style.width = `${r.a.width}px`;
      l1.style.top = `${r.a.top}px`;
      l1.style.height = `${Math.max(r.a.height, (medio - r.a.top) * p)}px`;
      l2.style.left = `${r.b.left}px`;
      l2.style.width = `${r.b.width}px`;
      l2.style.top = "auto";
      l2.style.bottom = `${Hh - r.b.bottom}px`;
      l2.style.height = `${Math.max(r.b.height, (r.b.bottom - medio) * p)}px`;
      if (escenario.current) escenario.current.style.visibility = "hidden";
      return;
    }
    if (linea1.current) linea1.current.style.display = "none";
    if (linea2.current) linea2.current.style.display = "none";
    const a = t - REGLAS_MS;
    const e = easeApertura(Math.min(1, a / APERTURA_MS));
    const top = u.top * (1 - e);
    const right = (W - u.right) * (1 - e);
    const bottom = (Hh - u.bottom) * (1 - e);
    const left = u.left * (1 - e);
    const esc = escenario.current!;
    esc.style.visibility = "visible";
    esc.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px)`;
    media.current!.style.transform = `scale(${0.94 + 0.06 * e})`;
    media.current!.style.opacity = String(tramo(a, 350, 500));
    placa.current!.style.opacity = String(1 - tramo(a, 120, 600));
    contenido.current!.style.opacity = String(tramo(a, 350, 500));
    cerrarBtn.current!.style.opacity = String(tramo(a, 550, 600));
  };

  const pintarCierre = (t: number, forzar = false) => {
    const esc = escenario.current;
    if (!esc) return;
    const q = cubicInOut(Math.min(1, t / CIERRE_MS));
    if (q <= 0) {
      esc.style.clipPath = "none";
      return;
    }
    if (!soportaPath()) {
      esc.style.clipPath = `inset(${q * 100}% 0 0 0)`;
      return;
    }
    if (!forzar && t - ultimoContorno.current < CONTORNO_MS) return;
    ultimoContorno.current = t;
    const W = window.innerWidth;
    const Hh = window.innerHeight;
    if (!campo.current || campo.current.W !== W || campo.current.H !== Hh) campo.current = crearCampo(W, Hh);
    esc.style.clipPath = `path(evenodd, "${pathCierre(campo.current, q)}")`;
  };

  // ---- reloj ----
  const parar = () => {
    cancelAnimationFrame(reloj.current.raf);
    reloj.current.raf = 0;
  };

  const terminar = useCallback(() => {
    parar();
    faseRef.current = "quieto";
    setFase("quieto");
  }, []);

  const tick = useCallback((ahora: number) => {
    const r = reloj.current;
    const dt = r.ultimo ? Math.min(64, ahora - r.ultimo) : 0;
    r.ultimo = ahora;
    if (!document.hidden) r.t += dt;
    const f = faseRef.current;
    if (menosMovimiento()) {
      if (f === "abriendo") {
        pintarAbierto();
        faseRef.current = "abierto";
        setFase("abierto");
      } else if (f === "cerrando") {
        terminar();
      }
      r.raf = 0;
      return;
    }
    if (f === "abriendo") {
      pintarApertura(r.t);
      if (r.t >= REGLAS_MS + ABRIR_FIN_MS) {
        pintarAbierto();
        faseRef.current = "abierto";
        setFase("abierto");
        r.raf = 0;
        return;
      }
    } else if (f === "cerrando") {
      if (r.t >= CIERRE_MS) {
        terminar();
        return;
      }
      pintarCierre(r.t);
    } else {
      r.raf = 0;
      return;
    }
    r.raf = requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminar]);

  const arrancar = () => {
    parar();
    reloj.current.t = 0;
    reloj.current.ultimo = 0;
    ultimoContorno.current = -1;
    reloj.current.raf = requestAnimationFrame(tick);
  };

  const abrir = async () => {
    if (faseRef.current !== "quieto") return;
    medir();
    await precargar();
    if (faseRef.current !== "quieto") return;
    faseRef.current = "abriendo";
    setFase("abriendo");
  };

  const cerrar = useCallback(() => {
    const f = faseRef.current;
    if (f !== "abriendo" && f !== "abierto") return;
    // si se cierra mientras abría, se arranca la disolución desde el escenario completo
    pintarAbierto();
    faseRef.current = "cerrando";
    setFase("cerrando");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // arrancar el reloj cuando cambia la fase (después de montar la capa)
  useEffect(() => {
    if (fase === "abriendo") {
      if (menosMovimiento()) {
        pintarAbierto();
        faseRef.current = "abierto";
        setFase("abierto");
        return;
      }
      pintarApertura(0);
      arrancar();
    } else if (fase === "cerrando") {
      if (menosMovimiento()) {
        terminar();
        return;
      }
      pintarCierre(0, true);
      arrancar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase]);

  // modal: fondo inerte, scroll bloqueado, foco atrapado, Escape y vuelta del foco
  const abiertoAlgo = fase !== "quieto";
  useEffect(() => {
    if (!abiertoAlgo) return;
    const root = document.getElementById("root");
    root?.setAttribute("inert", "");
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    capa.current?.focus({ preventScroll: true });
    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cerrar();
      } else if (e.key === "Tab" && capa.current) {
        const foco = [...capa.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])")].filter(
          (el) => !el.hasAttribute("disabled")
        );
        if (!foco.length) return;
        const i = foco.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && (i <= 0)) {
          e.preventDefault();
          foco[foco.length - 1].focus();
        } else if (!e.shiftKey && i === foco.length - 1) {
          e.preventDefault();
          foco[0].focus();
        }
      }
    };
    const alCambiarTam = () => {
      campo.current = null;
      if (faseRef.current === "abriendo" && reglaA.current) medir();
    };
    document.addEventListener("keydown", alTeclado);
    window.addEventListener("resize", alCambiarTam);
    return () => {
      root?.removeAttribute("inert");
      document.documentElement.style.overflow = overflow;
      document.removeEventListener("keydown", alTeclado);
      window.removeEventListener("resize", alCambiarTam);
      boton.current?.focus({ preventScroll: true });
    };
  }, [abiertoAlgo, cerrar]);

  // al volver a la pestaña, retomar sin saltos
  useEffect(() => {
    const vis = () => {
      reloj.current.ultimo = 0;
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      document.removeEventListener("visibilitychange", vis);
      parar();
    };
  }, []);

  const irAlArmador = () => {
    cerrar();
    window.setTimeout(() => document.getElementById("armar")?.scrollIntoView({ behavior: "smooth" }), menosMovimiento() ? 0 : CIERRE_MS + 50);
  };

  return (
    <>
      <button
        ref={boton}
        type="button"
        onClick={abrir}
        onPointerEnter={precargar}
        aria-haspopup="dialog"
        className="historia-boton group inline-flex flex-col items-stretch self-start text-foreground"
      >
        <span ref={reglaA} aria-hidden className="block h-px w-full bg-[#F5EDE3]/70 transition-colors group-hover:bg-[#F5EDE3]" />
        <span className="flex items-center gap-2 px-1 py-2.5 font-body text-sm tracking-wide">
          Ver el plato
          <span aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </span>
        <span ref={reglaB} aria-hidden className="block h-px w-full bg-[#F5EDE3]/70 transition-colors group-hover:bg-[#F5EDE3]" />
      </button>

      {abiertoAlgo &&
        createPortal(
          <div
            ref={capa}
            role="dialog"
            aria-modal="true"
            aria-label={historia.titulo}
            tabIndex={-1}
            className="fixed inset-0 z-[100] outline-none"
          >
            <div ref={linea1} aria-hidden className="fixed hidden bg-[#F5EDE3]" style={{ transformOrigin: "top" }} />
            <div ref={linea2} aria-hidden className="fixed hidden bg-[#F5EDE3]" style={{ transformOrigin: "bottom" }} />

            <div ref={escenario} className="absolute inset-0 overflow-hidden bg-[#140a0c]" style={{ visibility: "hidden" }}>
              <div ref={media} className="absolute inset-0 will-change-transform" style={{ opacity: 0, transform: "scale(0.94)" }}>
                <img
                  src={historia.imagen}
                  alt={historia.alt}
                  className="h-full w-full object-cover object-[65%_center] md:object-center"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(14,6,8,0.95) 0%, rgba(14,6,8,0.55) 45%, rgba(14,6,8,0.1) 75%), linear-gradient(to right, rgba(14,6,8,0.85) 0%, rgba(14,6,8,0.35) 45%, transparent 70%)",
                  }}
                />
              </div>

              <div ref={placa} aria-hidden className="absolute inset-0 bg-[#F5EDE3]" />

              <div ref={contenido} className="absolute inset-0 flex items-end md:items-center" style={{ opacity: 0 }}>
                <div className="container pb-12 md:pb-0">
                  <div className="max-w-xl">
                    <p className="font-body text-xs uppercase tracking-[0.3em] text-[#F5EDE3]/70">La carta del fuego · Principal</p>
                    {historia.badge && (
                      <span className="mt-4 inline-block rounded-full bg-primary px-3 py-1 font-body text-xs tracking-wide text-primary-foreground">
                        {historia.badge}
                      </span>
                    )}
                    <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] text-[#F5EDE3] sm:text-5xl md:text-7xl">
                      {historia.titulo}
                    </h2>
                    <p className="mt-5 max-w-md font-display text-lg italic leading-snug text-[#F5EDE3]/90 md:text-2xl">{historia.texto}</p>
                    <ul className="mt-6 space-y-1.5 font-body text-sm text-[#F5EDE3]/85 md:text-base">
                      {historia.incluye.map((i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-ember-warm">•</span>
                          {i}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 font-body text-sm text-[#F5EDE3]/60">
                      <span className="text-ember-warm">Ideal para:</span> {historia.ideal}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <SumarBoton tipo="principal" principalId={historia.id} nombre={historia.titulo} className="border-[#F5EDE3]/50 bg-[#F5EDE3]/10 px-5 py-2.5 text-sm text-[#F5EDE3] backdrop-blur" />
                      <button
                        type="button"
                        onClick={irAlArmador}
                        className="font-body text-sm text-[#F5EDE3]/80 underline-offset-4 hover:text-[#F5EDE3] hover:underline"
                      >
                        Armá tu evento →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                ref={cerrarBtn}
                type="button"
                onClick={cerrar}
                aria-label="Cerrar"
                className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#F5EDE3]/40 bg-[#140a0c]/50 text-[#F5EDE3] backdrop-blur transition-colors hover:bg-[#F5EDE3] hover:text-[#140a0c] md:right-8 md:top-8"
                style={{ opacity: 0 }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default HistoriaPlato;
