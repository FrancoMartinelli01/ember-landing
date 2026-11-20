import { useRef } from "react";
import { tramo, useMenosMovimiento, useProgresoSticky } from "@/hooks/use-scroll";

/**
 * "El fogonero" con capas (inspirado en NOCTURNE de thepromptsfactory): Mateo recortado entre
 * letras gigantes. Al scrollear, "EL FOGONERO" se abre detrás de él y "MATEO" sube por delante.
 */
const FogoneroSection = () => {
  const menos = useMenosMovimiento();
  const escena = useRef<HTMLDivElement>(null);

  const ref = useProgresoSticky<HTMLDivElement>((p) => {
    const el = escena.current;
    if (!el) return;
    const q = menos ? 1 : tramo(p, 0.05, 0.75);
    const eased = 1 - Math.pow(1 - q, 3);
    el.style.setProperty("--q", eased.toFixed(4));
  });

  return (
    <section id="fogonero" className="relative z-10 bg-[#0f0f0f]">
      <div ref={ref} className={menos ? "relative" : "relative h-[200vh]"}>
        <div
          ref={escena}
          className="fogonero-escena sticky top-0 flex h-[100dvh] items-end justify-center overflow-hidden"
        >
          <p className="absolute left-1/2 top-24 z-30 -translate-x-1/2 whitespace-nowrap font-body text-xs uppercase tracking-[0.3em] text-text-muted md:top-28">
            Quién está detrás del fuego
          </p>

          {/* Detrás */}
          <div aria-hidden className="fogonero-atras pointer-events-none absolute inset-x-0 top-[22%] z-0 select-none text-center font-display font-black uppercase leading-[0.82]">
            <span className="fogonero-linea-1 block">El</span>
            <span className="fogonero-linea-2 block">Fogonero</span>
          </div>

          {/* Mateo */}
          <img
            src="/mateo-recorte.webp"
            alt="Mateo Martinelli, el fogonero de Fuego Nómade"
            className="fogonero-mateo relative z-10 h-[52dvh] max-h-[640px] w-auto max-w-none md:h-[66dvh]"
            width={1230}
            height={1590}
          />

          {/* Delante */}
          <p aria-hidden className="fogonero-adelante pointer-events-none absolute inset-x-0 bottom-[-0.12em] z-20 select-none text-center font-display font-black uppercase leading-none">
            Mateo
          </p>
        </div>
      </div>

      <div className="container relative z-10 py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <blockquote
            className="pl-5 font-display text-3xl italic leading-snug text-foreground md:text-4xl"
            style={{ borderLeft: "3px solid #6B1A2A" }}
          >
            “No aprendí en un aula. Aprendí al lado del fuego.”
          </blockquote>
          <div>
            <p className="mb-2 font-display text-lg italic" style={{ color: "#C44B1B" }}>
              Mateo Martinelli, el fogonero
            </p>
            <p className="mb-6 font-body text-[15px]" style={{ color: "#9A8A7A", lineHeight: 1.8 }}>
              Tiene 24 años y desde que tiene memoria, el fuego fue suyo. En cada juntada familiar, en cada reunión de
              amigos, siempre fue él el que se ponía al mando de la parrilla. No por obligación, por pasión. Hoy convierte
              esa misma energía y dedicación en experiencias gastronómicas únicas para tus eventos.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Fuego en vivo", "Cortes premium", "Cocina artesanal"].map((tag) => (
                <span
                  key={tag}
                  className="font-body text-xs"
                  style={{
                    background: "rgba(180,70,20,0.15)",
                    border: "1px solid rgba(180,70,20,0.3)",
                    color: "#C44B1B",
                    borderRadius: "20px",
                    padding: "4px 12px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FogoneroSection;
