<template>
  <div class="search-applications">
    <SearchHeader title="搜索列表（应用）" name="Applications" />
    <el-card class="form-card">
      <el-form
        :model="form"
        label-width="56px"
        label-position="left"
        class="form"
      >
        <el-form-item label="分类：">
          <TagSelect v-model="form.categoryCheckList">
            <TagItem
              v-for="item in categoryOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </TagItem>
          </TagSelect>
        </el-form-item>
        <el-divider border-style="dashed" />
        <el-form-item label="排序">
          <el-radio-group v-model="form.sort">
            <el-radio
              :value="item.value"
              v-for="item in sortOptions"
              :key="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>

    <ApplicationsList
      :attarSpan="attarSpan"
      :loading="loading"
      :dataList="dataList"
    />
  </div>
</template>
<script>
const categoryOptions = Array.from({ length: 24 }).map((_, index) => {
  return {
    value: `value${index + 1}`,
    label: `类目${index + 1}`,
  };
});
const sortOptions = [
  {
    value: "latestCreate",
    label: "最新创建",
  },
  {
    value: "lastUpdate",
    label: "最多更新",
  },
];
const attarSpan = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 6,
};
</script>
<script setup>
import { computed, reactive, ref } from "vue";
import SearchHeader from "../components/search-header.vue";
import { TagItem, TagSelect } from "@/components/tag-select";
import useLoading from "@/hooks/use-loading";
import { getApplicationList } from "@/api/search";
import ApplicationsList from "../components/applications-list.vue";

defineOptions({
  name: "Applications", //不命名组件，keep-alive的include不属性生效
});
const form = reactive({
  categoryCheckList: [],
  sort: "latestCreate",
});
const dataList = ref([]);
const [loading, setLoading] = useLoading(false);
const fetchDataList = async () => {
  setLoading(true);
  try {
    const { data } = await getApplicationList({
      currentPage: 1,
      pageSize: 10,
      ...form,
    });
    dataList.value = data.list;
  } catch (err) {
  } finally {
    setLoading(false);
  }
};

fetchDataList();
</script>

<style scoped lang="scss">
.search-applications {
  .form-card {
    :deep(.el-card__body) {
      padding-bottom: 2px;
    }
    .form {
      :deep(.el-divider) {
        margin: 20px 0;
      }
    }
  }
  :deep(.applications-list) {
    margin-top: 14px;
  }
}
</style>
