<script lang="jsx">
import { defineComponent, unref } from "vue";

export default defineComponent({
  name: "TableColumn",
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, context) {
    const getColumn = (columns) => {
      return unref(columns).map((item) => {
        let { prop, label, render, hide, slotName, children, ...otherProp } =
          item;
        if (hide === true) {
          return;
        }
        return (
          <el-table-column
            {...otherProp}
            label={label}
            key={prop}
            v-slots={{
              // 具名插槽
              default: (scope) => {
                if (render) {
                  return render(scope);
                }
                if (slotName) {
                  return context.slots[slotName]?.(scope);
                }
                return scope.row[prop];
              },
            }}
          >
            {children && getColumn(children)}
          </el-table-column>
        );
      });
    };
    return () => getColumn(props.columns);
  },
});
</script>

<style lang="scss" scoped></style>
