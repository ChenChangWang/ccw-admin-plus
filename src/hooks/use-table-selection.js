import { nextTick, ref, watch } from "vue";
import { isEmpty } from "@/utils/util";

export default function useTableSelection(tableData, tableRef) {
  const multipleSelection = ref([]);

  const handleSelectChange = (selection, row) => {
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
  const handleSelectAll = (selection) => {
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
