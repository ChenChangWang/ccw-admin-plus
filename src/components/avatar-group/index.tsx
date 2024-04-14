import { defineComponent } from "vue";
import { getChildrenElements } from "@/utils/vNode";
import "./index.scss";

interface Props {
  maxCount: number;
}
export default defineComponent(
  (props: Props, { slots }) => {
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
