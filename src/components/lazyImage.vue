<template>
    <img :src="src" alt="image" class="img" />
</template>

<script>
// const imagePlaceHolder = '';
// const image = new Image();
// TODO: 使用 data.imageSrc 改变时没有影响到 template
export default {
  props: ['src'],
  data: {
    // return {
    imageSrc: '',
    // };
  },
  mounted() {
    this.asyncLoad();
  },
  watch() {
    this.asyncLoad();
  },
  methods: {
    asyncLoad() {
      const self = this;

      // self.imageSrc = imagePlaceHolder;
      // image.onload = function onload() {
      // TODO: min-delay
      self.imageSrc = self.src;

      // };
      // image.src = self.src;
    },
  },
};
</script>

<style scoped>
</style>
