import { Flame } from "lucide-react";
import { useEnVista } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

const FogoneroSection = () => {
  const [ref, visto] = useEnVista<HTMLDivElement>(0.3);

  return (
    <section id="fogonero" className="relative z-10 overflow-hidden bg-[#0f0f0f] py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(160,41,63,0.18) 0%, rgba(120,40,10,0.06) 45%, transparent 70%)" }}
      />
      <div ref={ref} className={cn("fogonero container relative", visto && "visto")}>
        <div className="section-divider" aria-hidden>
          <Flame className="h-5 w-5 text-ember-orange" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <p className="fogonero-in font-body text-xs uppercase tracking-[0.3em] text-text-muted" style={{ ["--d" as string]: 0 }}>
            Quién está detrás del fuego
          </p>
          <p className="fogonero-in mt-4 font-display text-lg italic text-ember-orange" style={{ ["--d" as string]: 1 }}>
            El fogonero
          </p>
          <h2 className="fogonero-in mt-1 font-display text-4xl font-bold text-foreground md:text-6xl" style={{ ["--d" as string]: 2 }}>
            Mateo Martinelli
          </h2>

          <blockquote className="fogonero-in mx-auto mt-10 max-w-2xl font-display text-2xl italic leading-snug text-foreground md:text-4xl" style={{ ["--d" as string]: 3 }}>
            <span className="text-ember-warm">“</span>No aprendí en un aula. Aprendí al lado del fuego.<span className="text-ember-warm">”</span>
          </blockquote>
          <div className="fogonero-linea mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-primary-glow to-transparent" />

          <p className="fogonero-in mx-auto mt-8 max-w-xl font-body text-[15px] text-text-muted" style={{ lineHeight: 1.85, ["--d" as string]: 4 }}>
            Tiene 24 años y desde que tiene memoria, el fuego fue suyo. En cada juntada familiar, en cada reunión de amigos,
            siempre fue él el que se ponía al mando de la parrilla. No por obligación, por pasión. Hoy convierte esa misma
            energía y dedicación en experiencias gastronómicas únicas para tus eventos.
          </p>

          <div className="fogonero-in mt-8 flex flex-wrap justify-center gap-2" style={{ ["--d" as string]: 5 }}>
            {["Fuego en vivo", "Cortes premium", "Cocina artesanal"].map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 font-body text-xs text-ember-orange"
                style={{ background: "rgba(180,70,20,0.15)", border: "1px solid rgba(180,70,20,0.3)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FogoneroSection;
