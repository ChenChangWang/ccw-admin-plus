import { onMounted, onUnmounted, ref } from "vue";
import { useLayoutStore } from "@/store";

export default function useAutoHideHeader() {
  const visible = ref(true);
  let ticking = false;
  let oldScrollTop = 0;
  const layoutStore = useLayoutStore();

  onMounted(() => {
    document.addEventListener("scroll", handScroll, { passive: true });
  });

  onUnmounted(() => {
    document.removeEventListener("scroll", handScroll);
  });

  const handScroll = () => {
    if (!layoutStore.isAutoHideHeader) {
      return;
    }
    const scrollTop =
      document.body.scrollTop + document.documentElement.scrollTop;
    if (!ticking) {
      ticking = true;
      if (oldScrollTop > scrollTop) {
        //向上滑动
        visible.value = true;
      } else if (scrollTop > 300 && visible.value) {
        visible.value = false;
      } else if (scrollTop < 300 && !visible.value) {
        visible.value = true;
      }
      oldScrollTop = scrollTop;
      ticking = false;
    }
  };
  return { visible };
}
