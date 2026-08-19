import { loadProfiles, loadSelectedId } from "@/lib/profiles";

export type WatchState = {
  currentEpisode: number;
  totalEpisodes: number;
  progress: number; // 0..1
  lastWatchedAt: string | null;
  completed: number[];
  myList: string[];
};

const KEY_PREFIX = "yakuza-archive:watch:";

export const defaultWatchState: WatchState = {
  currentEpisode: 1,
  totalEpisodes: 20,
  progress: 0,
  lastWatchedAt: null,
  completed: [],
  myList: [],
};

const listeners = new Set<() => void>();

export function subscribeWatchState(fn: () => void) {
  listeners.add(fn);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", fn);
    window.addEventListener("yakuza:watch-change", fn);
  }
  return () => {
    listeners.delete(fn);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", fn);
      window.removeEventListener("yakuza:watch-change", fn);
    }
  };
}

function emit() {
  listeners.forEach((fn) => fn());
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("yakuza:watch-change"));
  }
}

export function activeProfileId(): string {
  if (typeof window === "undefined") return "p1";
  return loadSelectedId() ?? loadProfiles()[0]?.id ?? "p1";
}

export function loadWatchState(profileId = activeProfileId()): WatchState {
  if (typeof window === "undefined") return defaultWatchState;
  try {
    const raw = window.localStorage.getItem(KEY_PREFIX + profileId);
    if (!raw) return defaultWatchState;
    const parsed = JSON.parse(raw) as Partial<WatchState>;
    return {
      ...defaultWatchState,
      ...parsed,
      completed: Array.isArray(parsed.completed) ? parsed.completed : defaultWatchState.completed,
      myList: Array.isArray(parsed.myList) ? parsed.myList : [],
    };
  } catch {
    return defaultWatchState;
  }
}

export function saveWatchState(state: WatchState, profileId = activeProfileId()) {
  try {
    window.localStorage.setItem(KEY_PREFIX + profileId, JSON.stringify(state));
  } catch {
    /* storage unavailable */
  }
  emit();
}

export function updateWatchState(patch: Partial<WatchState>, profileId = activeProfileId()) {
  const next = { ...loadWatchState(profileId), ...patch };
  saveWatchState(next, profileId);
  return next;
}

export function resetWatchState(profileId = activeProfileId()) {
  saveWatchState(defaultWatchState, profileId);
  return defaultWatchState;
}

export function resumeEpisode(episode: number, progress: number) {
  const state = loadWatchState();
  const completed = new Set(state.completed);
  for (let i = 1; i < episode; i += 1) completed.add(i);
  return updateWatchState({
    currentEpisode: episode,
    progress: Math.min(0.99, Math.max(progress, state.currentEpisode === episode ? state.progress : 0.02)),
    lastWatchedAt: new Date().toISOString(),
    completed: [...completed].sort((a, b) => a - b),
  });
}

export function toggleMyList(id: string) {
  const state = loadWatchState();
  const has = state.myList.includes(id);
  updateWatchState({ myList: has ? state.myList.filter((x) => x !== id) : [...state.myList, id] });
  return !has;
}
