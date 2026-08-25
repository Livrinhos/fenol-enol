import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { loadProfiles, loadSelectedId, type Profile } from "@/lib/profiles";

const NAV = [
  { label: "Início", to: "/capa" },
  { label: "Conteúdo", to: "/conteudo" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const profiles = loadProfiles();
    const id = loadSelectedId();
    setProfile(profiles.find((p) => p.id === id) ?? profiles[0] ?? null);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 motion-reduce:transition-none ${
        scrolled || open
          ? "border-b border-border bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--color-ink)_62%,transparent),transparent)]"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto grid w-full max-w-[110rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:py-5">
        <Link
          to="/capa"
          className="min-w-0 font-display text-[0.8rem] tracking-[0.4em] text-foreground uppercase sm:text-sm"
        >
          Química <span className="text-crimson">Orgânica</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center justify-center gap-9">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="border-b border-transparent pb-1 text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
                  activeProps={{ className: "text-foreground border-crimson" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label={`Perfil ativo: ${profile?.name ?? "selecionar"}`}
          >
            {profile && (
              <img
                src={profile.image}
                alt=""
                width={32}
                height={32}
                className="size-7 shrink-0 object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
              />
            )}
            <span className="hidden text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase transition-colors duration-300 group-hover:text-foreground xl:inline">
              Perfil
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="p-1 text-foreground lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navegação móvel"
          className="border-t border-border bg-ink/97 px-5 pb-8 pt-4 sm:px-8 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-border/60 last:border-0">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-xs tracking-[0.3em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}