import { ChevronDown } from "lucide-react";

const EMBER_COLORS = ["#E8773A", "#C44B1B", "#FF9500", "#E8773A", "#FF7A18"];

const HeroSection = () => {
  const embers = Array.from({ length: 28 }).map((_, i) => {
    const size = 2 + ((i * 7) % 5); // 2-6px
    const left = (i * 53) % 100;
    const bottom = (i * 17) % 35;
    const delay = (i % 12) * 0.6;
    const duration = 6 + ((i * 3) % 5);
    const driftX = ((i % 2 === 0 ? 1 : -1) * (10 + ((i * 11) % 30))) + "px";
    const color = EMBER_COLORS[i % EMBER_COLORS.length];
    return { i, size, left, bottom, delay, duration, driftX, color };
  });

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse at 50% 90%, #7A2800 0%, #3D1200 30%, #0a0a0a 70%)",
          "radial-gradient(ellipse at 20% 80%, #4A1800 0%, transparent 50%)",
        ].join(", "),
      }}
    >
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(10,10,10,0.85) 90%, #0a0a0a 100%)",
          boxShadow: "inset 0 0 200px 60px #0a0a0a",
        }}
      />

      {/* Floating embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {embers.map((e) => (
          <span
            key={e.i}
            className="absolute block rounded-full animate-ember-drift"
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

      <div className="relative z-10 container flex flex-col items-center text-center px-4">
        <p className="font-body text-xs md:text-sm tracking-[0.35em] text-text-muted uppercase mb-6">
          Catering de fuegos y eventos
        </p>
        <h1 className="font-display font-black text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl">
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
        <p className="mt-6 font-body text-lg md:text-xl text-text-muted max-w-2xl">
          Parrillas, brasas y fogoneros encendidos en vivo.
        </p>
        <a
          href="#contacto"
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-md bg-primary hover:bg-primary-hover text-primary-foreground font-display text-lg tracking-wide transition-all ember-glow"
        >
          Pedí tu presupuesto
        </a>
      </div>

      <a
        href="#propuesta"
        aria-label="Ver propuesta"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted hover:text-foreground transition-colors animate-bounce-soft z-10"
      >
        <ChevronDown className="h-7 w-7" />
      </a>
    </section>
  );
};

export default HeroSection;
