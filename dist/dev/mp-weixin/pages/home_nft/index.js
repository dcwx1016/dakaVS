"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_user = require("../../utils/user.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const dakaList = common_vendor.ref([]);
    const getListDetail = (list) => {
      Array.from(list).forEach((item) => {
        dakaList.value.push(item.rawData.metadata);
      });
    };
    common_vendor.onLoad(() => {
      if (wx.getStorageSync("confluxaddress")) {
        utils_user.getUserNfts({
          owner: wx.getStorageSync("confluxaddress"),
          withMetadata: true
        }).then((res) => {
          console.log(res);
          if (res.data.data && res.data.data.list) {
            getListDetail(res.data.data.list);
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(dakaList.value, (item, idx, i0) => {
          return {
            a: item.image,
            b: idx
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/calvinzou/Documents/Projects/dakaVs/uni_vue3_cli/src/pages/home_nft/index.vue"]]);
wx.createPage(MiniProgramPage);
