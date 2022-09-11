<template>
  <view class="nfts-page">
    <view class="nft-header">
      <view class="header-top">
        <view class="title">哒咔0809</view>
        <view class="daka-logo">
          <image class="logo" src="/static/logoWithName-white.png"></image>
        </view>
      </view>
    </view>
    <div class="daka-header">
      <div class="header-left">
        <span class="l-top"> 我的 </span>
        <span class="l-bottom"> 活动哒咔 </span>
      </div>
      <div class="header-mid">
        <span class="l-left"> 哒咔数量 </span>
        <span class="l-right"> {{ nftTotal }} </span>
      </div>
      <!-- <image class="header-right" src="/static/my-account.png"></image> -->
    </div>
    <div class="nft-list">
      <div v-for="(item, idx) in dakaList" class="item-img" :key="idx">
        <image :src="item.image" />
        <!-- <span class="title">{{ `${item.release} / ${item.total}` }}</span> -->
      </div>
      <div
        v-for="(item, idx) in Array(6 - dakaList.length)"
        :key="idx"
        class="item-empty"
      ></div>
    </div>
    <div class="daka-header">
      <div class="header-left">
        <span class="l-top"> 我的 </span>
        <span class="l-bottom"> 哒咔广场</span>
      </div>
      <div class="header-mid">
        <span class="l-left"> 收藏排名 </span>
        <span class="l-right"> {{ myranking }} </span>
      </div>
      <!-- <image class="header-right" src="/static/my-account.png"></image> -->
    </div>
    <div class="like-list">
      <div class="ranking-list">
        <div class="list-header">
          <span>CFX ID</span>
          <span>哒咔收藏数量</span>
        </div>
        <div class="list-item" v-for="(item, idx) in likeList" :key="idx">
          <span>{{
            item.account.address.slice(0, 6) +
            '...' +
            item.account.address.slice(-6, -1)
          }}</span>
          <span>{{ item.balance }}</span>
        </div>
      </div>
    </div>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getUserNfts } from '@/utils/user';
import { onLoad } from '@dcloudio/uni-app';

const dakaList = ref([]);
const nftTotal = ref(0);
const myranking = ref(1);

const getListDetail = (list) => {
  Array.from(list).forEach((item) => {
    item.rawData.metadata['tokenid'] = item['tokenId'];
    dakaList.value.push(item.rawData.metadata);
    console.log(dakaList.value);
  });
};

const goDetail = (item) => {
  console.log(item);
  if (item.tokenid) {
    wx.navigateTo({
      url: `/pages/subPage/nft_detail/index?tokenid=${item.tokenid}`,
    });
  }
};

const toastReminder = () => {
  wx.showToast({
    title: '正在开发', //提示的内容
    duration: 1000, //持续的时间
    icon: 'none', //图标
    mask: true, //显示透明蒙层 防止触摸穿透
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
        nftTotal.value = res.data.data.total;
      }
    });
  }
});
</script>

<style lang="scss">
.nfts-page {
  font-family: 'IBM Plex Mono';
  height: 100vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  .nft-header {
    color: white;
    background-color: $daka-primary;
    padding: 10px 20px;
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .title {
        margin-top: 25px;
        margin-bottom: 18px;
        font-weight: 500;
        font-size: 18px;
        line-height: 23px;
      }
      .daka-logo {
        align-self: flex-start;
        .logo {
          width: 131px;
          height: 22px;
        }
      }
    }
  }
  .daka-header {
    background: #363636;
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
    padding: 0 20px;
    .item-empty {
      flex-basis: 45%;
      height: 0;
      padding-bottom: 95%;
      position: relative;
      background: #f5f5f5;
    }
    .item-img {
      flex-basis: 50%;
      // height: 0;
      // padding-bottom: 90%;
      position: relative;
      display: flex;
      flex-direction: column;
      image {
        // position: absolute;
        // left: 0;
        // top: 0;
        width: 100%;
        height: 100px;
        // object-fit: contain;
      }
      .title {
        margin-top: 3px;
        width: 100%;
        background: black;
        color: white;
        font-size: 8px;
        line-height: 10px;
        text-align: center;
      }
    }
  }
  .like-list {
    padding: 0 20px;
    .ranking-list {
      padding: 0 10px;
      .list-header,
      .list-item {
        display: flex;
        justify-content: space-between;
        font-weight: 500;
      }
      .list-header {
        color: #363636;
        margin-top: 14px;
        font-size: 12px;
        line-height: 12px;
      }
      .list-item {
        color: black;
        margin-top: 10px;
        font-size: 14px;
        line-height: 13px;
      }
    }
  }
}
</style>
