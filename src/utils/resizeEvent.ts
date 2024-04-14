import ResizeObserver from "resize-observer-polyfill";

export type ResizeCallBack = (entry: ResizeObserverEntry) => void;

let elementListeners: Map<Element, Set<ResizeCallBack>> = new Map();
function onResize(entries: ResizeObserverEntry[]) {
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

export function observe(element: Element, callback: ResizeCallBack) {
  if (!elementListeners.has(element)) {
    elementListeners.set(element, new Set());
    resizeObserver.observe(element);
  }
  elementListeners.get(element)?.add(callback);
}
export function unobserve(element: Element, callback: ResizeCallBack) {
  if (elementListeners.has(element)) {
    elementListeners.get(element)?.delete(callback);
    if (!elementListeners.get(element)?.size) {
      resizeObserver.unobserve(element);
      elementListeners.delete(element);
    }
  }
}
