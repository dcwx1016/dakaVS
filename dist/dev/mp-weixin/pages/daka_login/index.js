"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_user = require("../../utils/user.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const loginHelper = (phoneNo) => {
      wx.login({
        success(res) {
          if (res.code) {
            console.log(res.code);
            utils_user.loginRegisterWechat({
              code: phoneNo,
              js_code: res.code
            }).then((info) => {
              console.log("\u7528\u6237\u4FE1\u606F", info);
              if (info) {
                if (info.data.ethaddress)
                  wx.setStorage({ key: "ethaddress", data: info.data.ethaddress });
                if (info.data.phone)
                  wx.setStorage({ key: "phone", data: info.data.phone });
                if (info.data.token)
                  wx.setStorage({ key: "token", data: info.data.token });
                if (info.data.confluxaddress)
                  wx.setStorage({
                    key: "confluxaddress",
                    data: info.data.confluxaddress
                  });
                wx.switchTab({
                  url: "/pages/home_my/index"
                });
              }
            });
          } else {
            console.log("\u6388\u6743\u5931\u8D25\uFF01" + res);
          }
        }
      });
    };
    const login = (e) => {
      console.log(e);
      if (e.detail.code) {
        loginHelper(e.detail.code);
      }
    };
    const cancelLogin = () => {
      wx.switchTab({
        url: "/pages/home_square/index"
      });
    };
    common_vendor.onMounted(() => {
      if (wx.getStorageSync("phone") && wx.getStorageSync("token")) {
        utils_user.checkAlive({
          phone: wx.getStorageSync("phone"),
          token: wx.getStorageSync("token")
        }).then((res) => {
          console.log(res);
          if (res.data.secret === "success") {
            cancelLogin();
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(cancelLogin),
        b: common_vendor.o(login)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/calvinzou/Documents/Projects/dakaVs/uni_vue3_cli/src/pages/daka_login/index.vue"]]);
wx.createPage(MiniProgramPage);
