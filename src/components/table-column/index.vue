<script lang="tsx">
import { defineComponent, unref, Ref, PropType } from "vue";
import { VNode } from "@vue/runtime-core";

export interface TableColumnData {
  type?: "default" | "selection" | "index" | "expand";
  prop?: string;
  label?: string;
  render?: (scope: { row: any; column: any; $index: number }) => VNode[];
  slotName?: string;
  [key: string]: any;
}

export default defineComponent({
  name: "TableColumn",
  props: {
    columns: {
      type: Array as PropType<TableColumnData[]>,
      default() {
        return [];
      },
    },
  },
  setup(props, context) {
    const getColumn = (columns: TableColumnData[] | Ref<TableColumnData[]>) => {
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
              default: (scope: any) => {
                if (render) {
                  return render(scope);
                }
                if (slotName) {
                  return context.slots[slotName]?.(scope);
                }
                return scope.row[prop!];
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

<style scoped lang="scss"></style>
