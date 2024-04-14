import { Ref, ShallowRef } from "vue";

export const gridContextKey = Symbol("gridContextKey");
export const gridItemContextKey = Symbol("gridItemContextKey");

export type GridItemData = {
  uid: number;
  index: number | null;
  span: number;
  offset: number;
};

export type GridProvider = {
  gridItems: ShallowRef<GridItemData[]>;
  registerGrid: (child: GridItemData) => void;
  unregisterGrid: (uid: number) => void;
};

export type GridItemContext = {
  cStart?: number;
  rStart?: number;
  span?: number;
};
export type GridItemProvider = Ref<GridItemContext>;
