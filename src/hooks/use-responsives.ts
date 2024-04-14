import { onUnmounted } from "vue";

import mediaQueryListener, {
  BreakPoint,
  BreakpointQueryMap,
  breakpointQueryMap,
} from "@/utils/media-query-listener";

export interface ResponsivesOptions {
  breakpointQueryData?: BreakpointQueryMap;
  query?: string;
  immediate?: boolean;
}

export type BreakpointMatches = Partial<Record<BreakPoint, boolean>>;

export type ResponsivesCallback = (
  breakpointMatches?: BreakpointMatches,
  breakpoint?: BreakPoint,
  matchs?: boolean,
) => void;

export function useResponsives(
  callback: ResponsivesCallback,
  options: ResponsivesOptions = {},
) {
  const { breakpointQueryData = breakpointQueryMap, immediate = true } =
    options;
  let breakpointMatches: BreakpointMatches = {};
  let isLoadIndex = true;
  let unsubscribes: Array<() => void> = [];

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
              callback(
                { ...breakpointMatches },
                breakpoint as BreakPoint,
                matchs,
              );
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
