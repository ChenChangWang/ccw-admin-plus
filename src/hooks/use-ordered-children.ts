import {
  isVNode,
  shallowRef,
  ComponentInternalInstance,
  VNode,
  ShallowRef,
} from "vue";
import { getChildrenElements, isComponent } from "@/utils/vNode";

const getOrderedChildren = <T>(
  nodes: VNode[],
  childComponentName: string,
  childUidMap: Record<number, T>,
): T[] => {
  let result: T[] = [];
  nodes.forEach((node: VNode) => {
    if (node.component?.uid) {
      let child = childUidMap[node.component.uid];
      if (child) {
        result.push(child);
      }
    }
  });
  return result;
};

const useOrderedChildren = <T extends { uid: number }>(
  vm: ComponentInternalInstance,
  childComponentName: string,
) => {
  const childUidMap: Record<number, T> = {};
  let nodes: VNode[] | null = null;
  const orderedChildren = shallowRef<T[]>([]);

  const addChild = (child: T) => {
    if (!nodes) {
      nodes = getChildrenElements(vm.subTree, (node: VNode): boolean => {
        return Boolean(
          isVNode(node) &&
            isComponent(node, node.type) &&
            node.type.name === childComponentName &&
            node.component,
        );
      });
    }
    childUidMap[child.uid] = child;
    orderedChildren.value = getOrderedChildren<T>(
      nodes,
      childComponentName,
      childUidMap,
    );
  };

  const removeChild = (uid: number) => {
    delete childUidMap[uid];
    orderedChildren.value = orderedChildren.value.filter(
      (children) => children.uid !== uid,
    );
  };

  return {
    children: orderedChildren,
    addChild,
    removeChild,
  };
};

export default useOrderedChildren;
