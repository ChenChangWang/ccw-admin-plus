import { computed, isRef, onBeforeUnmount, onMounted, unref } from "vue";
import { observe, unobserve } from "@/utils/resizeEvent";

const getElement = (element) => {
  const val = unref(element);
  return val?.$el ?? val;
};

export function useResize(element, callback) {
  onMounted(() => {
    observe(getElement(element), callback);
  });

  onBeforeUnmount(() => {
    unobserve(getElement(element), callback);
  });
}
