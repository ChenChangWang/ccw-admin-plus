<template>
  <ErrorResult code="500" desc="抱歉，服务器出了点问题～" />
</template>

<script setup>
import ErrorResult from "../components/error-result.vue";

defineOptions({
  name: "500", //不命名组件，keep-alive的include不属性生效
});
</script>

<style scoped lang="scss"></style>
