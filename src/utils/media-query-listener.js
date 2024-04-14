//这是常用的一些
export const breakpointArray = ["xs", "sm", "md", "lg", "xl", "xxl"];
export const breakpointSizeMap = {
  xs: 575, //非常小的屏幕尺寸，通常用于智能手机
  sm: 576, //小屏幕尺寸，可能用于智能手机或者小型平板电
  md: 768, //中等屏幕尺寸，通常用于平板电脑或小型笔记本电脑
  lg: 992, //大屏幕尺寸，可能用于笔记本电脑或台式电脑显示器
  xl: 1200, //非常大的屏幕尺寸
  xxl: 1600, //非常大的屏幕尺寸
};
export const breakpointQueryMap = {
  xs: `(max-width:${breakpointSizeMap["xs"]}px)`, //非常小的屏幕尺寸，通常用于智能手机
  sm: `(min-width:${breakpointSizeMap["sm"]}px)`, //小屏幕尺寸，可能用于智能手机或者小型平板电
  md: `(min-width:${breakpointSizeMap["md"]}px)`, //中等屏幕尺寸，通常用于平板电脑或小型笔记本电脑
  lg: `(min-width:${breakpointSizeMap["lg"]}px)`, //大屏幕尺寸，可能用于笔记本电脑或台式电脑显示器
  xl: `(min-width:${breakpointSizeMap["xl"]}px)`, //非常大的屏幕尺寸
  xxl: `(min-width:${breakpointSizeMap["xxl"]}px)`, //非常大的屏幕尺寸
};

let subscriberMaps = {};
let uid = -1;

const mediaQueryListener = {
  mediaQueryHandlers: {},
  keepMatches: {},

  dispatch(matches, query) {
    this.keepMatches[query] = matches;
    const subscribers = subscriberMaps[query];
    subscribers.forEach(({ func }) => {
      func(matches, query);
    });
  },

  subscribe(query, func, immediate = false) {
    const subscribers = subscriberMaps[query];
    //没有订阅过改query的事件，那么先去注册
    if (!subscribers || !subscribers.length) {
      this.register(query);
      subscriberMaps[query] = [];
    }
    const token = (++uid).toString();
    subscriberMaps[query].push({ token, func });
    if (immediate === true) {
      func(this.keepMatches[query], query);
    }
    return () => {
      this.unsubscribe(query, token);
    };
  },

  unsubscribe(query, token) {
    subscriberMaps[query] = subscriberMaps[query].filter(
      (item) => item.token !== token,
    );
    if (subscriberMaps[query].length === 0) {
      this.unregister(query);
      delete subscriberMaps[query];
    }
  },

  unregister(query) {
    const handler = this.mediaQueryHandlers[query];
    if (!handler) {
      return;
    }
    const { mql, listener } = handler;
    if (mql && listener) {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", listener);
      } else {
        mql.addListener(listener);
      }
    }
    delete this.mediaQueryHandlers[query];
  },

  register(query) {
    const listener = ({ media, matches }) => {
      this.dispatch(matches, query);
    };

    const mql = window.matchMedia(query);
    if (mql.addEventListener) {
      mql.addEventListener("change", listener);
    } else {
      mql.addListener(listener);
    }
    this.keepMatches[query] = mql.matches;
    this.mediaQueryHandlers[query] = { mql, listener };
  },
};

export default mediaQueryListener;
