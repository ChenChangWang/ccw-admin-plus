import { computed, ref, watch } from "vue";
import { breakpointArray } from "@/utils/media-query-listener";
import { isEmpty } from "@/utils/util";

const breakpointsConfigDefault = [
  [513, 24, "top"],
  [701, 12, "top"],
  [1062, 8, "right"],
  [1352, 8, "right"],
  [Infinity, 6, "right"],
];
const getSpanConfig = (width, span, labelPosition) => {
  if (span && typeof span === "number") {
    return {
      span,
      labelPosition,
    };
  }

  let spanConfig = !isEmpty(span) ? span : breakpointsConfigDefault;
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

export function useSpanConfig(width, span, labelPosition) {
  let formContext = ref({ span: 8, labelPosition: labelPosition });

  watch(width, () => {
    const spanConfig = getSpanConfig(width.value, span, labelPosition);
    Object.assign(formContext.value, spanConfig);
  });

  return formContext;
}
