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

// export function getPhonenNo(data) {
//   return REQUEST.post('/RegBindLoginWechat', {
//     code: data,
//   });
// }

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

// 哒咔详情
export function getNftDetail(id) {
  return REQUEST.get(
    `https://api-testnet.confluxscan.net/nft/preview?tokenId=${id}&contract=cfxtest:acb3vn9rxjcvwfbvzn92wcybe4f0th45np8tfh46sx`
  );
}

// export function registerWithCode(data) {
//   return REQUEST.post('/RegAndVerifyandReturnInfo', data);
// }
// export function requestPhoneCode(data) {
//   return REQUEST.post('/GetPhoneVerifyCode', data);
// }

// export function bindWechat(data) {
//   return REQUEST.post('/BindingWeChat', {
//     ...data,
//     appid: 'wx3600f6e21bbc6dfb',
//     // secret: '',
//   });
// }

// export function loginWechat(code) {
//   return REQUEST.post('/LoginWechatReturnInfo', {
//     js_code: code,
//     appid: 'wx3600f6e21bbc6dfb',
//   });
// }
