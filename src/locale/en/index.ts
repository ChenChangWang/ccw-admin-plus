import layout from "./layout";
export default {
  login: {
    registerAccount: "Register Account",
    otherLogin: "Other Login",
    desc: "Admin Plus Enterprise level backend front-end solution",
    autoLogin: "Auto Login",
    forgotPassword: "Forgot Password",
    login: "Login",
    username: "Please input username",
    password: "Please input password",
  },
  open: "open",
  off: "off",
  toggle: {
    to: { locale: "Switch to English" },
  },
  form: {
    search: "Search",
    reset: "Reset",
    expand: "Expand",
    shrink: "Shrink",
  },
  table: {
    toolbar: {
      stripe: "Table Stripe ",
      refresh: "Refresh",
      queryForm: {
        expand: "Expand  Query",
        collapse: "Collapse  Query",
      },
      density: "Density",
      columnSetting: "Column Setting",
    },
    density: {
      large: "Loose",
      default: "Default",
      small: "Compact",
    },
  },
  ...layout,
};
