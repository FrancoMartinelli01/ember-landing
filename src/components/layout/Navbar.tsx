import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "#propuesta", label: "Propuesta" },
  { href: "#menu", label: "Menú" },
  { href: "#servicio", label: "Servicio" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#galeria", label: "Galería" },
  { href: "#fogonero", label: "El Fogonero" },
  { href: "#contacto", label: "Contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-bg-secondary/95 backdrop-blur border-b border-border-subtle"
          : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20" aria-label="Principal">
        <a href="#top" className="flex items-center group" aria-label="Ir al inicio">
          <img
            src="/fuego-nomade-logo.png"
            alt="Fuego Nómade"
            className="h-12 w-auto"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-body text-sm text-text-muted hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="p-2 text-foreground"
              aria-label="Abrir menú"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-bg-secondary border-l border-border-subtle">
              <SheetTitle className="font-display tracking-widest text-foreground">FUEGO NÓMADE</SheetTitle>
              <ul className="mt-8 flex flex-col gap-6">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-2xl text-foreground hover:text-ember-warm transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
