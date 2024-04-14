<template>
  <el-card class="online-access content-card">
    <template #header>
      <span>当前在线</span>
    </template>

    <div class="online-access-warp">
      <div>{{ time }}</div>
      <div style="font-size: 40px; margin-top: 5px">{{ visits }}</div>
      <div style="margin-top: 10px">在线访问数</div>
      <div style="margin-top: 10px; font-size: 12px">
        <span class="circle primary"></span>
        {{ countdown }}&nbsp;秒后更新
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
const time = ref();
const countdown = ref(1);
const visits = ref();
let timer = null;

const updTime = () => {
  if (countdown.value === 1) {
    time.value = dayjs().format("HH:mm:ss");
    visits.value = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
  }
  if (countdown.value <= 1) {
    countdown.value = 5;
  } else {
    countdown.value -= 1;
  }
};

onMounted(() => {
  updTime();
  timer = setInterval(updTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="scss">
.online-access {
  height: 100%;

  .online-access-warp {
    text-align: center;
  }
}
</style>
