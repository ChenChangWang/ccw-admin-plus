<template>
  <el-row :gutter="24" class="account-center">
    <el-col :sm="24" :md="8" :lg="7" style="margin-bottom: 14px">
      <el-card class="content-card">
        <div class="user-holder">
          <el-avatar class="avatar" :src="userStore.avatar" :size="72" />
          <div class="user-name">{{ userStore.name }}</div>
          <div>{{ userStore.signature }}</div>
        </div>
        <el-descriptions class="descriptions" :column="1">
          <el-descriptions-item
            v-for="item in userDescriptionList"
            :key="item.id"
          >
            <template #label>
              <span class="icon">
                <Icon :icon="item.icon" />
              </span>
            </template>
            {{ item.label }}
          </el-descriptions-item>
        </el-descriptions>

        <el-divider border-style="dashed" style="margin: 10px 0 18px 0" />

        <Tags />

        <el-divider border-style="dashed" style="margin: 18px 0 18px 0" />

        <MyTeam />
      </el-card>
    </el-col>

    <el-col :sm="24" :md="16" :lg="17" style="margin-bottom: 14px">
      <el-card class="content-card">
        <el-tabs v-model="tabValue">
          <el-tab-pane
            v-for="item in tabOptions"
            :key="item.name"
            :label="item.label"
            :name="item.name"
          >
            <Articles v-if="item.name === 'articles'" />
            <Applications
              v-else-if="item.name === 'applications'"
              style="margin-top: 10px"
            />
            <Projects
              v-else-if="item.name === 'projects'"
              style="margin-top: 10px"
            />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/store";
import { Icon } from "@iconify/vue";
import Tags from "./components/tags.vue";
import MyTeam from "./components/my-team.vue";
import Articles from "./components/articles.vue";
import Applications from "./components/applications.vue";
import Projects from "./components/projects.vue";

defineOptions({
  name: "Center", //不命名组件，keep-alive的include不属性生效
});
const tabValue = ref("articles");

const userStore = useUserStore();
const userDescriptionList = computed(() => {
  return [
    {
      id: 1,
      icon: "ant-design:contacts-outlined",
      label: userStore.jobName,
    },
    {
      id: 2,
      icon: "ant-design:cluster-outlined",
      label: userStore.group,
    },
    {
      id: 3,
      icon: "ant-design:home-outlined",
      label: userStore.area?.join("-"),
    },
  ];
});
const tabOptions = [
  {
    label: "文章 (4)",
    name: "articles",
  },
  {
    label: "应用 (8)",
    name: "applications",
  },
  {
    label: "项目 (8)",
    name: "projects",
  },
];
</script>

<style scoped lang="scss">
.account-center {
  .user-holder {
    text-align: center;
    .user-name {
      font-size: 20px;
      margin: 8px 0;
    }
  }
  .descriptions {
    margin-top: 22px;
    :deep(.el-descriptions__cell) {
      padding-bottom: 10px;
      .el-descriptions__label {
        margin-right: 5px;
        .icon {
          font-size: 15px;
          display: inline-block;
        }
      }
    }
  }
  :deep(.articles-list),
  :deep(.applications-list),
  :deep(.projects-list) {
    min-height: 250px;
  }
}
</style>
