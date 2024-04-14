<template>
  <div class="search-articles">
    <SearchHeader title="搜索列表（文章）" name="Articles" />
    <el-card class="form-card">
      <el-form
        :model="form"
        label-width="56px"
        label-position="left"
        class="form"
      >
        <el-form-item label="分类：">
          <TagSelect v-model="form.categoryCheckList" @change="categoryChange">
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
        <el-form-item label="作者：">
          <el-select
            v-model="form.owner"
            multiple
            placeholder="请选择"
            style="width: 280px"
          >
            <el-option
              v-for="item in ownerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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

    <el-card class="content-card list-card">
      <ArticlesList
        :finished="finished"
        :loading="loading"
        :dataList="dataList"
        :isFooter="true"
        @loadMore="loadMore"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
const categoryOptions = Array.from({ length: 24 }).map((_, index) => {
  return {
    value: `value${index + 1}`,
    label: `类目${index + 1}`,
  };
});
const ownerOptions = [
  {
    value: "zzz",
    label: "作者张",
  },
  {
    value: "zzl",
    label: "作者李",
  },
  {
    value: "zzw",
    label: "作者王",
  },
  {
    value: "zzh",
    label: "作者黄",
  },
  {
    value: "zzc",
    label: "作者陈",
  },
];
const sortOptions = [
  {
    value: "latestPublish",
    label: "最新发布",
  },
  {
    value: "mostRead",
    label: "最多收藏",
  },
  {
    value: "mostCollect",
    label: "最多阅读",
  },
];
</script>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import SearchHeader from "../components/search-header.vue";
import { TagSelect, TagItem } from "@/components/tag-select";
import useLoading from "@/hooks/use-loading";
import { ArticleData, ArticleParma, getArticleList } from "@/api/search";
import { isEmpty } from "@/utils/util";
import ArticlesList from "../components/articles-list.vue";
import type { PageParam } from "@/api";

defineOptions({
  name: "Articles", //不命名组件，keep-alive的include不属性生效
});

const form = reactive({
  categoryCheckList: [],
  owner: [],
  sort: "latestPublish",
});
const pagination = reactive<PageParam>({
  currentPage: 1,
  pageSize: 5,
});
const [loading, setLoading] = useLoading(false);
let finished = ref(false);
const categoryChange = () => {};
const dataList = ref<ArticleData[]>([]);

const fetchDataList = async () => {
  setLoading(true);
  try {
    const {
      data: { list, total },
    } = await getArticleList({
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
      ...form,
    } as ArticleParma);

    if (isEmpty(list)) {
      finished.value = true;
      return;
    }
    dataList.value = dataList.value.concat(list);
    if (dataList.value.length >= total) {
      finished.value = true;
    }
  } catch (err) {
  } finally {
    setLoading(false);
  }
};

fetchDataList();

const loadMore = () => {
  if (loading.value === true || finished.value === true) {
    return;
  }
  pagination.currentPage++;
  fetchDataList();
};
</script>

<style scoped lang="scss">
.search-articles {
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
  .list-card {
    margin-top: 14px;
    :deep(.el-card__body) {
      padding-top: 8px;
    }
  }
}
</style>
