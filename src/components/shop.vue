<template>
    <scroll-view
        class="s-view"
        scroll-y 
        :style="{height: (shop.length * 150 + 10) + 'rpx'}"
        scrolltolower ="lower"
        >
        <block v-for="s in shop" :key="s.id"  >
            <a @click="onItemClick(s)" :style="{height: '150rpx'}" >
                <img  :src="s.image_path"/>
            </a>
        </block>
    </scroll-view>
</template>

<script>
import { ImageBaseURL, log } from './utils'
export default {
  props: {
    orderBy: {
      type: Number,
      default: 4
    },
    initalShop: {
      type: Array,
      default: []
    },
    onItemClick: {
      type: Function,
      default: () => {}
    }
  },
  data: function() {
    return {
      isError: false,
      isLoading: false,
    };
  },
  async created() {
  },
  watch: {
    mapShop() {
      console.log(this.shop)
    }
  },
  computed: {
    shop() {
      return this.appendBaseUrl(this.initalShop)
    }
  },
  methods: {
    appendBaseUrl(data) {
      const self = this;
      return data.map(({ image_path, ...rest }) => ({
        ...rest,
        image_path: '//elm.cangdu.org/img' + '/' + image_path,
      }));
    },
    async lower() {
      log('lower more')
      if (this.isLoading) {
        return;
      }
    },
    
  },
};
</script>
<style lang="scss" scoped>
img{
  width: 150rpx;
  height: 100%;
}
.s-view{
  background: lightcoral;
}
</style>
