import ResizeObserver from "resize-observer-polyfill";
import { isEmpty } from "@/utils/util";

let elementListeners = new Map();
function onResize(entries) {
  for (let entry of entries) {
    const { target } = entry;
    let listenerSet = elementListeners.get(target);
    if (listenerSet !== null && listenerSet !== undefined) {
      listenerSet.forEach((listener) => {
        return listener(entry);
      });
    }
  }
}
// Note:
let resizeObserver = new ResizeObserver(onResize);

export function observe(element, callback) {
  if (!elementListeners.has(element)) {
    elementListeners.set(element, new Set());
    resizeObserver.observe(element);
  }
  elementListeners.get(element).add(callback);
}
export function unobserve(element, callback) {
  if (elementListeners.has(element)) {
    elementListeners.get(element).delete(callback);
    if (!elementListeners.get(element).size) {
      resizeObserver.unobserve(element);
      elementListeners.delete(element);
    }
  }
}
