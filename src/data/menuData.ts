export type MenuItem = { name: string; description?: string; image?: string };

export const fingerFoods: MenuItem[] = [
  { name: "Brusquetas al horno", description: "Con toppings de la estación.", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80" },
  { name: "Bocconcinos marinados", description: "Mozzarella tierna con hierbas frescas.", image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&q=80" },
  { name: "Empanaditas salteñas fritas", description: "Carne, queso y verdura, masa crocante.", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&q=80" },
  { name: "Nachos caseros", description: "Con guacamole y pico de gallo.", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&q=80" },
  { name: "Pinchos de pollo grillados", description: "Marinados y servidos con chimichurri.", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" },
  { name: "Tortilla española al horno", description: "Papa, huevo y cebolla, textura cremosa.", image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&q=80" },
  { name: "Sandwichitos premium", description: "Miga, jamón crudo y queso brie.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80" },
];

export type ModalidadCard = {
  title: string;
  badge?: string;
  items: string[];
  image?: string;
};

export const principales: ModalidadCard[] = [
  {
    title: "Asado al Sándwich",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    items: [
      "Provoletas a las brasas con orégano",
      "Mollejas crocantes al limón",
      "Entrañitas jugosas con chimichurri",
    ],
  },
  {
    title: "Asado Gourmet al Plato",
    badge: "👑 Premium Plus",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
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

export const burgerImage = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80";

export const veggieItems: MenuItem[] = [
  { name: "Veggie Burger", description: "Medallón de legumbres y vegetales grillados.", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&q=80" },
  { name: "Brochetas de verduras de estación", description: "A las brasas, con aceite de hierbas.", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80" },
  { name: "Empanaditas de verdura y queso", description: "Masa casera al horno.", image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=600&q=80" },
  { name: "Nachos con guacamole", description: "100% vegano, palta fresca y lima.", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=600&q=80" },
];
