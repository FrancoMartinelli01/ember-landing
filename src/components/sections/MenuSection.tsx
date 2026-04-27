import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Leaf } from "lucide-react";
import {
  fingerFoods,
  principales,
  burgerDetails,
  burgerImage,
  veggieItems,
} from "@/data/menuData";

const CardImage = ({
  src,
  alt,
  pad = 6,
}: {
  src: string;
  alt: string;
  pad?: 5 | 6;
}) => {
  const offset = pad === 5 ? "-1.25rem" : "-1.5rem";
  const widthExtra = pad === 5 ? "2.5rem" : "3rem";
  return (
    <div
      className="relative h-[180px] overflow-hidden rounded-t-md mb-5"
      style={{
        marginLeft: offset,
        marginRight: offset,
        marginTop: offset,
        width: `calc(100% + ${widthExtra})`,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.85) 100%)",
        }}
      />
    </div>
  );
};

const MenuSection = () => {
  return (
    <section id="menu" className="relative z-10 py-24 md:py-32 bg-bg-secondary">
      <div className="container">
        <div className="section-divider" aria-hidden>
          <Flame className="h-5 w-5 text-ember-orange" />
        </div>
        <div className="text-center mb-12">
          <p className="font-display italic text-text-muted">Nuestro menú</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mt-2">
            La carta del fuego
          </h2>
        </div>

        <Tabs defaultValue="finger" className="w-full">
          <TabsList className="flex flex-wrap justify-center h-auto bg-transparent gap-2 mb-10">
            {[
              { v: "finger", l: "Finger Foods" },
              { v: "principales", l: "Principales" },
              { v: "burgers", l: "Hamburguesas al Fuego" },
              { v: "veggie", l: "Opciones Especiales" },
            ].map((t) => (
              <TabsTrigger
                key={t.v}
                value={t.v}
                className="font-display text-base md:text-lg px-5 py-2 rounded-md border border-transparent bg-transparent text-text-muted hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_rgba(107,26,42,0.5)]"
              >
                {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* TAB 1 */}
          <TabsContent value="finger">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {fingerFoods.map((item) => (
                <article
                  key={item.name}
                  className="bg-bg-surface border border-border-subtle rounded-md p-6 overflow-hidden hover:border-primary/60 transition-colors"
                >
                  {item.image && <CardImage src={item.image} alt={item.name} />}
                  <h3 className="font-display text-xl text-foreground">{item.name}</h3>
                  {item.description && (
                    <p className="mt-2 font-body text-sm text-text-muted">{item.description}</p>
                  )}
                </article>
              ))}
            </div>
          </TabsContent>

          {/* TAB 2 */}
          <TabsContent value="principales">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {principales.map((card) => (
                <article
                  key={card.title}
                  className="bg-bg-surface border border-border-subtle rounded-md p-6 overflow-hidden flex flex-col"
                >
                  {card.image && <CardImage src={card.image} alt={card.title} />}
                  {card.badge && (
                    <span className="self-start mb-4 inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-body tracking-wide">
                      {card.badge}
                    </span>
                  )}
                  <h3 className="font-display text-2xl text-foreground">{card.title}</h3>
                  <ul className="mt-4 space-y-2 font-body text-text-muted">
                    {card.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="text-ember-warm mt-1">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </TabsContent>

          {/* TAB 3 */}
          <TabsContent value="burgers">
            <div className="max-w-3xl mx-auto bg-bg-surface border border-border-subtle rounded-md overflow-hidden ember-glow">
              <div className="relative w-full h-[260px]">
                <img
                  src={burgerImage}
                  alt="Hamburguesas al fuego"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.95) 100%)",
                  }}
                />
              </div>
              <div className="p-10 text-center">
                <h3 className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
                  100% Caseras. <span className="italic text-ember-warm">100% Fuego.</span>
                </h3>
                <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto">
                  {burgerDetails.map((d) => (
                    <li key={d} className="flex gap-2 font-body text-foreground">
                      <Flame className="h-4 w-4 text-ember-orange mt-1 shrink-0" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* TAB 4 */}
          <TabsContent value="veggie">
            <div className="max-w-4xl mx-auto bg-bg-surface border-l-4 border-veggie border border-border-subtle rounded-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-veggie/20 border border-veggie text-foreground text-xs font-body tracking-wider">
                  <Leaf className="h-3.5 w-3.5" /> APTO VEGETARIANOS & VEGANOS
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {veggieItems.map((it) => (
                  <article
                    key={it.name}
                    className="bg-bg-secondary border border-border-subtle rounded-md p-5 overflow-hidden"
                  >
                    {it.image && <CardImage src={it.image} alt={it.name} pad={5} />}
                    <h3 className="font-display text-lg text-foreground">{it.name}</h3>
                    {it.description && (
                      <p className="mt-1 font-body text-sm text-text-muted">{it.description}</p>
                    )}
                  </article>
                ))}
              </div>
              <p className="mt-6 font-body text-sm text-text-muted italic">
                Todas nuestras propuestas incluyen alternativas plant-based. Consultanos por opciones veganas en el menú completo.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MenuSection;
