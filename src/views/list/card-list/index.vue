<template>
  <div class="card-list">
    <div class="page-header">
      <span class="page-header-title"> 卡片列表 </span>
      <div class="page-header-container">
        段落示意：卡片类型的列表，配合栅格实现响应式布局。
      </div>
    </div>
    <el-row :gutter="12" class="list-grid">
      <el-col v-bind="attarSpan">
        <el-button class="list-item btn-dashed list-item-btn">
          <Icon icon="mingcute:add-fill" />
          <span>新增卡片</span>
        </el-button>
      </el-col>
      <el-col v-bind="attarSpan" v-for="item in dataList">
        <el-card shadow="hover" class="list-item">
          <div class="cart-item">
            <div class="cart-item-avatar">
              <el-avatar :size="50" :src="item.url" />
            </div>
            <div class="cart-item-detail">
              <div class="card-item-title">{{ item.title }}</div>
              <div class="card-item-description">
                <el-text line-clamp="4">
                  {{ item.content }}
                </el-text>
              </div>
            </div>
          </div>
          <template #footer>
            <el-link :underline="false">操作一</el-link>
            <el-link :underline="false">操作二</el-link>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { getAssetsImage } from "@/utils/util";

defineOptions({
  name: "CardList", //不命名组件，keep-alive的include不属性生效
});

const attarSpan = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 6,
};
const dataList = [
  {
    title: "Vue",
    content:
      "易学易用，性能出色，适用场景丰富的 Web 前端框架。基于标准 HTML、CSS 和 JavaScript 构建，提供容易上手的 API 和一流的文档。",
    url: getAssetsImage("vue.png"),
  },
  {
    title: "React",
    content:
      "React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据变动时 React 能高效更新并渲染合适的组件。构建管理自身状态的封装组件，然后对其组合以构成复杂的 UI。",
    url: getAssetsImage("react.png"),
  },
  {
    title: "Bootstrap ",
    content: "简洁、直观、强悍的前端开发框架，让web开发更迅速、简单。",
    url: getAssetsImage("bootstrap.png"),
  },
  {
    title: "Angular ",
    content:
      "Angular是一个应用设计框架与开发平台，用于创建高效、复杂、精致的单页面应用，通过新的属性和表达式扩展了 HTML，实现一套框架，多种平台，移动端和桌面端。Angular有着诸多特性，最为核心的是：MVVM、模块化、自动化双向数据绑定、语义化标签、依赖注入等等。",
    url: getAssetsImage("angular.png"),
  },
  {
    title: "Webpack ",
    content:
      "webpack 是代码编译工具，有入口、出口、loader 和插件。webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。",
    url: getAssetsImage("webpack.png"),
  },
  {
    title: "Vite ",
    content:
      "vite是下一代前端开发与构建工具。 Vite意在提供开箱即用的配置，同时它的插件API和JavaScript API 带来了高度的可扩展性，并有完整的类型支持。",
    url: getAssetsImage("vite.png"),
  },
  {
    title: "Element Plus",
    content:
      "Element Plus 是一个基于 Vue 3 的高质量 UI 组件库。它包含了丰富的组件和扩展功能，例如表格、表单、按钮、导航、通知等，让开发者能够快速构建高质量的 Web 应用。Element Plus 的设计理念是：提供开箱即用的 UI 组件和扩展功能，帮助开发者快速构建应用程序，同时提供详细的文档和教程，让开发者更好地掌握和使用 Element Plus。",
    url: getAssetsImage("element.png"),
  },
  {
    title: "Ant Design",
    content:
      "Ant Design 是一个基于 React 的 UI 组件库，它提供了一套丰富的组件和样式，能够帮助开发者快速搭建出美观、高效的用户界面。本文将对 Ant Design 进行介绍，包括其特点、使用方法以及应用场景。",
    url: getAssetsImage("antd.png"),
  },
  {
    title: "Sass",
    content:
      "Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅。使用 Sass 以及 Sass 的样式库（如 Compass）有助于更好地组织管理样式文件，以及更高效地开发项目。",
    url: getAssetsImage("sass.png"),
  },
  {
    title: "Less",
    content:
      "Less 是一门CSS预处理语言，它扩充了CSS语言，增加了诸如变量、混合（mixin）、函数等功能，让CSS更易维护、方便制作主题、扩充。Less可以运行在Node.js或浏览器端",
    url: getAssetsImage("less.png"),
  },
];

/*const responsive = {
  ["xl"]: { cols: 4, rowGap: 12, colGap: 12 },
  ["lg"]: { cols: 3, rowGap: 12, colGap: 12 },
  ["sm"]: { cols: 2, rowGap: 12, colGap: 12 },
  ["xs"]: { cols: 1, rowGap: 12, colGap: 12 },
};*/
</script>

<style scoped lang="scss">
.card-list {
  .list-grid {
    margin-top: 12px;
    > .el-col {
      margin-bottom: 12px;
    }
    .list-item {
      background-color: var(--el-bg-color);
      height: 200px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      &.list-item-btn {
        width: 100%;
        span {
          margin-left: 8px;
        }
      }
      &:hover {
        .card-item-title {
          color: var(--el-color-primary);
        }
      }
      /*aspect-ratio: 16 / 9;*/
      :deep(.el-card__body) {
        flex: 1;
        padding: 12px 16px;
        .cart-item {
          display: flex;
          .cart-item-avatar {
            margin-right: 16px;
          }
          .cart-item-detail {
            flex: 1;
            .card-item-title {
              margin-bottom: 8px;
              font-weight: 600;
              font-size: 16px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .card-item-description {
              line-height: 1.5;
              .el-text {
                margin-bottom: 12px;
              }
            }
          }
        }
      }
      :deep(.el-card__footer) {
        display: flex;
        padding: 12px 0;
        > a {
          width: 50%;
          &:first-of-type {
            border-right: 1px solid var(--el-border-color);
          }
        }
      }
    }
  }
}
</style>
