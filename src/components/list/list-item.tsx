import { defineComponent, inject, computed } from "vue";
import {LIST_CONTEXT_KEY, ListProvider} from "@/components/list/constants.ts";
export default defineComponent(
  (props, { slots }) => {
    const listContext = inject(LIST_CONTEXT_KEY) as ListProvider;
    const itemLayout = computed(() => {
      return listContext.itemLayout;
    });
    const renderAction = () => {
      const action = slots.action?.();
      if (!action) {
        return null;
      }
      return <ul class="list-item-action">{slots.action?.()}</ul>;
    };
    return () => (
      <li class="list-item">
        {itemLayout.value === "vertical" ? (
          <div class="list-item-main">
            {slots.default?.()}
            {renderAction()}
          </div>
        ) : (
          <>
            {slots.default?.()}
            {renderAction()}
          </>
        )}
        {slots.extra && <div class="list-item-extra">{slots.extra()}</div>}
      </li>
    );
  },
  { name: "listItem" },
);
