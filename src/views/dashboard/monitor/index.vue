<template>
  <Overview />
  <el-row :gutter="16">
    <el-col :xl="18" :lg="24" class="recent-situation-warp">
      <RecentSituation />
    </el-col>
    <el-col :xl="6" :lg="24">
      <el-row :gutter="16">
        <el-col :xl="24" :sm="12" :xs="24" class="online-access-warp">
          <OnlineAccess />
        </el-col>
        <el-col :xl="24" :sm="12" :xs="24" class="active-user-warp">
          <ActiveUser />
        </el-col>
      </el-row>
    </el-col>
  </el-row>

  <el-row :gutter="16">
    <el-col :xl="12" :sm="24" :xs="24" class="category-ratio-warp"
      ><CategoryRatio />
    </el-col>
    <el-col :xl="6" :sm="12" :xs="24" class="feedback-data-warp">
      <FeedbackData />
    </el-col>
    <el-col :xl="6" :sm="12" :xs="24" class="target-month-warp">
      <TargetMonth />
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, provide, computed } from "vue";
import Overview from "./components/overview.vue";
import RecentSituation from "./components/recent-situation.vue";
import OnlineAccess from "./components/online-access.vue";
import ActiveUser from "./components/active-user.vue";
import CategoryRatio from "./components/category-ratio.vue";
import FeedbackData from "./components/feedback-data.vue";
import TargetMonth from "./components/target-month.vue";
import "@/utils/echarts";
import { useDark } from "@vueuse/core";
import { THEME_KEY } from "vue-echarts";

const isDark = useDark();
const echartTheme = computed(() => (isDark.value ? "dark" : ""));
provide(THEME_KEY, echartTheme);
defineOptions({
  name: "Monitor", //不命名组件，keep-alive的include不属性生效
});
</script>

<style scoped lang="scss">
.recent-situation-warp {
  margin-bottom: 14px;
  height: 460px;
}
.online-access-warp {
  height: 223px;
  margin-bottom: 14px;
}
.active-user-warp {
  height: 223px;
}
.category-ratio-warp,
.feedback-data-warp,
.target-month-warp {
  height: 230px;
  margin-bottom: 14px;
}
</style>
