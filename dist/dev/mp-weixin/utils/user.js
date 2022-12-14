"use strict";
require("./request.js");
var common_vendor = require("../common/vendor.js");
function getPoapList(data) {
  return common_vendor.REQUEST.post("/GUGUBOX_GetPOAPListTotal", {
    ...data,
    contract: "cfxtest:acb3vn9rxjcvwfbvzn92wcybe4f0th45np8tfh46sx"
  });
}
function checkAlive(data) {
  return common_vendor.REQUEST.post("/GetTokenAlive", {
    ...data,
    appid: "wx3600f6e21bbc6dfb"
  });
}
function loginRegisterWechat(data) {
  return common_vendor.REQUEST.post("/RegBindLoginWechat", {
    ...data,
    appid: "wx3600f6e21bbc6dfb"
  });
}
function getUserNfts(data) {
  return common_vendor.REQUEST.get("https://api-testnet.confluxscan.net/nft/tokens", {
    ...data,
    contract: "cfxtest:acb3vn9rxjcvwfbvzn92wcybe4f0th45np8tfh46sx"
  });
}
function takeNft(data) {
  return common_vendor.REQUEST.post("/GuGuBox_GetReleaseNFT", {
    ...data
  });
}
function geUsertNftNumber(data) {
  return common_vendor.REQUEST.post("/GuGuBox_GetPOAPBanlaceOfBatch", {
    ...data,
    contract: "cfxtest:acb3vn9rxjcvwfbvzn92wcybe4f0th45np8tfh46sx"
  });
}
function getNftDetail(id) {
  return common_vendor.REQUEST.get(
    `https://api-testnet.confluxscan.net/nft/preview?tokenId=${id}&contract=cfxtest:acb3vn9rxjcvwfbvzn92wcybe4f0th45np8tfh46sx&withMetadata=true`
  );
}
function holderRank() {
  return common_vendor.REQUEST.get(
    `https://testnet.confluxscan.net/stat/tokens/holder-rank?address=cfxtest:acb3vn9rxjcvwfbvzn92wcybe4f0th45np8tfh46sx&limit=10&orderBy=balance&reverse=true&skip=0&tab=holders`
  );
}
exports.checkAlive = checkAlive;
exports.geUsertNftNumber = geUsertNftNumber;
exports.getNftDetail = getNftDetail;
exports.getPoapList = getPoapList;
exports.getUserNfts = getUserNfts;
exports.holderRank = holderRank;
exports.loginRegisterWechat = loginRegisterWechat;
exports.takeNft = takeNft;
