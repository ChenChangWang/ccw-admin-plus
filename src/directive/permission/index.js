import { useUserStore } from "@/store";

export default {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding) {
    const { value } = binding;
    const userStore = useUserStore();
    const permission = userStore.userInfo.permission;
    if (Array.isArray(value) && value.length > 0) {
      const hasPermission = value.some((role) => permission.indexOf(role) > -1);
      if (!hasPermission && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  },
};
