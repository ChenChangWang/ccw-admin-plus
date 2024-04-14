<template>
  <el-footer class="layout-footer">
    <div class="footer">
      <div class="footer-links">
        <el-link
          :underline="false"
          href="https://adminplus-ccw.com/"
          target="_blank"
          type="info"
        >
          {{ $t("layout.footer.website") }}
        </el-link>

        <el-link
          :underline="false"
          href="https://adminplus-ccw.com/docs/ready.html"
          target="_blank"
          type="info"
        >
          {{ $t("layout.footer.document") }}
        </el-link>

        <el-link
          :underline="false"
          href="https://gitee.com/chenchangwang/ccw-admin-plus"
          style="font-size: 16px"
          target="_blank"
          type="info"
        >
          <i class="icon">
            <Icon icon="ant-design:github-filled" />
          </i>
        </el-link>
      </div>
      <div class="footer-copyright">Copyright © 2024 黔ICP备2024022564号</div>
    </div>
  </el-footer>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<style lang="scss" scoped>
.footer {
  line-height: 1.5;
  .footer-links {
    margin-bottom: 8px;
    .el-link {
      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .footer-copyright {
    color: var(--el-text-color-regular);
  }
}
</style>
