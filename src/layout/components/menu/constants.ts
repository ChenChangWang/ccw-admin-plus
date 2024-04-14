export const MENU_CONTEXT_KEY = Symbol("menuContextKey");

export interface MenuProvider {
  onItemClick: Function;
}
