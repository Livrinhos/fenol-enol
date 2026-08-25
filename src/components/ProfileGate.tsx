import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  loadProfiles,
  loadSelectedId,
  saveProfiles,
  saveSelectedId,
  type Profile,
} from "@/lib/profiles";
import { resetWatchState } from "@/lib/watch-state";
import { parts } from "@/lib/presentationContent";

type Props = {
  onSelect?: (profile: Profile) => void;
};

export function ProfileGate({ onSelect }: Props) {
  const [profiles, setProfiles] = useState<Profile[]>(loadProfiles);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [managing, setManaging] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setProfiles(loadProfiles());
    setSelectedId(loadSelectedId());
  }, []);

  const select = (id: string) => {
    setSelectedId(id);
    saveSelectedId(id);
    const profile = profiles.find((p) => p.id === id);
    if (profile && onSelect) {
      onSelect(profile);
      return;
    }
    const index = profiles.findIndex((p) => p.id === id);
    const part = parts[index >= 0 ? index : 0];
    const first = part?.chapterRange[0] ?? 1;
    void navigate({ to: "/capitulo/$n", params: { n: String(first) } });
  };

  const persist = (next: Profile[]) => {
    setProfiles(next);
    saveProfiles(next);
  };

  const editing = profiles.find((p) => p.id === editingId) ?? null;

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
          {profiles.map((profile) => {
            const active = profile.id === selectedId;
            return (
              <li key={profile.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => (managing ? setEditingId(profile.id) : select(profile.id))}
                  aria-pressed={!managing && active}
                  className="group flex w-full flex-col items-center gap-4 rounded-sm p-1 text-center"
                >
                  <span
                    className={`relative block aspect-square w-full overflow-clip rounded-sm border transition-all duration-500 ${
                      active
                        ? "border-crimson shadow-[0_0_0_1px_var(--color-crimson)]"
                        : "border-border group-hover:border-gold/60"
                    }`}
                  >
                    <img
                      src={profile.image}
                      alt={`Foto do participante ${profile.name}`}
                      loading="lazy"
                      className="size-full object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                    {managing && (
                      <span className="kicker absolute inset-x-0 bottom-0 bg-ink/80 py-2 text-[0.55rem] text-foreground">
                        Editar
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 truncate text-sm tracking-[0.18em] text-muted-foreground uppercase transition-colors group-hover:text-foreground">
                    {profile.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setManaging((m) => !m);
              setEditingId(null);
            }}
            className="kicker border border-border px-6 py-3 transition-colors hover:border-gold/60 hover:text-foreground"
          >
            {managing ? "Concluir" : "Gerenciar perfis"}
          </button>

          {selectedId && !managing && (
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Perfil selecionado: {profiles.find((p) => p.id === selectedId)?.name}
            </p>
          )}

          {managing && selectedId && (
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "Resetar o progresso deste perfil? Esta ação não altera o nome ou a foto.",
                  )
                ) {
                  resetWatchState(selectedId);
                }
              }}
              className="kicker border border-crimson/60 px-6 py-3 text-crimson transition-colors hover:border-crimson hover:bg-crimson/10"
            >
              Resetar progresso
            </button>
          )}
        </div>
      </div>

      {editing && (
        <EditProfileDialog
          profile={editing}
          onCancel={() => setEditingId(null)}
          onSave={(next) => {
            persist(profiles.map((p) => (p.id === next.id ? next : p)));
            setEditingId(null);
          }}
        />
      )}
    </main>
  );
}

function EditProfileDialog({
  profile,
  onSave,
  onCancel,
}: {
  profile: Profile;
  onSave: (p: Profile) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(profile.name);
  const [image, setImage] = useState(profile.image);
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Selecione um arquivo de imagem.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(String(reader.result));
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 px-4 py-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) {
            setError("O nome não pode ficar vazio.");
            return;
          }
          onSave({ ...profile, name: name.trim(), image });
        }}
        className="max-h-full w-full max-w-lg overflow-y-auto border border-border bg-surface p-6 sm:p-8"
      >
        <p className="kicker">Gerenciar perfil</p>
        <h2 id="edit-profile-title" className="mt-3 font-display text-2xl tracking-[0.14em] text-foreground">EDITAR PERFIL</h2>
        <div className="hairline my-6" />

        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5">
          <img src={image} alt="Pré-visualização da imagem do perfil" width={112} height={112} className="size-24 shrink-0 border border-border object-cover sm:size-28" />
          <div className="min-w-0 space-y-4">
            <div>
              <label htmlFor="profile-name" className="kicker mb-2 block text-[0.6rem]">Nome</label>
              <input id="profile-name" ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} maxLength={24} className="w-full border border-input bg-elevated px-3 py-2 text-sm tracking-[0.1em] text-foreground placeholder:text-muted-foreground" placeholder="Nome do participante" />
            </div>
            <div>
              <label htmlFor="profile-image" className="kicker mb-2 block text-[0.6rem]">Imagem</label>
              <input id="profile-image" type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} className="w-full text-xs text-muted-foreground file:mr-3 file:border file:border-border file:bg-elevated file:px-3 file:py-2 file:text-[0.6rem] file:tracking-[0.2em] file:text-foreground file:uppercase" />
            </div>
          </div>
        </div>

        {error && <p role="alert" className="mt-4 text-xs tracking-wide text-destructive">{error}</p>}

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button type="button" onClick={onCancel} className="kicker border border-border px-5 py-3 transition-colors hover:text-foreground">Cancelar</button>
          <button type="submit" className="kicker border border-crimson bg-crimson px-5 py-3 text-primary-foreground transition-colors hover:bg-blood">Salvar</button>
        </div>
      </form>
    </div>
  );
}
