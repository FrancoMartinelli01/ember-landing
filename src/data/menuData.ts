export type MenuItem = { name: string; description?: string };

export const fingerFoods: MenuItem[] = [
  { name: "Brusquetas al horno", description: "Con toppings de la estación." },
  { name: "Bocconcinos marinados", description: "Mozzarella tierna con hierbas frescas." },
  { name: "Empanaditas salteñas fritas", description: "Carne, queso y verdura, masa crocante." },
  { name: "Nachos caseros", description: "Con guacamole y pico de gallo." },
  { name: "Pinchos de pollo grillados", description: "Marinados y servidos con chimichurri." },
  { name: "Tortilla española al horno", description: "Papa, huevo y cebolla, textura cremosa." },
  { name: "Sandwichitos premium", description: "Miga, jamón crudo y queso brie." },
];

export type ModalidadCard = {
  title: string;
  badge?: string;
  items: string[];
};

export const principales: ModalidadCard[] = [
  {
    title: "Asado al Sándwich",
    items: [
      "Choripán artesanal con chimichurri",
      "Colita de cuadril tierna al pan",
      "Bondiola desmenuzada con salsa criolla",
      "Condimentos surtidos",
    ],
  },
  {
    title: "Asado Gourmet al Pinche",
    badge: "⭐ Premium",
    items: [
      "Provoletas a las brasas con orégano",
      "Mollejas crocantes al limón",
      "Entrañitas jugosas con chimichurri",
    ],
  },
  {
    title: "Asado Gourmet al Plato",
    badge: "👑 Premium Plus",
    items: [
      "Lomo a la parrilla, término a elección",
      "Guarniciones gourmet incluidas",
      "Presentación de autor en plato",
    ],
  },
];

export const burgerDetails: string[] = [
  "Pan de papa artesanal",
  "Carne de novillo",
  "Cebolla caramelizada",
  "Cheddar fundido",
  "Opciones doble burger y vegetariana",
];

export const veggieItems: MenuItem[] = [
  { name: "Veggie Burger", description: "Medallón de legumbres y vegetales grillados." },
  { name: "Brochetas de verduras de estación", description: "A las brasas, con aceite de hierbas." },
  { name: "Empanaditas de verdura y queso", description: "Masa casera al horno." },
  { name: "Nachos con guacamole", description: "100% vegano, palta fresca y lima." },
];
