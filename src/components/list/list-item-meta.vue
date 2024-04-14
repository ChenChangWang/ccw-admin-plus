<template>
  <div class="list-item-meta">
    <div class="list-item-meta-avatar" v-if="avatar || $slots.avatar">
      <slot name="avatar">
        <el-avatar :src="avatar" :size="avatarSize" />
      </slot>
    </div>
    <div class="list-item-meta-content">
      <div v-if="title || $slots.title" class="list-item-meta-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        v-if="description || $slots.description"
        class="list-item-meta-description"
      >
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
 defineProps({
  avatar: {
    type: String,
    default: "",
  },
  avatarSize: {
    type: Number,
    default: 40,
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss"></style>
