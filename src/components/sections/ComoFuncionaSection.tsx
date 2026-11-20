import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEnVista } from "@/hooks/use-scroll";

const pasos = [
  { t: "Armás tu evento", d: "Elegís tipo de evento, cantidad de personas y lo que te tienta del menú. Te lleva dos minutos." },
  { t: "Lo ajustamos juntos", d: "Te escribimos por WhatsApp, afinamos el menú y te pasamos el presupuesto." },
  { t: "Llegamos con todo", d: "Parrillas, fogoneros, leña, vajilla y el equipo. Vos solo ponés el lugar." },
  { t: "Encendemos el fuego", d: "Cocinamos en vivo frente a tus invitados y nos ocupamos de servir." },
];

const ComoFuncionaSection = () => {
  const [ref, visto] = useEnVista<HTMLOListElement>(0.3);

  return (
    <section id="como" className="relative z-10 bg-background py-24 md:py-32">
      <div className="container">
        <div className="mb-16 text-center">
          <p className="mb-3 font-display italic text-ember-warm">Así de simple</p>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">Cómo funciona</h2>
        </div>

        <ol
          ref={ref}
          className={cn("como relative mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-4 md:gap-6", visto && "visto")}
        >
          {/* la mecha que se enciende de paso a paso */}
          <span aria-hidden className="como-mecha pointer-events-none absolute" />
          {pasos.map((p, i) => (
            <li key={p.t} className="como-paso relative flex gap-5 md:block md:text-center" style={{ ["--i" as string]: i }}>
              <span className="como-brasa relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-display text-xl md:mx-auto">
                {i === pasos.length - 1 ? <Flame className="h-6 w-6" /> : `0${i + 1}`}
              </span>
              <div>
                <h3 className="font-display text-xl text-foreground md:mt-6">{p.t}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-muted md:mx-auto md:max-w-[240px]">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 text-center">
          <a
            href="#armar"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-display text-lg tracking-wide text-primary-foreground transition-all ember-glow hover:bg-primary-hover"
          >
            Armá tu evento
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComoFuncionaSection;
