<template>
  <view class="nfts-page">
    <div class="page-header">
      <span class="header-left">查看 我的哒咔</span>
      <span class="header-right"></span>
    </div>
    <div class="daka-header">
      <div class="header-left">
        <span class="l-top"> 我所有的 </span>
        <span class="l-bottom"> 虚拟哒咔 </span>
      </div>
      <span class="header-right"></span>
    </div>
    <div class="nft-list">
      <image v-for="(item, idx) in dakaList" :src="item.image" :key="idx" />
    </div>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getUserNfts } from '@/utils/user';
import { onLoad } from '@dcloudio/uni-app';

const dakaList = ref([]);

const getListDetail = (list) => {
  Array.from(list).forEach((item) => {
    dakaList.value.push(item.rawData.metadata);
  });
};

onLoad(() => {
  if (wx.getStorageSync('confluxaddress')) {
    getUserNfts({
      owner: wx.getStorageSync('confluxaddress'),
      withMetadata: true,
    }).then((res) => {
      console.log(res);
      if (res.data.data && res.data.data.list) {
        getListDetail(res.data.data.list);
      }
    });
  }
});
</script>

<style lang="scss">
.nfts-page {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .page-header {
    background: $daka-grey;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    color: white;
    .header-left {
      font-size: 16px;
    }
    .header-right {
      width: 50px;
      height: 50px;
      border: 1px solid white;
      border-radius: 50%;
    }
  }
  .daka-header {
    background: $daka-primary;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    color: white;
    .header-left {
      display: flex;
      flex-direction: column;
      .l-top {
        font-size: 12px;
        font-weight: 200;
      }
      .l-bottom {
        font-size: 20px;
        font-weight: 400;
      }
    }
    .header-right {
      width: 30px;
      height: 30px;
      border: 1px solid white;
      border-radius: 50%;
    }
  }
  .nft-list {
    image {
    }
  }
}
</style>
