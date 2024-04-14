import {
  onBeforeUnmount,
  onMounted,
  ComponentPublicInstance,
  Ref,
  unref,
} from "vue";
import { observe, ResizeCallBack, unobserve } from "@/utils/resizeEvent";

const getElement = (
  element:
    | HTMLDivElement
    | Ref<HTMLElement | ComponentPublicInstance | undefined | null>,
): Element => {
  const val = unref(element);
  return (val as ComponentPublicInstance)?.$el ?? val;
};

export function useResize(
  element:
    | HTMLDivElement
    | Ref<HTMLElement | ComponentPublicInstance | undefined | null>,
  callback: ResizeCallBack,
) {
  onMounted(() => {
    observe(getElement(element), callback);
  });

  onBeforeUnmount(() => {
    unobserve(getElement(element), callback);
  });
}
