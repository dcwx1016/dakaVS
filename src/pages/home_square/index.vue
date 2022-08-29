<template>
  <view class="square-page">
    <view class="square-header">
      <view class="header-top">
        <view class="title">哒咔广场1111</view>
        <view class="daka-logo">
          <view class="logo-title">微哒咔</view>
          <view class="logo-info">你的虚拟哒咔社区</view>
        </view>
      </view>
    </view>
    <view class="square-list">
      <div class="list-item" v-for="(item, idx) in itemList" :key="idx">
        <p class="item-name">
          {{ item.name }}
        </p>
        <image class="item-img" :src="item.image" />
        <p class="item-info">
          {{ item.description }}
        </p>
        <button @click="() => takeDaka(item.tokenId, item.contract)">
          领取 你的哒咔
        </button>
      </div>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getPoapList, getNftDetail } from '@/utils/user';

const itemList = ref([]);

const getListDetail = (list) => {
  Array.from(list).forEach((item) => {
    getNftDetail(item.tokenid)
      .then((res) => {
        itemList.value.push(res.data.data);
      })
      .catch((err) => console.log(err));
  });
};

const takeDaka = (id, contract) => {
  console.log(id, contract);
  wx.navigateTo({
    url: `/pages/subPage/take_nft/index?id=${id}&contract=${contract}`,
  });
};

onMounted(() => {
  if (wx.getStorageSync('phone') && wx.getStorageSync('token')) {
    getPoapList({
      phone: wx.getStorageSync('phone'),
      token: wx.getStorageSync('token'),
      chaintype: 'cfx',
    }).then((res) => {
      if (res.data.nftsamount) {
        getListDetail(res.data.nftsamount);
      }
    });
  }
});
</script>

<style lang="scss">
.square-page {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .square-header {
    color: white;
    background-color: $daka-primary;
    padding: 10px 20px;
    margin-bottom: 10px;
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .title {
      }
      .daka-logo {
        .logo-title {
          font-size: 30px;
          font-weight: 500;
        }
        .logo-info {
          font-weight: 300;
          font-size: 16px;
        }
      }
    }
  }
  .square-list {
    flex: 1;
    overflow: scroll;
    padding: 0 20px;
    .list-item {
      background: #f5f5f5;
      padding: 12px 25px;
      margin-bottom: 25px;
      border-top: 5px solid $daka-primary;
      .item-name {
        padding: 10px 0;
      }
      .item-img {
        width: 100%;
      }
      .item-info {
        padding: 10px 0;
        font-weight: 300;
        font-size: 10px;
        line-height: 12px;
      }
      button {
        line-height: 20px;
        border-radius: 0;
        font-size: 12px;
        color: white;
        background: $daka-primary;
      }
    }
  }
}
</style>
