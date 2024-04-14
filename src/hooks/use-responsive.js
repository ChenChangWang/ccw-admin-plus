import { onMounted, onUnmounted } from "vue";
import mediaQueryListener from "@/utils/media-query-listener";

export function useResponsive(callback, options = {}) {
  const { query, immediate = true } = options;
  let unsubscribe = null;
  if (query) {
    unsubscribe = mediaQueryListener.subscribe(query, callback, immediate);
  }
  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
}
