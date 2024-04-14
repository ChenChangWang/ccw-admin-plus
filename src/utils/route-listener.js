import mitt from "mitt";

const emitter = mitt();

let lastRoute;
const key = "ROUTE_CHANGE";

export function setRouteEmitter(to) {
  emitter.emit(key, to);
  lastRoute = to;
}

export function listenerRoute(handler, immediate) {
  emitter.on(key, handler);
  if (immediate && lastRoute) {
    handler(lastRoute);
  }
}

export function removeRouteListener() {
  emitter.off(key);
}
