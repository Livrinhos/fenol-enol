import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { loadProfiles, loadSelectedId, type Profile } from "@/lib/profiles";

const NAV = [
  { label: "Início", to: "/home", hash: undefined },
  { label: "Conteúdo", to: "/conteudo", hash: undefined },
  { label: "Fenol", to: "/conteudo", hash: "fenol" },
  { label: "Enol", to: "/conteudo", hash: "enol" },
  { label: "Aplicações", to: "/conteudo", hash: "aplicacoes" },
  { label: "Fontes", to: "/conteudo", hash: "fontes" },
] as const;

export function ChemHeader() {
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 motion-reduce:transition-none ${
        scrolled || open ? "border-b border-border bg-ink/92 backdrop-blur-md" : "border-b border-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex w-full max-w-[110rem] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:py-5">
        <Link to="/home" className="min-w-0 font-display text-[0.72rem] tracking-[0.34em] uppercase sm:text-sm">
          Química <span className="text-cyan">Orgânica</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  hash={item.hash}
                  className="border-b border-transparent pb-1 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase transition-colors duration-300 hover:text-foreground motion-reduce:transition-none"
                  activeProps={{ className: "text-foreground border-cyan" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label={`Perfil ativo: ${profile?.name ?? "selecionar"}`}
          >
            {profile && (
              <img
                src={profile.image}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                className="size-7 shrink-0 rounded-sm object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
            <span className="hidden text-[0.58rem] tracking-[0.28em] text-muted-foreground uppercase group-hover:text-foreground xl:inline">
              {profile?.name ?? "Perfil"}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="chem-mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="p-1 text-foreground lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="chem-mobile-nav"
          aria-label="Navegação móvel"
          className="border-t border-border bg-ink/97 px-5 pb-8 pt-2 sm:px-8 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-border/60 last:border-0">
                <Link
                  to={item.to}
                  hash={item.hash}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-xs tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-foreground"
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
