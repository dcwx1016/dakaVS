<template>
  <view class="take-page">
    <div class="page-info">
      <div>欢迎进入微哒咔，</div>
      <div>输入哒咔邀请口令。</div>
      <div>领取你的虚拟哒咔资产。</div>
    </div>
    <div class="page-input">
      <span class="input-info">输入哒咔口令</span>
      <input type="text" />
    </div>
    <button @click="takeDaka">确定</button>
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
    codestr: 'MKcsv7mp8f7fTbc2zT20pWAzAoqkp4F3', //'RL7Wlr04l6XSa0pjM6q18xtwptVUly7q',
  }).then((res) => {
    wx.switchTab({
      url: '/pages/home_square/index',
    });
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
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: $daka-grey;
  color: white;
  padding: 0 40px;
  .page-info {
    font-weight: 200;
    font-size: 12px;
  }
  .page-input {
    margin-top: 15px;
    border: 1px solid white;
    display: flex;
    padding: 10px;

    .input-info {
      padding-right: 10px;
      border-right: 1px solid white;
      margin-right: 10px;
      font-size: 14px;
      white-space: nowrap;
    }
    input {
    }
  }
  button {
    width: 100%;
    margin-top: 30px;
  }
}
</style>
