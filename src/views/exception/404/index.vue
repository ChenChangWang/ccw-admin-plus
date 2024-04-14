<template>
  <ErrorResult code="404" desc="抱歉，页面不见了～" />
</template>

<script lang="ts" setup>
import ErrorResult from "../components/error-result.vue";

defineOptions({
  name: "404", //不命名组件，keep-alive的include不属性生效
});
</script>

<style scoped lang="scss"></style>
