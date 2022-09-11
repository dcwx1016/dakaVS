<template>
  <view class="square-page">
    <div class="header-info">
      <div>领取成功，</div>
      <div>分享你的哒咔</div>
    </div>
    <view class="square-list">
      <template v-if="daka">
        <div class="list-item">
          <div class="item-img">
            <image :src="daka.image" />
          </div>
        </div>
      </template>
      <div v-else class="list-item" :key="idx">
        <div class="item-img">
          <span class="img"></span>
        </div>
      </div>
      <p class="item-daka">{{}}的哒咔NO:{{}}</p>
      <p class="item-holder">
        @{{
          daka.rawData.metadata.attributes.find(
            (i) => i['trait_type'] === '发行方'
          )?.value || '--'
        }}
      </p>
    </view>
    <button @click="takeDaka">点击分享</button>
    <view class="footer">
      <image class="commercial" src="../../static/logoWithName-white.png" />
      <p>版权所有:A MODERNLAND Tech Company 摩登地标 技术支持:区块积木</p>
      <p>Conflux树图区块链研究院提供区块链底层技术支持</p>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getNftDetail } from '@/utils/user';
import { onLoad } from '@dcloudio/uni-app';

const daka = ref({});
const tokenNum = ref(1);

const getItemDetail = (tId) => {
  getNftDetail(tId)
    .then((res) => {
      daka.value = res.data.data;
    })
    .catch((err) => console.log(err));
};

onLoad((option) => {
  if (option['tokenid']) getItemDetail(option['tokenid']);
});
</script>

<style lang="scss">
.square-page {
  font-family: 'IBM Plex Mono';
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: $daka-grey;
  padding: 20px 41px;
  .header-info {
    color: white;
    font-size: 20px;
    font-weight: 500;
    font-size: 24px;
    line-height: 31px;
    text-align: center;
    color: #f5f5f5;
    text-align: center;
    margin: 20px 0;
    div {
      padding: 5px 0;
    }
  }
  .square-list {
    overflow: scroll;
    .list-item {
      background: #f5f5f5;
      // margin-bottom: 25px;
      // border-top: 5px solid $daka-primary;
      display: flex;
      flex-direction: column;
      align-items: center;
      .hold {
        text-align: center;
        background: black;
        color: white;
        white-space: nowrap;
        padding: 2px 6px;
      }
      .item-name {
        padding: 10px 0;
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
  .item-daka {
    width: 100%;
    color: white;
    background: $daka-primary;
    margin-top: 5px;
    text-align: center;
  }
  .item-holder {
    color: white;
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    margin: 10px 0 50px 0;
  }
  .commercial {
    align-self: center;
    margin-top: 50px;
    width: 130px;
    height: 90px;
  }
}
.footer {
  background-color: $daka-grey;
  margin-bottom: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  font-weight: 500;
  font-size: 6px;
  line-height: 8px;
  color: white;
  .commercial {
    margin-bottom: 10px;
    width: 90px;
    height: 15px;
  }
}
button {
  width: 100%;
  line-height: 20px;
  border-radius: 0;
  font-size: 12px;
  color: white;
  background: $daka-primary;
}
</style>
