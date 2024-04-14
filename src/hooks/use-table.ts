import { reactive, Ref, ref } from "vue";
import type { Pagination } from "@/api";
import { QueryForm } from "@/components/query-form";

export default function useTable(
  fetchDataList: Function,
  formRef?: Ref<InstanceType<typeof QueryForm> | undefined>,
) {
  const size = ref("default");
  const isQueryForm = ref(true);
  const stripe = ref(false);
  const pagination = reactive<Pagination>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  const handleSizeChange = (val: number) => {
    pagination.currentPage = 1;
    pagination.pageSize = val;
    fetchDataList?.();
  };
  const handleCurrentChange = (val: number) => {
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
