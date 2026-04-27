import { Flame, ChefHat, Beef } from "lucide-react";

const stats = [
  { icon: Flame, label: "Fuego en vivo" },
  { icon: ChefHat, label: "Cocineros profesionales" },
  { icon: Beef, label: "Menú personalizable" },
];

const PropuestaSection = () => {
  return (
    <section id="propuesta" className="relative z-10 py-24 md:py-32 bg-background overflow-hidden">
      {/* Warm radial glow behind the card */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle, rgba(180,60,20,0.18) 0%, rgba(120,40,10,0.08) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="container relative">
        <div className="section-divider" aria-hidden>
          <Flame className="h-5 w-5 text-ember-orange" />
        </div>

        <div
          className="max-w-3xl mx-auto bg-bg-secondary rounded-md p-8 md:p-12 border-l-4 border-l-primary relative"
          style={{
            border: "1px solid rgba(180, 60, 20, 0.4)",
            borderLeft: "4px solid hsl(var(--primary))",
            boxShadow:
              "0 0 40px rgba(120, 40, 10, 0.3), inset 0 0 30px rgba(80, 20, 5, 0.1)",
          }}
        >
          <p className="font-display italic text-2xl md:text-4xl leading-snug text-foreground">
            “Asado como en casa para la cantidad de personas que quieras.”
          </p>
          <p className="mt-6 font-body text-lg text-text-muted">
            Vos ponés el lugar, nosotros llevamos el fuego.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {stats.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="group flex items-center gap-3 px-5 py-3 rounded-full border border-border-subtle transition-all hover:border-ember-orange/60"
              style={{ backgroundColor: "#1f1008" }}
            >
              <Icon
                className="h-5 w-5 text-ember-warm transition-all group-hover:drop-shadow-[0_0_8px_rgba(232,119,58,0.9)]"
                aria-hidden
              />
              <span className="font-body text-sm text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropuestaSection;
