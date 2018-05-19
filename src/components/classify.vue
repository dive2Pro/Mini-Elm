<template>
    <swiper :indicator-dots="indicatorDots">
        <block v-for="(slice, i) in clazzs" :key="i">
            <swiper-item>
                <view class="foodentry">
                    <a 
                    class="clazz" v-for="item in slice" :key="item.id"
                    :style="{width: 100 / 4  +'%'}"
                    >
                        <div class="food-container">
                            <img :src="item.image_url"/>
                        </div>
                        <h4> {{item.title}} </h4>
                    </a>
                </view>
            </swiper-item>
        </block>        
    </swiper>
</template>

<script>
import {after, groupAry , ImageBaseURL} from './utils'

const config = {
  name: '商品分类',
  data: function() {
    return {
      clazz: [],
      isError: false,
      indicatorDots: true,
    };
  },
  async created() {
    const fly = this.$fly;
    const self = this;
    const { data, status } = await fly.get('v2/index_entry');
    this.isError = status !== 200;
    if (!this.isError) {
      this.clazz = self.appendBaseUrl(data);
    } else {
    }
  },
  methods: {
    appendBaseUrl(data) {
      const self = this;
      return data.map(({ image_url, ...rest }) => ({
        ...rest,
        image_url: ImageBaseURL + image_url,
      }));
    },
  },
  computed: {
    clazzs() {
      const self = this;
      const swiperItems = groupAry(self.clazz, 8);
      return swiperItems;
    },
  },
};


config.methods.appendBaseUrl = after(config.methods.appendBaseUrl);
export default config;
</script>

<style lang="scss" scoped>
.foodentry {
  display: flex;
  flex-wrap: wrap;
}
img {
  height: 100%;
  width: 100%;
}
.food-container {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.clazz {
  text-align: center;
  position: relative;
  float: left;
  margin-top: 0.293333rem;
  margin-top: 2.933333vw;
}
swiper {
  width: 100vw;
}
</style>
