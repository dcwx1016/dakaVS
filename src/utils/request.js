import { REQUEST } from 'miniprogram-request';

// 设置全局配置，设置一次全部生效
// 设置请求根地址,可选
REQUEST.Defaults.baseURL = 'https://testnet.jugugu.cn';
// 添加监听时间 可选
// REQUEST.Listeners.onResponse.push(console.log); // 记录每次响应

export default REQUEST;
