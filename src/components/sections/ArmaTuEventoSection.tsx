import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Flame, Minus, Plus, RotateCcw, Users } from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { fingerFoods, postresGroups, veggieItems } from "@/data/menuData";
import {
  PRINCIPALES,
  TIPOS_EVENTO,
  actualizarEvento,
  alternarItem,
  idItem,
  linkWhatsApp,
  mensajeWhatsApp,
  reiniciarEvento,
  useEvento,
  type Categoria,
  type Evento,
} from "@/lib/evento";

const PASOS = ["Tu evento", "El menú", "Tus datos"];

const hoy = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const campo =
  "mt-2 w-full rounded-md border border-ember-orange/30 bg-[#161616] px-4 py-3 font-body text-foreground placeholder:text-text-muted/60 outline-none transition-all focus:border-ember-orange/70 focus:shadow-[0_0_0_3px_rgba(200,90,30,0.18),0_0_18px_rgba(200,90,30,0.25)]";
const etiqueta = "font-body text-sm text-[#F0E4D4]";

const Chip = ({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={activo}
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-body text-sm transition-all active:scale-95",
      activo
        ? "border-ember-warm bg-ember-orange/20 text-foreground shadow-[0_0_14px_rgba(232,119,58,0.3)]"
        : "border-border-subtle text-text-muted hover:border-ember-warm/50 hover:text-foreground"
    )}
  >
    {activo && <Check className="h-3.5 w-3.5 text-ember-warm" />}
    {children}
  </button>
);

const Contador = ({
  valor,
  min,
  max,
  onChange,
  etiquetaAria,
}: {
  valor: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  etiquetaAria: string;
}) => (
  <div className="mt-2 inline-flex items-center rounded-md border border-ember-orange/30 bg-[#161616]">
    <button
      type="button"
      aria-label={`Restar ${etiquetaAria}`}
      onClick={() => onChange(Math.max(min, valor - 1))}
      className="p-3 text-text-muted hover:text-foreground disabled:opacity-30"
      disabled={valor <= min}
    >
      <Minus className="h-4 w-4" />
    </button>
    <input
      type="number"
      inputMode="numeric"
      aria-label={etiquetaAria}
      value={valor}
      min={min}
      max={max}
      onChange={(e) => {
        const n = Number(e.target.value);
        if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, Math.round(n))));
      }}
      className="w-16 bg-transparent text-center font-display text-xl text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
    />
    <button
      type="button"
      aria-label={`Sumar ${etiquetaAria}`}
      onClick={() => onChange(Math.min(max, valor + 1))}
      className="p-3 text-text-muted hover:text-foreground disabled:opacity-30"
      disabled={valor >= max}
    >
      <Plus className="h-4 w-4" />
    </button>
  </div>
);

