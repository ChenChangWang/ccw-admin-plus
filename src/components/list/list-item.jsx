import { defineComponent, inject, computed } from "vue";

export default defineComponent(
  (props, { slots }) => {
    const listContext = inject("listContextKey");
    const itemLayout = computed(() => {
      return listContext.itemLayout;
    });
    const renderAction = () => {
      const action = slots.action?.();
      if (!action) {
        return null;
      }
      return <ul class="list-item-action">{slots.action()}</ul>;
    };
    return () => (
      <li class="list-item">
        {itemLayout.value === "vertical" ? (
          <div class="list-item-main">
            {slots.default()}
            {renderAction()}
          </div>
        ) : (
          <>
            {slots.default()}
            {renderAction()}
          </>
        )}
        {slots.extra && <div class="list-item-extra">{slots.extra()}</div>}
      </li>
    );
  },
  { name: "listItem" },
);
