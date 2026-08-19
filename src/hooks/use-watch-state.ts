import { useEffect, useState } from "react";
import {
  defaultWatchState,
  loadWatchState,
  subscribeWatchState,
  type WatchState,
} from "@/lib/watch-state";

/** Client-only watch state (avoids SSR/hydration mismatch). */
export function useWatchState(): { state: WatchState; ready: boolean } {
  const [state, setState] = useState<WatchState>(defaultWatchState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setState(loadWatchState());
    sync();
    setReady(true);
    return subscribeWatchState(sync);
  }, []);

  return { state, ready };
}
