export type OptionType =
  | "reload"
  | "current"
  | "left"
  | "right"
  | "others"
  | "all";

export interface Scrollable {
    next?: boolean;
    prev?: number;
}
