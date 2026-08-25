import avatar1 from "@/assets/pessoa1.png";
import avatar2 from "@/assets/pessoa2.png";
import avatar3 from "@/assets/pessoa3.png";
import avatar4 from "@/assets/pessoa4.png";

export type Profile = {
  id: string;
  name: string;
  image: string;
};

export const defaultProfiles: Profile[] = [
  { id: "p1", name: "Camila", image: avatar2 },
  { id: "p2", name: "Lucas", image: avatar1 },
  { id: "p3", name: "Santhiago", image: avatar4 },
  { id: "p4", name: "Mylena", image: avatar3 },
];

// Mantém compatibilidade com componentes antigos, sem qualquer persistência local.
export function loadProfiles(): Profile[] {
  return defaultProfiles;
}
