import { ref } from "vue";
import {
  BreakPoint,
  breakpointQueryMap,
  breakpointSizeMap,
} from "@/utils/media-query-listener";
import { useResponsives } from "@/hooks/use-responsives";
import type { BreakpointMatches } from "@/hooks/use-responsives";
import { isEmpty } from "@/utils/util";

export type ResponsiveState = {
  [key: string]: any;
};

export type BreakPointResponsiveState = Partial<
  Record<BreakPoint, ResponsiveState>
>;

export function useResponsiveState(
  responsiveData: BreakPointResponsiveState,
  defState: ResponsiveState,
) {
  let state = ref({ ...defState });

  if (isEmpty(responsiveData)) {
    return state;
  }

  let breakpointQueryData = {};
  Object.keys(responsiveData).forEach((key) => {
    const query = breakpointQueryMap[key];
    if (query) {
      breakpointQueryData[key] = query;
    }
  });

  useResponsives(
    (breakpointMatches: BreakpointMatches) => {
      let newValue = defState;

      if (!isEmpty(breakpointMatches)) {
        //多个匹配时 取最大的那个
        const matchBreakpoint: string | number | null = Object.keys(
          breakpointMatches,
        ).reduce((result, key) => {
          const match = breakpointMatches[key];
          if (match) {
            return result === null
              ? key
              : breakpointSizeMap[key] > breakpointSizeMap[result]
                ? key
                : result;
          }
          return result;
        }, null);

        if (matchBreakpoint) {
          newValue = responsiveData[matchBreakpoint];
        }
      }

      Object.assign(state.value, newValue);
    },
    { breakpointQueryData },
  );

  return state;
}
