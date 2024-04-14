import { reactive, ref } from "vue";

export default function useTable(fetchDataList, formRef) {
  const size = ref("default");
  const isQueryForm = ref(true);
  const stripe = ref(false);
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  const handleSizeChange = (val) => {
    pagination.currentPage = 1;
    pagination.pageSize = val;
    fetchDataList?.();
  };
  const handleCurrentChange = (val) => {
    pagination.currentPage = val;
    fetchDataList?.();
  };

  const resetForm = () => {
    if (!formRef?.value?.formRef) return;
    formRef?.value?.formRef.resetFields();
  };

  return {
    size,
    stripe,
    isQueryForm,
    pagination,
    handleSizeChange,
    handleCurrentChange,
    resetForm,
  };
}
