<template>
  <div class="account-articles">
    <ArticlesList :loading="loading" :dataList="dataList" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ArticlesList from "@/views/search/components/articles-list.vue";
import useLoading from "@/hooks/use-loading";
import { getArticleList } from "@/api/search";

const [loading, setLoading] = useLoading(false);
const dataList = ref([]);
const fetchDataList = async () => {
  setLoading(true);
  try {
    const {
      data: { list, total },
    } = await getArticleList({
      currentPage: 1,
      pageSize: 4,
    });
    dataList.value = list;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};
fetchDataList();
</script>

<style scoped lang="scss"></style>
