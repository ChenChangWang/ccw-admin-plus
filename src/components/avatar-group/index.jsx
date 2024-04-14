import { defineComponent, ref, isVNode } from "vue";
import { getChildrenElements } from "@/utils/vNode";
import "./index.scss";
export default defineComponent(
  (props, { slots }) => {
    const children =
      slots && slots.default ? getChildrenElements(slots.default()) : [];
    const avatarsRender =
      props.maxCount > 0 ? children.slice(0, props.maxCount) : children;
    const avatarsOther =
      props.maxCount > 0 ? children.slice(props.maxCount) : [];

    return () => (
      <div class="avatar-group">
        {avatarsRender}
        {avatarsOther.length > 0 && (
          <el-avatar class="count-avatar">+{avatarsOther.length}</el-avatar>
        )}
      </div>
    );
  },
  {
    name: "AvatarGroup",
    props: {
      maxCount: {
        type: Number,
        default: 0,
      },
    },
  },
);
