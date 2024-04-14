<template>
  <ErrorResult code="403" desc="对不起，您没有访问该资源的权限" />
</template>

<script setup>
import ErrorResult from "../components/error-result.vue";

defineOptions({
  name: "403", //不命名组件，keep-alive的include不属性生效
});
</script>

<style scoped lang="scss"></style>
