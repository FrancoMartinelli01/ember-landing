import { Flame, ChefHat, Beef } from "lucide-react";

const stats = [
  { icon: Flame, label: "Fuego en vivo" },
  { icon: ChefHat, label: "Cocineros profesionales" },
  { icon: Beef, label: "Menú personalizable" },
];

const PropuestaSection = () => {
  return (
    <section id="propuesta" className="relative z-10 py-24 md:py-32 bg-background">
      <div className="container">
        <div className="section-divider" aria-hidden>
          <Flame className="h-5 w-5 text-ember-orange" />
        </div>

        <div className="max-w-3xl mx-auto bg-bg-secondary border border-border-subtle border-l-4 border-l-primary rounded-md p-8 md:p-12">
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
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-bg-surface border border-border-subtle"
            >
              <Icon className="h-5 w-5 text-ember-warm" aria-hidden />
              <span className="font-body text-sm text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropuestaSection;