/** El ticket de la derecha: se va llenando a medida que se arma el evento. */
const Comanda = ({ evento }: { evento: Evento }) => {
  const principal = PRINCIPALES.find((p) => p.id === evento.principal);
  const grupos: { c: Categoria; t: string }[] = [
    { c: "finger", t: "Finger foods" },
    { c: "veggie", t: "Veggie" },
    { c: "postre", t: "Postres" },
  ];
  const vacio = !principal && evento.items.length === 0;
  return (
    <div className="comanda relative overflow-hidden rounded-md bg-[#efe4d2] px-6 pb-8 pt-6 font-body text-[#2a1a12] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(196,75,27,0.15)]">
      <div className="flex items-center justify-between border-b border-dashed border-[#2a1a12]/30 pb-3">
        <span className="font-display text-lg font-black tracking-wide">COMANDA</span>
        <span className="text-xs uppercase tracking-[0.2em] text-[#2a1a12]/60">Fuego Nómade</span>
      </div>
      <dl className="mt-4 space-y-1.5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-[#2a1a12]/60">Evento</dt>
          <dd className="text-right font-medium">{evento.tipo || "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[#2a1a12]/60">Personas</dt>
          <dd className="text-right font-medium">
            {evento.personas}
            {evento.vegetarianos > 0 && ` · ${evento.vegetarianos} veggie`}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[#2a1a12]/60">Fecha</dt>
          <dd className="text-right font-medium">
            {evento.fecha ? evento.fecha.split("-").reverse().join("/") : "—"}
          </dd>
        </div>
        {evento.zona && (
          <div className="flex justify-between gap-4">
            <dt className="text-[#2a1a12]/60">Lugar</dt>
            <dd className="text-right font-medium">{evento.zona}</dd>
          </div>
        )}
      </dl>

      <div className="mt-5 border-t border-dashed border-[#2a1a12]/30 pt-4">
        {vacio ? (
          <p className="py-4 text-center text-sm italic text-[#2a1a12]/50">
            Todavía no elegiste nada del menú.
          </p>
        ) : (
          <div className="space-y-4 text-sm">
            {principal && (
              <div className="comanda-linea">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#8b2035]">Principal</p>
                <p className="mt-1 font-display text-lg font-bold leading-tight">{principal.nombre}</p>
              </div>
            )}
            {grupos.map(({ c, t }) => {
              const lista = evento.items.filter((i) => i.categoria === c);
              if (!lista.length) return null;
              return (
                <div key={c}>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#8b2035]">{t}</p>
                  <ul className="mt-1 space-y-0.5">
                    {lista.map((i) => (
                      <li key={i.id} className="comanda-linea flex gap-2">
                        <span className="text-[#c44b1b]">×</span>
                        {i.nombre}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const ArmaTuEventoSection = () => {
  const evento = useEvento();
  const [paso, setPaso] = useState(0);
  const [errores, setErrores] = useState<Record<string, string>>({});

  const set = (c: Partial<Evento>) => {
    actualizarEvento(c);
    const k = Object.keys(c)[0];
    if (errores[k]) setErrores((e) => ({ ...e, [k]: "" }));
  };

  const validarPaso = (p: number) => {
    const e: Record<string, string> = {};
    if (p === 0) {
      if (!evento.tipo) e.tipo = "Elegí qué tipo de evento es";
      if (!evento.fecha) e.fecha = "Elegí una fecha tentativa";
    }
    if (p === 2) {
      if (evento.nombre.trim().length < 2) e.nombre = "Contanos tu nombre";
      if (evento.telefono.replace(/\D/g, "").length < 8) e.telefono = "Dejanos un teléfono válido";
    }
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const ir = (p: number) => {
    if (p > paso) {
      for (let i = paso; i < p; i++) {
        if (!validarPaso(i)) {
          setPaso(i);
          return;
        }
      }
    }
    setPaso(p);
    document.getElementById("armar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const enviar = () => {
    if (!validarPaso(0)) return setPaso(0);
    if (!validarPaso(2)) return;
    window.open(linkWhatsApp(mensajeWhatsApp(evento)), "_blank", "noopener,noreferrer");
    toast.success("Te abrimos WhatsApp con tu evento armado. ¡Solo tocá enviar!");
  };

  const toggle = (categoria: Exclude<Categoria, "principal">, nombre: string) =>
    alternarItem({ id: idItem(categoria, nombre), nombre, categoria });
  const elegido = (categoria: Categoria, nombre: string) =>
    evento.items.some((i) => i.id === idItem(categoria, nombre));

  const err = (k: string) =>
    errores[k] ? <p className="mt-1.5 font-body text-xs text-[#ff8a7a]">{errores[k]}</p> : null;

  return (
    <section id="armar" className="relative z-10 scroll-mt-16 bg-bg-secondary py-24 md:py-32">
      <div className="container">
        <div className="section-divider" aria-hidden>
          <Flame className="h-5 w-5 text-ember-orange" />
        </div>
        <div className="mb-12 text-center">
          <p className="font-display italic text-text-muted">Presupuesto a medida</p>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-foreground md:text-5xl">
            Armá tu evento
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-text-muted">
            En tres pasos nos contás qué tenés en mente y te llega todo armado a WhatsApp. Sin compromiso.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div className="rounded-md border border-border-subtle bg-bg-surface p-6 md:p-10">
            {/* Pasos */}
            <ol className="mb-10 grid grid-cols-3 gap-2" aria-label="Pasos">
              {PASOS.map((p, i) => (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => ir(i)}
                    aria-current={paso === i ? "step" : undefined}
                    className="group w-full text-left"
                  >
                    <span className="block h-1 overflow-hidden rounded-full bg-border-subtle">
                      <span
                        className="block h-full origin-left rounded-full bg-gradient-to-r from-primary to-ember-warm transition-transform duration-500"
                        style={{ transform: `scaleX(${i <= paso ? 1 : 0})` }}
                      />
                    </span>
                    <span
                      className={cn(
                        "mt-3 block font-body text-xs uppercase tracking-[0.18em] transition-colors",
                        i === paso ? "text-foreground" : "text-text-muted group-hover:text-foreground"
                      )}
                    >
                      <span className="text-ember-warm">0{i + 1}</span> {p}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div key={paso} className="paso-entrada">
              {paso === 0 && (
                <div className="space-y-8">
                  <div>
                    <p className={etiqueta}>¿Qué festejan?</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {TIPOS_EVENTO.map((t) => (
                        <Chip key={t} activo={evento.tipo === t} onClick={() => set({ tipo: t })}>
                          {t}
                        </Chip>
                      ))}
                    </div>
                    {err("tipo")}
                  </div>

                  <div>
                    <div className="flex items-end justify-between">
                      <p className={etiqueta}>¿Cuántas personas?</p>
                      <p className="font-display text-4xl font-black text-foreground">
                        {evento.personas}
                        {evento.personas >= 300 && "+"}
                        <Users className="ml-2 inline h-5 w-5 align-baseline text-ember-warm" />
                      </p>
                    </div>
                    <Slider
                      className="mt-4"
                      min={10}
                      max={300}
                      step={5}
                      value={[evento.personas]}
                      onValueChange={([v]) =>
                        set({ personas: v, vegetarianos: Math.min(evento.vegetarianos, v) })
                      }
                      aria-label="Cantidad de personas"
                    />
                    <div className="mt-2 flex justify-between font-body text-xs text-text-muted">
                      <span>10</span>
                      <span>Juntada</span>
                      <span>Fiesta</span>
                      <span>300+</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="fecha" className={etiqueta}>
                        Fecha tentativa
                      </label>
                      <input
                        id="fecha"
                        type="date"
                        min={hoy()}
                        value={evento.fecha}
                        onChange={(e) => set({ fecha: e.target.value })}
                        className={cn(campo, "[color-scheme:dark]")}
                        aria-invalid={!!errores.fecha}
                      />
                      {err("fecha")}
                    </div>
                    <div>
                      <label htmlFor="zona" className={etiqueta}>
                        ¿Dónde es? <span className="text-text-muted">(barrio o localidad)</span>
                      </label>
                      <input
                        id="zona"
                        value={evento.zona}
                        maxLength={80}
                        onChange={(e) => set({ zona: e.target.value })}
                        placeholder="Ej: Pilar, Nordelta, Palermo"
                        className={campo}
                      />
                    </div>
                  </div>

                  <div>
                    <p className={etiqueta}>¿Cuántos son vegetarianos o veganos?</p>
                    <Contador
                      valor={evento.vegetarianos}
                      min={0}
                      max={evento.personas}
                      onChange={(v) => set({ vegetarianos: v })}
                      etiquetaAria="personas vegetarianas"
                    />
                  </div>
                </div>
              )}

              {paso === 1 && (
                <div className="space-y-9">
                  <div>
                    <p className={etiqueta}>Elegí el principal</p>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {PRINCIPALES.map((p) => {
                        const activo = evento.principal === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => set({ principal: activo ? null : p.id })}
                            aria-pressed={activo}
                            className={cn(
                              "relative rounded-md border p-4 text-left transition-all",
                              activo
                                ? "border-ember-warm bg-ember-orange/10 shadow-[0_0_24px_rgba(232,119,58,0.25)]"
                                : "border-border-subtle hover:border-ember-warm/50"
                            )}
                          >
                            {p.badge && (
                              <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 font-body text-[10px] tracking-wider text-primary-foreground">
                                {p.badge}
                              </span>
                            )}
                            <span className="block pr-20 font-display text-lg text-foreground">{p.nombre}</span>
                            <span className="mt-1 block font-body text-sm text-text-muted">{p.detalle}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className={etiqueta}>Finger foods para la recepción</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {fingerFoods.map((f) => (
                        <Chip key={f.name} activo={elegido("finger", f.name)} onClick={() => toggle("finger", f.name)}>
                          {f.name}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {evento.vegetarianos > 0 && (
                    <div>
                      <p className={etiqueta}>Para los {evento.vegetarianos} veggie</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {veggieItems.map((f) => (
                          <Chip key={f.name} activo={elegido("veggie", f.name)} onClick={() => toggle("veggie", f.name)}>
                            {f.name}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className={etiqueta}>Postres</p>
                    <div className="mt-3 space-y-4">
                      {postresGroups.map((g) => {
                        const etiquetaGrupo = g.label.replace(/ \(.*\)/, "");
                        return (
                          <div key={g.label}>
                            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-text-muted">
                              {g.label}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {g.items.map((it) => {
                                const nombre = `${it.name} · ${etiquetaGrupo}`;
                                return (
                                  <Chip
                                    key={nombre}
                                    activo={elegido("postre", nombre)}
                                    onClick={() => toggle("postre", nombre)}
                                  >
                                    {it.name}
                                  </Chip>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {paso === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="nombre" className={etiqueta}>
                        Tu nombre
                      </label>
                      <input
                        id="nombre"
                        autoComplete="name"
                        maxLength={80}
                        value={evento.nombre}
                        onChange={(e) => set({ nombre: e.target.value })}
                        className={campo}
                        aria-invalid={!!errores.nombre}
                      />
                      {err("nombre")}
                    </div>
                    <div>
                      <label htmlFor="telefono" className={etiqueta}>
                        Teléfono / WhatsApp
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        autoComplete="tel"
                        maxLength={30}
                        value={evento.telefono}
                        onChange={(e) => set({ telefono: e.target.value })}
                        className={campo}
                        aria-invalid={!!errores.telefono}
                      />
                      {err("telefono")}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="mensaje" className={etiqueta}>
                      ¿Algo más que tengamos que saber? <span className="text-text-muted">(opcional)</span>
                    </label>
                    <textarea
                      id="mensaje"
                      rows={4}
                      maxLength={800}
                      value={evento.mensaje}
                      onChange={(e) => set({ mensaje: e.target.value })}
                      placeholder="Horario, si hay parrilla en el lugar, alguna alergia…"
                      className={campo}
                    />
                  </div>
                  <p className="font-body text-sm text-text-muted">
                    Al enviar se abre WhatsApp con todo el evento ya escrito. Solo tenés que tocar enviar y te
                    respondemos con el presupuesto.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10 flex items-center justify-between gap-4 border-t border-border-subtle pt-6">
              {paso > 0 ? (
                <button
                  type="button"
                  onClick={() => ir(paso - 1)}
                  className="inline-flex items-center gap-1 font-body text-sm text-text-muted hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" /> Atrás
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    reiniciarEvento();
                    setErrores({});
                  }}
                  className="inline-flex items-center gap-1.5 font-body text-sm text-text-muted hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Empezar de cero
                </button>
              )}
              {paso < 2 ? (
                <button
                  type="button"
                  onClick={() => ir(paso + 1)}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-display text-lg tracking-wide text-primary-foreground transition-all ember-glow hover:bg-primary-hover"
                >
                  Siguiente <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={enviar}
                  className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 font-display text-lg tracking-wide text-[#0a0a0a] transition-all hover:shadow-[0_0_25px_rgba(37,211,102,0.5)]"
                >
                  Enviar por WhatsApp 🔥
                </button>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Resumen de tu evento">
            <Comanda evento={evento} />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ArmaTuEventoSection;
