<template>
  <view class="content">
    <view class="login-header">
      <view class="header-top">
        <view class="title">哒咔广场</view>
        <view class="daka-logo">
          <view class="logo-title">微哒咔</view>
          <view class="logo-info">你的虚拟哒咔社区</view>
        </view>
      </view>
      <view class="header-bottom">
        <image class="user-avatar" src="/static/logo.png"></image>
        <view class="user-info">
          <text class="name">{{ userName }}</text>
          <text class="adr">我的哈希区块：{{ address }}</text>
        </view>
      </view>
    </view>
    <view class="t-block">
      <div class="b-option" @click="goNft">查看 我的哒咔</div>
      <div class="b-option">标记 新的哒咔广场</div>
      <div class="b-option">发布 新的哒咔地标</div>
    </view>
    <view class="t-block">
      <div class="b-option">微哒咔公众号</div>
      <div class="b-option">微哒咔社群</div>
      <div class="b-option">微哒咔客服</div>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { getUserNfts } from '@/utils/user';

const userName = computed(() => wx.getStorageSync('name') || '名称暂无');
const address = computed(() => wx.getStorageSync('confluxaddress') || '--');

const goNft = () => {
  wx.switchTab({
    url: '/pages/home_nft/index',
  });
};

onMounted(() => {});
</script>
<style lang="scss">
.content {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: white;
  .login-header {
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
    .header-bottom {
      display: flex;
      align-items: center;
      .user-avatar {
        box-sizing: border-box;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: 2px solid white;
      }
      .user-info {
        flex: 1;
        overflow: hidden;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        .name {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
        }
        .adr {
          font-weight: 400;
          font-size: 10px;
          line-height: 13px;

          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .t-block {
    color: black;
    border-top: 5px solid $daka-primary;
    margin-bottom: 20px;
    font-size: 15px;
    .b-option {
      padding: 8px 20px;
      background-color: #f5f5f5;
      margin-bottom: 4px;
    }
  }
}

// .text-area {
//   display: flex;
//   justify-content: center;
// }

// .title {
//   font-size: 36rpx;
//   color: #8f8f94;
// }
</style>
