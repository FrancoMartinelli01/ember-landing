import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at bottom center, #3D1200 0%, #1a0a05 45%, #0a0a0a 75%)",
      }}
    >
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0a_90%)]" aria-hidden />
      {/* Floating embers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute block w-1 h-1 rounded-full bg-ember-warm/70 animate-ember-pulse"
            style={{
              left: `${(i * 83) % 100}%`,
              bottom: `${(i * 37) % 60}%`,
              animationDelay: `${(i % 6) * 0.5}s`,
              boxShadow: "0 0 8px hsl(var(--ember-warm) / 0.8)",
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
          <span className="italic text-ember-warm">experiencia.</span>
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
