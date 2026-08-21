const KEY_PREFIX = "quimica-organica:progresso:";

/** Limpa o progresso de leitura dos capítulos do perfil informado. */
export function resetWatchState(profileId: string | null) {
  if (typeof window === "undefined" || !profileId) return;
  try {
    window.localStorage.removeItem(`${KEY_PREFIX}${profileId}`);
  } catch {
    /* storage unavailable */
  }
}
