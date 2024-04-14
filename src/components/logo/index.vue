<template>
  <div :class="['logo']" @click="toHome">
    <img :src="logo" />
    <span class="logo-title" v-if="!collapse">Admin Plus</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import logo from "@/assets/images/logo.png";
import { useRouter } from "vue-router";

const props = defineProps({
  collapse: Boolean,
});
const router = useRouter();
const toHome = () => {
  router.push({ path: "/" });
};
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background-color: var(--el-bg-color);
  cursor: pointer;
  img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
  .logo-title {
    margin-left: 12px;
    font-size: 20px;
    color: var(--el-text-color-primary);
  }
}
</style>
