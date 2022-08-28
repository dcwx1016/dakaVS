<template>
  <view class="login-page">
    <view class="login-header">
      <view class="title">区块授权</view>
      <view class="daka-logo">
        <view class="logo-title">微哒咔</view>
        <view class="logo-info">你的虚拟哒咔社区</view>
      </view>
    </view>
    <view class="login-body">
      <view class="daka-slogan">
        <div class="s-logo">
          <image class="l-left" src="/static/login-logo.png"></image>
          <image class="l-right" src="/static/login-logo2.png"></image>
        </div>
        <div class="s-info">
          <p>去授权使用区块链服务，拥有你的专属哒咔社区</p>
          <p>
            生态伙伴区块方块提供通用账户体系．树图链区块链底层操作系统安全防护
          </p>
        </div>
      </view>
      <view class="daka-option">
        <button class="cancel" @click="cancelLogin">取消</button>
        <button
          class="confirm"
          open-type="getPhoneNumber"
          @getphonenumber="login"
        >
          去授权
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { loginRegisterWechat, checkAlive } from '@/utils/user';

const loginHelper = (phoneNo) => {
  wx.login({
    success(res) {
      if (res.code) {
        //发起网络请求
        console.log(res.code);
        loginRegisterWechat({
          code: phoneNo,
          js_code: res.code,
        }).then((info) => {
          console.log('用户信息', info);
          if (info) {
            if (info.data.ethaddress)
              wx.setStorage({ key: 'ethaddress', data: info.data.ethaddress });
            if (info.data.phone)
              wx.setStorage({ key: 'phone', data: info.data.phone });
            if (info.data.token)
              wx.setStorage({ key: 'token', data: info.data.token });
            if (info.data.confluxaddress)
              wx.setStorage({
                key: 'confluxaddress',
                data: info.data.confluxaddress,
              });
            wx.switchTab({
              url: '/pages/home_my/index',
            });
          }
        });
      } else {
        console.log('授权失败！' + res);
      }
    },
  });
};

const login = (e) => {
  console.log(e);
  if (e.detail.code) {
    loginHelper(e.detail.code);
  }
};

const cancelLogin = () => {
  wx.switchTab({
    url: '/pages/home_square/index',
  });
};

onMounted(() => {
  // 如果当下的token可以登录，则跳转主页
  // 否则不跳转。
  if (wx.getStorageSync('phone') && wx.getStorageSync('token')) {
    checkAlive({
      phone: wx.getStorageSync('phone'),
      token: wx.getStorageSync('token'),
    }).then((res) => {
      console.log(res);
      if (res.data.secret === 'success') {
        cancelLogin();
      }
    });
  }
});
</script>

<style lang="scss">
.login-page {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: white;
  .login-header {
    background-color: $daka-primary;
    justify-content: space-between;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    .title {
      align-self: flex-end;
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
  .login-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $daka-grey;
    .daka-slogan {
      .s-logo {
        display: flex;
        justify-content: space-around;
        image {
          width: 80px;
          height: 80px;
          padding-top: 4px;
          border-top: 5px solid $daka-primary;
        }
      }
      .s-info {
        margin: 20px 0;
        text-align: center;
        font-weight: 200;
        font-size: 10px;
      }
      .l-left {
      }
      .l-right {
      }
    }
    .daka-option {
      width: 100%;
      display: flex;
      button {
        border-radius: 0;
        width: 100px;
        line-height: 30px;
      }
      .confirm {
        background: $daka-primary;
        color: white;
      }
      .cancel {
      }
    }
  }
}
</style>
