<template>
    <view>
        <view v-for="item in clazz" :key="item.id">
            <a>
                <img :src="item.image_url"/>
                <h4>
                    {{item.title}}
                </h4>
            </a>
        </view>
    </view>
</template>

<script>
const config =  {
  name: '商品分类',
  data: function() {
    return {
      clazz: [],
      isError: false,
    };
  },
  async created() {
    console.log(this.$fly);
    const fly = this.$fly;
    const self = this;
    const { data, status } = await fly.get('v2/index_entry');

    if (status === 200) {
      this.clazz = self.appendBaseUrl(data);
    } else {
    }
    this.isError = status === 200;
  },
  methods: {
    appendBaseUrl(data) {
      const self = this;
      const baseUrl = 'https://fuss10.elemecdn.com';

      return data.map(({ image_url, ...rest }) => ({
        ...rest,
        image_url: baseUrl + image_url
        // .split("").slice(1).join(""),
      }));
    },
  },
};

function after(fn) {
    return function(...args) {
        const result = fn.apply(this, args)
        console.log(result)
        return result
    }
}
config.methods.appendBaseUrl = after(config.methods.appendBaseUrl)
export default config
</script>
