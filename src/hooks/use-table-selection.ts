import { nextTick, ref, watch, Ref } from "vue";
import { isEmpty } from "@/utils/util";
import type { TableInstance } from "element-plus";

export default function useTableSelection(
  tableData: Ref<any[]>,
  tableRef: Ref<TableInstance | undefined>,
) {
  const multipleSelection = ref<any[]>([]);

  const handleSelectChange = (selection: any[], row: any) => {
    let selected = selection.length && selection.indexOf(row) !== -1;
    if (selected) {
      multipleSelection.value.push(row);
    } else {
      const selectIndex = multipleSelection.value.findIndex(
        (item) => item.id === row.id,
      );
      multipleSelection.value.splice(selectIndex, 1);
    }
  };

  const handleSelectAll = (selection: any[]) => {
    if (selection.length > 0) {
      multipleSelection.value.push(...selection);
    } else {
      multipleSelection.value = multipleSelection.value.filter((item) =>
        tableData.value.every((it) => it.id != item.id),
      );
    }
  };

  const setTableSelection = () => {
    const ref = tableRef.value;
    if (!ref) {
      return;
    }
    ref.data.forEach((data) => {
      const selected = multipleSelection.value.some(
        (item) => data.id === item.id,
      );
      ref.toggleRowSelection(data, selected);
    });
  };

  const clearSelection = () => {
    if (isEmpty(multipleSelection.value)) {
      return;
    }
    multipleSelection.value = [];
    setTableSelection();
  };

  watch(
    () => tableData.value,
    () => {
      nextTick(() => {
        setTableSelection();
      });
    },
  );

  return {
    handleSelectChange,
    handleSelectAll,
    multipleSelection,
    clearSelection,
  };
}
