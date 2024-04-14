<template>
  <el-card class="activities content-card">
    <template #header>
      <span>动态</span>
    </template>
    <List>
      <ListItem v-for="(item, index) in dataList" :key="item.id">
        <ListItemMeta :avatar="item.user.avatar">
          <template #title>
            <span class="item-title-use"> {{ item.user.name }}</span>
            <MetaTitle :data="item" />
          </template>
          <template #description>
            {{ item.time }}
          </template>
        </ListItemMeta>
      </ListItem>
    </List>
  </el-card>
</template>
<script setup lang="tsx">
import { List, ListItem, ListItemMeta } from "@/components/list";

const dataList = [
  {
    id: "id1",
    time: "2024-1-05 12:20:25",
    user: {
      name: "张三",
      avatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    },
    group: {
      name: "高科技团",
      link: "https://element-plus.org/zh-CN/",
    },
    project: {
      name: "高科技项目",
      link: "https://element-plus.org/zh-CN/",
    },
    template: "在 @{group} 新建项目 @{project}",
  },
  {
    id: "id2",
    time: "2024-1-11 14:26:02",
    user: {
      name: "王小明",
      avatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    },
    issue: {
      name: "Table 宽度无限延长问题",
      link: "https://element-plus.org/zh-CN/",
    },
    template: "提出问题 @{issue}",
  },
  {
    id: "id3",
    time: "2024-1-06 16:28:01",
    user: {
      name: "郑十二",
      avatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    },
    issue: {
      name: "Table 可以合并单元格吗",
      link: "https://element-plus.org/zh-CN/",
    },
    template: "关闭了问题 @{issue}",
  },
  {
    id: "id4",
    time: "2024-1-12 15:10:11",
    user: {
      name: "李四",
      avatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    },
    followUser: {
      name: "王无",
      link: "https://element-plus.org/zh-CN/",
    },
    template: "关注了 @{followUser}",
  },
  {
    id: "id5",
    time: "2024-1-05 12:20:25",
    user: {
      name: "吴十一",
      avatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    },
    group: {
      name: "XX项目",
      link: "https://element-plus.org/zh-CN/",
    },
    leave: {
      name: "留言",
      link: "https://element-plus.org/zh-CN/",
    },
    template: "在 @{group} 发布了 @{leave}",
  },
  {
    id: "id6",
    time: "2024-1-01 12:20:25",
    user: {
      name: "代码狂人",
      avatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    },
    essay: {
      name: "怎么优化 Table 性能",
      link: "https://element-plus.org/zh-CN/",
    },
    template: "发表文章 @{essay}",
  },
  {
    id: "id7",
    time: "2024-1-05 12:20:25",
    user: {
      name: "程序猿大魔王",
      avatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    },
    author: {
      name: "代码狂人",
      link: "https://element-plus.org/zh-CN/",
    },
    essay: {
      name: "怎么优化 Table 性能",
      link: "https://element-plus.org/zh-CN/",
    },
    template: "回复了 @{author} 的文章 @{essay}",
  },
];
function MetaTitle(props, context) {
  const { data } = props;
  return data.template.split(/@\{([^{}]*)\}/gi).map((key) => {
    if (data[key]) {
      const value = data[key];
      return (
        <el-link
          type="primary"
          underline={false}
          href={value?.link}
          key={value?.name}
          style={{ margin: "0 5px" }}
        >
          {value.name}
        </el-link>
      );
    }
    return key;
  });
}
</script>

<style scoped lang="scss">
.activities {
  &.content-card:deep(.el-card__body) {
    padding-top: 0;
  }

  .item-title-use {
    font-weight: 600;
    margin-right: 5px;
    font-size: 15px;
  }
  :deep(.list) {
    .list-item {
      .list-item-meta-title {
        display: flex;
        align-items: center;
      }
      .list-item-meta-description {
        font-size: 13px;
      }
    }
  }
}
</style>
