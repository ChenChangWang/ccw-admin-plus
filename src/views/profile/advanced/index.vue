<template>
  <div class="advanced-basic">
    <div class="page-header">
      <span class="page-header-title"> 订单单号：5211354123164</span>

      <div class="page-header-container">
        <div class="page-header-content">
          <el-descriptions :column="responsiveState1.column" title="">
            <el-descriptions-item label="创建人：" width="150px">
              陈昌望
            </el-descriptions-item>
            <el-descriptions-item label="创建时间：" width="150px">
              2024-01-01
            </el-descriptions-item>
            <el-descriptions-item label="联系电话：" width="150px">
              15896074140
            </el-descriptions-item>
            <el-descriptions-item label="备注：" width="150px">
              请于两个工作日确认
            </el-descriptions-item>
            <el-descriptions-item label="生效日期：" width="150px">
              2024-01-01 ~ 2024-01-10
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="page-header-extra">
          <div v-for="item in headerExtraList" class="statistic-item">
            <div class="statistic-title">{{ item.title }}</div>
            <div class="statistic-content">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <el-card class="content-card" style="margin-top: 14px">
      <template #header>
        <span>审核进度</span>
      </template>
      <el-steps :active="2" align-center>
        <el-step description="申请人：陈昌望" title="申请" />
        <el-step description="审批人：管理员" title="审批" />
        <el-step description="审批人：管理员" title="完成" />
      </el-steps>
    </el-card>

    <el-card class="content-card" style="margin-top: 14px">
      <template #header>
        <span>基本信息</span>
      </template>
      <el-descriptions :column="responsiveState2.column" title="">
        <el-descriptions-item label="商品名称：" width="150px">
          XX笔记本电脑
        </el-descriptions-item>
        <el-descriptions-item label="价格：" width="150px">
          {{ numeral(6768).format("0,0") }}
        </el-descriptions-item>
        <el-descriptions-item label="数量：" width="150px">
          1
        </el-descriptions-item>
        <el-descriptions-item label="运费：" width="150px">
          {{ numeral(56324).format("0,0") }}
        </el-descriptions-item>
        <el-descriptions-item label="总价：" width="150px">
          {{ numeral(6773).format("0,0") }}
        </el-descriptions-item>
        <el-descriptions-item label="收货地址：" width="150px">
          XX省XX市XX路14号
        </el-descriptions-item>
        <el-descriptions-item label="联系电话：" width="150px">
          15896074140
        </el-descriptions-item>
        <el-descriptions-item label="支付方式：" width="150px">
          支付宝
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="content-card" style="margin-top: 14px">
      <template #header>
        <span>用户信息</span>
      </template>
      <el-descriptions :column="responsiveState2.column" title="">
        <el-descriptions-item label="用户姓名：" width="150px">
          王小二
        </el-descriptions-item>
        <el-descriptions-item label="身份证：" width="150px">
          522325199811161234
        </el-descriptions-item>
        <el-descriptions-item label="联系电话：" width="150px">
          15896074140
        </el-descriptions-item>
        <el-descriptions-item label="联系地址：" width="150px">
          XX省XX市XX路14号
        </el-descriptions-item>
        <el-descriptions-item label="备注：" width="150px">
          无
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="content-card" style="margin-top: 14px">
      <template #header>
        <span>用户记录</span>
      </template>
      <el-empty description="暂无数据" />
    </el-card>

    <el-card class="content-card" style="margin-top: 14px">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane
          v-for="item in operationTabList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          <el-table :data="tableData[activeName]" stripe style="width: 100%">
            <el-table-column label="操作类型" min-width="120" prop="type" />
            <el-table-column label="操作人" min-width="120" prop="name" />
            <el-table-column label=" 执行结果" min-width="120" prop="status">
              <template #default="scope">
                <span :class="['circle', scope.row.status]"></span>
                {{ scope.row.status === "success" ? "成功" : "驳回" }}
              </template>
            </el-table-column>
            <el-table-column label="操作时间" min-width="170" prop="date" />
            <el-table-column label="备注" min-width="120" prop="remark" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useResponsiveState } from "@/hooks/use-responsive-state";
import { toYuan, toK } from "@/utils/util";
import numeral from "numeral";

defineOptions({
  name: "Advanced", //不命名组件，keep-alive的include不属性生效
});
const headerExtraList = [
  {
    title: "状态",
    content: "待审批",
  },
  {
    title: "订单金额",
    content: toYuan(6773),
  },
];
const operationTabList = [
  {
    label: "操作日志一",
    name: "tab1",
  },
  {
    label: "操作日志二",
    name: "tab2",
  },
  {
    label: "操作日志三",
    name: "tab3",
  },
];
const activeName = ref("tab1");
const tableData = {
  tab1: [
    {
      type: "提交订单",
      name: "张三",
      status: "success",
      date: "2024-01-05 19:30:03",
      remark: "-",
    },
    {
      type: "创建订单",
      name: "小明",
      status: "error",
      date: "2024-01-04 14:32:13",
      remark: "-",
    },
    {
      type: "财务审核",
      name: "王小二",
      status: "success",
      date: "2024-01-15 13:32:33",
      remark: "通过",
    },
    {
      type: "部门初审",
      name: "李四",
      status: "error",
      date: "2024-01-13 12:33:01",
      remark: "不通过",
    },
    {
      type: "财务复审",
      name: "小红",
      status: "success",
      date: "2024-01-06 12:30:00",
      remark: "通过",
    },
  ],
  tab2: [
    {
      type: "财务审核",
      name: "王小二",
      status: "success",
      date: "2024-01-15 13:32:33",
      remark: "通过",
    },
  ],
  tab3: [
    {
      type: "创建订单",
      name: "小明",
      status: "error",
      date: "2024-01-04 14:32:13",
      remark: "-",
    },
    {
      type: "部门初审",
      name: "李四",
      status: "error",
      date: "2024-01-13 12:33:01",
      remark: "不通过",
    },
  ],
};
const responsiveState1 = useResponsiveState(
  {
    ["lg"]: { column: 2 },
    ["sm"]: { column: 2 },
    ["xs"]: { column: 1 },
  },
  {
    column: 3,
  },
);
const responsiveState2 = useResponsiveState(
  {
    ["lg"]: { column: 3 },
    ["sm"]: { column: 2 },
    ["xs"]: { column: 1 },
  },
  {
    column: 3,
  },
);
</script>

<style lang="scss" scoped>
@use "@/assets/styles/var" as var;

.advanced-basic {
  :deep(.content-card) {
    .el-card__header {
      font-size: 15px;
      color: var(--el-text-color-primary);
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
  :deep(.el-descriptions) {
    width: 100%;
    .el-descriptions__body {
      .el-descriptions__cell {
        .el-descriptions__label {
          margin-right: 0;
        }
      }
    }
  }
  .page-header {
    .page-header-container {
      display: flex;
      .page-header-content {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
      }
      .page-header-extra {
        flex: 0 1 auto;
        margin-left: 24px;
        display: flex;
        column-gap: 40px;
        .statistic-item {
          .statistic-title {
            color: var(--el-text-color-secondary);
          }
          .statistic-content {
            font-size: 18px;
            margin-top: 10px;
            color: var(--el-text-color-primary);
          }
        }
      }
    }
  }
}
@media (max-width: var.$sm) {
  .advanced-basic {
    .page-header {
      .page-header-container {
        display: block;
        .page-header-extra {
          margin-top: 10px;
          margin-left: 0;
          text-align: left;
        }
      }
    }
  }
}
</style>
