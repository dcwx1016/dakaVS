<template>
  <view>
    <div>欢迎进入微</div>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getUserNfts } from '@/utils/user';

onMounted(() => {
  if (wx.getStorageSync('phone') && wx.getStorageSync('token')) {
    // getUserNfts({
    //   token: wx.getStorageSync('token'),
    //   contract: wx.getStorageSync('confluxaddress'),
    // }).then((res) => {
    //   console.log(res);
    // });
  }
});
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
