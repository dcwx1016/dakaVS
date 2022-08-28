"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => {
      if (wx.getStorageSync("phone") && wx.getStorageSync("token"))
        ;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(_ctx.title)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/calvinzou/Documents/Projects/dakaVs/uni_vue3_cli/src/pages/home_nft/index.vue"]]);
wx.createPage(MiniProgramPage);
