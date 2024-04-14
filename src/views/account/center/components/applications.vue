<template>
  <ApplicationsList
    :attarSpan="attarSpan"
    :loading="loading"
    :dataList="dataList"
  />
</template>

<script setup>
import { ref } from "vue";
import ApplicationsList from "@/views/search/components/applications-list.vue";
import useLoading from "@/hooks/use-loading";
import { getApplicationList } from "@/api/search";

const attarSpan = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
};
const dataList = ref([]);
const [loading, setLoading] = useLoading(false);
const fetchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getApplicationList({
      currentPage: 1,
      pageSize: 8,
    });
    dataList.value = data.list;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};

fetchDataList();
</script>

<style scoped lang="scss"></style>
