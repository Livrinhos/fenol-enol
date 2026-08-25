import avatar1 from "@/assets/pessoa1.png";
import avatar2 from "@/assets/pessoa2.png";
import avatar3 from "@/assets/pessoa3.png";
import avatar4 from "@/assets/pessoa4.png";

export type Profile = {
  id: string;
  name: string;
  image: string;
};

export const PROFILES_KEY = "quimica-organica:profiles";
export const SELECTED_KEY = "quimica-organica:selected-profile";
export const INTRO_KEY = "quimica-organica:intro-seen";

export const defaultProfiles: Profile[] = [
  { id: "p1", name: "Camila", image: avatar2 },
  { id: "p2", name: "Lucas", image: avatar1 },
  { id: "p3", name: "Santhiago", image: avatar4 },
  { id: "p4", name: "Mylena", image: avatar3 },
];

export function loadProfiles(): Profile[] {
  if (typeof window === "undefined") return defaultProfiles;
  try {
    const raw = window.localStorage.getItem(PROFILES_KEY);
    if (!raw) return defaultProfiles;
    const parsed = JSON.parse(raw) as Profile[];
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultProfiles;
    return defaultProfiles.map((fallback) => {
      const found = parsed.find((p) => p?.id === fallback.id);
      return found
        ? {
            id: fallback.id,
            name: found.name || fallback.name,
            image: found.image || fallback.image,
          }
        : fallback;
    });
  } catch {
    return defaultProfiles;
  }
}

export function saveProfiles(profiles: Profile[]) {
  try {
    window.localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch {
    /* storage unavailable */
  }
}

export function loadSelectedId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(SELECTED_KEY);
  } catch {
    return null;
  }
}

export function saveSelectedId(id: string) {
  try {
    window.localStorage.setItem(SELECTED_KEY, id);
  } catch {
    /* storage unavailable */
  }
}
