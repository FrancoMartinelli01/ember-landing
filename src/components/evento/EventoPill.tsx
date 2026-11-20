import { useEffect, useRef, useState } from "react";
import { Flame } from "lucide-react";
import { cantidadElegida, useEvento } from "@/lib/evento";
import { cn } from "@/lib/utils";

/** Píldora flotante que muestra cuánto lleva armado el evento y lleva al armador. */
const EventoPill = () => {
  const evento = useEvento();
  const n = cantidadElegida(evento);
  const [latido, setLatido] = useState(false);
  const [enArmador, setEnArmador] = useState(false);
  const prev = useRef(n);

  useEffect(() => {
    if (n > prev.current) {
      setLatido(true);
      const t = setTimeout(() => setLatido(false), 600);
      prev.current = n;
      return () => clearTimeout(t);
    }
    prev.current = n;
  }, [n]);

  useEffect(() => {
    const el = document.getElementById("armar");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setEnArmador(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const visible = n > 0 && !enArmador;

  return (
    <a
      href="#armar"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-ember-orange/50 bg-bg-secondary/95 py-2.5 pl-3 pr-5 font-body text-sm text-foreground shadow-[0_0_30px_rgba(196,75,27,0.35)] backdrop-blur transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
        latido && "scale-110"
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
        <Flame className="h-4 w-4 text-ember-warm" />
      </span>
      <span>
        Tu evento · <strong className="font-semibold">{n}</strong> {n === 1 ? "elegido" : "elegidos"}
      </span>
      <span className="text-ember-warm">Ver →</span>
    </a>
  );
};

export default EventoPill;
