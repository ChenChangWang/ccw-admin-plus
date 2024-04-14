import layout from "./layout";
export default {
  login: {
    registerAccount: "注册账号",
    otherLogin: "其它登录方式",
    desc: "Admin Plus 企业级中后台前端解决方案",
    autoLogin: "自动登录",
    forgotPassword: "忘记密码",
    login: "登录",
    username: "请输入用户名",
    password: "请输入密码",
  },
  open: "开",
  off: "关",
  toggle: {
    to: { locale: "切换为中文" },
  },
  form: {
    search: "查询",
    reset: "重置",
    expand: "展开",
    shrink: "收缩",
  },
  table: {
    toolbar: {
      stripe: "表格斑马纹",
      refresh: "刷新",
      queryForm: {
        expand: "展开查询",
        collapse: "收起查询",
      },
      density: "密度",
      columnSetting: "列设置",
    },
    density: {
      large: "宽松",
      default: "默认",
      small: "紧凑",
    },
  },
  ...layout,
};
