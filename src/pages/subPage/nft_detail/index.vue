<template>
  <view class="square-page">
    <view class="square-list">
      <div class="list-item" v-for="(item, idx) in itemList" :key="idx">
        <p class="item-name">
          {{ item.name }}
        </p>
        <div class="item-img">
          <image :src="item.image" />
        </div>
        <p class="item-info">
          {{ item.description }}
        </p>
        <span class="hold">持有数量: {{ tokenNum }}</span>
      </div>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getNftDetail, geUsertNftNumber } from '@/utils/user';
import { onLoad } from '@dcloudio/uni-app';

const itemList = ref([]);
const tokenNum = ref(1);

const getItemDetail = (tId) => {
  getNftDetail(tId)
    .then((res) => {
      itemList.value.push(res.data.data);
    })
    .catch((err) => console.log(err));
  geUsertNftNumber({
    phone: wx.getStorageSync('phone'),
    token: wx.getStorageSync('token'),
    targetaddress: wx.getStorageSync('confluxaddress'),
    chaintype: 'cfx',
    tokenids: [Number(tId)],
  })
    .then((res) => {
      console.log(res.data.tokens[0]['amount']);
      if (res.data.tokens) {
        tokenNum.value = res.data.tokens[0]['amount'];
      }
    })
    .catch((err) => console.log(err));
};

onLoad((option) => {
  if (option['tokenid']) getItemDetail(option['tokenid']);
});
</script>

<style lang="scss">
.square-page {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  .square-list {
    flex: 1;
    overflow: scroll;
    padding: 0 20px;
    .list-item {
      background: #f5f5f5;
      padding: 12px 25px;
      margin-bottom: 25px;
      border-top: 5px solid $daka-primary;
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
}
</style>
