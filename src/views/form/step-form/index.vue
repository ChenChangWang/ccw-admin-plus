<template>
  <div class="step-form">
    <div class="page-header">
      <span class="page-header-title"> 分布表单 </span>
      <div class="page-header-container">
        将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
      </div>
    </div>

    <el-card class="content-card">
      <el-row>
        <el-col
          :sm="{ span: 20, offset: 2 }"
          :md="{ span: 16, offset: 4 }"
          :lg="{ span: 12, offset: 6 }"
          :xl="{ span: 12, offset: 6 }"
        >
          <el-steps :active="active" align-center>
            <el-step>
              <template #title> 填写转账信息 </template>
            </el-step>
            <el-step description="">
              <template #title> 确定转账信息</template>
            </el-step>
            <el-step description="">
              <template #title> 完 成 </template>
            </el-step>
          </el-steps>
        </el-col>
      </el-row>

      <keep-alive>
        <WriteInfo v-if="active === 1" @handleStep="handleStep" />
        <ConfirmInfo
          v-else-if="active === 2"
          @handleStep="handleStep"
          :submitData="submitData"
        />
        <Success
          v-else-if="active === 3"
          @handleStep="handleStep"
          :submitData="submitData"
        />
      </keep-alive>

      <el-divider />

      <div class="alert-info">
        <div class="alert-message">说明</div>
        <div class="alert-desc">
          <p>支付宝</p>
          <span>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </span>
          <p>微信</p>
          <span>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import WriteInfo from "./components/write-info.vue";
import ConfirmInfo from "./components/confirm-info.vue";
import Success from "./components/success.vue";
import { HandleType, SubmitData } from "./types.ts";

defineOptions({
  name: "StepForm", //不命名组件，keep-alive的include不属性生效
});

const active = ref(1);
const submitData = ref<SubmitData>({});

const handleStep = (type: HandleType, data: SubmitData) => {
  if (type === "forward") {
    submitData.value = { ...submitData.value, ...data };
    active.value += 1;
  } else if (type === "backward") {
    active.value -= 1;
  } else if (type === "set") {
    active.value = data;
  }
};
</script>

<style scoped lang="scss">
.step-form {
  :deep(.el-steps) {
    margin-top: 12px;
    margin-bottom: 20px;
    .el-step__title {
      font-size: 14px;
    }
  }
  .alert-info {
    .alert-message {
      font-size: 16px;
      color: var(--el-text-color-primary);
      margin-bottom: 18px;
    }
    .alert-desc {
      > p {
        font-size: 13px;
        margin: 8px 0;
      }
      > span {
        margin-bottom: 18px;
        display: block;
      }
    }
  }
}
</style>
