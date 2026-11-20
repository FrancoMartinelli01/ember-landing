import { useEffect, useState } from "react";
import { useEnVista, useMenosMovimiento } from "@/hooks/use-scroll";

/** Palabra que cambia letra por letra, girando (inspirada en STANZA de thepromptsfactory). */
const PalabrasQueGiran = ({ palabras, cada = 2600, className }: { palabras: string[]; cada?: number; className?: string }) => {
  const menos = useMenosMovimiento();
  const [ref, visto] = useEnVista<HTMLSpanElement>(0.5);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!visto || menos) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % palabras.length);
    }, cada);
    return () => window.clearInterval(t);
  }, [visto, menos, cada, palabras.length]);

  const palabra = palabras[i];
  const mas = palabras.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span ref={ref} className={`relative inline-grid align-bottom ${className ?? ""}`}>
      {/* reserva el ancho de la más larga para que la línea no salte */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">{mas}</span>
      <span aria-live="polite" className="sr-only">{palabra}</span>
      <span key={palabra} aria-hidden className="col-start-1 row-start-1 whitespace-nowrap text-left [perspective:600px]">
        {[...palabra].map((l, k) => (
          <span key={k} className="giro-letra inline-block" style={{ animationDelay: `${k * 35}ms` }}>
            {l === " " ? " " : l}
          </span>
        ))}
      </span>
    </span>
  );
};

export default PalabrasQueGiran;
