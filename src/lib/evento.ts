import { useSyncExternalStore } from "react";

export const WHATSAPP_NUMBER = "5491169092108";

export type Categoria = "principal" | "finger" | "postre" | "veggie";

export type ItemEvento = { id: string; nombre: string; categoria: Categoria };

export type Evento = {
  tipo: string;
  personas: number;
  vegetarianos: number;
  fecha: string;
  zona: string;
  principal: string | null;
  items: ItemEvento[];
  nombre: string;
  telefono: string;
  mensaje: string;
};

export const TIPOS_EVENTO = [
  "Cumpleaños",
  "Casamiento",
  "Corporativo",
  "Juntada de amigos",
  "Reunión familiar",
  "Otro",
];

export const PRINCIPALES = [
  { id: "sandwich", nombre: "Asado al Sándwich", detalle: "Choripán, colita de cuadril y bondiola al pan" },
  { id: "pinche", nombre: "Asado Gourmet al Pinche", detalle: "Provoletas, mollejas y entrañitas", badge: "Premium" },
  { id: "plato", nombre: "Asado Gourmet al Plato", detalle: "Lomo a la parrilla con guarniciones", badge: "Premium Plus" },
  { id: "burgers", nombre: "Hamburguesas al Fuego", detalle: "Pan de papa, novillo, cheddar y cebolla" },
];

const KEY = "fuego-nomade-evento";

const inicial: Evento = {
  tipo: "",
  personas: 30,
  vegetarianos: 0,
  fecha: "",
  zona: "",
  principal: null,
  items: [],
  nombre: "",
  telefono: "",
  mensaje: "",
};

const leer = (): Evento => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...inicial, ...JSON.parse(raw) };
  } catch {
    /* sin storage */
  }
  return inicial;
};

let estado: Evento = typeof window === "undefined" ? inicial : leer();
const oyentes = new Set<() => void>();

const guardar = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(estado));
  } catch {
    /* sin storage */
  }
};

export const actualizarEvento = (cambios: Partial<Evento>) => {
  estado = { ...estado, ...cambios };
  guardar();
  oyentes.forEach((o) => o());
};

export const idItem = (categoria: Categoria, nombre: string) =>
  `${categoria}:${nombre}`.toLowerCase();

export const alternarItem = (item: ItemEvento) => {
  const esta = estado.items.some((i) => i.id === item.id);
  actualizarEvento({
    items: esta ? estado.items.filter((i) => i.id !== item.id) : [...estado.items, item],
  });
  return !esta;
};

export const reiniciarEvento = () => {
  estado = { ...inicial };
  guardar();
  oyentes.forEach((o) => o());
};

const suscribir = (o: () => void) => {
  oyentes.add(o);
  return () => oyentes.delete(o);
};

export const useEvento = () => useSyncExternalStore(suscribir, () => estado, () => inicial);

export const cantidadElegida = (e: Evento) => e.items.length + (e.principal ? 1 : 0);

const fechaLinda = (iso: string) => {
  if (!iso) return "";
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

export const mensajeWhatsApp = (e: Evento) => {
  const lineas: string[] = ["¡Hola Fuego Nómade! 🔥 Quiero armar un evento:", ""];
  if (e.tipo) lineas.push(`• Evento: ${e.tipo}`);
  lineas.push(`• Personas: ${e.personas}${e.vegetarianos ? ` (${e.vegetarianos} ${e.vegetarianos === 1 ? "vegetariana" : "vegetarianas"})` : ""}`);
  if (e.fecha) lineas.push(`• Fecha: ${fechaLinda(e.fecha)}`);
  if (e.zona) lineas.push(`• Lugar: ${e.zona}`);
  const principal = PRINCIPALES.find((p) => p.id === e.principal);
  if (principal) lineas.push("", `Principal: ${principal.nombre}`);
  const grupo = (c: Categoria, titulo: string) => {
    const lista = e.items.filter((i) => i.categoria === c);
    if (lista.length) lineas.push("", `${titulo}:`, ...lista.map((i) => `- ${i.nombre}`));
  };
  grupo("finger", "Finger foods");
  grupo("veggie", "Opciones veggie");
  grupo("postre", "Postres");
  if (e.mensaje.trim()) lineas.push("", e.mensaje.trim());
  lineas.push("", `Soy ${e.nombre.trim()}${e.telefono.trim() ? `, mi número es ${e.telefono.trim()}` : ""}.`);
  return lineas.join("\n");
};

export const linkWhatsApp = (texto: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
