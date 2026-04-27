import { Star } from "lucide-react";

const testimonials = [
  {
    text: "La comida estuvo increíble. El asado salió perfecto y los chicos se encargaron de todo, nosotros solo disfrutamos.",
    name: "Juan P.",
    info: "Cumpleaños, 25 personas",
  },
  {
    text: "Contratamos el servicio para una juntada familiar y superó todas las expectativas. El fuego en vivo le dio un ambiente único a la noche.",
    name: "Sofía M.",
    info: "Reunión familiar, 15 personas",
  },
  {
    text: "Muy profesionales y atentos. La comida estuvo riquísima y la presentación muy prolija. Lo recomiendo sin dudarlo.",
    name: "Marcos R.",
    info: "Reunión de amigos, 30 personas",
  },
];

const TestimoniosSection = () => {
  return (
    <section id="testimonios" className="relative z-10 py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <p className="font-display italic text-ember-warm mb-3">Lo que dicen nuestros clientes</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Experiencias reales</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="bg-bg-surface border-l-[3px] border-l-primary p-8 rounded-md shadow-sm flex flex-col gap-4"
            >
              <div className="flex gap-1" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-ember-warm text-ember-warm" />
                ))}
              </div>
              <p className="font-display italic text-foreground leading-relaxed">"{t.text}"</p>
              <div className="mt-auto pt-2">
                <p className="font-body text-sm text-text-muted">
                  — <span className="text-foreground">{t.name}</span> · {t.info}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniosSection;
