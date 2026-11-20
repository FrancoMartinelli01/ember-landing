import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { actualizarEvento, alternarItem, idItem, useEvento, type Categoria } from "@/lib/evento";

type Props =
  | { tipo: "item"; categoria: Exclude<Categoria, "principal">; nombre: string; className?: string }
  | { tipo: "principal"; principalId: string; nombre: string; className?: string };

const SumarBoton = (props: Props) => {
  const evento = useEvento();
  const elegido =
    props.tipo === "principal"
      ? evento.principal === props.principalId
      : evento.items.some((i) => i.id === idItem(props.categoria, props.nombre));

  const onClick = () => {
    if (props.tipo === "principal") {
      const nuevo = elegido ? null : props.principalId;
      actualizarEvento({ principal: nuevo });
      if (nuevo) toast.success(`${props.nombre} es el principal de tu evento`);
      return;
    }
    const agregado = alternarItem({
      id: idItem(props.categoria, props.nombre),
      nombre: props.nombre,
      categoria: props.categoria,
    });
    if (agregado) toast.success(`Sumaste ${props.nombre} a tu evento`);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={elegido}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-body text-xs tracking-wide transition-all active:scale-95",
        elegido
          ? "border-ember-warm bg-ember-orange/20 text-foreground shadow-[0_0_14px_rgba(232,119,58,0.35)]"
          : "border-border-subtle text-text-muted hover:border-ember-warm/60 hover:text-foreground",
        props.className
      )}
    >
      {elegido ? <Check className="h-3.5 w-3.5 text-ember-warm" /> : <Plus className="h-3.5 w-3.5" />}
      {elegido ? (props.tipo === "principal" ? "Es tu principal" : "En tu evento") : props.tipo === "principal" ? "Elegir como principal" : "Sumar a mi evento"}
    </button>
  );
};

export default SumarBoton;
