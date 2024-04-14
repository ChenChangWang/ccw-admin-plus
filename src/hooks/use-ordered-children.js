import { isVNode, shallowRef, ref } from "vue";
import { getChildrenElements } from "@/utils/vNode";

const getOrderedChildren = (nodes, childComponentName, childUidMap) => {
  let result = [];
  nodes.forEach((node) => {
    if (node.component.uid) {
      let child = childUidMap[node.component.uid];
      if (child) {
        result.push(child);
      }
    }
  });
  return result;
};
const useOrderedChildren = (vm, childComponentName) => {
  const childUidMap = {};
  let nodes = null;
  const orderedChildren = shallowRef([]);

  const addChild = (child) => {
    if (!nodes) {
      nodes = getChildrenElements(vm.subTree, (node) => {
        return (
          isVNode(node) &&
          node.type?.name === childComponentName &&
          node.component
        );
      });
    }
    childUidMap[child.uid] = child;
    orderedChildren.value = getOrderedChildren(
      nodes,
      childComponentName,
      childUidMap,
    );
  };

  const removeChild = (uid) => {
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
