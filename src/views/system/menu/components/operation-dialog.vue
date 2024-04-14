<template>
  <el-dialog v-model="model" width="720px" class="menu-dialog">
    <template #header>
      <span class="el-dialog__title">
        {{ title }}
      </span>
    </template>
    <el-form
      class="full-form"
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      status-icon
      :disabled="mode === 'view'"
    >
      <el-form-item label="上级菜单:" prop="parentIds">
        <el-cascader
          :disabled="mode === 'addChild'"
          :options="options"
          :props="upMenuProps"
          v-model="form.parentIds"
          :show-all-levels="true"
        />
      </el-form-item>

      <el-form-item label="菜单名称:" prop="menuName">
        <el-input v-model="form.menuName" placeholder="菜单名称" />
      </el-form-item>

      <el-form-item label="隐藏侧边栏:" prop="hideInMenu" v-show="!btnType">
        <el-radio-group v-model="form.hideInMenu">
          <el-radio-button :value="true">隐藏</el-radio-button>
          <el-radio-button :value="false">显示</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <div class="half-content" v-show="!btnType">
        <el-form-item label="菜单图标:" prop="icon">
          <IconSelector v-model="form.icon" />
        </el-form-item>
      </div>

      <el-form-item label="菜单类型:" prop="menuType">
        <el-radio-group v-model="form.menuType">
          <el-radio value="top" v-if="mode !== 'addChild'"> 目录 </el-radio>
          <el-radio value="menu">菜单</el-radio>
          <el-radio value="btn">按钮</el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="half-content">
        <el-form-item :label="pathLabel" prop="path" v-show="isPath">
          <el-input v-model="form.path" :placeholder="pathLabel" />
        </el-form-item>
        <el-form-item label="是否外链:" prop="isLink" v-show="!btnType">
          <el-radio-group v-model="form.isLink">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="路由参数:"
          prop="query"
          v-show="form.menuType === 'menu'"
        >
          <el-input v-model="form.query" placeholder="路由参数" />
        </el-form-item>
        <el-form-item
          label="是否缓存:"
          prop="isCache"
          v-show="form.menuType === 'menu'"
        >
          <el-radio-group v-model="form.isCache">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序:" prop="orderNum">
          <el-input-number
            v-model="form.orderNum"
            controls-position="right"
            placeholder="排序"
          />
        </el-form-item>
        <el-form-item
          label="权限标识:"
          prop="permission"
          v-show="form.menuType !== 'top'"
        >
          <el-input v-model="form.permission" placeholder="权限标识" />
        </el-form-item>
        <el-form-item label="组件路径:" prop="component" v-show="isComponent">
          <el-input v-model="form.component" placeholder="组件路径" />
        </el-form-item>
        <el-form-item label="状态:" prop="status" v-show="!btnType">
          <el-radio-group v-model="form.status" :disabled="btnType">
            <el-radio :value="true">正常</el-radio>
            <el-radio :value="false">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel()">取消</el-button>
        <el-button type="primary" @click="onSubmit()"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed, nextTick, PropType } from "vue";
import { getMenuList, SystemMenuData } from "@/api/system";
import IconSelector from "@/components/icon-selector/index.vue";
import {FormInstance} from "element-plus";

const model = defineModel();
const upMenuProps = {
  checkStrictly: true,
  label: "menuName",
  value: "id",
};
const props = defineProps({
  formData: Object as PropType<SystemMenuData>,
  mode: {
    type: String as PropType<"add" | "edit" | "addChild">,
    validator(value, props) {
      return ["add", "edit", "addChild"].includes(<string>value);
    },
  },
});
const emit = defineEmits(["onSubmit"]);
const options = ref<SystemMenuData[]>([]);
const ruleFormRef = ref<FormInstance>();
let form = reactive({
  parentIds: "",
  menuName: "",
  hideInMenu: false,
  icon: "",
  menuType: "top",
  orderNum: 1,
  isLink: false,
  path: "",
  query: "",
  isCache: true,
  permission: "",
  component: "",
  status: true,
});

const rules = reactive<{
  parentIds: [Record<string, any>];
  menuName: [Record<string, any>];
  orderNum: [Record<string, any>];
  path: [Record<string, any>];
  component: [Record<string, any>];
}>({
  parentIds: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
  menuName: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
  orderNum: [{ required: true, message: "请输入排序", trigger: "blur" }],
  path: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
  component: [{ required: true, message: "请输入组件路径", trigger: "blur" }],
});

const title = computed(() => {
  if (props.mode === "add") {
    return "新增";
  } else if (props.mode === "edit") {
    return "编辑";
  } else if (props.mode === "addChild") {
    return "新增子项";
  } else if (props.mode === "view") {
    return "查看";
  }
});

const btnType = computed(() => {
  return form.menuType === "btn";
});

const pathLabel = computed(() => {
  let result = form.isLink ? "外链地址:" : "路由地址:";
  rules.path[0].message = "请输入" + result;
  return result;
});

const isPath = computed(() => {
  let result = !btnType.value;
  rules.path[0].required = result;
  return result;
});

const isComponent = computed(() => {
  let result = form.menuType === "menu" && !form.isLink;
  rules.component[0].required = result;
  return result;
});

watch(model, (value) => {
  if (!model.value) {
    resetForm();
    return;
  }

  resetForm();
  if (props.mode !== "add") {
    nextTick(() => {
      if (props.formData) {
        Object.keys(props.formData).forEach((key) => {
          form[key] = props.formData?.[key];
        });
      }
    });
  }
});

const getMenuData = async () => {
  const { data } = await getMenuList();
  options.value = [{ menuName: "主类目", id: 0, isTop: true, children: data }];
};

getMenuData();

// =========================== 事件处理 =======================

// 重置表单
const resetForm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
};

const onCancel = () => {
  model.value = false;
};

const onSubmit = async () => {
  await ruleFormRef.value?.validate((valid, fields) => {
    if (valid) {
      emit("onSubmit", form);
    } else {
    }
  });
};
</script>

<style lang="scss">
.menu-dialog {
  .half-content {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 50%;
    }
  }
}
</style>
