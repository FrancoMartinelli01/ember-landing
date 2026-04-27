import { Utensils, ChefHat, Truck, Flame } from "lucide-react";

const items = [
  {
    icon: Utensils,
    title: "Mozos profesionales",
    desc: "Servicio de mesa completo para que vos disfrutes.",
  },
  {
    icon: ChefHat,
    title: "Cocineros y fogoneros",
    desc: "El equipo se encarga de todo el fuego y la cocción.",
  },
  {
    icon: Truck,
    title: "Equipamiento completo",
    desc: "Llevamos parrillas, fogoneros y todo lo necesario.",
  },
];

const ServicioSection = () => {
  return (
    <section id="servicio" className="relative z-10 py-24 md:py-32 bg-background">
      <div className="container">
        <div className="section-divider" aria-hidden>
          <Flame className="h-5 w-5 text-ember-orange" />
        </div>
        <div className="text-center mb-14">
          <p className="font-display italic text-text-muted">Cómo trabajamos</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mt-2">
            Un servicio integral
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-bg-secondary border border-border-subtle rounded-md p-8 text-center hover:border-primary/60 transition-colors"
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-bg-surface border border-border-subtle flex items-center justify-center mb-5">
                <Icon className="h-6 w-6 text-ember-warm" aria-hidden />
              </div>
              <h3 className="font-display text-xl text-foreground">{title}</h3>
              <p className="mt-3 font-body text-text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-4xl mx-auto bg-bg-secondary border border-border-subtle rounded-md p-10 text-center ember-glow">
          <p className="font-display italic text-2xl md:text-3xl text-foreground leading-snug">
            Nos adaptamos a tu evento: cumpleaños, casamiento, corporativo o reunión íntima.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicioSection;
