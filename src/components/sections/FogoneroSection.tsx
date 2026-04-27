const FogoneroSection = () => {
  return (
    <section id="fogonero" className="relative z-10 py-24 md:py-32 bg-[#0f0f0f]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* LEFT COLUMN — Photo */}
          <div className="relative overflow-hidden rounded-xl" style={{ maxHeight: "520px" }}>
            <img
              src="https://raw.githubusercontent.com/FrancoMartinelli01/ember-landing/main/public/Mateo%20asador.jpeg"
              alt="Mateo Martinelli — El fogonero"
              className="w-full h-full object-cover"
              style={{ objectPosition: "bottom center", maxHeight: "520px" }}
            />
            {/* Bottom gradient overlay */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: "50%",
                background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* RIGHT COLUMN — Content */}
          <div
            className="relative flex flex-col justify-center"
            style={{
              background: "radial-gradient(ellipse at left center, rgba(80,20,5,0.15) 0%, transparent 60%)",
            }}
          >
            {/* Small uppercase label */}
            <p
              className="font-body text-xs tracking-[0.2em] uppercase mb-3"
              style={{ color: "#9A8A7A" }}
            >
              QUIÉN ESTÁ DETRÁS DEL FUEGO
            </p>

            {/* Section tag */}
            <p
              className="font-display italic text-lg mb-1"
              style={{ color: "#C44B1B" }}
            >
              El fogonero
            </p>

            {/* Name */}
            <h3
              className="font-display text-4xl md:text-[36px] font-bold mb-4"
              style={{ color: "#F5EDE3" }}
            >
              Mateo Martinelli
            </h3>

            {/* Bordó divider */}
            <div
              className="mb-5"
              style={{
                width: "40px",
                height: "2px",
                backgroundColor: "#6B1A2A",
              }}
            />

            {/* Pull quote */}
            <blockquote
              className="font-display italic text-xl mb-5 pl-4"
              style={{
                borderLeft: "3px solid #6B1A2A",
                color: "#F5EDE3",
              }}
            >
              No aprendí en un aula. Aprendí al lado del fuego.
            </blockquote>

            {/* Bio text */}
            <p
              className="font-body text-[15px] mb-6"
              style={{
                color: "#9A8A7A",
                lineHeight: 1.8,
              }}
            >
              Tiene 24 años y desde que tiene memoria, el fuego fue suyo. En cada juntada familiar, en cada reunión de amigos, siempre fue él el que se ponía al mando de la parrilla. No por obligación — por pasión. Hoy convierte esa misma energía y dedicación en experiencias gastronómicas únicas para tus eventos.
            </p>

            {/* Tags row */}
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
