import REQUEST from './request';

// 哒咔广场list
export function getPoapList(data) {
  return REQUEST.post('/GUGUBOX_GetPOAPListTotal', {
    ...data,
    contract: 'cfxtest:acb3vn9rxjcvwfbvzn92wcybe4f0th45np8tfh46sx',
  });
}

// 判断用户token是否有效
export function checkAlive(data) {
  return REQUEST.post('/GetTokenAlive', {
    ...data,
    appid: 'wx3600f6e21bbc6dfb',
  });
}

// 微信注册登录三合一
export function loginRegisterWechat(data) {
  return REQUEST.post('/RegBindLoginWechat', {
    ...data,
    appid: 'wx3600f6e21bbc6dfb',
  });
}

export function getUserNfts(data) {
  return REQUEST.get('https://api-testnet.confluxscan.net/nft/tokens', {
    ...data,
    contract: 'cfxtest:acb3vn9rxjcvwfbvzn92wcybe4f0th45np8tfh46sx',
  });
}

//领取徽章

export function takeNft(data) {
  return REQUEST.post('/GuGuBox_GetReleaseNFT', {
    ...data,
  });
}

//领取徽章回显

export function takeNftResult(data) {
  return REQUEST.post('/GuGuBox_GetReleaseNFT', {
    ...data,
  });
}
// 指定数量
export function geUsertNftNumber(data) {
  return REQUEST.post('/GuGuBox_GetPOAPBanlaceOfBatch', {
    ...data,
    contract: 'cfxtest:acb3vn9rxjcvwfbvzn92wcybe4f0th45np8tfh46sx',
  });
}

// 哒咔详情
export function getNftDetail(id) {
  return REQUEST.get(
    `https://api-testnet.confluxscan.net/nft/preview?tokenId=${id}&contract=cfxtest:acb3vn9rxjcvwfbvzn92wcybe4f0th45np8tfh46sx&withMetadata=true`
  );
}

// 收藏榜
export function holderRank() {
  return REQUEST.get(
    `https://testnet.confluxscan.net/stat/tokens/holder-rank?address=cfxtest:acb3vn9rxjcvwfbvzn92wcybe4f0th45np8tfh46sx&limit=10&orderBy=balance&reverse=true&skip=0&tab=holders`
  );
}
