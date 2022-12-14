"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home_square/index.js";
  "./pages/home_ranking/index.js";
  "./pages/daka_login/index.js";
  "./pages/subPage/my_nft/index.js";
  "./pages/home_my/index.js";
  "./pages/subPage/take_nft/index.js";
  "./pages/subPage/share_nft/index.js";
  "./pages/subPage/nft_detail/index.js";
  "./pages/subPage/take_nft_result/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/calvinzou/Documents/Projects/dakaVs/uni_vue3_cli/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
