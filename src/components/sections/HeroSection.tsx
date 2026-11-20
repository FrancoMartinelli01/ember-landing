import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import SecuenciaCanvas, { type SecuenciaHandle } from "@/components/SecuenciaCanvas";
import { tramo, useMenosMovimiento, useProgresoSticky } from "@/hooks/use-scroll";
import { FUEGO_CUADROS } from "@/data/secuencias";

const EMBER_COLORS = ["#E8773A", "#C44B1B", "#FF9500", "#E8773A", "#FF7A18"];

const embers = Array.from({ length: 28 }).map((_, i) => ({
  i,
  size: 2 + ((i * 7) % 5),
  left: (i * 53) % 100,
  bottom: (i * 17) % 35,
  delay: (i % 12) * 0.6,
  duration: 6 + ((i * 3) % 5),
  driftX: (i % 2 === 0 ? 1 : -1) * (10 + ((i * 11) % 30)) + "px",
  color: EMBER_COLORS[i % EMBER_COLORS.length],
}));

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Portada "apertura" (inspirada en TABLE de thepromptsfactory): el fuego empieza en una ventanita
 * al lado del título y, al scrollear, se abre hasta ocupar toda la pantalla mientras se enciende.
 */
const HeroSection = () => {
  const menos = useMenosMovimiento();
  const escena = useRef<HTMLDivElement>(null);
  const secuencia = useRef<SecuenciaHandle>(null);

  const ref = useProgresoSticky<HTMLElement>((p) => {
    const el = escena.current;
    if (!el) return;
    const e = menos ? 0 : easeInOut(tramo(p, 0, 0.6));
    el.style.setProperty("--e", e.toFixed(4));
    el.style.setProperty("--t", (menos ? 0 : tramo(p, 0.62, 0.85)).toFixed(4));
    secuencia.current?.dibujar(menos ? 1 : tramo(p, 0.02, 0.92));
  });

  return (
    <section
      id="top"
      ref={ref}
      className={menos ? "relative h-[100dvh]" : "relative h-[260vh]"}
    >
      <div
        ref={escena}
        className="hero-escena sticky top-0 h-[100dvh] overflow-hidden"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse at 70% 90%, #5a1e00 0%, #2a0d00 30%, #0a0a0a 70%)",
            "radial-gradient(ellipse at 15% 80%, #3a1300 0%, transparent 50%)",
          ].join(", "),
        }}
      >
        {/* Título */}
        <div className="hero-titulo container relative z-10 flex h-full flex-col justify-start pt-28 md:justify-center md:pt-0">
          <div className="max-w-xl md:max-w-[46%]">
            <p className="mb-5 font-body text-xs uppercase tracking-[0.35em] text-text-muted md:text-sm">
              Catering de fuegos y eventos
            </p>
            <h1 className="font-display text-[2.6rem] font-black leading-[1.02] text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              Llevamos el fuego a tu evento y lo convertimos en una{" "}
              <span
                className="italic text-ember-warm"
                style={{
                  textShadow:
                    "0 0 30px rgba(220, 90, 20, 0.9), 0 0 60px rgba(180, 60, 10, 0.6), 0 0 100px rgba(150, 40, 5, 0.3)",
                }}
              >
                experiencia.
              </span>
            </h1>
            <p className="mt-6 hidden max-w-md font-body text-lg text-text-muted sm:block">
              Parrillas, brasas y fogoneros encendidos en vivo.
            </p>
            <a
              href="#armar"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-display text-lg tracking-wide text-primary-foreground transition-all ember-glow hover:bg-primary-hover md:mt-10 md:px-8 md:py-4"
            >
              Pedí tu presupuesto
            </a>
          </div>
        </div>

        {/* La ventana que se abre */}
        <div className="hero-apertura absolute inset-0 z-20" aria-hidden>
          <SecuenciaCanvas
            ref={secuencia}
            patron="/fuego/f_{n}.webp"
            cuadros={FUEGO_CUADROS}
            inicial={menos ? FUEGO_CUADROS - 1 : 0}
            className="absolute inset-0 h-full w-full"
          />
          <div className="hero-velo absolute inset-0" />
        </div>
        <p className="hero-etiqueta pointer-events-none absolute z-20 font-body text-[11px] uppercase tracking-[0.3em] text-text-muted" aria-hidden>
          <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ember-warm align-middle" />
          Encendido en vivo
        </p>

        {/* Lo que aparece con el fuego abierto */}
        <div className="hero-final absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-4xl font-black leading-tight text-foreground sm:text-6xl lg:text-7xl">
            Vos ponés el lugar.
            <br />
            <span className="italic text-ember-warm">Nosotros, el fuego.</span>
          </p>
          <a
            href="#armar"
            tabIndex={-1}
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-display text-lg tracking-wide text-primary-foreground transition-all ember-glow hover:bg-primary-hover"
          >
            Armá tu evento
          </a>
        </div>

        {/* Chispas */}
        <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden>
          {embers.map((e) => (
            <span
              key={e.i}
              className="absolute block animate-ember-drift rounded-full"
              style={{
                width: `${e.size}px`,
                height: `${e.size}px`,
                left: `${e.left}%`,
                bottom: `${e.bottom}%`,
                backgroundColor: e.color,
                animationDelay: `${e.delay}s`,
                animationDuration: `${e.duration}s`,
                boxShadow: `0 0 ${4 + e.size * 2}px ${e.color}, 0 0 ${10 + e.size * 3}px ${e.color}80`,
                ["--drift-x" as string]: e.driftX,
              }}
            />
          ))}
        </div>

        <a
          href="#propuesta"
          aria-label="Ver propuesta"
          className="hero-flecha absolute bottom-8 left-1/2 z-40 -translate-x-1/2 animate-bounce-soft text-text-muted transition-colors hover:text-foreground"
        >
          <ChevronDown className="h-7 w-7" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
