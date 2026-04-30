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

const POSTRES_BASE = "https://raw.githubusercontent.com/FrancoMartinelli01/ember-landing/main/public/";

export type PostresGroup = {
  label: string;
  badge?: string;
  items: MenuItem[];
};

export const postresGroups: PostresGroup[] = [
  {
    label: "Postres en Vasito (360cc)",
    items: [
      { name: "Tiramisú", description: "Capas de bizcochuelo, crema de mascarpone y cacao. Un clásico italiano irresistible.", image: `${POSTRES_BASE}postre-tiramisu.jpeg` },
      { name: "Mousse de Chocolate", description: "Mousse artesanal de chocolate intenso con frutilla fresca.", image: `${POSTRES_BASE}postre-mousse-chocolate.jpeg` },
      { name: "Mousse de Frutilla", description: "Mousse cremosa de frutilla con coulis de frutos rojos.", image: `${POSTRES_BASE}postre-mousse-frutilla.jpeg` },
      { name: "Chocotorta / Chocooreo", description: "El clásico argentino en versión gourmet. Capas de chocolate y dulce de leche.", image: `${POSTRES_BASE}postre-chocotorta.jpeg` },
      { name: "Carrot Cake", description: "Bizcocho de zanahoria, flan y frosting de queso crema sobre masa sablée de nuez.", image: `${POSTRES_BASE}postre-carrot-cake.jpeg` },
      { name: "Tres Leches", description: "Bizcochuelo esponjoso bañado en tres tipos de leche con crema chantilly.", image: `${POSTRES_BASE}postre-mousse-frutilla.jpeg` },
    ],
  },
  {
    label: "Shots Individuales",
    items: [
      { name: "Lemon Pie", description: "Crema de limón suave con merengue italiano en vasito.", image: `${POSTRES_BASE}shot-lemon-pie.jpeg` },
      { name: "Brownie con Dulce de Leche y Crema", description: "Trozos de brownie húmedo con dulce de leche y crema batida.", image: `${POSTRES_BASE}shot-brownie-dulce.jpeg` },
      { name: "Oreo", description: "Crema suave con base de Oreo triturada y toppings crocantes.", image: `${POSTRES_BASE}shot-oreo.jpeg` },
      { name: "Mousse de Chocolate", description: "Shot de mousse de chocolate intenso, listo para disfrutar.", image: `${POSTRES_BASE}postre-mousse-chocolate.jpeg` },
      { name: "Tiramisú", description: "Versión individual del clásico tiramisú con cacao en polvo.", image: `${POSTRES_BASE}shot-tiramisu.jpeg` },
    ],
  },
  {
    label: "Brownies",
    items: [
      { name: "Brownie Cuadrado", description: "Brownie artesanal de chocolate intenso, húmedo por dentro y crocante por fuera. Por unidad o en caja.", image: `${POSTRES_BASE}brownie-cuadrado.jpeg` },
      { name: "Brownie en Pote", description: "Brownie caliente en pote individual. Se sirve con helado al momento. Una experiencia única.", image: `${POSTRES_BASE}shot-brownie-dulce.jpeg` },
    ],
  },
  {
    label: "Petit Fours (Caja x30)",
    badge: "CAJA x 30 UNIDADES",
    items: [
      { name: "Alfajores Artesanales", description: "Alfajores de chocolate, dulce de leche y pistacho. Masa suave, relleno generoso.", image: `${POSTRES_BASE}petitfour-alfajores.jpeg` },
      { name: "Cookies Artesanales", description: "Cookies en distintas variedades: chocolate, clásica con drizzle y más.", image: `${POSTRES_BASE}petitfour-cookies.jpeg` },
      { name: "Surtido Dulce", description: "Mix de cuadrados dulces, petit fours y bocados artesanales de temporada.", image: `${POSTRES_BASE}petitfour-surtido.jpeg` },
    ],
  },
];
