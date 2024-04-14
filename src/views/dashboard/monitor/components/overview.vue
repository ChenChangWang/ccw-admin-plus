<template>
  <el-row :gutter="16" class="overview">
    <el-col v-bind="attarSpan">
      <OverviewItem desc="总访问人数" class="overview-visit">
        <template #avatarIcon>
          <Icon icon="fa6-solid:people-line" />
        </template>

        {{ toK(21356) }}

        <template #extra>
          <AvatarGroup :maxCount="5">
            <el-tooltip
              effect="dark"
              placement="top"
              v-for="item in avatarList"
              :content="item.name"
            >
              <el-avatar :src="item.src" class="avatar" />
            </el-tooltip>
          </AvatarGroup>
        </template>
      </OverviewItem>
    </el-col>
    <el-col v-bind="attarSpan">
      <OverviewItem desc="点击量（近30天）" class="overview-hits">
        <template #avatarIcon>
          <Icon icon="material-symbols:ads-click" />
        </template>

        {{ numeral(15896).format("0,0") }}

        <template #extra>
          <div class="up trend">
            <Icon class="icon" icon="mingcute:up-fill" />120.5%
          </div>
        </template>
      </OverviewItem>
    </el-col>
    <el-col v-bind="attarSpan">
      <OverviewItem desc="订单量（近30天）" class="overview-order">
        <template #avatarIcon>
          <Icon
            icon="material-symbols-light:order-approve-outline"
            color="red"
          />
        </template>

        {{ numeral(1162).format("0,0") }}

        <template #extra>
          <div class="down trend">
            <Icon class="icon" icon="mingcute:down-fill" />120.5%
          </div></template
        >
      </OverviewItem>
    </el-col>
    <el-col v-bind="attarSpan">
      <OverviewItem desc="销售额（近30天）" class="overview-sale">
        <template #avatarIcon>
          <Icon icon="mdi:sale" />
        </template>

        {{ toYuan(63251) }}

        <template #extra>
          <div class="up trend">
            <Icon class="icon" icon="mingcute:up-fill" />106.5%
          </div>
        </template>
      </OverviewItem>
    </el-col>
  </el-row>
</template>

<script setup>
import OverviewItem from "./overview-item.vue";
import { Icon } from "@iconify/vue";
import numeral from "numeral";
import { toK, toYuan, getAssetsImage } from "@/utils/util";
import AvatarGroup from "@/components/avatar-group";
const avatarList = [
  { name: "张 三", src: getAssetsImage("people2.jpg") },

  { name: "王 五", src: getAssetsImage("people6.webp") },
  {
    name: "李 四",
    src: getAssetsImage("people3.jpg"),
  },
  {
    name: "小 明",
    src: getAssetsImage("people4.jpg"),
  },
  {
    name: "小 红",
    src: getAssetsImage("people5.webp"),
  },
  {
    name: "赵 六",
    src: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  },
];
const attarSpan = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
};
</script>

<style scoped lang="scss">
.overview {
  > .el-col {
    margin-bottom: 14px;
  }
  .overview-visit {
    :deep(.overview-item-avatar) {
      background-color: var(--el-color-primary-light-7);
      color: var(--el-color-primary);
    }
  }
  .overview-hits {
    :deep(.overview-item-avatar) {
      background-color: #f7f3fd;
      color: #c2a1ef;
    }
  }
  .overview-order {
    :deep(.overview-item-avatar) {
      background-color: #ffdead;
      color: #ffa500;
    }
  }

  .overview-sale {
    :deep(.overview-item-avatar) {
      background-color: #f0fff0;
      color: #32cd32;
    }
  }
  .avatar {
    cursor: pointer;
  }
  .trend {
    font-weight: 600;
    &.up {
      color: #19be6b;
    }
    &.down {
      color: #ed4014;
    }
    .icon {
      font-size: 16px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>
