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
              className="group rounded-md p-8 text-center transition-all duration-300 hover:-translate-y-1"
              style={{
                border: "1px solid rgba(180, 80, 20, 0.25)",
                background: "linear-gradient(135deg, #161616 0%, #1a0f08 100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(180, 70, 20, 0.35), 0 0 60px rgba(120, 40, 10, 0.15)";
                e.currentTarget.style.borderColor = "rgba(200, 90, 30, 0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "rgba(180, 80, 20, 0.25)";
              }}
            >
              <div
                className="mx-auto flex items-center justify-center mb-5 rounded-full"
                style={{
                  width: "56px",
                  height: "56px",
                  background: "rgba(180, 70, 20, 0.2)",
                  boxShadow: "0 0 20px rgba(180, 70, 20, 0.3)",
                }}
              >
                <Icon className="h-7 w-7 text-ember-warm" aria-hidden />
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
