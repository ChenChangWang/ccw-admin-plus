<template>
  <div class="basic-form">
    <div class="page-header">
      <span class="page-header-title"> 基础表单 </span>
      <div class="page-header-container">
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。
      </div>
    </div>

    <el-card class="content-card">
      <el-row>
        <el-col
          :sm="{ span: 20, offset: 2 }"
          :md="{ span: 16, offset: 4 }"
          :xl="{ span: 12, offset: 6 }"
        >
          <el-form
            class="full-form"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            status-icon
            :label-position="labelPosition"
          >
            <el-form-item label="会议标题：" prop="title">
              <el-input
                v-model="ruleForm.title"
                placeholder="请输入标题"
                clearable
              />
            </el-form-item>
            <el-form-item label="会议内容：" prop="content">
              <el-input
                v-model="ruleForm.content"
                placeholder="请输入内容"
                clearable
              />
            </el-form-item>
            <el-form-item label="起止日期：" prop="date">
              <el-date-picker
                v-model="ruleForm.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
              />
            </el-form-item>
            <el-form-item label="会议地点：" prop="position">
              <el-select-v2
                v-model="ruleForm.position"
                placeholder="请选择会议地点"
                :options="positionOptions"
                clearable
              />
            </el-form-item>
            <el-form-item label="参会人：">
              <el-select
                v-model="ruleForm.participants"
                multiple
                placeholder="请选择参会人员"
                popper-class="participants-popper"
                clearable
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <div class="dropdown-item">
                    <el-avatar :src="item.src" :size="22" class="avatar" />
                    <span>{{ item.label }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="会议记录：">
              <el-radio-group v-model="ruleForm.record">
                <el-radio value="1">记录</el-radio>
                <el-radio value="0">不记录</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="描述：">
              <el-input
                v-model="ruleForm.desc"
                type="textarea"
                placeholder="请输入描述"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                提交
              </el-button>
              <el-button>保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useResponsive } from "@/hooks/use-responsive";
import { breakpointQueryMap } from "@/utils/media-query-listener";
import { getAssetsImage } from "@/utils/util";

defineOptions({
  name: "BasicForm", //不命名组件，keep-alive的include不属性生效
});
const labelPosition = ref("right");
const ruleFormRef = ref();
const ruleForm = reactive({
  title: "",
  content: "",
  date: "",
  position: "",
  desc: "",
  record: "1",
  participants: [],
});
const rules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  date: [
    {
      type: "array",
      required: true,
      message: "请选择起止日期",
      fields: {
        0: { type: "date", required: true, message: "请选择开始日期" },
        1: { type: "date", required: true, message: "请选择结束日期" },
      },
    },
  ],
  position: [
    {
      required: true,
      message: "请选择会议地点",
      trigger: "change",
    },
  ],
});
const positionOptions = [
  {
    value: "一号会议室",
    label: "一号会议室",
  },
  {
    value: "二号会议室",
    label: "二号会议室",
  },
  {
    value: "三号会议室",
    label: "三号会议室",
  },
  {
    value: "四号会议室",
    label: "四号会议室",
  },
];
const userOptions = [
  {
    value: "张三",
    label: "张三",
    src: getAssetsImage("people2.jpg"),
  },
  {
    value: "王五",
    label: "王五",
    src: getAssetsImage("people6.webp"),
  },
  {
    value: "李四",
    label: "李四",
    src: getAssetsImage("people3.jpg"),
  },
  {
    value: "小明",
    label: "小明",
    src: getAssetsImage("people4.jpg"),
  },
  {
    value: "小红",
    label: "小红",
    src: getAssetsImage("people5.webp"),
  },
];

useResponsive(
  (matches, query) => {
    labelPosition.value = matches === true ? "top" : "right";
  },
  { query: breakpointQueryMap.xs },
);

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
    } else {
    }
  });
};
</script>

<style scoped lang="scss">
.basic-form {
  .content-card {
    :deep(.el-form) {
      margin-top: 8px;
      .el-form-item {
        margin-bottom: 24px;
      }
    }
  }
}
</style>
<style lang="scss">
.participants-popper {
  .el-select-dropdown__item {
    padding-left: 14px;
  }
  .dropdown-item {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 12px;
    }
  }
}
</style>
