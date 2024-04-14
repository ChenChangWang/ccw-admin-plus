import { Ref, ShallowRef } from "vue";
import type { SpanConfig } from "@/components/query-form/hook/use-span-config.ts";

export const formContextKey = Symbol("formContextKey");

export type FormItemData = {
  uid: number;
  index: number | null;
  visible: boolean;
};

export type QueryFormProvide = {
  formItems: ShallowRef<FormItemData[]>;
  registerForm: (child: FormItemData) => void;
  unregisterForm: (uid: number) => void;
  form: Ref<SpanConfig>;
  overflow: boolean;
};
