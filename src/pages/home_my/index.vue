<template>
  <view class="content">
    <view class="login-header">
      <view class="header-top">
        <view class="title">我的哒咔</view>
        <view class="daka-logo">
          <!-- <view class="logo-title">微哒咔</view>
          <view class="logo-info">你的虚拟哒咔社区</view> -->
          <image class="logo" src="/static/new-logo.png"></image>
        </view>
      </view>
      <view class="header-bottom">
        <image class="user-avatar" src=""></image>
        <view class="user-info">
          <!-- <text class="name">{{ userName }}</text> -->
          <text class="name">哒咔0809</text>
          <text class="adr" @click="copyAddress(address)"
            >区块链地址CFX ID：{{ address }}</text
          >
        </view>
      </view>
    </view>
    <view class="login-body">
      <view class="t-block">
        <div class="b-option" @click="goNft">
          <image src="../../static/my-1.png" />
          查看 我的哒咔
        </div>
        <!-- <div class="b-option" @click="alertValid">标记 新的哒咔广场</div> -->
        <div class="b-option" @click="alertValid">
          <image src="../../static/my-2.png" />
          发布 你的活动哒咔
          <span class="not-open"> 待开放中 </span>
        </div>
      </view>
      <view class="t-block">
        <div class="b-option">
          <image src="../../static/my-3.png" />
          微哒咔公众号
        </div>
        <div class="b-option">
          <image src="../../static/my-4.png" />
          微哒咔社群
        </div>
        <div class="b-option">
          <image src="../../static/my-5.png" />
          微哒咔客服
        </div>
      </view>
    </view>
    <view class="footer">
      <!-- <button @click="getUserProfile">授权微信头像与昵称</button> -->
      <image class="commercial" src="../../static/logoWithName-black.png" />
      <p>版权所有:A MODERNLAND Tech Company 摩登地标 技术支持:区块积木</p>
      <p>Conflux树图区块链研究院提供区块链底层技术支持</p>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { getUserNfts } from '@/utils/user';
import { onLoad } from '@dcloudio/uni-app';

const userName = computed(() => wx.getStorageSync('name') || '名称暂无');
const address = computed(() => wx.getStorageSync('confluxaddress') || '--');

const getUserProfile = () => {
  wx.getUserProfile({
    desc: '用于完善个人资料',
  }).then((res) => {
    console.log(res);
  });
};

const alertValid = () => {
  // wx.showToast({
  //   title: '暂未开放', //提示的内容
  //   duration: 1000, //持续的时间
  //   icon: 'none', //图标
  //   mask: true, //显示透明蒙层 防止触摸穿透
  // });
};

const copyAddress = (add) => {
  wx.setClipboardData({
    data: add,
    success(res) {
      wx.getClipboardData({
        success(res) {
          console.log(res.data); // data
        },
      });
    },
  });
};
const goNft = () => {
  wx.navigateTo({
    url: `/pages/subPage/my_nft/index`,
  });
};

onLoad(() => {
  // wx.getUserProfile({
  //   desc: '用于回显当前用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //   success: (res) => {
  //     console.log(res);
  //   },
  //   fail: (res) => {
  //     console.log(res);
  //   },
  // });
});

onMounted(() => {});
</script>
<style lang="scss">
.content {
  font-family: 'IBM Plex Mono';
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
        margin-top: 25px;
        margin-bottom: 18px;
        font-weight: 500;
        font-size: 18px;
        line-height: 23px;
      }
      .daka-logo {
        align-self: flex-start;
        .logo-title {
          font-size: 30px;
          font-weight: 500;
        }
        .logo-info {
          font-weight: 300;
          font-size: 16px;
        }
        .logo {
          width: 67px;
          height: 25px;
        }
      }
    }
    .header-bottom {
      display: flex;
      align-items: center;
      .user-avatar {
        box-sizing: border-box;
        height: 70px;
        width: 70px;
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
          font-weight: 500;
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
  .login-body {
    flex: 1;
    .t-block {
      border-top: 5px solid $daka-primary;
      margin-bottom: 20px;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      .b-option {
        padding: 12px 20px;
        background-color: $daka-grey;
        color: white;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        .not-open {
          margin-left: 10px;
          color: black;
          font-size: 8px;
          line-height: 10px;
        }
        image {
          margin-right: 10px;
          width: 18px;
          height: 18px;
        }
      }
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

// .text-area {
//   display: flex;
//   justify-content: center;
// }

// .title {
//   font-size: 36rpx;
//   color: #8f8f94;
// }
</style>
