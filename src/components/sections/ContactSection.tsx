import { useState, FormEvent } from "react";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Flame } from "lucide-react";

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresá tu nombre").max(100),
  telefono: z.string().trim().min(6, "Teléfono inválido").max(30),
  evento: z.string().min(1, "Elegí un tipo de evento"),
  personas: z.string().min(1, "Indicá la cantidad").refine((v) => Number(v) > 0, "Cantidad inválida"),
  fecha: z.string().min(1, "Elegí una fecha"),
  mensaje: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormState = {
  nombre: string;
  telefono: string;
  evento: string;
  personas: string;
  fecha: string;
  mensaje: string;
};

const initial: FormState = {
  nombre: "",
  telefono: "",
  evento: "",
  personas: "",
  fecha: "",
  mensaje: "",
};

const inputClass =
  "mt-2 text-foreground transition-all focus-visible:ring-0 focus-visible:ring-offset-0 fn-input";
const labelClass = "font-body text-[#F0E4D4]";

const ContactSection = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = <K extends keyof FormState>(k: K, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormState;
        fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Revisá los campos marcados.");
      return;
    }
    setErrors({});
    toast.success("¡Gracias! Te respondemos a la brevedad por WhatsApp.");
    setForm(initial);
  };

  const errorClass = "text-xs text-destructive mt-1 font-body";

  return (
    <section id="contacto" className="relative z-10 py-24 md:py-32 bg-bg-secondary">
      {/* Scoped styles for warm input contrast */}
      <style>{`
        .fn-input,
        .fn-input > [data-radix-select-trigger],
        .fn-input[role="combobox"] {
          background-color: #161616 !important;
          border: 1px solid rgba(180, 80, 30, 0.3) !important;
        }
        .fn-input:focus,
        .fn-input:focus-visible,
        .fn-input[data-state="open"] {
          border-color: rgba(200, 90, 30, 0.7) !important;
          box-shadow: 0 0 0 3px rgba(200, 90, 30, 0.18), 0 0 18px rgba(200, 90, 30, 0.25) !important;
          outline: none !important;
        }
        .fn-submit:hover {
          box-shadow: 0 0 25px rgba(107, 26, 42, 0.7), 0 0 50px rgba(107, 26, 42, 0.35) !important;
        }
      `}</style>

      <div className="container max-w-3xl">
        <div className="section-divider" aria-hidden>
          <Flame className="h-5 w-5 text-ember-orange" />
        </div>
        <div className="text-center mb-10">
          <p className="font-display italic text-text-muted">Contacto</p>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-foreground mt-2">
            Pedí tu presupuesto personalizado
          </h2>
        </div>

        <Card className="bg-bg-surface border-border-subtle p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <Label htmlFor="nombre" className={labelClass}>Nombre completo</Label>
              <Input
                id="nombre"
                value={form.nombre}
                onChange={(e) => set("nombre", e.target.value)}
                className={inputClass}
                aria-invalid={!!errors.nombre}
              />
              {errors.nombre && <p className={errorClass}>{errors.nombre}</p>}
            </div>

            <div>
              <Label htmlFor="telefono" className={labelClass}>Teléfono / WhatsApp</Label>
              <Input
                id="telefono"
                type="tel"
                value={form.telefono}
                onChange={(e) => set("telefono", e.target.value)}
                className={inputClass}
                aria-invalid={!!errors.telefono}
              />
              {errors.telefono && <p className={errorClass}>{errors.telefono}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="evento" className={labelClass}>Tipo de evento</Label>
                <Select value={form.evento} onValueChange={(v) => set("evento", v)}>
                  <SelectTrigger
                    id="evento"
                    className={inputClass}
                    aria-invalid={!!errors.evento}
                  >
                    <SelectValue placeholder="Elegí una opción" />
                  </SelectTrigger>
                  <SelectContent className="bg-bg-secondary border-border-subtle">
                    <SelectItem value="asado-privado">Asado privado</SelectItem>
                    <SelectItem value="corporativo">Corporativo</SelectItem>
                    <SelectItem value="casamiento">Casamiento</SelectItem>
                    <SelectItem value="cumpleanos">Cumpleaños</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                {errors.evento && <p className={errorClass}>{errors.evento}</p>}
              </div>

              <div>
                <Label htmlFor="personas" className={labelClass}>Cantidad de personas</Label>
                <Input
                  id="personas"
                  type="number"
                  min={1}
                  value={form.personas}
                  onChange={(e) => set("personas", e.target.value)}
                  className={inputClass}
                  aria-invalid={!!errors.personas}
                />
                {errors.personas && <p className={errorClass}>{errors.personas}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="fecha" className={labelClass}>Fecha tentativa</Label>
              <Input
                id="fecha"
                type="date"
                value={form.fecha}
                onChange={(e) => set("fecha", e.target.value)}
                className={inputClass}
                aria-invalid={!!errors.fecha}
              />
              {errors.fecha && <p className={errorClass}>{errors.fecha}</p>}
            </div>

            <div>
              <Label htmlFor="mensaje" className={labelClass}>Mensaje adicional</Label>
              <Textarea
                id="mensaje"
                rows={4}
                value={form.mensaje}
                onChange={(e) => set("mensaje", e.target.value)}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="fn-submit w-full mt-2 px-6 py-4 rounded-md bg-primary hover:bg-primary-hover text-primary-foreground font-display text-lg tracking-wide transition-all ember-glow"
            >
              Enviar consulta 🔥
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
