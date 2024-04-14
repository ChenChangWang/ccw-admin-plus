import { computed, Ref, ref, watch } from "vue";
import { isEmpty } from "@/utils/util";

export type LabelPosition = "left" | "right" | "top";
export type BreakpointsSpan = [number, number, LabelPosition][];
export type SpanConfig = {
  span: number;
  labelPosition: LabelPosition;
};

const breakpointsConfigDefault: BreakpointsSpan = [
  [513, 24, "top"],
  [701, 12, "top"],
  [1062, 8, "right"],
  [1352, 8, "right"],
  [Infinity, 6, "right"],
];
const getSpanConfig = (
  width: number,
  span: number | BreakpointsSpan,
  labelPosition: LabelPosition,
) => {
  if (span && typeof span === "number") {
    return {
      span,
      labelPosition,
    };
  }

  let spanConfig = (
    !isEmpty(span) ? span : breakpointsConfigDefault
  ) as BreakpointsSpan;

  let breakPoint = [, 8, labelPosition];
  for (let entry of spanConfig) {
    if (width < entry[0] + 16) {
      breakPoint = entry;
      break;
    }
  }
  return {
    span: breakPoint[1],
    labelPosition: breakPoint[2],
  };
};

export function useSpanConfig(
  width: Ref<number>,
  span: number | BreakpointsSpan,
  labelPosition: LabelPosition,
) {
  let formContext = ref<SpanConfig>({ span: 8, labelPosition: labelPosition });

  watch(width, () => {
    const spanConfig = getSpanConfig(width.value, span, labelPosition);
    Object.assign(formContext.value, spanConfig);
  });

  return formContext;
}
