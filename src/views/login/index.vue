<template>
  <div class="login">
    <div class="login-header">
      <Language />
    </div>
    <div class="container">
      <div class="login-top">
        <div class="login-top-header">
          <img :src="logo" />
          <span class="login-logo-title">Ccw Admin Plus</span>
        </div>
        <div class="login-logo-desc">{{ $t("login.desc") }}</div>
      </div>
      <div class="login-main">
        <LoginForm />
      </div>
      <div class="login-other">
        <span class="login-other-label">
          {{ $t("login.otherLogin") }}
        </span>
        <img v-for="(src, index) in imgs" :src="src" :key="index" />
        <el-link type="primary" :underline="false" style="float: right">
          {{ $t("login.registerAccount") }}
        </el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import LoginForm from "./components/login-form.vue";
import Language from "@/layout/components/header-bar/language.vue";
import logo from "@/assets/images/logo.png";
import { getAssetsImage } from "@/utils/util";
const imgs = [
  getAssetsImage("weChat.png"),
  getAssetsImage("qq.png"),
  getAssetsImage("alipay.png"),
];
</script>

<style scoped lang="scss">
@use "@/assets/styles/var" as var;

.login {
  height: 100vh;
  overflow: auto;
  background-size: 100% 100%;
  //background-image: url("../../assets/images/login-bg.png");
  .login-header {
    position: fixed;
    right: 24px;
    top: 16px;
    :deep(.el-dropdown) {
      cursor: pointer;
      .action-language {
        outline: none;
        font-size: 16px;
      }
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    padding: 92px 0 32px 0;
    width: 380px;
    margin: 0 auto;
    @media (max-width: var.$sm) {
      width: 90%;
    }
    .login-top {
      text-align: center;
      padding: 32px 0px;
      .login-top-header {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        line-height: 44px;
        > img {
          height: 44px;
          margin-right: 16px;
        }
        .login-logo-title {
          font-weight: 600;
          font-size: 32px;
        }
      }
      .login-logo-desc {
        margin-top: 22px;
        color: var(--el-text-color-secondary);
      }
    }
    .login-main {
    }
    .login-other {
      text-align: left;
      .login-other-label {
        color: var(--el-text-color-regular);
      }
      > img {
        width: 22px;
        margin-left: 16px;
        vertical-align: middle;
        opacity: 0.6;
        transition: all 0.2 ease-in-out;
        cursor: pointer;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
