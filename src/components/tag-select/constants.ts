import type { ModelRef } from "vue";

export const tagSelectContextKey = Symbol("tagSelectContextKey");

export type TagItemData = {
  uid: number;
  value: string;
};

export type TagSelectProvider = {
  model: ModelRef<string[] | undefined>;
  checkedChange: (value: string, status: boolean) => void;
  registerTagItem: (child: TagItemData) => void;
  unregisterTagItem: (uid: number) => void;
};
