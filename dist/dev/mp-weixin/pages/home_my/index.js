"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.computed$1(() => wx.getStorageSync("name") || "\u540D\u79F0\u6682\u65E0");
    const address = common_vendor.computed$1(() => wx.getStorageSync("confluxaddress") || "--");
    const alertValid = () => {
    };
    const copyAddress = (add) => {
      wx.setClipboardData({
        data: add,
        success(res) {
          wx.getClipboardData({
            success(res2) {
              console.log(res2.data);
            }
          });
        }
      });
    };
    const goNft = () => {
      wx.navigateTo({
        url: `/pages/subPage/my_nft/index`
      });
    };
    common_vendor.onLoad(() => {
    });
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(address)),
        b: common_vendor.o(($event) => copyAddress(common_vendor.unref(address))),
        c: common_vendor.o(goNft),
        d: common_vendor.o(alertValid)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/calvinzou/Documents/Projects/dakaVs/uni_vue3_cli/src/pages/home_my/index.vue"]]);
wx.createPage(MiniProgramPage);
