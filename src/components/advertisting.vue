<template>
    <a :href="directionUrl">
        <lazy-image :src="imageSrc" />
    </a>
</template>

<script>
import LazyImage from './lazyImage';

export default {
  props: ['style', 'directionUrl', 'imageSrc'],
  components: { LazyImage },
  computed: {
    computeContainerStyle() {
      return this.style;
    },
  },
};
</script>

<style lang="scss" scoped>
a{
}
</style>


