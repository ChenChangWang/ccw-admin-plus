<template>
  <ProjectsList
    :attarSpan="attarSpan"
    :loading="loading"
    :dataList="dataList"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ProjectsList from "@/views/search/components/projects-list.vue";
import useLoading from "@/hooks/use-loading";
import { getProjectList, ProjectData } from "@/api/search";

const attarSpan = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
};
const dataList = ref<ProjectData[]>([]);
const [loading, setLoading] = useLoading(false);

const fetchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getProjectList({
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
