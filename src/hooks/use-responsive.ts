import { onUnmounted } from "vue";
import mediaQueryListener, {
  SubscribeFunc,
} from "@/utils/media-query-listener";

export interface ResponsiveOptions {
  query?: string;
  immediate?: boolean;
}
export function useResponsive(
  callback: SubscribeFunc,
  options: ResponsiveOptions={},
) {
  const { query, immediate = true } = options;
  let unsubscribe: () => void;
  if (query) {
    unsubscribe = mediaQueryListener.subscribe(query, callback, immediate);
  }
  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
}
