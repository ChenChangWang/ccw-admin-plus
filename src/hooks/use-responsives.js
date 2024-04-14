import { onMounted, onUnmounted } from "vue";
import mediaQueryListener, {
  breakpointQueryMap,
} from "@/utils/media-query-listener";

export function useResponsives(callback, options = {}) {
  const { breakpointQueryData = breakpointQueryMap, immediate = true } =
    options;
  let breakpointMatches = {};
  let isLoadIndex = true;
  let unsubscribes = [];

  for (let breakpoint in breakpointQueryData) {
    breakpointMatches[breakpoint] = false;
  }

  if (breakpointQueryData) {
    for (let breakpoint in breakpointQueryData) {
      const query = breakpointQueryData[breakpoint];
      unsubscribes.push(
        mediaQueryListener.subscribe(
          query,
          (matchs) => {
            breakpointMatches[breakpoint] = matchs;
            if (isLoadIndex === false) {
              callback({ ...breakpointMatches }, breakpoint, matchs);
            }
          },
          true,
        ),
      );
    }
  }
  isLoadIndex = false;

  if (immediate) {
    callback(breakpointMatches);
  }

  onUnmounted(() => {
    unsubscribes.forEach((unsubscribe) => {
      unsubscribe();
    });
  });
}
