<template>
  <view class="take-page">
    <div class="page-content">
      <div class="page-info">
        <div>欢迎进入微哒咔，</div>
        <div>输入哒咔邀请口令。</div>
        <div>领取你的虚拟哒咔资产。</div>
      </div>
      <div class="page-input">
        <span class="input-info">输入哒咔口令</span>
        <input type="text" v-model="inputValue" />
      </div>
      <button @click="takeDaka">确定领取</button>
    </div>
    <view class="footer">
      <!-- <button @click="getUserProfile">授权微信头像与昵称</button> -->
      <image class="commercial" src="../../static/logoWithName-white.png" />
      <p>版权所有:A MODERNLAND Tech Company 摩登地标 技术支持:区块积木</p>
      <p>Conflux树图区块链研究院提供区块链底层技术支持</p>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { takeNft } from '@/utils/user';
import { onLoad } from '@dcloudio/uni-app';

const id = ref('');
const contract = ref('');
const inputValue = ref('');

const takeDaka = () => {
  takeNft({
    phone: wx.getStorageSync('phone'),
    token: wx.getStorageSync('token'),
    contract: contract.value,
    chaintype: 'cfx',
    tokenid: id.value,
    codestr: inputValue.value, //'RL7Wlr04l6XSa0pjM6q18xtwptVUly7q',
  }).then((res) => {
    console.log(res);
    if (res.data && res.data.code === -1) {
      wx.navigateTo({
        url: `/pages/subPage/take_nft_result/index?tokenid=${id.value}`,
      });
      wx.showToast({
        title: res.data.msg || '领取码错误', //提示的内容
        duration: 2000, //持续的时间
        icon: 'error', //图标
        // mask: true, //显示透明蒙层 防止触摸穿透
      });
    } else {
      wx.showToast({
        title: '领取码成功', //提示的内容
        duration: 1000, //持续的时间
        icon: 'success', //图标
        mask: true, //显示透明蒙层 防止触摸穿透
      });
      setTimeout(function () {
        wx.navigateTo({
          url: `/pages/subPage/take_nft_result/index?tokenid=${id.value}`,
        });
      }, 1000);
    }
  });
};
onLoad((option) => {
  console.log('ss', option);
  id.value = option['id'] || '';
  contract.value = option['contract'] || '';
});
</script>

<style lang="scss">
.take-page {
  font-family: 'IBM Plex Mono';
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: $daka-grey;
  color: white;
  padding: 0 40px;
  position: relative;
  .page-content {
    margin-top: 140px;
  }
  .page-info {
    font-weight: 200;
    font-size: 12px;
    line-height: 16px;
  }
  .page-input {
    margin-top: 15px;
    // border: 1px solid white;
    background: black;
    color: white;
    display: flex;
    padding: 2px;

    .input-info {
      margin: 2px 13px;
      padding-right: 10px;
      border-right: 1px solid white;
      margin-right: 10px;
      font-size: 14px;
      line-height: 16px;
      white-space: nowrap;
    }
    input {
    }
  }
  button {
    margin-top: 15px;
    padding: 2px;
    font-size: 14px;
    line-height: 16px;
    background: black;
    color: white;
    padding: 2px;
    border-radius: 0;
    width: 100%;
    margin-top: 30px;
  }
  .commercial {
    align-self: center;
    margin-top: 100px;
    width: 130px;
    height: 90px;
  }
}
.footer {
  background-color: $daka-grey;
  margin-bottom: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  font-weight: 500;
  font-size: 6px;
  line-height: 8px;
  .commercial {
    margin-bottom: 10px;
    width: 90px;
    height: 15px;
  }
}
</style>
