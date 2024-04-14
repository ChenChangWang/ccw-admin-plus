import mitt from "mitt";
import type { RouteLocationNormalized } from "vue-router";

const emitter = mitt();

let lastRoute: RouteLocationNormalized;
const key = Symbol("ROUTE_CHANGE");

export function setRouteEmitter(to: RouteLocationNormalized) {
  emitter.emit(key, to);
  lastRoute = to;
}

export function listenerRoute(
  handler: (route: RouteLocationNormalized) => void,
  immediate: boolean,
) {
  emitter.on(key, handler);
  if (immediate && lastRoute) {
    handler(lastRoute);
  }
}

export function removeRouteListener() {
  emitter.off(key);
}
