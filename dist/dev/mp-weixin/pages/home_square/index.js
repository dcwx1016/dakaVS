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
          var _a, _b, _c;
          if (res.data.data) {
            let t = {
              tokenId: res.data.data.tokenId,
              contract: res.data.data.contract,
              name: res.data.data.name,
              image: res.data.data.image,
              description: res.data.data.description,
              place: ((_a = res.data.data.rawData.metadata.attributes.find(
                (i) => i["trait_type"] === "\u53D1\u884C\u5730\u70B9"
              )) == null ? void 0 : _a.value) || "--",
              date: ((_b = res.data.data.rawData.metadata.attributes.find(
                (i) => i["trait_type"] === "\u65F6\u95F4"
              )) == null ? void 0 : _b.value) || "--",
              holder: ((_c = res.data.data.rawData.metadata.attributes.find(
                (i) => i["trait_type"] === "\u53D1\u884C\u65B9"
              )) == null ? void 0 : _c.value) || "\u5FBD\u7AE0",
              release: item.release,
              total: item.total
            };
            itemList.value.push(t);
          }
        }).catch((err) => console.log(err));
      });
    };
    const takeDaka = (id, contract) => {
      if (!wx.getStorageSync("phone") || !wx.getStorageSync("token")) {
        wx.navigateTo({
          url: `/pages/daka_login/index`
        });
        return;
      }
      utils_user.checkAlive({
        phone: wx.getStorageSync("phone"),
        token: wx.getStorageSync("token")
      }).then((res) => {
        console.log(res);
        if (res.data.secret === "success") {
          wx.navigateTo({
            url: `/pages/subPage/take_nft/index?id=${id}&contract=${contract}`
          });
        } else {
          wx.navigateTo({
            url: `/pages/daka_login/index`
          });
        }
      });
    };
    common_vendor.onMounted(() => {
      utils_user.getPoapList({
        phone: "",
        token: "",
        chaintype: "cfx"
      }).then((res) => {
        if (res.data.nftsamount) {
          getListDetail(res.data.nftsamount);
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(itemList.value, (item, idx, i0) => {
          return common_vendor.e({
            a: item.url
          }, item.url ? {
            b: item.url
          } : {}, {
            c: common_vendor.t(item.name),
            d: item.image,
            e: common_vendor.t(item.place),
            f: common_vendor.t(item.date),
            g: common_vendor.t(item.release),
            h: common_vendor.t(item.total),
            i: common_vendor.t(item.description),
            j: common_vendor.o(() => takeDaka(item.tokenId, item.contract)),
            k: idx
          });
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/calvinzou/Documents/Projects/dakaVs/uni_vue3_cli/src/pages/home_square/index.vue"]]);
wx.createPage(MiniProgramPage);
