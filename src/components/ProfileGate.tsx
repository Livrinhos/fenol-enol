import { useNavigate } from "@tanstack/react-router";
import { defaultProfiles, type Profile } from "@/lib/profiles";
import { parts } from "@/lib/presentationContent";

type Props = {
  onSelect?: (profile: Profile) => void;
};

export function ProfileGate({ onSelect }: Props) {
  const navigate = useNavigate();

  const select = (profile: Profile) => {
    onSelect?.(profile);

    if (!onSelect) {
      const index = defaultProfiles.findIndex((p) => p.id === profile.id);
      const part = parts[index >= 0 ? index : 0];
      const first = part?.chapterRange[0] ?? 1;
      void navigate({ to: "/capitulo/$n", params: { n: String(first) } });
    }
  };

  return (
    <main className="profile-stage paper-grain relative min-h-screen bg-ink">
      <div className="pointer-events-none absolute inset-0 wave-marks opacity-50" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-20 sm:px-8 lg:py-24">
        <header className="mb-14 max-w-3xl sm:mb-16">
          <p className="eyebrow text-crimson">Química Orgânica · Apresentação interativa · 2026</p>
          <h1 className="display-2 mt-7 text-foreground">
            QUEM ESTÁ
            <br />
            <span className="text-crimson">APRESENTANDO?</span>
          </h1>
          <div className="hairline mt-9 max-w-xl" />
          <p className="body-lede measure-narrow mt-6 text-muted-foreground">
            Escolha um perfil para iniciar o documentário.
          </p>
        </header>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
          {defaultProfiles.map((profile) => (
            <li key={profile.id} className="min-w-0">
              <button
                type="button"
                onClick={() => select(profile)}
                className="group flex w-full flex-col items-center gap-4 rounded-sm p-1 text-center"
              >
                <span className="relative block aspect-square w-full overflow-clip rounded-sm border border-border transition-all duration-500 group-hover:border-gold/60">
                  <img
                    src={profile.image}
                    alt={`Foto do participante ${profile.name}`}
                    loading="lazy"
                    className="size-full object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </span>
                <span className="micro-label min-w-0 truncate text-muted-foreground transition-colors group-hover:text-foreground">
                  {profile.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
