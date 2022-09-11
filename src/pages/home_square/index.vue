<template>
  <view class="square-page">
    <view class="square-header">
      <view class="header-top">
        <view class="title">哒咔活动</view>
        <view class="daka-logo">
          <image class="logo" src="/static/logoWithName-white.png"></image>
        </view>
      </view>
    </view>
    <view class="square-list">
      <div class="list-item" v-for="(item, idx) in itemList" :key="idx">
        <div class="item-header">
          <image v-if="item.url" class="header-avatar" :src="item.url"></image>
          <span v-else class="default-avatar"></span>
          <span class="header-title">
            {{ item.name }}
          </span>
        </div>
        <div class="item-img">
          <image :src="item.image" />
        </div>
        <div class="item-brief">
          <div class="brief-left">
            <span class="info-image">
              <image class="place" src="/static/date-icon.png"></image>
              {{ item.place }}
            </span>
            <span class="info-image">
              <image class="date" src="/static/place-icon.png"></image
              >{{ item.date }}
            </span>
          </div>
          <div class="brief-right">
            <span class="label">限定</span>
            <span class="amount">{{ item.release }}/{{ item.total }} </span>
          </div>
        </div>
        <div class="item-info">
          {{ item.description }}
        </div>
        <button @click="() => takeDaka(item.tokenId, item.contract)">
          点击领取
        </button>
      </div>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getPoapList, getNftDetail, checkAlive } from '@/utils/user';

const itemList = ref([]);

const getListDetail = (list) => {
  Array.from(list).forEach((item) => {
    getNftDetail(item.tokenid)
      .then((res) => {
        if (res.data.data) {
          let t = {
            tokenId: res.data.data.tokenId,
            contract: res.data.data.contract,
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
              )?.value || '徽章',
            release: item.release,
            total: item.total,
          };
          itemList.value.push(t);
        }
      })
      .catch((err) => console.log(err));
  });
};

const takeDaka = (id, contract) => {
  if (!wx.getStorageSync('phone') || !wx.getStorageSync('token')) {
    // wx.navigateTo({
    //   url: `/pages/subPage/take_nft/index`,
    // });
    wx.navigateTo({
      url: `/pages/daka_login/index`,
    });
    return;
  }
  checkAlive({
    phone: wx.getStorageSync('phone'),
    token: wx.getStorageSync('token'),
  }).then((res) => {
    console.log(res);
    if (res.data.secret === 'success') {
      wx.navigateTo({
        url: `/pages/subPage/take_nft/index?id=${id}&contract=${contract}`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/daka_login/index`,
      });
    }
  });
};

onMounted(() => {
  getPoapList({
    phone: '',
    token: '',
    chaintype: 'cfx',
  }).then((res) => {
    if (res.data.nftsamount) {
      getListDetail(res.data.nftsamount);
    }
  });
});
</script>

<style lang="scss">
.square-page {
  font-family: 'IBM Plex Mono';
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
  .square-list {
    flex: 1;
    overflow: scroll;
    padding: 0 20px;
    .list-item {
      background: #f5f5f5;
      padding: 12px 25px;
      margin-bottom: 25px;
      border-top: 5px solid $daka-primary;
      .item-header {
        padding: 10px 0;
        display: flex;
        align-items: center;
        .default-avatar,
        image {
          width: 45px;
          height: 45px;
          margin-right: 10px;
        }
        .default-avatar {
          border: 1px solid black;
          border-radius: 50%;
        }
        .avatar-title {
          font-size: 12px;
          line-height: 16px;
        }
      }
      .item-img {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        position: relative;
        image {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .item-brief {
        display: flex;
        justify-content: space-between;
        margin-top: 11px;
        .brief-left {
          display: flex;
        }
        .brief-right {
          color: white;
          padding: 3px 5px;
          background: black;
          .label {
            font-size: 7px;
            line-height: 9px;
            margin-right: 3px;
          }
          .amount {
            font-weight: 600;
            font-size: 10px;
            line-height: 13px;
          }
        }
        .info-image {
          padding: 3px 5px;
          margin-right: 8px;
          background: #979797;
          color: white;
          font-weight: 500;
          font-size: 10px;
          line-height: 13px;
          image {
            margin-right: 3px;
          }
          .date {
            width: 6.5px;
            height: 6.5px;
          }
          .place {
            width: 5px;
            height: 8px;
          }
          display: flex;
          align-items: center;
          flex-direction: row;
        }
      }
      .item-info {
        padding: 10px 0;
        font-weight: 400;
        font-size: 10px;
        line-height: 13px;
        text-align: justify;
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
