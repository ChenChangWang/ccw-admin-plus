<template>
  <el-form
    :label-position="formContext.labelPosition"
    :inline="true"
    ref="formRef"
  >
    <el-row ref="resizeRef" class="query-form-row" :gutter="gutter">
      <slot />
      <el-col :span="controlSpan" v-if="isControl" class="form-item-control">
        <el-form-item>
          <template #label v-if="isControlLabel"> &nbsp; </template>
          <slot
            name="control"
            :collapse="collapse"
            :overflow="overflow"
            :toggleCollapse="toggleCollapse"
          />
          <div
            v-if="overflow"
            class="query-collapse-button"
            @click="toggleCollapse()"
          >
            <el-button type="primary" link>
              {{ collapse ? $t("form.expand") : $t("form.shrink") }}
              <i class="icon">
                <Icon :icon="collapse ? 'uiw:down' : 'uiw:up'" />
              </i>
            </el-button>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
import {
  ref,
  defineProps,
  watch,
  computed,
  provide,
  getCurrentInstance,
  PropType,
} from "vue";
import { useResize } from "@/hooks/use-resize";
import {
  BreakpointsSpan,
  LabelPosition,
  useSpanConfig,
} from "@/components/query-form/hook/use-span-config";
import useOrderedChildren from "@/hooks/use-ordered-children";
import { beforeDebounce } from "@/utils/util";
import { Icon } from "@iconify/vue";
import type { ResizeCallBack } from "@/utils/resizeEvent.ts";
import type { RowInstance, FormInstance } from "element-plus";
import type {
  FormItemData,
  QueryFormProvide,
} from "@/components/query-form/constants.ts";
import { formContextKey } from "@/components/query-form/constants";


const props = defineProps({
  labelPosition: {
    type: String as PropType<LabelPosition>,
    values: ["left", "right", "top"],
    default: "right",
  },
  span: {
    type: [Number, Array] as PropType<number | BreakpointsSpan>,
    default: null,
  },
  gutter: {
    type: Number,
    default: 16,
  },
  isControl: {
    type: Boolean,
    default: false,
  },
});
const formRef = ref<FormInstance>();
const width = ref();
const resizeRef = ref<RowInstance>();
const collapse = ref(true);
const overflow = ref(false);
const formContext = useSpanConfig(width, props.span, props.labelPosition);
const instance = getCurrentInstance();
const {
  children: formItems,
  addChild: registerForm,
  removeChild: unregisterForm,
} = useOrderedChildren<FormItemData>(instance!, "QueryFormItem");

const setWidth = beforeDebounce(({ target }) => {
  const client = target.getBoundingClientRect();
  width.value = client.width;
}, 10);

useResize(resizeRef, setWidth as ResizeCallBack);

provide<QueryFormProvide>(formContextKey, {
  formItems,
  registerForm,
  unregisterForm,
  form: formContext,
  overflow: overflow.value,
});

const controlSpan = computed(() => {
  const { span } = formContext.value;
  return span;
});

const isControlLabel = computed(() => {
  const { span, labelPosition } = formContext.value;
  if (span === 24 && labelPosition === "top") {
    return false;
  }
  return true;
});

watch([collapse, formContext.value, () => formItems.value], () => {
  if (props.isControl !== true) {
    return;
  }
  const span = formContext.value.span;
  const contentSpan = span;
  let spanSum = contentSpan;
  overflow.value = false;
  formItems.value.forEach((item, index) => {
    item.index = index;
    spanSum += span;

    item.visible = false;
    if (spanSum > 24) {
      overflow.value = true;
      if (collapse.value && index > 0) {
        item.visible = true;
      }
    }
  });
});

const toggleCollapse = () => {
  collapse.value = !collapse.value;
};

defineExpose({
  formRef,
});
</script>

<style scoped lang="scss">
.query-form-row {
  width: 100%;
  /* row-gap: 24px;*/
  .form-item-control {
    margin-right: 0;
    margin-left: auto;
    display: inline-flex;
    align-items: start;
    justify-content: end;

    :deep(.el-form-item) {
      margin-right: 0;
      .el-form-item__label {
        flex: 0 1 auto;
      }
      .el-form-item__content {
        flex: 1 0 auto;
      }
      .el-button + .el-button {
        margin-left: 12px;
      }
      .query-collapse-button {
        margin-left: 12px;
        > button {
          letter-spacing: 1px;
        }
        .icon {
          margin-left: 4px;
        }
      }
    }
  }
  :deep(.query-form-item) {
    box-sizing: border-box;
    .el-form-item {
      margin-bottom: 24px;
      margin-right: 0;
      width: 100%;
      .el-form-item__content {
        .el-input,
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>
