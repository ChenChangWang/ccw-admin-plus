<template>
  <div class="profile-basic">
    <div class="page-header">
      <span class="page-header-title"> 基础详情页 </span>
    </div>

    <el-card class="content-card" style="margin-top: 14px">
      <el-descriptions title="个人信息" :column="responsiveState.column">
        <el-descriptions-item label="姓名：" width="150px">
          管理员
        </el-descriptions-item>
        <el-descriptions-item label="性别：" width="150px">
          男
        </el-descriptions-item>
        <el-descriptions-item label="生日：" width="150px">
          1998-11-16
        </el-descriptions-item>
        <el-descriptions-item label="邮箱：" width="150px">
          1337348010@qq.com
        </el-descriptions-item>
        <el-descriptions-item label="地址：" width="150px">
          贵州-贞丰
        </el-descriptions-item>
      </el-descriptions>

      <el-divider />

      <el-descriptions title="用户信息" :column="responsiveState.column">
        <el-descriptions-item label="用户姓名：" width="150px">
          王小二
        </el-descriptions-item>
        <el-descriptions-item label="联系电话：" width="150px">
          15896074140
        </el-descriptions-item>
        <el-descriptions-item label="常用快递：" width="150px">
          顺丰、京东
        </el-descriptions-item>
        <el-descriptions-item label="取货地址：" width="150px">
          XX省XX市XX路14号
        </el-descriptions-item>
        <el-descriptions-item label="备注：" width="150px">
          无
        </el-descriptions-item>
      </el-descriptions>

      <el-divider />

      <el-descriptions title="商品列表"> </el-descriptions>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="商品编号" min-width="100" />
        <el-table-column prop="name" label="商品名称" min-width="120" />
        <el-table-column prop="barcode" label=" 品条码" min-width="120" />
        <el-table-column prop="price" label="单价" min-width="80" />
        <el-table-column prop="num" label="数量" min-width="70" />
        <el-table-column prop="amount" label="金额" min-width="80" />
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useResponsiveState } from "@/hooks/use-responsive-state";

defineOptions({
  name: "Basic", //不命名组件，keep-alive的include不属性生效
});

const responsiveState = useResponsiveState(
  {
    ["lg"]: { column: 3 },
    ["sm"]: { column: 2 },
    ["xs"]: { column: 1 },
  },
  {
    column: 3,
  },
);

const tableData = [
  {
    id: 1234561,
    name: "方便面",
    barcode: "1234567891231", //商品条码
    price: "4.5",
    num: 12,
    amount: "54",
  },
  {
    id: 1234562,
    name: "好吃的辣条",
    barcode: "1234567891232", //商品条码
    price: "3",
    num: 13,
    amount: "39",
  },
  {
    id: 1234563,
    name: "加多宝",
    barcode: "1234567891233", //商品条码
    price: "5",
    num: 120,
    amount: "600",
  },
  {
    id: 1234564,
    name: "好吃的薯片",
    barcode: "1234567891234", //商品条码
    price: "2",
    num: 56,
    amount: "112",
  },
  {
    id: 1234565,
    name: "好喝的啤酒",
    barcode: "1234567891235", //商品条码
    price: "6",
    num: 11,
    amount: "66",
  },
];
</script>

<style scoped lang="scss">
.profile-basic {
  :deep(.el-descriptions) {
    .el-descriptions__body {
      .el-descriptions__cell {
        .el-descriptions__label {
          margin-right: 0;
        }
      }
    }
  }
  :deep(.el-table) {
    margin-bottom: 24px;
    .el-table__header {
      .cell {
        color: var(--el-text-color-regular);
      }
    }
  }
}
</style>
