const photos = [
  "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
];

const GaleriaSection = () => {
  return (
    <section id="galeria" className="relative z-10 py-24 md:py-32 bg-bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <p className="font-display italic text-ember-warm mb-3">Nuestro trabajo</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">El fuego en acción</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((src, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl"
              style={{ height: "280px" }}
            >
              <img
                src={src}
                alt={`Evento Fuego Nómade ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: "rgba(120, 40, 10, 0.3)" }}
              />
            </div>
          ))}
        </div>

        <p className="text-center font-body italic text-text-muted mt-12">
          Próximamente más fotos de nuestros eventos 🔥
        </p>
      </div>
    </section>
  );
};

export default GaleriaSection;
