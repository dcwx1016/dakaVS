"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_user = require("../../utils/user.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const itemList = common_vendor.ref([]);
    const getListDetail = (list) => {
      Array.from(list).forEach((item) => {
        utils_user.getNftDetail(item.tokenid).then((res) => {
          itemList.value.push(res.data.data);
        }).catch((err) => console.log(err));
      });
    };
    const takeDaka = (id, contract) => {
      console.log(id, contract);
    };
    common_vendor.onMounted(() => {
      if (wx.getStorageSync("phone") && wx.getStorageSync("token")) {
        utils_user.getPoapList({
          phone: wx.getStorageSync("phone"),
          token: wx.getStorageSync("token"),
          chaintype: "cfx"
        }).then((res) => {
          if (res.data.nftsamount) {
            getListDetail(res.data.nftsamount);
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(itemList.value, (item, idx, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.image,
            c: common_vendor.t(item.description),
            d: common_vendor.o(() => takeDaka(item.tokeId, item.contract)),
            e: idx
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/calvinzou/Documents/Projects/dakaVs/uni_vue3_cli/src/pages/home_square/index.vue"]]);
wx.createPage(MiniProgramPage);
