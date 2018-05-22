<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <div class="bigger">
      <advertisting
      imageStyle="height: 220rpx"
      directionUrl="/pages/counter/main"  imageSrc="http://hptrust.org/wp-content/uploads/HPT-logo-blue-on-transparent-80x80.png" />
    </div>
    <classify />
    <div class="oritation fullwidth simples">
      <div class="simple">
        <h1>品质套餐</h1>
        <h3>搭配齐全吃得好</h3>
        <h5>立即抢购 > </h5>
        <advertisting imageSrc="https://fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/" />
      </div>
      <div class="simple">
        <h1>限量抢购</h1>
        <h3>超值美味9.9元起</h3>
        <h5> 3726人正在抢 > </h5>
        <advertisting imageSrc="https://fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/" />
      </div>
    </div>
    <shop :initalShop="shops" :onItemClick="onShopClick"/>
  </div>
</template>

<script>
import card from '@/components/card';
import advertisting from '@/components/advertisting';
import classify from '@/components/classify';
import shop from '@/components/shop';
import {log} from '@/components/utils'
const shopURL = 'shopping/restaurants?latitude=31.22967&longitude=121.4762';

export default {
  data() {
    return {
      userInfo: {},
      shops:[],
      isLoading: false,
      orderBy: 4
    };
  },

  components: {
    card,
    advertisting,
    classify,
    shop
  },
  onReachBottom() {
    if(this.isLoading) {
      return
    }
    this.requestMore()
  },
  methods: {
    bindViewTap() {
      const url = '../logs/main';
      wx.navigateTo({ url });
    },
    onShopClick(item) {
      wx.navigateTo({ url: `../restaurant/main?id=${item.id}&data=${JSON.stringify(item)}`})
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo;
            },
          });
        },
      });
    },
    clickHandle(msg, ev) {
    },
    async requestMore() {
      this.isLoading = true;
      const { $fly, orderBy, shops } = this;
      const offset = `&offset=${shops.length}`;
      
      const { data, status } = await $fly.get(
        shopURL + `&order_by=${orderBy}` + offset,
      );
      

      this.isError = status !== 200;
      if (!this.isError) {
        this.shops = this.shops.concat(data);
      }
      await new Promise((resolve)=> {
        setTimeout(resolve, 2000)
      })
      this.isLoading = false;
    },
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
    
    this.requestMore()
  },
};
</script>
<style lang="scss">
.oritation {
  display: flex;
  & > * {
    flex: 1;
  }
}

.simple {
  position: relative;
  height: 30rpx;
  width: 50%;
  margin-top: .293333rem;
  margin-top: 2.933333vw;
  & img {
    top: 12vw;
    right: 2.3333vw;
    width: 3.76rem;
    width: 37.6vw;
    height: 2.506667rem;
    height: 25.06667vw;
    position: absolute;
  }
}
.fullwidth{
  width: 100vw;
}
.bigger{
  & img {
    height: 220rpx;
  }
}
h1{
  font-size: 20px;
}
h2 {
  font-size: 18px;
}
h3 {
  font-size: 16px;
}
h4 {
  font-size: 14px;
}
h5 {
  font-size: 12px;
}
.simples{
  height: 42vw;
}
</style>
