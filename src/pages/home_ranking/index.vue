<template>
  <view class="nfts-page">
    <view class="page-header">
      <view class="header-top">
        <view class="title">哒咔广场</view>
        <view class="daka-logo">
          <image class="logo" src="/static/logoWithName-white.png"></image>
        </view>
      </view>
    </view>
    <div class="page-content">
      <div class="ranking-header">
        <span class="header-title"> 热力榜 WDKNFT HOT </span>
        <span class="header-info"> 社区推荐热力活动 </span>
      </div>
      <div class="top-card">
        <div class="card-left">
          <image v-if="hotNft" :src="hotNft.image"></image>
          <div class="info-block">
            <div class="b-line">
              <span>活动创作者</span>
              <span>{{ hotNft.holder }}</span>
            </div>
            <div class="b-line">
              <span>哒咔发布量</span>
              <span>{{ hotNft.total }}</span>
            </div>
            <div class="b-line">
              <span>哒咔收藏数</span>
              <span>{{ hotNft.release }}</span>
            </div>
          </div>
        </div>
        <image class="logo" src="../../static/newlogo-black.png"></image>
      </div>
      <div class="ranking-header">
        <span class="header-title"> 收藏榜 WDKNFT TOP </span>
        <span class="header-info"> 区块实时数据同步</span>
      </div>
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
    <view class="footer">
      <!-- <button @click="getUserProfile">授权微信头像与昵称</button> -->
      <image class="commercial" src="../../static/logoWithName-black.png" />
      <p>版权所有:A MODERNLAND Tech Company 摩登地标 技术支持:区块积木</p>
      <p>Conflux树图区块链研究院提供区块链底层技术支持</p>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getPoapList, getNftDetail, holderRank } from '@/utils/user';
import { onLoad } from '@dcloudio/uni-app';

const hotNft = ref({});
const likeList = ref([]);
const getListDetail = (tokenid) => {
  getNftDetail(tokenid)
    .then((res) => {
      if (res.data.data) {
        let t = {
          name: res.data.data.name,
          image: res.data.data.image,
          description: res.data.data.description,
          place:
            res.data.data.rawData.metadata.attributes.find(
              (i) => i['trait_type'] === '发行地点'
            )?.value || '--',
          date:
            res.data.data.rawData.metadata.attributes.find(
              (i) => i['trait_type'] === '时间'
            )?.value || '--',
          holder:
            res.data.data.rawData.metadata.attributes.find(
              (i) => i['trait_type'] === '发行方'
            )?.value || '--',
        };
        hotNft.value = {
          ...t,
          ...hotNft.value,
        };
      }
    })
    .catch((err) => console.log(err));
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
  getPoapList({
    phone: '',
    token: '',
    chaintype: 'cfx',
  }).then((res) => {
    if (res.data.nftsamount) {
      let t = res.data.nftsamount.length - 1;
      hotNft.value = {
        release: res.data.nftsamount[t].release,
        total: res.data.nftsamount[t].total,
      };
      getListDetail(res.data.nftsamount[t].tokenid);
    }
  });
  holderRank().then((res) => {
    console.log(res);
    if (res.data.data.list) {
      likeList.value = res.data.data.list;
      console.log(likeList.value);
    }
  });
  // if (wx.getStorageSync('confluxaddress')) {
  //   getUserNfts({
  //     owner: wx.getStorageSync('confluxaddress'),
  //     withMetadata: true,
  //   }).then((res) => {
  //     console.log(res);
  //     if (res.data.data && res.data.data.list) {
  //       getListDetail(res.data.data.list);
  //     }
  //   });
  // }
});
</script>

<style lang="scss">
.nfts-page {
  font-family: 'IBM Plex Mono';
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .page-header {
    background-color: $daka-primary;
    justify-content: space-between;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      color: white;
      .title {
        margin-top: 25px;
        margin-bottom: 20px;
        font-weight: 500;
        font-size: 18px;
        line-height: 23px;
      }
      .daka-logo {
        align-self: flex-start;
        image {
          width: 131px;
          height: 22px;
        }
      }
    }
  }
  .page-content {
    flex: 1;
    padding: 22px 15px;
    .ranking-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 5px solid black;
      background: #363636;
      padding: 12px;
      .header-title {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: white;
      }
      .header-info {
        font-size: 8px;
        line-height: 10px;
        color: #000000;
      }
    }
    .top-card {
      margin-top: 8px;
      padding: 10px 12px;
      display: flex;
      background: #f5f5f5;
      justify-content: space-between;
      image {
        width: 83px;
        height: 83px;
      }
      .logo {
        width: 25px;
        height: 9px;
        align-self: flex-end;
      }
      .card-left {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .info-block {
        margin-left: 20px;
        font-size: 10px;
        line-height: 13px;
        width: 150px;
        flex: 1;
        display: flex;
        flex-direction: column;
        .b-line {
          display: flex;
          margin-bottom: 10px;
          justify-content: space-between;
        }
      }
    }
  }
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
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 0;
    color: $daka-grey;
    font-weight: 500;
    font-size: 6px;
    line-height: 8px;
    .commercial {
      margin-bottom: 10px;
      width: 90px;
      height: 15px;
    }
  }
}
</style>
