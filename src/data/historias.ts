export type HistoriaPlato = {
  id: "sandwich" | "pinche" | "plato" | "burgers";
  titulo: string;
  badge?: string;
  texto: string;
  incluye: string[];
  ideal: string;
  imagen: string;
  alt: string;
};

// Fotos ilustrativas generadas con IA (Google Flow).
export const historias: Record<HistoriaPlato["id"], HistoriaPlato> = {
  sandwich: {
    id: "sandwich",
    titulo: "Asado al Sándwich",
    texto: "El asado de siempre, al pan y en la mano. Sale de la parrilla y va directo a la gente, sin mesa ni cubiertos.",
    incluye: ["Choripán artesanal con chimichurri", "Colita de cuadril tierna al pan", "Bondiola desmenuzada con salsa criolla", "Condimentos surtidos"],
    ideal: "Cumpleaños, juntadas y eventos de pie con mucha gente.",
    imagen: "/carta/sandwich.webp",
    alt: "Choripán y bondiola al pan sobre tabla de madera",
  },
  pinche: {
    id: "pinche",
    titulo: "Asado Gourmet al Pinche",
    badge: "Premium",
    texto: "Cortes chicos y achuras que salen del fuego en pinches de hierro y pasan de mano en mano mientras la charla sigue.",
    incluye: ["Provoletas a las brasas con orégano", "Mollejas crocantes al limón", "Entrañitas jugosas con chimichurri"],
    ideal: "Recepciones, eventos corporativos y casamientos antes de la cena.",
    imagen: "/carta/pinche.webp",
    alt: "Pinches de hierro con entrañitas, mollejas y provoleta",
  },
  plato: {
    id: "plato",
    titulo: "Asado Gourmet al Plato",
    badge: "Premium Plus",
    texto: "El fuego en versión de autor: lomo a la parrilla en el punto que pidas, emplatado y servido en la mesa.",
    incluye: ["Lomo a la parrilla, término a elección", "Guarniciones gourmet incluidas", "Presentación de autor en plato"],
    ideal: "Casamientos, aniversarios y cenas sentadas.",
    imagen: "/carta/plato.webp",
    alt: "Medallón de lomo a la parrilla emplatado con vegetales grillados",
  },
  burgers: {
    id: "burgers",
    titulo: "Hamburguesas al Fuego",
    texto: "100% caseras, 100% fuego. Carne de novillo a la parrilla con todo lo que tiene que tener.",
    incluye: ["Pan de papa artesanal", "Carne de novillo", "Cebolla caramelizada y cheddar fundido", "Opciones doble burger y vegetariana"],
    ideal: "Cumpleaños, eventos con chicos y juntadas descontracturadas.",
    imagen: "/carta/burgers.webp",
    alt: "Hamburguesa casera con cheddar sobre la parrilla",
  },
};
